const express = require ('express');
const router = express.Router ();
const user = require ('../models/user');

router.use (express.json ());

// backend will be added in next release

router.get ('/', (req, res) => {
  res.send ('hello');
});

module.exports = router;
