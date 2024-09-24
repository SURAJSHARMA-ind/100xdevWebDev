const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const Todo = new Schema({
  userid: ObjectId,
  title: String,
  description: String,
  status:Boolean,
});

const UserModel = mongoose.model("user", User);
const TodoModel = mongoose.model("todo", Todo);

module.exports = { UserModel, TodoModel };
