const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const askSomethingQuestionSchema = new Schema ({
  question: {type: String, require: true},
  by: {type: String, required: true},
  time: {type: Date, default :  Date.now}
});

const askSomethingQuestion = mongoose.model ('askSomethingQuestion', askSomethingQuestionSchema);

module.exports = askSomethingQuestion;
