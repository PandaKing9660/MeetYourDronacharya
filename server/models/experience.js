const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const experienceSchema = new Schema ({
  by: {type: String, required: true},
  topic: {type: String, required: true},
  experience: {type: String, required: true},
  tags: {type: [String]},
  date: {type: Date, default:  Date.now}
});

const experience  = mongoose.model ('experience', experienceSchema);

module.exports = experience;
