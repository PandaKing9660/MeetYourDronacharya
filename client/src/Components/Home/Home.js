import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./home.css";

import AccountCircle from "@mui/icons-material/AccountCircle";
import NavbarLinks from "./Navbar/NavbarLinks";
import MenuItem from "@mui/material/MenuItem";
import {
  Box,
  Grid,
  Stack,
  Button,
  Autocomplete,
  TextField,
} from "@mui/material";
import { red } from "@mui/material/colors";
import logoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";

import IconButton from "@mui/material/IconButton";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import FlareIcon from "@mui/icons-material/Flare";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import TimelineIcon from "@mui/icons-material/Timeline";
import ExploreIcon from "@mui/icons-material/Explore";
import PeopleIcon from "@mui/icons-material/People";

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
];

const Home = () => {
  const { height, width } = useWindowDimensions();
  const [buttonVariant, setButtonBariant] = useState({
    variant: "contained",
    color: red[40],
  });
  let history = useHistory(); //Storing history website
  return (
    <Box className="home_container" justifyContent="center">
      {/* Shoi=wing signup/signin button according to whether the user is signed in or not */}
      <Stack direction="row" spacing={0}>
        {!JSON.parse (localStorage.getItem ('profile'))
          ? <Button
              variant="contained"
              color="warning"
              href="/login"
            >
              Signup / Signin
            </Button>
          : <div style={{display: 'flex'}}>
              <MenuItem>
                <NavbarLinks
                  linkSingle={{
                    linkName: 'Dashboard',
                    linkTo: 'dashboard',
                    iconProp: AccountCircle,
                    color: 'warning',
                  }}
                />
              </MenuItem>
              <MenuItem>
                <NavbarLinks
                  linkSingle={{
                    linkName: 'Logout',
                    linkTo: 'logout',
                    iconProp: logoutIcon,
                    color: 'warning',
                  }}
                />
              </MenuItem>
            </div>}
      </Stack>

      {/* Showing Heading */}
      <Grid
        className="home"
        container
        rowSpacing={6}
        columnSpacing={{ xs: 1, sm: 2 }}
        justifyContent="center"
      >
        <Grid item xs={12} mb={2} mt={1}>
          <h1 className="head_home">Meet Your Dronacharya</h1>
        </Grid>
        <Grid item xs={5} lg={4} mb={2}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            sx={{
              border: 1,
              borderRadius: 3,
              background: "white",
            }}
            renderInput={(params) => <TextField {...params} label="Search" />}
          />
        </Grid>

        {/* Showing Buttons to navigate to other webpage */}
        <Grid
          container
          rowSpacing={5}
          columnSpacing={{ xs: 3, md: 3 }}
          justifyContent="space-evenly"
          my={5}
          xs={9}
        >
          <Grid item xs={6} md={1.7}>
            <Tooltip title="Ask Something">
              <IconButton
                size="large"
                variant={buttonVariant.variant}
                sx={{ color: "blue", background: "white"}}
                fullWidth="bool"
                onClick={() => history.push("/ask-something")}
              >
                <QuestionAnswerIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={6} md={1.7}>
            <Tooltip title="Experience">
              <IconButton
                size="large"
                variant={buttonVariant.variant}
                sx={{ color: "blue", background: "white" }}
                fullWidth="bool"
                onClick={() => history.push("/experience")}
              >
                <FlareIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={6} md={1.7}>
            <Tooltip title="Study Material">
              <IconButton
                size="large"
                variant={buttonVariant.variant}
                sx={{ color: "blue", background: "white" }}
                fullWidth="bool"
                onClick={() => history.push("/study-material")}
              >
                <MenuBookIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={6} md={1.7}>
            <Tooltip title="Timeline">
              <IconButton
                size="large"
                variant={buttonVariant.variant}
                sx={{ color: "blue", background: "white" }}
                fullWidth="bool"
                onClick={() => history.push("/timeline")}
              >
                <TimelineIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={6} md={1.7}>
            <Tooltip title="Dashboard">
              <IconButton
                size="large"
                variant={buttonVariant.variant}
                sx={{ color: "blue", background: "white" }}
                fullWidth="bool"
                onClick={() => history.push("/dashboard")}
              >
                <AccountCircle />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={6} md={1.7}>
            <Tooltip title="Find Myself">
              <IconButton
                size="large"
                variant={buttonVariant.variant}
                sx={{ color: "blue", background: "white" }}
                fullWidth="bool"
                onClick={() => history.push("/find-myself")}
              >
                <ExploreIcon />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={11} md={1.8}>
            <Tooltip title="About Us">
              <IconButton
                size="large"
                variant={buttonVariant.variant}
                sx={{ color: "blue", background: "white" }}
                fullWidth="bool"
                onClick={() => history.push("/about-us")}
              >
                <PeopleIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export default Home;
