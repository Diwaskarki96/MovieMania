const mongoose = require("mongoose");
const { type } = require("../movies/movie.validation");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
    trim: true,
    lowercase: true,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 40,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    trim: true,
    default: "user",
    required: "true",
  },
  profilePicture: { type: String },
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
