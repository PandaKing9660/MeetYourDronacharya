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

const QuestionsList = () => {
  // dummy data for experience posts
  const [questions, setQuestions] = useState ([]);
  const [order, setOrder] = useState ('reverse-time-sort');
  const [loading, setLoading] = useState (false);
  const user = JSON.parse (localStorage.getItem ('profile'));

  useEffect (
    () => {
      setLoading (true);

      axios
        .post (`http://localhost:3001/ask-something/question/${order}`, {user})
        .then (res => {
          setQuestions (res.data);
          setLoading (false);
          console.log (res.data[0]);
        })
        .catch (err => console.log (err));
    },
    [order]
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
        <FormControl style={{minWidth: 140}}>
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
            <MenuItem value={'user-dislikes'}>Disliked by you</MenuItem>
            <MenuItem value={'time-sort'}>Last Added</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* loop over experiences array and pass data to CardExperience component for rendering children */}

      {loading
        ? <CircularProgress />
        : <Grid
            container
            // spacing={{ xs: 2, md: 3 }}
            columns={{xs: 4, sm: 8, md: 12}}
            justifyContent="flex-start"
            alignItems="center"
          >
            {questions.map ((question) => {
              return (
                <Grid item xs={12} md={6} key={question._id}>
                  <CardQuestion quesData={question} />
                </Grid>
              );
            })}
          </Grid>}

    </Box>
  );
};

export default QuestionsList;
