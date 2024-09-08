const express = express("express");
const jwt = require("jsonwebtoken");

const app = express();
const users = [
  {
    username,
    password,
  },
];

app.use(express.json());

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const alreadyExist = users.find((user) => {
    user.username === username;
  });

  if (alreadyExist) {
    res.send({message : "User Already Exist "});
  }

  user.push(username, password);
});
