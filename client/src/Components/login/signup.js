import React from 'react';
import {useState} from 'react';
import {
  Button,
  TextField,
  Grid,
  Paper,
  AppBar,
  Typography,
  Toolbar,
  Link,
} from '@material-ui/core';
import axios from 'axios';
import './login.css';

const Signup = () => {
  const [name, setName] = useState ('');
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const [confirmPassword, setConfirmPassword] = useState ('');

  const handleSubmit = event => {
    event.preventDefault ();

    console.log (name, password, email);
    if (password !== confirmPassword) {
      // inform to fill form
      alert ('Please check password');
    } else {
      // backend call
      axios
        .post ('http://localhost:3001/signup', {name, email, password})
        .then (res => {
          console.log ('hello');
          if (res.data === 'done') console.log ('Registered');
          else {
            alert ('something wrong');
          }
        })
        .catch (err => {
          console.log (err);
        });
    }
  };
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
                  Sign in
                </Typography>
              </Grid>
              <Grid item>
                <form onSubmit={handleSubmit}>
                  <Grid container direction="column" spacing={2}>

                    <Grid item>
                      <TextField
                        type="text"
                        placeholder="First Name"
                        fullWidth
                        name="Name"
                        variant="outlined"
                        value={name}
                        onChange={event => setName (event.target.value)}
                        required
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        type="email"
                        placeholder="Email"
                        fullWidth
                        name="username"
                        variant="outlined"
                        value={email}
                        onChange={event => setEmail (event.target.value)}
                        required
                        autoFocus
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        type="password"
                        placeholder="Password"
                        fullWidth
                        name="password"
                        variant="outlined"
                        value={password}
                        onChange={event => setPassword (event.target.value)}
                        required
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        type="password"
                        placeholder="Confirm Password"
                        fullWidth
                        name="confirmPassword"
                        variant="outlined"
                        value={confirmPassword}
                        onChange={event =>
                          setConfirmPassword (event.target.value)}
                        required
                      />
                    </Grid>

                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="button-block"
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    </Grid>

                  </Grid>
                </form>
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  Login ?
                </Link>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default Signup;
