// importing all the needed files
import React from 'react';
import {useState, useEffect} from 'react';
import {
  Button,
  TextField,
  Grid,
  Paper,
  AppBar,
  Typography,
  Toolbar,
} from '@material-ui/core';
import axios from 'axios';
import './login.css';
import {useParams} from 'react-router-dom';


const Verify = () => {
  const [OTP, setOTP] = useState ('');
  // finding email in the url
  const {email} = useParams ();


  useEffect (() => {
    if (!email) window.location = process.env.REACT_APP_FRONTEND_URL;
  }, []);

  const handleSubmit = event => {
    event.preventDefault ();

    if (OTP === '') {
      // inform to fill form
      alert ('Please fill OTP');
    } else {
      // backend call and showing replies
      axios
        .post (`${process.env.REACT_APP_BACKEND_URL}/verify`, {OTP, email})
        .then (res => {
          if (res.data.found === true) {
            window.location =
              process.env.REACT_APP_FRONTEND_URL + '/reset-password/' + email;
          } else {
            alert (res.data.msg);
          }
        });
    }
  };

  // OTP Verification
  return (
    <div>
      <AppBar position="static" alignitems="center" color="primary">
        <Toolbar>
          <Grid container justify="center" wrap="wrap">
            <Grid item>
              <Typography variant="h6">Meet Your Dronacharya</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container spacing={0} justify="center" direction="row">
        <Grid item>
          <Grid
            container
            direction="column"
            justify="center"
            spacing={2}
            className="login-form"
          >
            <Paper
              variant="elevation"
              elevation={2}
              className="login-background"
            >
              <Grid item>
                <Typography component="h1" variant="h5">
                  OTP Verification
                </Typography>

              </Grid>
              <Typography>
                You would have received an OTP on this
                {' '}
                {email}
                , fill the OTP shared
              </Typography>
              {/* OTP input */}
              <Grid item>
                <form onSubmit={handleSubmit} autocomplete="off">
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <TextField
                        type="text"
                        placeholder="OTP"
                        fullWidth
                        variant="outlined"
                        value={OTP}
                        onChange={event => setOTP (event.target.value)}
                        required
                        autoFocus
                      />
                    </Grid>
                    {/* Submit Button */}
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="button-block"
                      >
                        Submit
                      </Button>
                    </Grid>

                  </Grid>
                </form>
              </Grid>

            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default Verify;
