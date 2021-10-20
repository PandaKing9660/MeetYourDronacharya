const express = require ('express');
const app = express ();
const cors = require ('cors');
const mongoose = require ('mongoose');
const body_parser = require ('body-parser');
const bcrypt = require ('bcrypt');

const PORT = process.env.PORT || 3001;

app.use (body_parser.json ());
app.use (body_parser.urlencoded ());
app.use (cors ());

const askSomethingRouter = require ('./routers/askSomething');
const experienceRouter = require ('./routers/experience');
const studyMaterialRouter = require ('./routers/studyMaterial');
const dashboardRouter = require ('./routers/dashboard');

app.use ('/ask-something', askSomethingRouter);
app.use ('/experience', experienceRouter);
app.use ('/study-material', studyMaterialRouter);
app.use ('/dashboard', dashboardRouter);

const User = require ('./models/user');
const CONNECTION_URL =
  'mongodb+srv://MeetYourDronacharya:MeetYourDronacharya@cluster0.twf3b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

app.post ('/signup', async (req, res) => {
  try {
    const {email, name, password} = req.body;
    console.log (email, name, password);
    if (!name || !email || !password) {
      return res.send ('Fill All the details');
    }

    const cryptPassword = await bcrypt.hash (password, 10);

    const newUser = await new User ({
      email: email,
      name: name,
      password: cryptPassword,
      socialMedia: [],
      imageUrl: `https://robohash.org/${name}`,
    });
    console.log (newUser);

    await newUser.save ().then (result => console.log (result)).catch (err => {
      console.log (err);
      res.status (400).send ('User Already Exists');
    });
    console.log (newUser);
  } catch (err) {
    console.log ('err');
  }
  res.send ('done');
});

app.post ('/login', async (req, res) => {
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

mongoose.connect (
  CONNECTION_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log ('connected to mongo_db');
    app.listen (PORT, () => console.log (`server running on port ${PORT}`));
  }
);
