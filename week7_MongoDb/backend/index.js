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

// ..........login Validator = Validates the jwt token
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
    console.log("UserDetail", userDetail);
    const email = userDetail.email;
    console.log("Email is ", email);

    const userExists = await UserModel.findOne({ email: email });
    if (!userExists) {
      return res.status(404).send({
        message: "Invalid Token",
      });
    }
    console.log("exist");
    next();
  } catch (error) {
    return res.status(409).send({ message: `Error is ${error}` });
  }
};
//................Signup End-point
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
    return res.status(500).json({
      message: "Server error occurred",
      error: error.message,
    });
  }
});
//.............SignIn End-point
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email }); //the findOne function return the entire user document from the database
    if (!user) {
      return res.status(400).send({
        message: "Email Not Found",
      });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(403).send({
        message: "Invalid username or Password",
      });
    }

    const token = jwt.sign(
      {
        id: user.userid,
      },
      JWT_SECRET,
      { expiresIn: 60 }
    );

    res.send({
      message: "Login Successfully",
      email: email,
      token: token,
    });
  } catch (error) {
    return res.status(500).send({
      message: `Error occured ${error}`,
    });
  }
});

//.............Todo End-point
app.post("/todo", loginValidator, async (req, res) => {
  // ......zod validation
  try {
    const requiredTodo = z.object({
      title: z.string().max(30),
      description: z.string(),
      status: z.boolean(),
    });
    const parsedTodo = requiredTodo.safeParse(req.body);

    if (!parsedTodo.success) {
      return res.status(400).send({
        message: "Incorrect Format",
      });
    }

    const { title, description, status } = parsedTodo.data;
    await TodoModel.create({
      title,
      description,
      status,
    });
  } catch (error) {
    return res.status(400).send({
      message: `Error is ${error}`,
    });
  }
  return res.send({
    message: "TODO add succesfully",
  });
});

//.............Todos End-point
app.get("/todos", loginValidator, async (req, res) => {
console.log(req.user);

  try {
    const todos = await TodoModel.find({});
    return res.send(todos);
  } catch (error) {
    return res.status(500).send({
      message: `Error occurred while fetching todos: ${error.message}`,
    });
  }
});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
