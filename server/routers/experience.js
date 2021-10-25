const express = require ('express');
const router = express.Router ();
const Experience = require ('../models/experience');
const user = require ('../models/user');

router.use (express.json ());

router.post ('/reverse-time-sort', (req, res) => {
  console.log ('reverse sort');
  Experience
    .find ({})
    .sort ({time: -1})
    .then (experience => res.json (experience))
    .catch (err => console.log ('from experience.js ' + err));
});

router.post ('/user-list', (req, res) => {
  const {user} = req.body;

  Experience
    .find ({})
    .sort ({time: -1})
    .then (experiences => {
      const listFromUser = experiences.filter (
        experience => experience.by === user._id
      );

      res.json (listFromUser);
    })
    .catch (err => console.log ('from experience.js ' + err));
});

router.post ('/user-likes', (req, res) => {
  const {user} = req.body;

  Experience
    .find ({})
    .sort ({time: -1})
    .then (experiences => {
      const listFromUser = experiences.filter (experience => {
        const found = experience.liked.find (userIds => userIds === user._id);

        if (found) return true;
        else return false;
      });

      res.json (listFromUser);
    })
    .catch (err => console.log ('from ask-something.js ' + err));
});

router.post ('/user-dislikes', (req, res) => {
  const {user} = req.body;

  Experience
    .find ({})
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

router.post ('/time-sort', (req, res) => {
  console.log ('time sort');
  Experience
    .find ({})
    .sort ({time: 1})
    .then (experiences => res.json (experiences))
    .catch (err => console.log ('from ask-something.js ' + err));
});

router.post ('/check', async (req, res) => {
  try {
    const {userId, experienceId} = req.body;

    await Experience
      .findById (experienceId)
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
  try {
    const experience = req.body;
    let user_image = '';
    let user_name = '';

    console.log (experience);
    await user
      .findById (experience.by)
      .then (resp => {
        user_image = resp.imageUrl;
        user_name = resp.name;
      })
      .catch (err => console.log (err));

    const newExperience = await new Experience ({
      title: experience.title,
      experience: experience.experience,
      by: experience.by,
      liked: [],
      disliked: [],
      userName: user_name,
      userImage: user_image,
    });

    await newExperience
      .save ()
      .then (experience => res.json (experience))
      .catch (err => console.log (err));
  } catch (err) {
    console.log ('outside try' + err);
  }
});

router.put ('/addLike', async (req, res) => {
  try {
    const {userId, experienceId} = req.body;
    console.log(userId,experienceId);
    let newListLike, newListDislike;

    await Experience
      .findById (experienceId)
      .then (resp => {
        newListLike = resp.liked.filter (idd => idd !== userId);
        newListDislike = resp.disliked.filter (idd => idd !== userId);
      })
      .catch (err => console.log (err));

    newListLike.push (userId);
    console.log (newListLike);
    console.log (newListDislike);

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
    const {userId, experienceId} = req.body;

    let newListLike, newListDislike;

    await Experience
      .findById (experienceId)
      .then (resp => {
        newListLike = resp.liked.filter (idd => idd !== userId);
        newListDislike = resp.disliked.filter (idd => idd !== userId);
      })
      .catch (err => console.log (err));

    newListDislike.push (userId);
    console.log (newListLike);
    console.log (newListDislike);

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
