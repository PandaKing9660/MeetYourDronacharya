// importing all the necessary files for backend implementation

const express = require ('express');
const app = express ();
const cors = require ('cors');
const mongoose = require ('mongoose');
const body_parser = require ('body-parser');
const dotenv = require ('dotenv');

dotenv.config ();

// for deployment
const PORT = process.env.PORT || 3001;

// using body-parser to parse the data
app.use (body_parser.json ());
app.use (body_parser.urlencoded ());
app.use (cors ());

// importing all the routers
const askSomethingQuestionRouter = require ('./routers/askSomethingQuestion');
const askSomethingAnswerRouter = require ('./routers/askSomethingAnswer');
const experienceRouter = require ('./routers/experience');
const studyMaterialRouter = require ('./routers/studyMaterial');
const dashboardRouter = require ('./routers/dashboard');
const authRouter = require ('./routers/auth');

// adding routes for each of them, it will work relatively
app.use ('/ask-something/question', askSomethingQuestionRouter);
app.use ('/ask-something/answer', askSomethingAnswerRouter);
app.use ('/experience', experienceRouter);
app.use ('/study-material', studyMaterialRouter);
app.use ('/dashboard', dashboardRouter);
app.use ('/', authRouter);

// mongodb URL
const CONNECTION_URL =
  'mongodb+srv://MeetYourDronacharya:MeetYourDronacharya@cluster0.twf3b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

// connecting to mongodb database and starting server
mongoose
  .connect (CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then (() => {
    console.log ('connected to mongo_db');
    app.listen (PORT, () => console.log (`Server Running on Port: ${PORT}`));
  })
  .catch (error => console.log (`${error} did not connect`));
