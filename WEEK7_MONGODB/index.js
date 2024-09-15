const express = require("express");
const bcrypt = require('bcrypt')
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
require("dotenv").config();
const connectionString = process.env.MONGODB_URI;
import { UserModel, TodoModel } from "./db";
mongoose.connect(connectionString);
app.use(express.json());

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const hashedPassword = bcrypt.hash(password,5){
  
  }
  UserModel.create({
    name: username,
    email: email,
    password: password,
  });
});
app.post("/signin", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  const response = await UserModel.findOne({
    email:email,
    password:password
  });
  if(response){
    const token = jwt.sign({
      
    })
  }

});
app.post("/Todos", (req, res) => {
  TodoModel.create({});
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
