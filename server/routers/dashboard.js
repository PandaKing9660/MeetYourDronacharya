const express = require ('express');
const router = express.Router ();
const user = require ('../models/user');

router.use (express.json ());

router.put ('/add-question', async (req, res) => {
  try {
    const {userId, questionId} = req.body;
    console.log (userId, questionId);
    let newListExp;

    // finding the user who added exp
    await user
      .findById (userId)
      .then (resp => {
        newListExp = resp.questionShared;
      })
      .catch (err => console.log (err));

    // adding question to array
    newListExp.push (questionId);

    // updating the user, adding exp to array
    await user.findByIdAndUpdate (
      userId,
      {
        questionShared: newListExp,
      },
      {new: true},
      (err, result) => {
        if (err) {
          console.log (err);
        } else {
          console.log ('updated');
        }
      }
    );
    res.send ('ook');
  } catch (err) {
    console.log (err);
    res.send ('some error');
  }
});

router.put ('/add-answer', async (req, res) => {
  try {
    const {userId, answerId} = req.body;
    console.log (userId, answerId);
    let newListExp;

    // finding the user who added exp
    await user
      .findById (userId)
      .then (resp => {
        newListExp = resp.answerShared;
      })
      .catch (err => console.log (err));

    // adding answer to array
    newListExp.push (answerId);

    // updating the user, adding exp to array
    await user.findByIdAndUpdate (
      userId,
      {
        answerShared: newListExp,
      },
      {new: true},
      (err, result) => {
        if (err) {
          console.log (err);
        } else {
          console.log ('updated');
        }
      }
    );
    res.send ('ook');
  } catch (err) {
    console.log (err);
    res.send ('some error');
  }
});

router.put ('/add-experience', async (req, res) => {
  try {
    const {userId, experienceId} = req.body;
    console.log (userId, experienceId);
    let newListExp;

    // finding the user who added exp
    await user
      .findById (userId)
      .then (resp => {
        newListExp = resp.experienceShared;
      })
      .catch (err => console.log (err));

    // adding experience to array
    newListExp.push (experienceId);

    // updating the user, adding exp to array
    await user.findByIdAndUpdate (
      userId,
      {
        experienceShared: newListExp,
      },
      {new: true},
      (err, result) => {
        if (err) {
          console.log (err);
        } else {
          console.log ('updated');
        }
      }
    );
    res.send ('ook');
  } catch (err) {
    console.log (err);
    res.send ('some error');
  }
});

router.post ('/get-user', async (req, res) => {
  try {
    const {userId} = req.body;

    // searching for the id
    await user
      .find ({})
      .then (resp => {
        const ans = resp.filter (users => users._id == userId);
        console.log (ans);
        res.json (ans);
      })
      .catch (err => console.log (err));
  } catch (err) {
    console.log (err);
  }
});

module.exports = router;
