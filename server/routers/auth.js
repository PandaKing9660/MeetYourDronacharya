const express = require ('express');
const router = express.Router ();
const User = require ('../models/user');
const bcrypt = require ('bcrypt');

router.use (express.json ());

router.post ('/signup', async (req, res) => {
  try {
    const {email, name, password, imageUrl} = req.body;

    if (!name || !email || !password) {
      return res.send ('Fill All the details');
    }

    const cryptPassword = await bcrypt.hash (password, 10);

    const newUser = new User ({
      email: email,
      name: name,
      password: cryptPassword,
      socialMedia: [],
      imageUrl: imageUrl || `https://robohash.org/${name}`,
    });

    const postResult = await newUser
      .save ()
      .then (result =>
        res.send ({
          msg: 'done',
          found: true,
          user: {
            name: newUser.name,
            _id: newUser._id,
            email: newUser.email,
            socialMedia: newUser.socialMedia,
            imageUrl: newUser.imageUrl,
          },
        })
      )
      .catch (err => {
        res.status (403).send ({msg: 'User Already Exists'});
      });

    console.log (newUser);
  } catch (err) {
    console.log ('err', err);
  }
});

router.post ('/login', async (req, res) => {
  try {
    const {email, password} = req.body;
    console.log ('search start');
    const user = await User.find ({
      email: email,
    });
    if (user.length) {
      if (await bcrypt.compare (password, user[0].password)) {
        res.send ({
          msg: 'User Found',
          found: true,
          user: {
            name: user[0].name,
            _id: user[0]._id,
            email: user[0].email,
            socialMedia: user[0].socialMedia,
            imageUrl: user[0].imageUrl,
          },
        });
      } else {
        res.send ({
          msg: 'Wrong Password',
          found: false,
          user: null,
        });
      }
    } else {
      res.send ({
        msg: 'Invalid Email ID',
        found: false,
        user: null,
      });
    }
  } catch (error) {
    console.log (error);
    res.status (404).send ({
      msg: 'some error',
      found: false,
      user: null,
    });
  }
});

module.exports = router;
