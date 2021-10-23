const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

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
});

const askSomethingAnswer = mongoose.model (
  'askSomethingAnswer',
  askSomethingAnswerSchema
);

module.exports = askSomethingAnswer;
