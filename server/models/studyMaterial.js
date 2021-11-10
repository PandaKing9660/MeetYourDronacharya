const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

// creating study material schema
const studyMaterialSchema = new Schema ({
  by: {type: String, required: true},
  topic: {type: String, required: true},
  description: {type: String, required: true},
  link: {type: String, required: true},
  // image: {data: Buffer, contentType: String},
  tags: {type: [String]},
  date: {type: Date, default:  Date.now},
  userName: {type: String, required: true},
  userImage: {type: String, required: true}
});

// creating model
const studyMaterial = mongoose.model ('studyMaterial', studyMaterialSchema);

// exporting
module.exports = studyMaterial;
