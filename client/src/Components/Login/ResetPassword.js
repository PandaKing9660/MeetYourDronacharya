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
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./login.css";

const ResetPassword = () => {
  const { email } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // while submitting
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(password, email);
    if (password !== confirmPassword) {
      // inform to fill form
      alert ('Passwords do not match, check again');
    } else {
      // backend call
      axios
        .put(`${process.env.REACT_APP_BACKEND_URL}/reset-password`, {
          email,
          password,
        })
        .then((res) => {
          // password changed and user logged in
          if (res.data.found === true) {
            localStorage.setItem(
              "profile",
              JSON.stringify({ ...res.data.user })
            );
            window.location = process.env.REACT_APP_FRONTEND_URL;
          } else {
            alert("something wrong");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div>
      {/* Heading  */}
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
                  Reset Your Password
                </Typography>
              </Grid>
              <Grid item>
                <form onSubmit={handleSubmit}>
                  <Grid container direction="column" spacing={2}>
                    {/* Writing password */}
                    <Grid item>
                      <TextField
                        type="password"
                        placeholder="New Password"
                        fullWidth
                        name="password"
                        variant="outlined"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                      />
                    </Grid>
                    {/* Confirming Password */}
                    <Grid item>
                      <TextField
                        type="password"
                        placeholder="Confirm New Password"
                        fullWidth
                        name="confirmPassword"
                        variant="outlined"
                        value={confirmPassword}
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                        required
                      />
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
                  </Grid>
                </form>
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  Login?
                </Link>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default ResetPassword;
