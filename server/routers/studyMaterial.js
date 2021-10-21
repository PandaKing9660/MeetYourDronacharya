const express = require ('express');
const router = express.Router ();
const studyMaterial = require ('../models/studyMaterial');

router.use (express.json ());

router.get ('/', (req, res) => {
  res.send ('hello');
});

module.exports = router;
