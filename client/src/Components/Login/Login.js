// importing all the needed files
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
  Tooltip,
  IconButton
} from '@material-ui/core';
import {GoogleLogin} from 'react-google-login';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Icon from './Icon';
import axios from 'axios';
import './login.css';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

toast.configure();
// for logging in via google
const googleSuccess = async res => {
  const userData = res.profileObj;
  console.log (userData);

  const email = userData.email;
  const password = userData.googleId;
  const isGoogle = true;
  // sending request to backend, incase of deployment using netlify else localhost for development

  axios
    .post (`${process.env.REACT_APP_BACKEND_URL}/login`, {email, password, isGoogle})
    .then (res => {
      if (res.data.found === true) {
        // user found and saved in localStorage
        localStorage.setItem ('profile', JSON.stringify ({...res.data.user}));
        window.location = process.env.REACT_APP_FRONTEND_URL;
      } else if (res.data.msg === 'Wrong Password') {
        // wrong password
        alert ('User with this email already exist with different credentials');
      } else {
        const {name, email, imageUrl} = userData;

        const password = userData.googleId;

        // user not found but as google was used we will signup the user and then login
        axios
          .post (`${process.env.REACT_APP_BACKEND_URL}/signup`, {
            name,
            email,
            password,
            imageUrl,
          })
          .then (res => {
            if (res.data.msg === 'done') {
              localStorage.setItem (
                'profile',
                JSON.stringify ({...res.data.user})
              );
              window.location = process.env.REACT_APP_FRONTEND_URL;
            } else {
              alert ('something wrong');
            }
          })
          .catch (err => {
            console.log (err);
          });
      }
    });
};

// incase of error from google
const googleError = () =>
  alert ('Google Sign In was unsuccessful. Try again later');

// used for login
const Login = () => {
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const [showPassword,setShow] = useState(false)

  const handleSubmit = event => {
    event.preventDefault ();

    if (email === '' || password === '') {
      // inform to fill form
      alert ('Please fill all credentials');
    } else {
      // backend call and showing replies
      axios
        .post (`${process.env.REACT_APP_BACKEND_URL}/login`, {email, password})
        .then (res => {
          if (res.data.found === true) {
            console.log (res.data.user);
            localStorage.setItem (
              'profile',
              JSON.stringify ({...res.data.user})
            );
            window.location = process.env.REACT_APP_FRONTEND_URL;
          } else {
            alert (res.data.msg);
          }
        });
    }
  };

  const handleForgetPassword = () => {
    if (email === '') {
      // inform to fill form
      alert ('Please fill email for verification');
    } else {
      // backend call
      axios
        .post (`${process.env.REACT_APP_BACKEND_URL}/forget-password`, {email})
        .then (res => {});
    }
  };

  const setShowPassword = () => {
    setShow(!showPassword)
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
                <form onSubmit={handleSubmit} autocomplete="off">
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
                      <div style={{ display:"flex" }}>
                        <TextField
                          type={showPassword?"text":"password"}
                          placeholder="Password"
                          fullWidth
                          name="password"
                          variant="outlined"
                          value={password}
                          onChange={event => setPassword (event.target.value)}
                          required
                        />
                        <Tooltip followCursor title="Click to show/hide password">
                          <IconButton
                            sx={{ color: "blue", background: "white" }}
                            onClick={setShowPassword}
                          >
                            <VisibilityIcon/>
                          </IconButton>
                        </Tooltip>
                      </div>
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
                <Link href="/signup" variant="body2">
                  Sign up{' '}
                </Link>
              </Grid>
              {/* If user forget password */}
              <Grid item onClick={handleForgetPassword}>
                <Link href={email ? `/verify/${email}` : '/login'} variant="body2">
                  forgot password ?
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
