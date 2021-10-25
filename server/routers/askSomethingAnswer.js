// importing important files for routing and schemas for mongodb
const express = require ('express');
const router = express.Router ();
const user = require ('../models/user');
const askSomethingAnswer = require ('../models/askSomethingAnswer');
const askSomethingQuestion = require ('../models/askSomethingQuestion');

router.use (express.json ());

// this request will send the questions in most recent first order
router.post ('/reverse-time-sort', async (req, res) => {
  try {
    const {questionId} = req.body;

    await askSomethingAnswer
      .find ({})
      .sort ({time: -1})
      .then (answer => {
        const ans = answer.filter (answer => answer.to === questionId);

        res.json (ans);
      })
      .catch (err => console.log ('from ask-something.js ' + err));
  } catch (err) {
    console.log (err);
  }
});

// this method is used to check if the user has already liked the answer or not
router.post ('/check', async (req, res) => {
  try {
    const {userId, answerId} = req.body;

    await askSomethingAnswer
      .findById (answerId)
      .then (resp => {
        if (resp) {
          const LikeId = resp.liked.find (likeId => likeId === userId);
          // user has liked it
          if (LikeId) {
            return res.send ('liked');
          }
          const dislikeId = resp.disliked.find (
            dislikeId => dislikeId === userId
          );
          // user has disliked it
          if (dislikeId) {
            return res.send ('disliked');
          }

          // nothing is done
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

// this method is used to post the answer
router.post ('/add', async (req, res) => {
  try {
    const answer = req.body;
    let user_image = '';
    let user_name = '';
    let answerList = '';

    // finding the user who added the answer for his information

    await user
      .findById (answer.by)
      .then (resp => {
        user_image = resp.imageUrl;
        user_name = resp.name;
      })
      .catch (err => console.log (err));

    // creating the answer using its schema
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

    // finding the question which is answered

    await askSomethingQuestion
      .findById (answer.to)
      .then (resp => {
        answerList = resp.answers;
      })
      .catch (err => console.log (err));

    // adding answer id into questions's answer list
    answerList.push (newAnswer._id);

    // adding the question into database

    await newAnswer
      .save ()
      .then (answer => {
        res.json (answer);
      })
      .catch (err => console.log (err));

    // updating the question with new list
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
          console.log ('updated ');
        }
      }
    );
  } catch (err) {
    err => console.log ('outside try' + err);
  }
});

// adding the like for the user
router.put ('/addLike', async (req, res) => {
  try {
    const {userId, answerId} = req.body;

    let newListLike, newListDislike;

    // finding the answer which we have to like

    await askSomethingAnswer
      .findById (answerId)
      .then (resp => {
        // filtering both like and dislike arrays, removing current user from both

        newListLike = resp.liked.filter (idd => idd !== userId);
        newListDislike = resp.disliked.filter (idd => idd !== userId);
      })
      .catch (err => console.log (err));

    // adding user to liked array

    newListLike.push (userId);

    // updating the question, adding liked array

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

// adding the dislike for the user
router.put ('/addDislike', async (req, res) => {
  try {
    const {userId, answerId} = req.body;

    let newListLike, newListDislike;

    // finding the question which we have to dislike

    await askSomethingAnswer
      .findById (answerId)
      .then (resp => {
        // filtering both like and dislike arrays, removing current user from both

        newListLike = resp.liked.filter (idd => idd !== userId);
        newListDislike = resp.disliked.filter (idd => idd !== userId);
      })
      .catch (err => console.log (err));

    // adding user to dislike array

    newListDislike.push (userId);

    // updating the question into database

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

module.exports = router;
