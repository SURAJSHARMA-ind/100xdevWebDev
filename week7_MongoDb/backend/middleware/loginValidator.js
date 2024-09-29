const jwt = require("jsonwebtoken");
const { UserModel } = require("../db/db");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const loginValidator = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.send({
      message: "Token is missing",
    });
  }
  try {
    const userDetail = jwt.verify(token, JWT_SECRET);
    req.user = userDetail;
    const email = userDetail.email;

    const userExists = await UserModel.findOne({ email: email });
    if (!userExists) {
      return res.status(404).send({
        message: "Invalid Token",
      });
    }
    next();
  } catch (error) {
    return res.status(409).send({ message: `Error is ${error}` });
  }
};

module.exports = loginValidator;
