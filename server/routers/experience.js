// importing important files for routing and schemas for mongodb
const express = require ('express');
const router = express.Router ();
const Experience = require ('../models/experience');
const user = require ('../models/user');
const {checkSpam} = require ('../helper/spamCheck');

router.use (express.json ());

// this request will send the experiences in most recent first order
router.post ('/reverse-time-sort', (req, res) => {
  Experience.find ({})
    .sort ({time: -1})
    .then (experience => res.json (experience))
    .catch (err => console.log ('from experience.js ' + err));
});

// this request will send the experiences which are added by the user who requested this method
router.post ('/user-list', (req, res) => {
  const {user} = req.body;

  Experience.find ({})
    .sort ({time: -1})
    .then (experiences => {
      const listFromUser = experiences.filter (
        experience => experience.by === user._id
      );

      res.json (listFromUser);
    })
    .catch (err => console.log ('from experience.js ' + err));
});

// this request will send the experiences which are liked by the user who requested this method
router.post ('/user-likes', (req, res) => {
  const {user} = req.body;

  Experience.find ({})
    .sort ({time: -1})
    .then (experiences => {
      const listFromUser = experiences.filter (experience => {
        // finding the experience needed
        const found = experience.liked.find (userIds => userIds === user._id);

        if (found) return true;
        else return false;
      });

      res.json (listFromUser);
    })
    .catch (err => console.log ('from ask-something.js ' + err));
});

// this request will send the experiences which are disliked by the user who requested this method
router.post ('/user-dislikes', (req, res) => {
  const {user} = req.body;

  Experience.find ({})
    .sort ({time: -1})
    .then (experiences => {
      const listFromUser = experiences.filter (experience => {
        const found = experience.disliked.find (
          userIds => userIds === user._id
        );

        if (found) return true;
        else return false;
      });

      res.json (listFromUser);
    })
    .catch (err => console.log ('from ask-something.js ' + err));
});

// this request will send the experiences in most recent last order
router.post ('/time-sort', (req, res) => {
  Experience.find ({})
    .sort ({time: 1})
    .then (experiences => res.json (experiences))
    .catch (err => console.log ('from ask-something.js ' + err));
});

// this method is used to check if the user has already liked the experience or not
router.post ('/check', async (req, res) => {
  try {
    const {userId, experienceId} = req.body;

    await Experience.findById (experienceId)
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

// this method is used to post the experience
router.post ('/add', async (req, res) => {
  try {
    const experience = req.body;
    let user_image = '';
    let user_name = '';
    let user_email = '';
    let exp_len = 0;
    // finding the user who added the experience for his information
    
    await user
      .findById (experience.by)
      .then (resp => {
        user_image = resp.imageUrl;
        user_name = resp.name;
        user_email = resp.email;
        exp_len = resp.experienceShared;
      })
      .catch (err => console.log (err));

    // check for spam content
    const comment = {
      ip: req.ip,
      useragent: req.headers['user-agent'],
      content: experience.experience,
      // For guaranteed spam use email : akismet-guaranteed-spam@example.com
      email: user_email,
      name: user_name,
    };
    const is_spam = await checkSpam (comment);
    console.log (user_image);
    // creating the experience using its schema

    const newExperience = await new Experience ({
      title: experience.title,
      experience: experience.experience,
      by: experience.by,
      liked: [],
      disliked: [],
      userName: user_name,
      userImage: user_image,
      tags: experience.tags,
      isSpam: is_spam,
    });

    // adding the experience into database
    await newExperience
      .save ()
      .then (experience => res.json (experience))
      .catch (err => console.log (err));
  } catch (err) {
    console.log ('outside try' + err);
  }
});

// adding the like for the user
router.put ('/addLike', async (req, res) => {
  try {
    const {userId, experienceId} = req.body;
    console.log (userId, experienceId);
    let newListLike, newListDislike;

    // finding the experience which we have to like
    await Experience.findById (experienceId)
      .then (resp => {
        // filtering both like and dislike arrays, removing current user from both

        newListLike = resp.liked.filter (idd => idd !== userId);
        newListDislike = resp.disliked.filter (idd => idd !== userId);
      })
      .catch (err => console.log (err));

    // adding user to liked array

    newListLike.push (userId);

    // updating the experience, adding liked array

    await Experience.findByIdAndUpdate (
      experienceId,
      {
        liked: newListLike,
        disliked: newListDislike,
      },
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

// adding the dislike for the user
router.put ('/addDislike', async (req, res) => {
  try {
    const {userId, experienceId} = req.body;

    let newListLike, newListDislike;

    // finding the experience which we have to dislike

    await Experience.findById (experienceId)
      .then (resp => {
        // filtering both like and dislike arrays, removing current user from both

        newListLike = resp.liked.filter (idd => idd !== userId);
        newListDislike = resp.disliked.filter (idd => idd !== userId);
      })
      .catch (err => console.log (err));

    // adding user to dislike array

    newListDislike.push (userId);

    // updating the experience into database

    await Experience.findByIdAndUpdate (
      experienceId,
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

// deleting the experience
router.post ('/deleteExp', async (req, res) => {
  try {
    // finding the important information
    const {experienceId} = req.body;
    const delUser = await Experience.findByIdAndDelete (experienceId);
    if (!delUser) return res.sendStatus (404);

    res.send ('deleted');
  } catch (e) {
    console.log ('Error ', e);
  }
});

// editing the experience
router.post ('/editExp', async (req, res) => {
  try {
    const {title, experience, tags, experienceId} = req.body;

    // using method
    await Experience.findByIdAndUpdate (
      experienceId,
      {
        title: title,
        experience: experience,
        tags: tags,
      },
      (err, result) => {
        if (err) {
          console.log (err);
        } else {
          console.log ('updated');
        }
      }
    );
  } catch (e) {
    console.log ('Error ', e);
  }
});

// for fetching the title
router.post ('/fetchtitle', async (req, res) => {
  try {
    const {experienceId} = req.body;
    const exp = await Experience.findById (experienceId);
    res.json (exp);
  } catch (e) {
    console.log ('Error ', e);
  }
});

module.exports = router;
