const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

// Creating question schema
const askSomethingQuestionSchema = new Schema ({
  title: {type: String, require: true},
  question: {type: String, require: true},
  by: {type: String, required: true},
  time: {type: Date, default: Date.now},
  answers: {type: [String], require: true},
  liked: {type: [String], required: true},
  disliked: {type: [String], required: true},
  userName: {type: String, required: true},
  userImage: {type: String, required: true},
  tags: {type: [String]},
  isSpam: {type: Boolean},
});

// creating model
const askSomethingQuestion = mongoose.model (
  'askSomethingQuestion',
  askSomethingQuestionSchema
);
// exporting

module.exports = askSomethingQuestion;
