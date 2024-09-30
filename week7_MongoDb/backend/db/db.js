const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const User = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const Todo = new Schema({
  userid: { type: ObjectId, ref: "user" },
  title: String,
  description: String,
  status: Boolean,
});

const UserModel = mongoose.model("user", User);
const TodoModel = mongoose.model("todo", Todo);

module.exports = { UserModel, TodoModel };
