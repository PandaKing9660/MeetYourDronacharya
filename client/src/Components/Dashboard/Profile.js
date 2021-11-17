import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Modal, Backdrop, Box, Fade, Grid, Input } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";

import axios from "axios";

import ChatBox from "./ChatBox/ChatBox";

const Profile = ({ userData, handleOpen }) => {
  const [canFollow, setCanFollow] = useState(true);
  const [followers, setFollowers] = useState(userData.followers.length);
  const user = JSON.parse(localStorage.getItem("profile"));
  const [editProfile, setAddSocialMediaModalOpen] = useState(false);
  const [linkedIn, setLinkedIn] = useState(userData.socialMedia[0]);
  const [facebook, setFacebook] = useState(userData.socialMedia[1]);
  const [instagram, setInstagram] = useState(userData.socialMedia[2]);
  const [twitter, setTwitter] = useState(userData.socialMedia[3]);
  const [github, setGithub] = useState(userData.socialMedia[4]);

  const addSocialMediaModalOpen = () => setAddSocialMediaModalOpen(true);
  const addSocialMediaModalClose = () => setAddSocialMediaModalOpen(false);

  const handleClick = () => {
    if (!user) {
      alert("please login to follow the user");
      return;
    }
    setCanFollow(!canFollow);
    if (canFollow) {
      // if true then user un-followed the current user
      axios
        .put(`${process.env.REACT_APP_BACKEND_URL}/dashboard/add-follower`, {
          userId: userData._id,
          followerId: user._id,
        })
        .then((res) => {
          console.log("updated");
          setFollowers(followers + 1);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .put(`${process.env.REACT_APP_BACKEND_URL}/dashboard/remove-follower`, {
          userId: userData._id,
          followerId: user._id,
        })
        .then((res) => {
          console.log("updated");
          setFollowers(followers - 1);
        })
        .catch((err) => console.log(err));
    }
  };

  const updateProfile = () => {
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/dashboard/edit-user`, {
        userId: user._id,
        linkedIn: linkedIn ? linkedIn : "",
        facebook: facebook ? facebook : "",
        instagram: instagram ? instagram : "",
        twitter: twitter ? twitter : "",
        github: github ? github : "",
      })
      .then((res) => {
        console.log("updated");
      })
      .catch((err) => console.log(err));

    setAddSocialMediaModalOpen(false);
    window.location.reload();
  };

  useEffect(() => {
    if (user) {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/dashboard/check-follower`, {
          userId: userData._id,
          followerId: user._id,
        })
        .then((res) => {
          console.log("hello", res.data);
          setCanFollow(!res.data);
        })
        .catch((err) => console.log(err));
    } else {
      setCanFollow(true);
    }
  }, []);

  return (
    <div className="card__collection clear-fix" style={{ display: "flex" }}>
      <div className="cards cards--two">
        <img src={userData.imageUrl} className="img-responsive" alt="Cards" />
        <span className="cards--two__rect" />
        <span className="cards--two__tri" />
        <p>{userData.name}</p>
      </div>
      <div
        style={{
          width: "100%",
          textAlign: "right",
        }}
      >
        <h3>Name: {userData.name}</h3>
        <h3>Email: {userData.email}</h3>
        <h3>
          Social Media:
          {userData.socialMedia[0] ? (
            <a
              href={`${userData.socialMedia[0]}`}
              rel="noreferrer"
              target="_blank"
            >
              <LinkedInIcon />{" "}
            </a>
          ) : (
            " "
          )}
          {userData.socialMedia[1] ? (
            <a
              href={`${userData.socialMedia[1]}`}
              rel="noreferrer"
              target="_blank"
            >
              <FacebookIcon />{" "}
            </a>
          ) : (
            ""
          )}
          {userData.socialMedia[2] ? (
            <a
              href={`${userData.socialMedia[2]}`}
              rel="noreferrer"
              target="_blank"
            >
              <InstagramIcon />{" "}
            </a>
          ) : (
            ""
          )}
          {userData.socialMedia[3] ? (
            <a
              href={`${userData.socialMedia[3]}`}
              rel="noreferrer"
              target="_blank"
            >
              <TwitterIcon />{" "}
            </a>
          ) : (
            ""
          )}
          {userData.socialMedia[4] ? (
            <a
              href={`${userData.socialMedia[4]}`}
              rel="noreferrer"
              target="_blank"
            >
              <GitHubIcon />{" "}
            </a>
          ) : (
            ""
          )}
        </h3>
        <div style={{ display: "flex" }}>
          <BasicCard 
            text="Total Followers" 
            number={followers} 
          />
          <BasicCard
            text="Questions answered"
            number={userData.answerShared.length}
          />
          <BasicCard
            text="Asked questions"
            number={userData.questionShared.length}
          />
          <BasicCard
            text="Experiences shared"
            number={userData.experienceShared.length}
          />
        </div>
        <div>
          {canFollow ? (
            <Before handleClick={handleClick} />
          ) : (
            <After handleClick={handleClick} />
          )}
        </div>
        {user && user._id === userData._id ? (
          <div>
            <Button
              variant="contained"
              sx={{ marginTop: "2%" }}
              onClick={addSocialMediaModalOpen}
            >
              Add Social Media
            </Button>
          </div>
        ) : (
          <div />
        )}
        <div>
          <Button variant="contained" sx={{ marginTop: 2 }}>
            CHAT
          </Button>
          <ChatBox />
        </div>
      </div>
      {/* Displaying add question modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={editProfile}
        onClose={addSocialMediaModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={editProfile}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "40%",
              background: "white",
              padding: "1%",
              borderRadius: "1%",
            }}
          >
            <Typography align="center" variant="h6">
              <u>Add Social Media</u>
            </Typography>
            <Grid container direction="row" align="left">
              <Grid item sm={2}>
                <AlternateEmailIcon />
              </Grid>
              <Grid item sm={10}>
                <Input
                  type="email"
                  fullWidth="true"
                  readOnly="true"
                  defaultValue={userData.email}
                  placeholder="e-mail id"
                />
              </Grid>
              <Grid item sm={2}>
                <LinkedInIcon />
              </Grid>
              <Grid item sm={10}>
                <Input
                  fullWidth="true"
                  placeholder="linkedIn profile link"
                  value={linkedIn}
                  onChange={(e) => setLinkedIn(e.target.value)}
                />
              </Grid>
              <Grid item sm={2}>
                <FacebookIcon />
              </Grid>
              <Grid item sm={10}>
                <Input
                  fullWidth="true"
                  placeholder="facebook profile link"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                />
              </Grid>
              <Grid item sm={2}>
                <InstagramIcon />
              </Grid>
              <Grid item sm={10}>
                <Input
                  fullWidth="true"
                  placeholder="instagram profile link"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
              </Grid>
              <Grid item sm={2}>
                <TwitterIcon />
              </Grid>
              <Grid item sm={10}>
                <Input
                  fullWidth="true"
                  placeholder="twitter profile link"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
              </Grid>
              <Grid item sm={2}>
                <GitHubIcon />
              </Grid>
              <Grid item sm={10}>
                <Input
                  fullWidth="true"
                  placeholder="github profile link"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />
              </Grid>
            </Grid>
            <div
              display="flex"
              justifyContent="center"
              alignItems="center"
              align="center"
            >
              <Button alignSelf="center" onClick={updateProfile}>
                Submit
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

const Before = ({ handleClick }) => {
  return (
    <div style={{ marginTop: "2%" }}>
      <Button variant="contained" onClick={handleClick}>
        Follow
      </Button>
    </div>
  );
};

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

function BasicCard(props) {
  return (
    <Card
      sx={{
        width: "auto",
        height: "auto",
        // paddingRight: 5,
        marginLeft: 5,
        // marginTop: 6,
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.text}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.number}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Profile;
