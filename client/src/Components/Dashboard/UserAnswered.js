import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import CardAnswer from '../AskSomething/CardAnswer';
import {useParams} from 'react-router';
import Typography from '@mui/material/Typography';
import NavBar from '../Home/Navbar/Navbar';
//the answers user answered
const UserAnswered = () => {
  const {userId} = useParams ();

  const [answers, setAnswers] = useState ([]);

  const [loading, setLoading] = useState (false);
  const [userMsg, setUserMsg] = useState ('');
  const [searchResult, setSearchResult] = useState ('');
  const [searchedAnswer, setSearchedAnswer] = useState ([]);

  useEffect (() => {
    console.log (userId);
    setLoading (true);

    axios
      .post (`${process.env.REACT_APP_BACKEND_URL}/dashboard/user-answer`, {
        userId,
      })
      .then (res => {
        setLoading (false);
        console.log (res.data.length);
        if (res.data.length === 0) {
          setUserMsg ('No Answers yet');
        } else if (res.data[0] === -1) setUserMsg ('No User Found');
        else {
          setAnswers (res.data);
          setSearchedAnswer (res.data);
        }
      })
      .catch (err => console.log (err));
  }, []);

  useEffect (
    () => {
      const newSearchedAnswer = answers.filter (answer => {
        if (answer.title.toLowerCase ().includes (searchResult.toLowerCase ()))
          return true;
        if (answer.answer.toLowerCase ().includes (searchResult.toLowerCase ()))
          return true;
        if (
          answer.userName.toLowerCase ().includes (searchResult.toLowerCase ())
        )
          return true;

        const res = answer.tags.filter (tag => {
          return tag.toLowerCase ().includes (searchResult.toLowerCase ());
        });

        if (res.length) return true;

        return false;
      });
      console.log (newSearchedAnswer);
      setSearchedAnswer (newSearchedAnswer);
    },
    [searchResult]
  );

  return (
    <div>
      <NavBar setSearchResult={setSearchResult} />
      <h1
        className="heading"
        style={{marginTop: 25, marginBottom: 10, textAlign: 'center'}}
      >
        Answers
      </h1>
      <Box sx={{flexGrow: 1}} m={1} p={1} mt={2}>
        {/* loop over experiences array and pass data to CardExperience component for rendering children */}

        {loading
          ? <CircularProgress />
          : userMsg
              ? <Typography
                  sx={{mb: 1.5, fontSize: '0.91rem'}}
                  color="text.secondary"
                >
                  {userMsg}
                </Typography>
              : searchedAnswer.length > 0
                  ? <Grid
                      container
                      // spacing={{ xs: 2, md: 3 }}
                      columns={{xs: 4, sm: 8, md: 2}}
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      {searchedAnswer.map (answer => {
                        return (
                          <Grid item xs={12} md={6} key={answer._id}>
                            <CardAnswer ansData={answer} />
                          </Grid>
                        );
                      })}
                    </Grid>
                  : <Typography
                      sx={{mb: 1.5, fontSize: '0.91rem'}}
                      color="text.secondary"
                    >
                      No Answers Found
                    </Typography>}
      </Box>
    </div>
  );
};

export default UserAnswered;
