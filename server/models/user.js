const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

// Creating user schema
const userSchema = new Schema ({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  socialMedia: {type: [String]},
  imageUrl: {type: String},
  date: {type: Date, default: Date.now},
});

// creating model
const User = mongoose.model ('user', userSchema);

// exporting
module.exports = User;
