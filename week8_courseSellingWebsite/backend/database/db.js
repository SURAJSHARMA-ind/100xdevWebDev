const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const User = new Schema({
  course: { type: ObjectId, ref: "course" },
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phoneno: { type: Number, unique: true, required: true },
  password: { type: String, required: true },
});
const Course = new Schema({
  title: { type: String, required: true },
  description: { type: string, required: true },
  price: { type: number, required: true },
  imageurl: { type: string, required: true },
});

const UserModel = mongoose.model("user", User);
const CourseModel = mongoose.model("course", Course);

module.exports = { UserModel, CourseModel };
