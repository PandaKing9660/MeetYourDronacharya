const cors = require('cors');
const express = require('express');
const body_parser = require('body-parser');
const mongoose = require('mongoose');

const app = express ();

const PORT = process.env.PORT || 3001;

app.use (body_parser.json ());
app.use (body_parser.urlencoded ());
app.use (cors ());

const askSomethingRouter = require ('./routers/askSomething');
const experienceRouter = require ('./routers/experience');
const studyMaterialRouter = require ('./routers/studyMaterial');
const dashboardRouter = require ('./routers/dashboard');

const CONNECTION_URL =
  'mongodb+srv://MeetYourDronacharya:MeetYourDronacharya@cluster0.twf3b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

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
