const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser"); // Middleware to parse request body
const app = express();

app.use(bodyParser.json());

const JWT_SECRET = "Surajsecretcode";

// In-memory array to store users
const users = [];

// Signup route
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  // Check if the user already exists
  const userExists = users.find((user) => user.username === username);

  if (userExists) {
    return res.status(400).send({
      message: "User already exists",
      
    });
  } 
  else {
    // Add the new user to the array
    const newUser = { username, password, token: null };
    users.push(newUser);

    res.send({
      message: "Signup successful",
      user: {
        username: newUser.username,
      },
    });
  }
 
});

// Signin route
app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  // Find the user with the given username and password
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    // Create JWT token for the user
    const token = jwt.sign(
      {
        username: user.username,
      },
      JWT_SECRET
    );

    user.token = token; // Store the token in the user object

    res.send({
      message: "Signin successful",
      token,
    });
    console.log(users);
  } else {
    res.status(403).send({
      message: "Invalid username or password",
    });
  }
});

// Protected route to get user details
app.get("/me", (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({
      message: "Token missing",
    });
  }

  try {
    // Verify the token
    const userDetails = jwt.verify(token, JWT_SECRET);
    const username = userDetails.username;

    // Find the user based on the username
    const user = users.find((user) => user.username === username);

    if (user) {
      res.send({
        username: user.username,
      });
    } else {
      res.status(401).send({
        message: "Unauthorized",
      });
    }
  } catch (err) {
    res.status(401).send({
      message: "Invalid token",
    });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
