const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

// Schema for answer
const askSomethingAnswerSchema = new Schema ({
  title: {type: String, require: true},
  answer: {type: String, require: true},
  by: {type: String, required: true},
  to: {type: String, required: true},
  time: {type: Date, default: Date.now},
  liked: {type: [String], required: true},
  disliked: {type: [String], required: true},
  userName: {type: String, required: true},
  userImage: {type: String, required: true},
  tags: {type: [String]},
  isSpam : {type: Boolean},
});

// creating model
const askSomethingAnswer = mongoose.model (
  'askSomethingAnswer',
  askSomethingAnswerSchema
);

// exporting
module.exports = askSomethingAnswer;
