const mongoose = require ('mongoose');
const User = require('./user');

const Schema = mongoose.Schema;


// Creating Experience Schema
const chatSchema = new Schema ({
  roomName : {type: String, require: true},
  users : {type : [String], require: true}, // saving user ids
  messages: {type: [{user: String, text: String}], required: true},
  time: {type: Date, default: Date.now},
});

// creating model
const chat = mongoose.model ('chat', chatSchema);

// exporting

module.exports = chat;
