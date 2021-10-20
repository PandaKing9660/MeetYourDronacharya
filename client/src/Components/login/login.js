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
import {GoogleLogin} from 'react-google-login';
import Icon from './icon';

import axios from 'axios';
import './login.css';

const googleSuccess = async res => {
  const userData = res?.profileObj;
  console.log (userData);

  localStorage.setItem('profile', JSON.stringify({...userData, socialMedia: []}));
  console.log(JSON.parse(localStorage.getItem('profile')));
};

const googleError = () =>
  alert ('Google Sign In was unsuccessful. Try again later');

const Login = () => {
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');

  const handleSubmit = event => {
    event.preventDefault ();
    if (email === '' || password === '') {
      // inform to fill form
      alert ('Please fill all credentials');
    } else {
      // backend call
      axios
        .post ('http://localhost:3001/login', {email, password})
        .then (res => {
          if (res.data.found === true) {
            // TODO: to improve this
            console.log (res.data.user);
            sessionStorage.setItem ('user', JSON.stringify (res.data.user));
          } else {
            console.log ('something wrong');
          }
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
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="button-block"
                      >
                        Submit
                      </Button>
                    </Grid>
                    <Grid item>
                      <GoogleLogin
                        clientId="509042475407-tbckpsecdrm3tpqpe9hbusmef2t7vr3c.apps.googleusercontent.com"
                        render={renderProps => (
                          <Button
                            color="primary"
                            fullWidth
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            startIcon={<Icon />}
                            variant="contained"
                          >
                            Google Sign In
                          </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                      />
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  Forgot Password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  Sign up
                </Link>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default Login;
