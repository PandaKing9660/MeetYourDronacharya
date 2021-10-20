const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema ({
  name: {type: String, required: true},
  emailId: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  socialMedia: {type: [String]},
  date: {type: Date, default: Date.now},
});

const User = mongoose.model ('user', userSchema);

module.exports = User;
