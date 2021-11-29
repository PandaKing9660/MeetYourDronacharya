import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import CardExperience from '../Experience/CardExperience';
import {useParams} from 'react-router';
import Typography from '@mui/material/Typography';
import NavBar from '../Home/Navbar/Navbar';
//the experiences user shared
const UserExperience = () => {
  const {userId} = useParams ();

  const [experiences, setExperiences] = useState ([]);

  const [loading, setLoading] = useState (false);
  const [userMsg, setUserMsg] = useState ('');
  const [searchedExperience, setSearchedExperience] = useState ([]);
  const [searchResult, setSearchResult] = useState ('');

  useEffect (() => {
    console.log (userId);
    setLoading (true);
    axios
      .post (`${process.env.REACT_APP_BACKEND_URL}/dashboard/user-experience`, {
        userId,
      })
      .then (res => {
        setLoading (false);
        console.log (res.data.length);
        if (res.data.length === 0) {
          setUserMsg ('No experiences yet');
        } else if (res.data[0] === -1) setUserMsg ('No User Found');
        else {
          console.log (res.data);
          setExperiences (res.data);
          setSearchedExperience (res.data);
        }
      })
      .catch (err => console.log (err));
  }, []);
  useEffect (
    () => {
      const newSearchedExperience = experiences.filter (experience => {
        if (
          experience.title.toLowerCase ().includes (searchResult.toLowerCase ())
        )
          return true;
        if (
          experience.experience
            .toLowerCase ()
            .includes (searchResult.toLowerCase ())
        )
          return true;
        if (
          experience.userName
            .toLowerCase ()
            .includes (searchResult.toLowerCase ())
        )
          return true;

        const res = experience.tags.filter (tag => {
          return tag.toLowerCase ().includes (searchResult.toLowerCase ());
        });

        if (res.length) return true;

        return false;
      });
      console.log (newSearchedExperience);
      setSearchedExperience (newSearchedExperience);
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
        Experience
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
              : searchedExperience.length > 0
                  ? <Grid
                      container
                      // spacing={{ xs: 2, md: 3 }}
                      columns={{xs: 4, sm: 8, md: 2}}
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      {searchedExperience.map (experience => {
                        return (
                          <Grid item xs={12} md={6} key={experience._id}>
                            <CardExperience expData={experience} />
                          </Grid>
                        );
                      })}
                    </Grid>
                  : <Typography
                      sx={{mb: 1.5, fontSize: '0.91rem'}}
                      color="text.secondary"
                    >
                      No Experience
                    </Typography>}
      </Box>
    </div>
  );
};

export default UserExperience;
