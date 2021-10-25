const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

// creating study material schema
const studyMaterialSchema = new Schema ({
  by: {type: String, required: true},
  topic: {type: String, required: true},
  material: {type: String, required: true},
  tags: {type: [String]},
  date: {type: Date, default:  Date.now}
});

// creating model
const studyMaterial = mongoose.model ('studyMaterial', studyMaterialSchema);

// exporting
module.exports = studyMaterial;
