// importing all important files, along with bcrypt for security,
// nodemailer for forget password option
const express = require ('express');
const router = express.Router ();
const User = require ('../models/user');
const bcrypt = require ('bcrypt');
const nodemailer = require ('nodemailer');

let random_OTP = '';

router.use (express.json ());

// for signup
router.post ('/signup', async (req, res) => {
  try {
    const {email, name, password, imageUrl} = req.body;

    if (!name || !email || !password) {
      return res.send ('Fill All the details');
    }

    // using encryption for user's password
    const cryptPassword = await bcrypt.hash (password, 10);

    // creating the user with given information and adding an image if not done already
    const newUser = new User ({
      email: email,
      name: name,
      password: cryptPassword,
      socialMedia: ['', '', '', '', ''],
      imageUrl: imageUrl || `https://robohash.org/${name}`,
      bookmarked: ['F', 'F', 'F', 'F'],
    });

    // saving user into database
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
  } catch (err) {
    console.log ('err', err);
  }
});

// used for the user login
router.post ('/login', async (req, res) => {
  try {
    const {email, password, isGoogle} = req.body;

    // finding the registered email
    const user = await User.find ({
      email: email,
    });

    // checking is email is found or not
    if (user.length) {
      // using decryption to check the password and sending appropriate replies
      if ((await bcrypt.compare (password, user[0].password)) || isGoogle) {
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
    res.status (404).send ({
      msg: 'some error',
      found: false,
      user: null,
    });
  }
});

// random OTP
function makeOTP (length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt (
      Math.floor (Math.random () * charactersLength)
    );
  }
  return result;
}

// incase user forget his/her password
router.post ('/forget-password', async (req, res) => {
  try {
    random_OTP = makeOTP (6);

    // output message
    const output = `
      <p>Hello sir/ma'am,</p>
      <p>Lost your password ? Happens with all of us...</p>

      <p>Please use this code to reset your password</p>
      <p><b>${random_OTP}</b></p>

      <p>Reply us back us if this wasn't you...</p>

      <p>Regards,</p>
      <p>Team MeetYourDronacharya</p>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport ({
      service: 'hotmail',
      auth: {
        user: 'adityabill@outlook.com',
        pass: 'password_my',
      },
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: 'adityabill@outlook.com', // sender address
      to: req.body.email, // list of receivers
      subject: 'Reset password', // Subject line
      text: 'Reset password', // plain text body
      html: output, // html body
    };

    // send mail with defined transport object
    transporter.sendMail (mailOptions, (error, info) => {
      if (error) {
        res.send('Email not found')
        return console.log (error);
      }
      console.log ('Message sent: %s', info.messageId);
      console.log ('Preview URL: %s', nodemailer.getTestMessageUrl (info));
 
      res.render ('contact', {msg: 'Email has been sent'});
    });
  } catch (err) {
    console.log ('Error found : ', err);
  }
});

// verification of password
router.post ('/verify', async (req, res) => {
  try {
    const {OTP, email} = req.body;

    // finding the registered email
    const user = await User.find ({
      email: email,
    });

    // checking is email is found or not
    if (user.length) {
      // checking OTP and random_otp created
      if (OTP === random_OTP) {
        res.send ({
          msg: 'User Found',
          found: true,
        });
      } else {
        res.send ({
          msg: 'Wrong OTP',
          found: false,
        });
      }
    } else {
      res.send ({
        msg: 'Invalid Email ID',
        found: false,
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

router.put ('/reset-password', async (req, res) => {
  try {
    const {email, password} = req.body;

    // finding the registered email
    const user = await User.find ({
      email: email,
    });

    // using encryption for user's password
    const cryptPassword = await bcrypt.hash (password, 10);

    // updating the password
    await User.findByIdAndUpdate (
      user[0]._id,
      {
        password: cryptPassword,
      },
      {new: true},
      (err, result) => {
        if (err) {
          console.log (err);
        } else {
          console.log ('updated', result);
          res.send ({
            msg: 'User Updated',
            found: true,
            user: result,
          });
        }
      }
    );
  } catch (e) {
    console.log (e);
  }
});

module.exports = router;
