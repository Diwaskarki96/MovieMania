const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  //   firstName: {
  //     type: String,
  //     required: true,
  //     minLength: 3,
  //     maxLength: 15,
  //     trim: true,
  //     lowercase: true,
  //   },
  //   lastName: {
  //     type: String,
  //     required: true,
  //     minLength: 3,
  //     maxLength: 15,
  //     trim: true,
  //     lowercase: true,
  //   },
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
});

const adminModel = mongoose.model("Admin", adminSchema);
module.exports = adminModel;
