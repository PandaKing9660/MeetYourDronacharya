import React, { useState } from "react";
import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import CardExperience from "./CardExperience";
import NavBar from "../Home/Navbar/Navbar";

const Experience = () => {
  // dummy data for experience posts
  const [experiences, setExperiences] = useState([
    {
      title: "Cat is very imp",
      author: "Aditya Sharma ",
      date: "10/20/2021",
      description:
        "lorem ipsumLorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elit sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elit",

      link: "www.google.com",
      rating: 3,
    },
    {
      title: "Cat is very imp",
      author: "Sowmya",
      date: "10/20/2021",
      description:
        "lorem ipsumLorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elit sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elit",

      link: "www.google.com",
      rating: 4,
    },
    {
      title: "Jee is hard",
      author: "amit kesari ",
      date: "3/4/2091",
      description:
        "lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elit",
      link: "www.google.com",
      rating: 3.5,
    },
  ]);

  return (
    <div>
      <NavBar />
      <h2>Experience</h2>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        justifyContent="center"
        // alignItems="center"
      >
        {/* loop over experiences array and pass data to CardExperience component for rendering children */}
        <Grid item xs={12} sm={7} md={8}>
          <Box sx={{ minWidth: 275 }}>
            {experiences.map((experience, index) => {
              return <CardExperience expData={experience} key={index} />;
            })}
          </Box>
        </Grid>

        {/* right side grid division for navigation or news */}
        <Grid item xs={10} sm={4} lg={3}>
          <Box sx={{ minWidth: 205, border: 4, height: 800 }}>
            RIGHT SIDE NAV
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Experience;
