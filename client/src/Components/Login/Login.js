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
  IconButton,
  Card,
  CardContent,
  CardMedia,
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
  const email = userData.email;
  const password = userData.googleId;
  const isGoogle = true;
  // sending request to backend, incase of deployment using netlify else localhost for development

  axios
    .post (`${process.env.REACT_APP_BACKEND_URL}/login`, {
      email,
      password,
      isGoogle,
    })
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
  const [showPassword,setShow] = useState(false);

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
    if (!email.includes ('@')) {
      // inform to fill form
      alert ('Please fill valid email for verification');
    } else {
      // backend call
      axios
        .post (`${process.env.REACT_APP_BACKEND_URL}/forget-password`, {email})
        .then (res => {});
    }
  };

  // To show password after clicking eye button
  const setShowPassword = () => {
    setShow(!showPassword)
  };

  // random soothing image
  const imageKeyArr = [
    'https://images.unsplash.com/photo-1542396601-dca920ea2807?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHw%3D',
    'https://images.unsplash.com/photo-1488579456918-038d21fd9653?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1598349929585-fd7cfc7254ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1602946860832-7db5bd3694c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHw%3D',
    'https://images.unsplash.com/photo-1489429516303-206b4dc27dbc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fA%3D%3D',
    'https://c1.wallpaperflare.com/preview/768/20/884/sky-clouds-sunset-dark.jpg',
    'https://c4.wallpaperflare.com/wallpaper/628/998/352/dark-forest-mountains-photography-wallpaper-preview.jpg',
    'https://c4.wallpaperflare.com/wallpaper/513/135/586/purple-nights-reflection-wallpaper-preview.jpg',
    'https://images8.alphacoders.com/100/1003836.jpg',
  ];
  const d = new Date();
  let day = d.getDay();
  const imageKey = imageKeyArr[day];

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

      {/* Form to login  */}

      <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          spacing={0}
      >
        
        {/* left side login window */}
        <Grid item xs={11} md={4}>
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
                  Sign In
                </Typography>
              </Grid>
              <Grid item>
                <form onSubmit={handleSubmit} autocomplete="off">
                  {/* To enter email id */}
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
                      {/* To enter password */}
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
                        {/* Button for visibility of password */}
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
                    {/* Google Login */}
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
                <Link
                  href={email.includes ('@') ? `/verify/${email}` : '/login'}
                  variant="body2"
                >
                  Forgot password ?
                </Link>
              </Grid>
            </Paper>
          </Grid>
        </Grid>

        {/* right side display card */}
        <Grid item xs={11} md={6}>
            <Card sx={{ minWidth: 225 }}>
                {/* Daily changing image */}
                <CardContent>
                    <Typography
                        sx={{ fontSize: 16 }}
                        color="text.secondary"
                        gutterBottom
                    >
                        Sign In to Gain Experience
                    </Typography>

                    {/* Show image after daily. */}
                    <CardMedia
                        component="img"
                        height="470vh"
                        image={imageKey}
                        alt="Nice Image"
                    />
                </CardContent>
            </Card>
        </Grid>

      </Grid>
    </div>
  );
};
export default Login;
