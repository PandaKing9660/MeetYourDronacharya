const express = require ('express');
const router = express.Router ();
const studyMaterial = require ('../models/studyMaterial');

router.use (express.json ());

router.post ('/add', (req, res) => {
  res.send ('hello');
});

module.exports = router;
