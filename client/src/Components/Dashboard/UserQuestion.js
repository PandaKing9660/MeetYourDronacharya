import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import CardQuestion from '../AskSomething/CardQuestion';
import {useParams} from 'react-router';
import Typography from '@mui/material/Typography';
import NavBar from '../Home/Navbar/Navbar';
//the questions user asked
const UserQuestion = () => {
  const {userId} = useParams ();

  const [questions, setQuestions] = useState ([]);

  const [loading, setLoading] = useState (false);
  const [userMsg, setUserMsg] = useState ('');
  const [searchedQuestion, setSearchedQuestion] = useState ([]);
  const [searchResult, setSearchResult] = useState ('');

  useEffect (() => {
    console.log (userId);
    setLoading (true);

    axios
      .post (`${process.env.REACT_APP_BACKEND_URL}/dashboard/user-question`, {
        userId,
      })
      .then (res => {
        setLoading (false);
        console.log (res.data.length);
        if (res.data.length === 0) {
          setUserMsg ('No questions yet');
        } else if (res.data[0] === -1) setUserMsg ('No User Found');
        else {
          setQuestions (res.data);
          setSearchedQuestion (res.data);
        }
      })
      .catch (err => console.log (err));
  }, []);

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

  return (
    <div>
      <NavBar setSearchResult={setSearchResult} />
      <h1
        className="heading"
        style={{marginTop: 25, marginBottom: 10, textAlign: 'center'}}
      >
        Questions
      </h1>
      <Box sx={{flexGrow: 1}} m={1} p={1} mt={2}>

        {/* loop over questions array and pass data to CardExperience component for rendering children */}

        {loading
          ? <CircularProgress />
          : userMsg
              ? <Typography
                  sx={{mb: 1.5, fontSize: '0.91rem'}}
                  color="text.secondary"
                >
                  {userMsg}
                </Typography>
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
                            <CardQuestion
                              quesData={question}
                              showAnswer={true}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  : <Typography
                      sx={{mb: 1.5, fontSize: '0.91rem'}}
                      color="text.secondary"
                    >
                      No Questions
                    </Typography>}
      </Box>
    </div>
  );
};

export default UserQuestion;
