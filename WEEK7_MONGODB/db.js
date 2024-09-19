const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  token:String
});

const Todo = new Schema({
  userid: ObjectId,
  title: String,
  name: String,
});

const UserModel = mongoose.model("user", User);
const TodoModel = mongoose.model("todo", Todo);

module.exports = { UserModel, TodoModel };
