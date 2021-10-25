const express = require ('express');
const router = express.Router ();
const user = require ('../models/user');
const askSomethingAnswer = require ('../models/askSomethingAnswer');
const askSomethingQuestion = require ('../models/askSomethingQuestion');

router.use (express.json ());

router.post ('/reverse-time-sort', async (req, res) => {
  try {
    const {questionId} = req.body;

    console.log (questionId);
    await askSomethingAnswer
      .find ({})
      .sort ({time: -1})
      .then (answer => {
        const ans = answer.filter (answer => answer.to === questionId);
        console.log (ans);
        res.json (ans);
      })
      .catch (err => console.log ('from ask-something.js ' + err));
  } catch (err) {
    console.log (err);
  }
});

router.post ('/check', async (req, res) => {
  try {
    const {userId, answerId} = req.body;

    await askSomethingAnswer
      .findById (answerId)
      .then (resp => {
        if (resp) {
          const LikeId = resp.liked.find (likeId => likeId === userId);

          if (LikeId) {
            return res.send ('liked');
          }
          const dislikeId = resp.disliked.find (
            dislikeId => dislikeId === userId
          );

          if (dislikeId) {
            return res.send ('disliked');
          }
          return res.send ('none');
        } else {
          return res.send ('none');
        }
      })
      .catch (err => console.log (err));
  } catch (err) {
    console.log (err);
    res.send ('some error');
  }
});

router.post ('/add', async (req, res) => {
  console.log ('adding answer');
  try {
    const answer = req.body;
    let user_image = '';
    let user_name = '';
    let answerList = '';

    console.log (answer);
    await user
      .findById (answer.by)
      .then (resp => {
        user_image = resp.imageUrl;
        user_name = resp.name;
      })
      .catch (err => console.log (err));

    const newAnswer = await new askSomethingAnswer ({
      title: answer.title,
      answer: answer.answer,
      by: answer.by,
      to: answer.to,
      liked: [],
      disliked: [],
      userName: user_name,
      userImage: user_image,
    });

    await askSomethingQuestion
      .findById (answer.to)
      .then (resp => {
        answerList = resp.answers;
      })
      .catch (err => console.log (err));

    answerList.push (newAnswer._id);
    await newAnswer
      .save ()
      .then (answer => {
        console.log ('added', answer);
        res.json (answer);
      })
      .catch (err => console.log (err));
    await askSomethingQuestion.findByIdAndUpdate (
      answer.to,
      {
        answers: answerList,
      },
      {new: true},
      (err, result) => {
        if (err) {
          console.log (err);
        } else {
          console.log ('updated : ', result);
        }
      }
    );

    console.log (newAnswer);
  } catch (err) {
    err => console.log ('outside try' + err);
  }
});

router.put ('/addLike', async (req, res) => {
  try {
    const {userId, answerId} = req.body;

    let newListLike, newListDislike;

    await askSomethingAnswer
      .findById (answerId)
      .then (resp => {
        newListLike = resp.liked.filter (idd => idd !== userId);
        newListDislike = resp.disliked.filter (idd => idd !== userId);
      })
      .catch (err => console.log (err));

    newListLike.push (userId);
    console.log (newListLike);
    console.log (newListDislike);

    await askSomethingAnswer.findByIdAndUpdate (
      answerId,
      {
        liked: newListLike,
        disliked: newListDislike,
      },
      (err, result) => {
        if (err) {
          console.log (err);
        } else {
          console.log ('updated : ', result);
        }
      }
    );
    res.send ('ook');
  } catch (err) {
    console.log (err);
    res.send ('some error');
  }
});

router.put ('/addDislike', async (req, res) => {
  try {
    const {userId, answerId} = req.body;

    let newListLike, newListDislike;

    await askSomethingAnswer
      .findById (answerId)
      .then (resp => {
        newListLike = resp.liked.filter (idd => idd !== userId);
        newListDislike = resp.disliked.filter (idd => idd !== userId);
      })
      .catch (err => console.log (err));

    newListDislike.push (userId);
    console.log (newListLike);
    console.log (newListDislike);

    await askSomethingAnswer.findByIdAndUpdate (
      answerId,
      {
        liked: newListLike,
        disliked: newListDislike,
      },
      {new: true},
      (err, result) => {
        if (err) {
          console.log (err);
        } else {
          console.log ('updated : ', result);
        }
      }
    );

    res.send ('ook');
  } catch (err) {
    console.log (err);
    res.send ('some error');
  }
});

module.exports = router;
