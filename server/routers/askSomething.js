const express = require ('express');
const router = express.Router ();
const askSomethingQuestion = require ('../models/askSomethingQuestion');

router.use (express.json ());

router.get ('/', (req, res) => {
  console.log(req.body);
  res.send ('hello');
});

router.post ('/', (req, res) => {
  console.log (req.body);
  res.send ('hello');
});


module.exports = router;
