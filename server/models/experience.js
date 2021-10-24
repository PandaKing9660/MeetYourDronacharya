const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const experienceSchema = new Schema ({
  title: {type: String, require: true},
  experience: {type: String, require: true},
  by: {type: String, required: true},
  time: {type: Date, default: Date.now},
  liked: {type: [String], required: true},
  disliked: {type: [String], required: true},
  userName: {type: String, required: true},
  userImage: {type: String, required: true},
});

const experience = mongoose.model ('experience', experienceSchema);

module.exports = experience;
