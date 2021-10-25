const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const studyMaterialSchema = new Schema ({
  by: {type: String, required: true},
  topic: {type: String, required: true},
  description: {type: String, required: true},
  material: {type: String},
  tags: {type: [String]},
  date: {type: Date, default:  Date.now}
});

const studyMaterial = mongoose.model ('studyMaterial', studyMaterialSchema);

module.exports = studyMaterial;
