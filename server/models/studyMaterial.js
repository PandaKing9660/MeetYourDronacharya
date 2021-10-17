const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const studyMaterialSchema = new Schema ({
  by: {type: String, required: true},
  topic: {type: String, required: true},
  material: {type: String, required: true},
  tags: {type: [String]},
  date: {type: Date, default:  Date.now}
});

const studyMaterial = mongoose.model ('studyMaterial', studyMaterialSchema);

module.exports = studyMaterial;
