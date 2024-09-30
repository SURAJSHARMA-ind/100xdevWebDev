const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = 5000;
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");

const connectionString = process.env.MONGODB_URI;

mongoose.connect(connectionString);

app.use(express.json());

app.use("/auth", authRoutes); // Routes for authentication
app.use("/api", todoRoutes); // Routes for todos
app.use((err, req, res, next) => {
  console.error( err);
  res.status(err.status || 500).json({
    message: err.message,
  });
});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
