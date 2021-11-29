import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import {Grid, Divider, Typography, Button} from '@mui/material';

import CircularProgress from '@mui/material/CircularProgress';
import NavBar from '../Home/Navbar/Navbar';

import CardAnswer from './CardAnswer';
import CardQuestion from './CardQuestion';
import {useParams} from 'react-router-dom';

const AskSomethingAnswer = () => {
  // dummy data for experience posts
  const [answers, setAnswers] = useState ([]);
  const [question, setQuestion] = useState ([]);

  const [loading, setLoading] = useState (true);
  const [searchResult, setSearchResult] = useState ('');
  const [searchedAnswer, setSearchedAnswer] = useState ([]);
  const [showSpam, setShowSpam] = useState (false);
  const [spamAnswers, setSpamAnswers] = useState ([]);

  // finding id in the url
  const {question_id} = useParams ();

  // handling spam report
  const handleSpamChange = () => {
    setShowSpam (!showSpam);
    setLoading (true);
    setTimeout (() => {
      setLoading (false);
    }, 1000);
  };

  // sorts answers in reverse time order
  useEffect (() => {
    setLoading (true);

    axios
      .post (
        `${process.env.REACT_APP_BACKEND_URL}/ask-something/answer/reverse-time-sort`,
        {
          questionId: question_id,
        }
      )
      .then (res => {
        let good_answers = [];
        let bad_answers = [];

        res.data.forEach (ele => {
          if (ele.isSpam) {
            bad_answers.push (ele);
          } else {
            good_answers.push (ele);
          }
        });

        setAnswers (good_answers);
        setSearchedAnswer (good_answers);
        setSpamAnswers (bad_answers);
      })
      .catch (err => console.log (err));

    axios
      .post (
        `${process.env.REACT_APP_BACKEND_URL}/ask-something/question/find-by-id`,
        {
          questionId: question_id,
        }
      )
      .then (res => {
        setQuestion (res.data);
      });
    setTimeout (() => {
      setLoading (false);
    }, 2000);
  }, []);

  useEffect (
    () => {
      if (showSpam === false) {
        const newSearchedAnswer = answers.filter (answer => {
          if (
            answer.title.toLowerCase ().includes (searchResult.toLowerCase ())
          )
            return true;
          if (
            answer.answer.toLowerCase ().includes (searchResult.toLowerCase ())
          )
            return true;
          if (
            answer.userName
              .toLowerCase ()
              .includes (searchResult.toLowerCase ())
          )
            return true;

          const res = answer.tags.filter (tag => {
            return tag.toLowerCase ().includes (searchResult.toLowerCase ());
          });

          if (res.length) return true;

          return false;
        });
        setSearchedAnswer (newSearchedAnswer);
      } else {
        const newSearchedAnswer = spamAnswers.filter (answer => {
          if (
            answer.title.toLowerCase ().includes (searchResult.toLowerCase ())
          )
            return true;
          if (
            answer.answer.toLowerCase ().includes (searchResult.toLowerCase ())
          )
            return true;
          if (
            answer.userName
              .toLowerCase ()
              .includes (searchResult.toLowerCase ())
          )
            return true;

          const res = answer.tags.filter (tag => {
            return tag.toLowerCase ().includes (searchResult.toLowerCase ());
          });

          if (res.length) return true;

          return false;
        });
        setSearchedAnswer (newSearchedAnswer);
      }
    },
    [searchResult, showSpam, answers, spamAnswers]
  );

  return (
    <div>
      <NavBar setSearchResult={setSearchResult} />

      <Box sx={{flexGrow: 1}} m={1} p={1} mt={2}>
        {loading
          ? <CircularProgress />
          : <div>
              <Grid
                container
                p={1}
                direction="row"
                rowSpacing={{xs: 1}}
                justifyContent="space-around"
              >
                <Grid
                  item
                  xs={12}
                  md={6}
                  style={{
                    boxShadow: '5px 10px 8px 1px #888888',
                  }}
                >
                  {/* Can see all the answers and also checks for spam */}
                  <Typography variant="h4" align="center">
                    Answers
                  </Typography>
                  {searchedAnswer.length > 0
                    ? showSpam
                        ? <div>
                            <Button
                              variant="contained"
                              style={{margin: '2%'}}
                              onClick={handleSpamChange}
                            >
                              Answers
                            </Button>
                            <Grid
                              container
                              columns={{xs: 4, sm: 8, md: 2}}
                              justifyContent="flex-start"
                              alignItems="center"
                              style={{
                                overflow: 'auto',
                                height: '580px',
                                // boxShadow: '5px 10px 8px 1px #888888',
                              }}
                            >
                              {searchedAnswer.map (answer => {
                                return (
                                  <Grid item xs={12} md={6} key={answer._id}>
                                    <CardAnswer
                                      ansData={answer}
                                      questionId={question_id}
                                    />
                                  </Grid>
                                );
                              })}
                            </Grid>
                          </div>
                        : <div>
                            {/* Button to check the spam answers in that question */}
                            <Button
                              variant="contained"
                              style={{margin: '2%'}}
                              onClick={handleSpamChange}
                            >
                              Spam
                            </Button>
                            <Grid
                              container
                              columns={{xs: 4, sm: 8, md: 2}}
                              justifyContent="flex-start"
                              alignItems="center"
                              style={{
                                overflow: 'auto',
                                height: '580px',
                                // boxShadow: '5px 10px 8px 1px #888888',
                              }}
                            >
                              {searchedAnswer.map (answer => {
                                return (
                                  <Grid item xs={12} md={6} key={answer._id}>
                                    <CardAnswer
                                      ansData={answer}
                                      questionId={question_id}
                                    />
                                  </Grid>
                                );
                              })}
                            </Grid>
                          </div>
                    : <Typography variant="h6" align="center">
                        No Answers yet!!
                      </Typography>}
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  style={{
                    overflow: 'auto',
                  }}
                >
                  <Typography variant="h4" align="center">
                    Question
                  </Typography>
                  <Divider variant="middle" />
                  <CardQuestion quesData={question[0]} showAnswer={false} />
                  <Divider variant="middle" />
                </Grid>
              </Grid>
            </div>}
      </Box>
    </div>
  );
};

export default AskSomethingAnswer;
