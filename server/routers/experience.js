const express = require ('express');
const router = express.Router ();
const experience = require ('../models/experience');

router.use (express.json ());

router.get ('/', (req, res) => {
  res.send ('hello');
});

module.exports = router;
