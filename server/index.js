const express = require ('express');
const app = express ();
const cors = require ('cors');
const mongoose = require ('mongoose');
const body_parser = require ('body-parser');

const PORT = process.env.PORT || 3001;

app.use (body_parser.json ());
app.use (body_parser.urlencoded ());
app.use (cors ());

const askSomethingQuestionRouter = require ('./routers/askSomethingQuestion');
const askSomethingAnswerRouter = require ('./routers/askSomethingAnswer');

const experienceRouter = require ('./routers/experience');
const studyMaterialRouter = require ('./routers/studyMaterial');
const dashboardRouter = require ('./routers/dashboard');
const authRouter = require ('./routers/auth');

app.use ('/ask-something/question', askSomethingQuestionRouter);
app.use ('/ask-something/answer', askSomethingAnswerRouter);

app.use ('/experience', experienceRouter);
app.use ('/study-material', studyMaterialRouter);
app.use ('/dashboard', dashboardRouter);
app.use ('/', authRouter);

// const CONNECTION_URL =
//   'mongodb+srv://MeetYourDronacharya:MeetYourDronacharya@cluster0.twf3b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose
  .connect (process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then (() => {
    console.log ('connected to mongo_db');
    app.listen (PORT, () =>
      console.log (`Server Running on Port: http://localhost:${PORT}`)
    );
  })
  .catch (error => console.log (`${error} did not connect`));
