import React from "react";
import { useState } from "react";
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
} from "@material-ui/core";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { GoogleLogin } from "react-google-login";
import Icon from "./Icon";

import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "./login.css";

toast.configure();

const googleSuccess = async (res) => {
  const userData = res.profileObj;

  const { name, email, imageUrl } = userData;

  const password = userData.googleId;

  // signing up the user
  axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
      name,
      email,
      password,
      imageUrl,
    })
    .then((res) => {
      if (res.data.msg === "done") {
        localStorage.setItem("profile", JSON.stringify({ ...res.data.user }));
        window.location = process.env.REACT_APP_FRONTEND_URL;
      } else {
        alert("something wrong");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// Google error
const googleError = () =>
  alert("Google Sign In was unsuccessful. Try again later");

// Signup
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShow] = useState(false);
  const [showPasswordConfirm, setShowConfirm] = useState(false);

  // while submitting
  const handleSubmit = (event) => {
    event.preventDefault();
    const imageUrl = false;
    if (password !== confirmPassword) {
      // inform to fill form
      toast.error("Passwords dont match. Please enter same password in both fields.");

    } else {
      // backend call
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
          name,
          email,
          password,
          imageUrl,
        })
        .then((res) => {
          if (res.data.msg === "done") {
            localStorage.setItem(
              "profile",
              JSON.stringify({ ...res.data.user })
            );
            window.location = process.env.REACT_APP_FRONTEND_URL;
          } else {
            toast.error("Please enter the details properly in the fields.")
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // To show password after clicking eye button
  const setShowPassword = () => {
    setShow(!showPassword);
  };

  // To show confirm password after clicking eye button
  const setShowPasswordConfirm = () => {
    setShowConfirm(!showPasswordConfirm);
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
  const imageKey = imageKeyArr[day+1];

  return (
    <div>
      {/* heading */}
      <AppBar position="static" alignitems="center" color="primary">
        <Toolbar>
          <Grid container justify="center" wrap="wrap">
            <Grid item>
              <Typography variant="h6">Meet Your Dronacharya</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

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
                  Sign Up
                </Typography>
              </Grid>
              <Grid item>
                <form onSubmit={handleSubmit}>
                  <Grid container direction="column" spacing={2}>
                    {/* Username */}
                    <Grid item>
                      <TextField
                        type="text"
                        placeholder="User Name"
                        fullWidth
                        name="Name"
                        variant="outlined"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                      />
                    </Grid>
                    {/* Email id */}
                    <Grid item>
                      <TextField
                        type="email"
                        placeholder="Email"
                        fullWidth
                        name="username"
                        variant="outlined"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        autoFocus
                      />
                    </Grid>
                    {/* Password */}
                    <Grid item>
                      <div style={{ display: "flex" }}>
                        <TextField
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          fullWidth
                          name="password"
                          variant="outlined"
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          required
                        />
                        {/* Button for visibility of password */}
                        <Tooltip
                          followCursor
                          title="Click to show/hide password"
                        >
                          <IconButton
                            sx={{ color: "blue", background: "white" }}
                            onClick={setShowPassword}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </Grid>
                    {/* Confirm Password */}
                    <Grid item>
                      <div style={{ display: "flex" }}>
                        <TextField
                          type={showPasswordConfirm ? "text" : "password"}
                          placeholder="Password"
                          fullWidth
                          name="password"
                          variant="outlined"
                          value={confirmPassword}
                          onChange={(event) =>
                            setConfirmPassword(event.target.value)
                          }
                          required
                        />
                        {/* Button for visibility of password */}
                        <Tooltip
                          followCursor
                          title="Click to show/hide password"
                        >
                          <IconButton
                            sx={{ color: "blue", background: "white" }}
                            onClick={setShowPasswordConfirm}
                          >
                            <VisibilityIcon />
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
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    </Grid>
                    {/* Google Sign In */}
                    <Grid item>
                      <GoogleLogin
                        clientId="509042475407-tbckpsecdrm3tpqpe9hbusmef2t7vr3c.apps.googleusercontent.com"
                        render={(renderProps) => (
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
                <Link href="/login" variant="body2">
                  Login ?
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
                        Sign Up to Gain Experience
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
export default Signup;
