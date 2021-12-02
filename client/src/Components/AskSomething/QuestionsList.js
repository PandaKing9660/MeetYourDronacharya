import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";

import CardQuestion from "./CardQuestion";
import { Button, Typography } from "@mui/material";

const QuestionsList = ({ searchResult, setSearchResult }) => {
  // initialising data for Question posts
  const [questions, setQuestions] = useState([
    {
      title: "",
      question: "",
      by: "",
      time: "",
      answers: [],
      liked: [],
      disliked: [],
      userName: "",
      userImage: "",
    },
  ]);
  // initialising spam questions
  const [spamQuestions, setSpamQuestions] = useState([
    {
      title: "",
      question: "",
      by: "",
      time: "",
      answers: [],
      liked: [],
      disliked: [],
      userName: "",
      userImage: "",
    },
  ]);

  const [showSpam, setShowSpam] = useState(false);

  const [order, setOrder] = useState("reverse-time-sort");
  const [loading, setLoading] = useState(false);
  const [searchedQuestion, setSearchedQuestion] = useState([]);

  const user = JSON.parse(localStorage.getItem("profile"));

  const handleSpamChange = () => {
    setShowSpam(!showSpam);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  //retrieving questions from backend
  useEffect(() => {
    setLoading(true);

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/ask-something/question/${order}`,
        { user }
      )
      .then((res) => {
        let good_questions = [];
        let bad_questions = [];

        // Separating spam and non-spam questions
        res.data.forEach((ele) => {
          if (ele.isSpam) {
            bad_questions.push(ele);
          } else {
            good_questions.push(ele);
          }
        });

        setQuestions(good_questions);
        setSearchedQuestion(good_questions);
        setSpamQuestions(bad_questions);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [order]);

  useEffect(() => {
    // Searching words taken as input in Search Box in the whole webpage.
    if (showSpam === false) {
      const newSearchedQuestion = questions.filter((question) => {
        // Searching word in title
        if (question.title.toLowerCase().includes(searchResult.toLowerCase()))
          return true;
        // Searching word in questions
        if (
          question.question.toLowerCase().includes(searchResult.toLowerCase())
        )
          return true;
        // Searching word in username
        if (
          question.userName.toLowerCase().includes(searchResult.toLowerCase())
        )
          return true;
        // Searching word in tags
        const res = question.tags.filter((tag) => {
          return tag.toLowerCase().includes(searchResult.toLowerCase());
        });

        if (res.length) return true;

        return false;
      });

      // Setting searched/matched questions
      setSearchedQuestion(newSearchedQuestion);
    } else {
      // Searching in spam questions too.
      const newSearchedQuestion = spamQuestions.filter((question) => {
        if (question.title.toLowerCase().includes(searchResult.toLowerCase()))
          return true;
        if (
          question.question.toLowerCase().includes(searchResult.toLowerCase())
        )
          return true;
        if (
          question.userName.toLowerCase().includes(searchResult.toLowerCase())
        )
          return true;

        const res = question.tags.filter((tag) => {
          return tag.toLowerCase().includes(searchResult.toLowerCase());
        });

        if (res.length) return true;

        return false;
      });

      setSearchedQuestion(newSearchedQuestion);
    }
  }, [searchResult, showSpam, spamQuestions, questions]);

  // Checking logged in or not.
  const handleChange = (event) => {
    if (event.target.value.includes("user") && !user) {
      alert("Login to use this feature");
    } else {
      setOrder(event.target.value);
    }
  };

  // Questions List
  return (
    <Box sx={{ flexGrow: 1 }} m={1} p={1} mt={2}>
      <Box sx={{ minWidth: 150, textAlign: "start" }}>
        {/* Form control for selecting some questions to display */}
        <FormControl style={{ minWidth: 140, marginLeft: "1.9%" }}>
          <InputLabel id="demo-simple-select-label">Order</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={order}
            label="order"
            onChange={handleChange}
          >
            <MenuItem selected value={"reverse-time-sort"}>
              Recently Added
            </MenuItem>
            <MenuItem value={"user-list"}>Added by you</MenuItem>
            <MenuItem value={"user-likes"}>Liked by you</MenuItem>
            <MenuItem value={"user-dislikes"}>Disliked by you</MenuItem>
            <MenuItem value={"time-sort"}>Last Added</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* loop over Questions array and pass data to CardQuestion component for rendering children */}

      {/* loading till rendered */}
      {loading ? (
        <CircularProgress />
      ) : searchedQuestion.length > 0 ? (
        showSpam ? ( // If selected to show spam questions.
          <div>
            <div>
              <Button
                variant="contained"
                style={{ margin: "1.7%" }}
                onClick={handleSpamChange}
              >
                Questions
              </Button>
              <Grid
                container
                columns={{ xs: 4, sm: 8, md: 2 }}
                justifyContent="flex-start"
                alignItems="center"
              >
                {/* Looping to display questions.  */}
                {searchedQuestion.map((question) => {
                  return (
                    <Grid item xs={12} md={6} key={question._id}>
                      <CardQuestion quesData={question} showAnswer={true} />
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </div>
        ) : (
          // Show non-spam questions
          <div>
            <Button
              variant="contained"
              style={{ margin: "1.7%" }}
              onClick={handleSpamChange}
            >
              Spam
            </Button>
            <Grid
              container
              columns={{ xs: 4, sm: 8, md: 2 }}
              justifyContent="flex-start"
              alignItems="center"
            >
              {/* Looping questions  */}
              {searchedQuestion.map((question) => {
                return (
                  <Grid item xs={12} md={6} key={question._id}>
                    <CardQuestion quesData={question} showAnswer={true} />
                  </Grid>
                );
              })}
            </Grid>
          </div>
        )
      ) : (
        // If no spam questions are there
        <Typography variant="h4" align="center" mt={6}>No Spam !!!</Typography>
      )}
    </Box>
  );
};

export default QuestionsList;
