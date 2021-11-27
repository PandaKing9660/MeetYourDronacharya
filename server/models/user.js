const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Creating user schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  socialMedia: { type: [String] },
  imageUrl: { type: String },
  date: { type: Date, default: Date.now },
  experienceShared: { type: [String], default: [] },
  questionShared: { type: [String], default: [] },
  answerShared: { type: [String], default: [] },
  followers: { type: [String], default: [] },
  bookmarked: { type: [String], default: ["F", "F", "F", "F"] },
});

// creating model
const User = mongoose.model("user", userSchema);

// exporting
module.exports = User;
