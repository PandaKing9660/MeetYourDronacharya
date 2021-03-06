import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import {useParams} from 'react-router';
import Typography from '@mui/material/Typography';
import NavBar from '../Home/Navbar/Navbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PublicIcon from '@mui/icons-material/Public';
import RingVolumeIcon from '@mui/icons-material/RingVolume';
import Button from '@mui/material/Button';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

toast.configure();
//the followers of users
const UserFollowers = () => {
  const { userId } = useParams();

  const [followers, setFollowers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [userMsg, setUserMsg] = useState("");
  const [searchedFollower, setSearchedFollower] = useState([]);
  const [searchResult, setSearchResult] = useState("");

  useEffect(() => {
    setLoading(true);

    // Fetching user followers details
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/dashboard/user-followers`, {
        userId,
      })
      .then((res) => {
        setLoading(false);
        if (res.data.length === 0) {
          setUserMsg("No followers yet");
        } else if (res.data[0] === -1) setUserMsg("No User Found");
        else {
          setFollowers(res.data);
          setSearchedFollower(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // Searching in the whole webpage
  useEffect(() => {
    const newSearchedFollower = followers.filter((follower) => {
      if (follower?.name.toLowerCase().includes(searchResult.toLowerCase()))
        return true;
      if (follower?.email.toLowerCase().includes(searchResult.toLowerCase()))
        return true;

      return false;
    });

    setSearchedFollower(newSearchedFollower);
  }, [searchResult]);

  return (
    <div>
      {/* Search Box  */}
      <NavBar setSearchResult={setSearchResult} />
      <h1
        className="heading"
        style={{ marginTop: 25, marginBottom: 10, textAlign: "center" }}
      >
        Followers
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
        ) : searchedFollower.length > 0 ? (
          <div>
            <Grid
              container
              columns={{ xs: 4, sm: 8, md: 2 }}
              justifyContent="flex-grow"
              alignItems="center"
            >
              {searchedFollower.map((follower) => {
                return (
                  <Grid item xs={12} md={6} key={follower?._id}>
                    <UserCard follower={follower} />
                  </Grid>
                );
              })}
            </Grid>
          </div>
        ) : (
          <Typography
            sx={{ mb: 1.5, fontSize: "0.91rem" }}
            color="text.secondary"
          >
            No Follower
          </Typography>
        )}
      </Box>
    </div>
  );
};

const handleChange = (id) => {
  window.location = process.env.REACT_APP_FRONTEND_URL + "/dashboard/" + id;
};

// User Card
const UserCard = ({ follower }) => {
  const [canFollow, setCanFollow] = useState(true);
  const [followers, setFollowers] = useState(follower?.followers?.length);
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleClick = () => {
    if (!user) {
      // if not logged in
      toast.error("please login to follow the user");
      return;
    }
    setCanFollow(!canFollow);
    if (canFollow) {
      // if true then user un-followed the current user
      axios
        .put(`${process.env.REACT_APP_BACKEND_URL}/dashboard/add-follower`, {
          userId: follower?._id,
          followerId: user._id,
        })
        .then((res) => {
          setFollowers(followers + 1);
        })
        .catch((err) => console.log(err));
    } else {
      // if false then user followed the current user
      axios
        .put(`${process.env.REACT_APP_BACKEND_URL}/dashboard/remove-follower`, {
          userId: follower?._id,
          followerId: user._id,
        })
        .then((res) => {
          setFollowers(followers - 1);
        })
        .catch((err) => console.log(err));
    }
  };

  // To check whether the user follow or not
  useEffect(() => {
    if (user) {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/dashboard/check-follower`, {
          userId: follower?._id,
          followerId: user?._id,
        })
        .then((res) => {
          setCanFollow(!res.data);
        })
        .catch((err) => console.log(err));
    } else {
      setCanFollow(true);
    }
  }, []);

  // Followers cards
  return (
    <Card
      sx={{
        display: "flex",
        margin: "2%",
        width: "60%",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={follower?.imageUrl}
          alt="User Image"
          onClick={() => handleChange(follower?._id)}
          style={{ cursor: "pointer" }}
        />

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent
            sx={{ flex: "1 0 auto" }}
            onClick={() => handleChange(follower?._id)}
            style={{ cursor: "pointer" }}
          >
            <Typography component="div" variant="h5">
              {follower?.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {follower?.email}
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <IconButton
              aria-label="followers"
              title="user followers"
              onClick={() =>
                (window.location =
                  process.env.REACT_APP_FRONTEND_URL +
                  "/dashboard/" +
                  follower?._id +
                  "/user-followers")
              }
            >
              <PersonIcon />
            </IconButton>
            <IconButton
              aria-label="experience"
              onClick={() =>
                (window.location =
                  process.env.REACT_APP_FRONTEND_URL +
                  "/dashboard/" +
                  follower?._id +
                  "/user-experience")
              }
              title="user experience"
            >
              <PublicIcon />
            </IconButton>
            <IconButton
              aria-label="answers"
              onClick={() =>
                (window.location =
                  process.env.REACT_APP_FRONTEND_URL +
                  "/dashboard/" +
                  follower?._id +
                  "/user-answer")
              }
              title="user answers"
            >
              <QuestionAnswerIcon />
            </IconButton>

            <IconButton
              aria-label="questions"
              onClick={() =>
                (window.location =
                  process.env.REACT_APP_FRONTEND_URL +
                  "/dashboard/" +
                  follower?._id +
                  "/user-question")
              }
              title="user questions"
            >
              <RingVolumeIcon />
            </IconButton>
          </Box>
        </Box>
      </div>

      <div style={{ display: "flex", alignItems: "center", marginRight: "2%" }}>
        {canFollow ? (
          <Before handleClick={handleClick} />
        ) : (
          <After handleClick={handleClick} />
        )}
      </div>
    </Card>
  );
};

// Follow button before clicked
const Before = ({ handleClick }) => {
  return (
    <div style={{ marginTop: "2%" }}>
      <Button variant="contained" onClick={handleClick}>
        Follow
      </Button>
    </div>
  );
};

// Follow button after clicked
const After = ({ handleClick }) => {
  return (
    <div style={{ marginTop: "2%" }}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "green",
          "&:hover": {
            backgroundColor: "green",
          },
        }}
        onClick={handleClick}
      >
        Unfollow
      </Button>
    </div>
  );
};

export default UserFollowers;
