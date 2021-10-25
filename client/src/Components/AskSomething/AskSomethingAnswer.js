import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import Grid from '@mui/material/Grid';

import CircularProgress from '@mui/material/CircularProgress';
import NavBar from '../Home/Navbar/Navbar';

import CardAnswer from './CardAnswer';
import CardQuestion from './CardQuestion';

const AskSomethingAnswer = () => {
  // dummy data for experience posts
  const [answers, setAnswers] = useState ([]);
  const [question, setQuestion] = useState ([]);

  const [loading, setLoading] = useState (true);

  useEffect (() => {
    setLoading (true);

    axios
      .post (`${process.env.BACKEND_URL}/ask-something/answer/reverse-time-sort`, {
        questionId: '6174fa382428990c19243930',
      })
      .then (res => {
        setAnswers (res.data);
      })
      .catch (err => console.log (err));

    axios
      .post (`${process.env.BACKEND_URL}/ask-something/question/find-by-id`, {
        questionId: '6174fa382428990c19243930',
      })
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
              {console.log (question)}
              <CardQuestion quesData={question[0]} />

              <Grid
                container
                // spacing={{ xs: 2, md: 3 }}
                columns={{xs: 4, sm: 8, md: 2}}
                justifyContent="flex-start"
                alignItems="center"
              >
                {answers.map (answer => {
                  return (
                    <Grid item xs={12} md={6} key={answer._id}>
                      <CardAnswer ansData={answer} />
                    </Grid>
                  );
                })}
              </Grid>
            </div>}

      </Box>
    </div>
  );
};

export default AskSomethingAnswer;
