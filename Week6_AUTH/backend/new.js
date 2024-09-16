const express = require("express");
const jwt = require("jsonwebtoken");
const port = 5000;
const host = "localhost";
const cors = require("cors");
const app = express();
require("dotenv").config();
const jwt_Secret = process.env.JWT_SECRET;

app.use(cors());

const users = [];

app.use(express.json());

const loginValidator =(req,res,next)=>{
  const token = req.headers[`authorization`];
  if (!token) {
    res.status(403).send({
      message: "Token missing",
    });
  }

  try {
    const userDetail = jwt.verify(token, jwt_Secret);
    req.user = userDetail
    const username = userDetail.username;

    const user = users.find((user) => user.username === username);

    if (user) {
      next()
    } else {
      res.status(401).send({
        message: "Unauthorized",
      });
    }
  } catch {
    res.status(401).send({
      message: "Invalid token",
    });
  }
}

app.post('/',loginValidator,(req,res)=>{
  res.json({
    message:'Already Login'
  })
})

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(users);
  const alreadyExist = users.find((user) => {
    return user.username === username;
  });

  if (alreadyExist) {
    res.status(409).send({ message: "User Already Exist " });
  } else {
    users.push({ username, password, token: null });
    res.send({
      message: "Signup Successfully",
      username: username,
    });
  }
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const UserExist = users.find(
    (user) => user.username === username && user.password === password
  );

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

app.get('/profile',loginValidator,(req,res)=>{
if(loginValidator) {
  res.send({
    message:"Profile info",
    userDetail:req.user.username
  })
}
})
app.listen(port, () => {
  console.log(`Server listening at port http://${host}:${port}`);
});
