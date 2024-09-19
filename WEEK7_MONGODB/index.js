const express = require("express");
const app = express();
const port = 5000;
const { z } = require("zod");
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
  const requiredBody = z.object({
    username: z.string().min(6).max(30),
    email: z.string().min(6).max(100).email(),
    password: z.string().min(8).max(30),
  });

  const parsedData = requiredBody.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).json({ 
      message: "Incorrect Format",
    });
  }
  const { username, email, password } = parsedData.data;  

  try {
    const userExists = await UserModel.findOne({ email: email });
    if (userExists) {
      return res.status(409).json({  
        message: "Email Already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    await UserModel.create({
      name: username,
      email: email,
      password: hashedPassword,
    });
    res.json({
      message: "Account Created Successfully.",
    });

  } catch (error) {
    res.status(500).json({ 
      message: "Server error occurred",
      error: error.message,
    });
  }
});


app.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const UserExist = await UserModel.findOne({ email: email });
  if(!UserExist) {
    res.status(400).send({
      message:"Email Not Found"
    })
  }

  const passwordCheck = await bcrypt.compare(password,UserExist.password); //the findOne function return the entire user document from the database
  // problem in this code check

  if (passwordCheck) {
    const token = jwt.sign(
      {
        email: email,
      },
      JWT_SECRET
    );
    UserExist.token = token;
    
    res.send({
      message: "Login Successfully",
      email: email,
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
