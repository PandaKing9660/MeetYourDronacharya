import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import CardExperience from "../Experience/CardExperience";
import { useParams } from "react-router";
import Typography from "@mui/material/Typography";
import NavBar from "../Home/Navbar/Navbar";

const UserExperience = () => {
  const { userId } = useParams();

  const [experiences, setExperiences] = useState([]);

  const [loading, setLoading] = useState(false);
  const [userMsg, setUserMsg] = useState("");

  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    console.log(userId);
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/dashboard/user-experience`, {
        userId,
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data.length);
        if (res.data.length === 0) {
          setUserMsg("No experiences yet");
        } else if (res.data[0] === -1) setUserMsg("No User Found");
        else {
          console.log(res.data);
          setExperiences(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <NavBar />
      <h1
        className="heading"
        style={{ marginTop: 25, marginBottom: 10, textAlign: "center" }}
      >
        Experience
      </h1>
      <Box sx={{ flexGrow: 1 }} m={1} p={1} mt={2}>
        {/* loop over experiences array and pass data to CardExperience component for rendering children */}

        {loading ? (
          <CircularProgress />
        ) : userMsg ? (
          <Typography
            sx={{ mb: 1.5, fontSize: "0.91rem" }}
            color="text.secondary"
          >
            {userMsg}
          </Typography>
        ) : (
          <Grid
            container
            // spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 2 }}
            justifyContent="flex-start"
            alignItems="center"
          >
            {experiences.map((experience) => {
              return (
                <Grid item xs={12} md={6} key={experience._id}>
                  <CardExperience expData={experience} />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </div>
  );
};

export default UserExperience;
