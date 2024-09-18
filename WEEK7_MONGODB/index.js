const express = require("express");
const app = express();
const port = 5000;
const { UserModel, TodoModel } = require("./db");
require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const connectionString = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

mongoose.connect(connectionString);

app.use(express.json());

const loginValidator = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.send({
      message: "Token is missing",
    });
  }
  const userDetail = jwt.verify(token, JWT_SECRET);
  req.user = userDetail;
  console.log("UserDetail", userDetail);
};

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const hashedPassword = await bcrypt.hash(password, 5);
  const userExists = UserModel.findOne({ email: email });
  if (!userExists) {
    await UserModel.create({
      name: username,
      email: email,
      password: hashedPassword,
    });
  } else {
    res.send({
      message: "Email Already Exist",
      status: 409,
    });
  }
});

app.post("/signin", loginValidator, async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // const UserExist = userModel.findOne(
  //   { email: email 
  //     password :password
  //   });

  if (UserExist) {
    const token = jwt.sign(
      {
        username: username,
      },
      jwt_Secret
    );
    UserExist.token = token;
    console.log(users);
    res.send({
      message: "Login Successfully",
      username: username,
      token: token,
    });
  } else {
    res.status(403).send({
      message: "Invalid username or Password",
    });
  }
});

app.post("/Todos", (req, res) => {
  TodoModel.create({});
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
