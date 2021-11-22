// importing important files for routing and schemas for mongodb
const express = require("express");
const router = express.Router();
const askSomethingQuestion = require("../models/askSomethingQuestion");
const user = require("../models/user");

router.use(express.json());

// this request will send the questions in most recent first order
router.post("/reverse-time-sort", (req, res) => {
  askSomethingQuestion
    .find({})
    .sort({ time: -1 })
    .then((question) => res.json(question))
    .catch((err) => console.log("from ask-something.js " + err));
});

// this request will send the questions which are added by the user who requested this method
router.post("/user-list", (req, res) => {
  const { user } = req.body;

  askSomethingQuestion
    .find({})
    .sort({ time: -1 })
    .then((questions) => {
      const listFromUser = questions.filter(
        (question) => question.by === user._id
      );

      res.json(listFromUser);
    })
    .catch((err) => console.log("from ask-something.js " + err));
});

// this request will send the questions which are liked by the user who requested this method
router.post("/user-likes", (req, res) => {
  const { user } = req.body;

  askSomethingQuestion
    .find({})
    .sort({ time: -1 })
    .then((questions) => {
      const listFromUser = questions.filter((question) => {
        // filtering all the questions
        const found = question.liked.find((userIds) => userIds === user._id);

        if (found) return true;
        else return false;
      });

      res.json(listFromUser);
    })
    .catch((err) => console.log("from ask-something.js " + err));
});

// this request will send the questions which are disliked by the user who requested this method

router.post("/user-dislikes", (req, res) => {
  const { user } = req.body;

  askSomethingQuestion
    .find({})
    .sort({ time: -1 })
    .then((questions) => {
      const listFromUser = questions.filter((question) => {
        // filtering all the disliked questions
        const found = question.disliked.find((userIds) => userIds === user._id);

        if (found) return true;
        else return false;
      });

      res.json(listFromUser);
    })
    .catch((err) => console.log("from ask-something.js " + err));
});

// this request will send the questions in most recent last order

router.post("/time-sort", (req, res) => {
  askSomethingQuestion
    .find({})
    .sort({ time: 1 })
    .then((questions) => res.json(questions))
    .catch((err) => console.log("from ask-something.js " + err));
});

// this method is used to check if the user has already liked the question or not
router.post("/check", async (req, res) => {
  try {
    const { userId, questionId } = req.body;

    await askSomethingQuestion
      .findById(questionId)
      .then((resp) => {
        if (resp) {
          const LikeId = resp.liked.find((likeId) => likeId === userId);

          // if user has liked the question
          if (LikeId) {
            return res.send("liked");
          }
          const dislikeId = resp.disliked.find(
            (dislikeId) => dislikeId === userId
          );
          // if user has disliked the question
          if (dislikeId) {
            return res.send("disliked");
          }

          // if no reaction is given by user
          return res.send("none");
        } else {
          return res.send("none");
        }
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
    res.send("some error");
  }
});

// this method is used to post the question
router.post("/add", async (req, res) => {
  try {
    const question = req.body;
    let user_image = "";
    let user_name = "";

    // finding the user who added the question for his information
    await user
      .findById(question.by)
      .then((resp) => {
        user_image = resp.imageUrl;
        user_name = resp.name;
      })
      .catch((err) => console.log(err));

    // creating the question using its schema
    const newQuestion = await new askSomethingQuestion({
      title: question.title,
      question: question.question,
      by: question.by,
      answers: [],
      liked: [],
      disliked: [],
      userName: user_name,
      userImage: user_image,
      tags: question.tags,
    });

    // adding the question into database

    await newQuestion
      .save()
      .then((question) => res.json(question))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log("outside try" + err);
  }
});

// this method is used to send the question by used its id
router.post("/find-by-id", async (req, res) => {
  try {
    const { questionId } = req.body;

    // searching for the id
    await askSomethingQuestion
      .find({})
      .then((resp) => {
        const ans = resp.filter((question) => question._id == questionId);

        res.json(ans);
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
});

// adding the like for the user
router.put("/addLike", async (req, res) => {
  try {
    const { userId, questionId } = req.body;

    let newListLike, newListDislike;

    // finding the question which we have to like
    await askSomethingQuestion
      .findById(questionId)
      .then((resp) => {
        // filtering both like and dislike arrays, removing current user from both
        newListLike = resp.liked.filter((idd) => idd !== userId);
        newListDislike = resp.disliked.filter((idd) => idd !== userId);
      })
      .catch((err) => console.log(err));

    // adding user to liked array
    newListLike.push(userId);

    // updating the question, adding liked array
    await askSomethingQuestion.findByIdAndUpdate(
      questionId,
      {
        liked: newListLike,
        disliked: newListDislike,
      },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("updated");
        }
      }
    );
    res.send("ook");
  } catch (err) {
    console.log(err);
    res.send("some error");
  }
});

// adding the dislike for the user

router.put("/addDislike", async (req, res) => {
  try {
    const { userId, questionId } = req.body;

    let newListLike, newListDislike;

    // finding the question which we have to dislike

    await askSomethingQuestion
      .findById(questionId)
      .then((resp) => {
        // filtering both like and dislike arrays, removing current user from both

        newListLike = resp.liked.filter((idd) => idd !== userId);
        newListDislike = resp.disliked.filter((idd) => idd !== userId);
      })
      .catch((err) => console.log(err));

    // adding user to dislike array
    newListDislike.push(userId);

    // updating the question into database
    await askSomethingQuestion.findByIdAndUpdate(
      questionId,
      {
        liked: newListLike,
        disliked: newListDislike,
      },
      { new: true },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("updated");
        }
      }
    );

    res.send("ook");
  } catch (err) {
    console.log(err);
    res.send("some error");
  }
});

router.put("/delAnswer", async (req, res) => {
  try {
    const { answerId, questionId } = req.body;
    let newListAns;
    // finding the user who added exp
    await askSomethingQuestion
      .findById(questionId)
      .then((resp) => {
        newListAns = resp.answers.filter((answer) => answer !== answerId);
      })
      .catch((err) => console.log(err));
    console.log("list", newListAns);
    // updating the user, adding follower to array
    await askSomethingQuestion.findByIdAndUpdate(
      questionId,
      {
        answers: newListAns,
      },
      { new: true },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("updated");
        }
      }
    );
    res.send("ook");
  } catch (err) {
    console.log(err);
    res.send("some error");
  }
});

module.exports = router;
