import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import {Grid, Divider, Typography} from '@mui/material';

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

  // finding id in the url
  const {question_id} = useParams ();


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
        setAnswers (res.data);
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

        console.log (question);
      });
    setTimeout (() => {
      setLoading (false);
    }, 2000);
  }, []);

  return (
    <div>
      <NavBar />

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
                <Grid item xs={12} md={6} style={{overflow: 'auto'}}>
                  <Typography variant="h4" align="center">
                      Question
                    </Typography>
                  <CardQuestion quesData={question[0]} showAnswer={false}/>
                  <Divider variant="middle" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h4" align="center">
                      Answers
                    </Typography>
                  <Grid
                    container
                    columns={{xs: 4, sm: 8, md: 2}}
                    justifyContent="flex-start"
                    alignItems="center"
                    style={{overflow: 'auto', height: '580px'}}
                  >
                    {answers.map (answer => {
                      return (
                        <Grid item xs={12} md={6} key={answer._id}>
                          <CardAnswer ansData={answer} />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              </Grid>
            </div>}
      </Box>
    </div>
  );
};

export default AskSomethingAnswer;
