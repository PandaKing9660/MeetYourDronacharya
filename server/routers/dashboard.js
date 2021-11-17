const express = require("express");
const router = express.Router();
const user = require("../models/user");
const askSomethingQuestion = require("../models/askSomethingQuestion");
const askSomethingAnswer = require("../models/askSomethingAnswer");
const Experience = require("../models/experience");

router.use(express.json());

router.put("/add-question", async (req, res) => {
  try {
    const { userId, questionId } = req.body;
    console.log(userId, questionId);
    let newListExp;

    // finding the user who added exp
    await user
      .findById(userId)
      .then((resp) => {
        newListExp = resp.questionShared;
      })
      .catch((err) => console.log(err));

    // adding question to array
    newListExp.push(questionId);

    // updating the user, adding exp to array
    await user.findByIdAndUpdate(
      userId,
      {
        questionShared: newListExp,
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

router.put("/add-answer", async (req, res) => {
  try {
    const { userId, answerId } = req.body;
    console.log(userId, answerId);
    let newListExp;

    // finding the user who added exp
    await user
      .findById(userId)
      .then((resp) => {
        newListExp = resp.answerShared;
      })
      .catch((err) => console.log(err));

    // adding answer to array
    newListExp.push(answerId);

    // updating the user, adding exp to array
    await user.findByIdAndUpdate(
      userId,
      {
        answerShared: newListExp,
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

router.put("/add-experience", async (req, res) => {
  try {
    const { userId, experienceId } = req.body;
    console.log(userId, experienceId);
    let newListExp;

    // finding the user who added exp
    await user
      .findById(userId)
      .then((resp) => {
        newListExp = resp.experienceShared;
      })
      .catch((err) => console.log(err));

    // adding experience to array
    newListExp.push(experienceId);

    // updating the user, adding exp to array
    await user.findByIdAndUpdate(
      userId,
      {
        experienceShared: newListExp,
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

router.put("/add-follower", async (req, res) => {
  try {
    const { userId, followerId } = req.body;
    console.log(userId, followerId);
    let newListFollowers;

    // finding the user who added exp
    await user
      .findById(userId)
      .then((resp) => {
        newListFollowers = resp.followers.filter(
          (follower) => follower !== followerId
        );
      })
      .catch((err) => console.log(err));

    // adding follower to array
    newListFollowers.push(followerId);

    // updating the user, adding follower to array
    await user.findByIdAndUpdate(
      userId,
      {
        followers: newListFollowers,
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

router.put("/remove-follower", async (req, res) => {
  try {
    const { userId, followerId } = req.body;
    console.log(userId, followerId);
    let newListFollowers;

    // finding the user who added exp
    await user
      .findById(userId)
      .then((resp) => {
        newListFollowers = resp.followers.filter(
          (follower) => follower !== followerId
        );
      })
      .catch((err) => console.log(err));

    // updating the user, adding follower to array
    await user.findByIdAndUpdate(
      userId,
      {
        followers: newListFollowers,
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

router.put("/delExp", async (req, res) => {
  try {
    const { experienceId, userId } = req.body;
    let newListExp;

    // finding the user who added exp
    await user
      .findById(userId)
      .then((resp) => {
        newListExp = resp.experienceShared.filter(
          (experience) => experience !== experienceId
        );
      })
      .catch((err) => console.log(err));
    console.log(newListExp);
    // updating the user, adding follower to array
    await user.findByIdAndUpdate(
      userId,
      {
        experienceShared: newListExp,
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

router.put("/edit-user", async (req, res) => {
  try {
    const {
      userId,

      linkedIn,
      facebook,
      instagram,
      twitter,
      github,
    } = req.body;

    const newSocialMedia = [linkedIn, facebook, instagram, twitter, github];

    await user.findByIdAndUpdate(
      userId,
      {
        socialMedia: newSocialMedia,
      },
      { new: true },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
});

router.post("/check-follower", async (req, res) => {
  try {
    const { userId, followerId } = req.body;

    // finding the user who added exp
    await user
      .findById(userId)
      .then((resp) => {
        resp.followers.map((follower) => {
          if (follower === followerId) {
            res.send(true);
          }
        });
        res.send(false);
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
    res.send("some error");
  }
});

router.post("/get-user", async (req, res) => {
  try {
    const { userId } = req.body;

    // searching for the id
    await user
      .find({})
      .then((resp) => {
        const ans = resp.filter((users) => users._id == userId);

        res.json(ans);
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
});

router.post("/user-answer", async (req, res) => {
  try {
    const { userId } = req.body;
    let ans = [];

    // searching for the id
    await user
      .find({})
      .then((resp) => {
        const temp = resp.filter((users) => users._id == userId);

        if (temp.length === 0) {
          res.json([-1]);
        }
        if (ans.length === temp[0].answerShared.length) {
          res.json(ans);
        }

        temp[0].answerShared.map(async (ans_id) => {
          const answer = await askSomethingAnswer.findById(ans_id);

          ans.push(answer);

          if (ans.length === temp[0].answerShared.length) {
            res.json(ans);
          }
        });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
});

router.post("/user-experience", async (req, res) => {
  try {
    const { userId } = req.body;
    let exp = [];

    // searching for the id
    await user
      .find({})
      .then((resp) => {
        const temp = resp.filter((users) => users._id == userId);

        if (temp.length === 0) {
          res.json([-1]);
        }
        if (exp.length === temp[0].experienceShared.length) {
          res.json(exp);
        }

        temp[0].experienceShared.map(async (exp_id) => {
          const exp_ = await Experience.findById(exp_id);

          exp.push(exp_);

          if (exp.length === temp[0].experienceShared.length) {
            res.json(exp);
          }
        });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
});

router.post("/user-question", async (req, res) => {
  try {
    const { userId } = req.body;
    let ques = [];

    // searching for the id
    await user
      .find({})
      .then((resp) => {
        const temp = resp.filter((users) => users._id == userId);

        if (temp.length === 0) {
          res.json([-1]);
        }
        if (ques.length === temp[0].questionShared.length) {
          res.json(ques);
        }

        temp[0].questionShared.map(async (ans_id) => {
          const question = await askSomethingQuestion.findById(ans_id);

          ques.push(question);

          if (ques.length === temp[0].questionShared.length) {
            res.json(ques);
          }
        });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
});

router.post("/user-followers", async (req, res) => {
  try {
    const { userId } = req.body;
    let followers = [];

    // searching for the id
    await user
      .find({})
      .then((resp) => {
        const temp = resp.filter((users) => users._id == userId);

        if (temp.length === 0) {
          res.json([-1]);
        }
        if (followers.length === temp[0].followers.length) {
          res.json(followers);
        }

        temp[0].followers.map(async (follower_id) => {
          const follower_user = await user.findById(follower_id);

          followers.push(follower_user);

          if (followers.length === temp[0].followers.length) {
            res.json(followers);
          }
        });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
