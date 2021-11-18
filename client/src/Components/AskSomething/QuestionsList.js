import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';

import CardQuestion from './CardQuestion';
import {Typography} from '@mui/material';

const QuestionsList = ({searchResult, setSearchResult}) => {
  // dummy data for Question posts
  const [questions, setQuestions] = useState ([
    {
      title: '',
      question: '',
      by: '',
      time: '',
      answers: [],
      liked: [],
      disliked: [],
      userName: '',
      userImage: '',
    },
  ]);
  const [order, setOrder] = useState ('reverse-time-sort');
  const [loading, setLoading] = useState (false);
  const [searchedQuestion, setSearchedQuestion] = useState ([]);

  const user = JSON.parse (localStorage.getItem ('profile'));

  useEffect (
    () => {
      setLoading (true);

      axios
        .post (
          `${process.env.REACT_APP_BACKEND_URL}/ask-something/question/${order}`,
          {user}
        )
        .then (res => {
          setQuestions (res.data);
          setSearchedQuestion (res.data);
          setLoading (false);
          console.log (res.data[0]);
        })
        .catch (err => console.log (err));
    },
    [order]
  );

  useEffect (
    () => {
      const newSearchedQuestion = questions.filter (question => {
        if (
          question.title.toLowerCase ().includes (searchResult.toLowerCase ())
        )
          return true;
        if (
          question.question
            .toLowerCase ()
            .includes (searchResult.toLowerCase ())
        )
          return true;
        if (
          question.userName
            .toLowerCase ()
            .includes (searchResult.toLowerCase ())
        )
          return true;

        const res = question.tags.filter (tag => {
          return tag.toLowerCase ().includes (searchResult.toLowerCase ());
        });

        if (res.length) return true;

        return false;
      });
      console.log (newSearchedQuestion);
      setSearchedQuestion (newSearchedQuestion);
    },
    [searchResult]
  );

  const handleChange = event => {
    if (event.target.value.includes ('user') && !user) {
      alert ('Login to use this feature');
    } else {
      setOrder (event.target.value);
    }
  };

  return (
    <Box sx={{flexGrow: 1}} m={1} p={1} mt={2}>
      <Box sx={{minWidth: 150, textAlign: 'start'}}>
        <FormControl style={{minWidth: 140, marginLeft: '1.9%'}}>
          <InputLabel id="demo-simple-select-label">Order</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={order}
            label="order"
            onChange={handleChange}
          >
            <MenuItem selected value={'reverse-time-sort'}>
              Recently Added
            </MenuItem>
            <MenuItem value={'user-list'}>Added by you</MenuItem>
            <MenuItem value={'user-likes'}>Liked by you</MenuItem>
            <MenuItem value={'user-dislikes'}>
              Disliked by you
            </MenuItem>
            <MenuItem value={'time-sort'}>Last Added</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* loop over Questions array and pass data to CardQuestion component for rendering children */}

      {loading
        ? <CircularProgress />
        : searchedQuestion.length > 0
            ? <Grid
                container
                // spacing={{ xs: 2, md: 3 }}
                columns={{xs: 4, sm: 8, md: 2}}
                justifyContent="flex-start"
                alignItems="center"
              >
                {searchedQuestion.map (question => {
                  return (
                    <Grid item xs={12} md={6} key={question._id}>
                      <CardQuestion quesData={question} showAnswer={true} />
                    </Grid>
                  );
                })}
              </Grid>
            : <Typography variant="h4">
                No Questions !!
              </Typography>}
    </Box>
  );
};

export default QuestionsList;
