const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

// Creating Experience Schema
const experienceSchema = new Schema ({
  title: {type: String, require: true},
  experience: {type: String, require: true},
  by: {type: String, required: true},
  time: {type: Date, default: Date.now},
  liked: {type: [String], required: true},
  disliked: {type: [String], required: true},
  userName: {type: String, required: true},
  userImage: {type: String, required: true},
  tags: {type: [String]},
});

// creating model
const experience = mongoose.model ('experience', experienceSchema);

// exporting

module.exports = experience;
