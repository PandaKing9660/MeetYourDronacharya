import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Modal, Backdrop, Box, Fade, Grid, Input } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";

import axios from "axios";
import { Link } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

toast.configure();

const Profile = ({ userData, handleOpen }) => {

  const user = JSON.parse(localStorage.getItem("profile"));

  const [canFollow, setCanFollow] = useState(true);
  const [followers, setFollowers] = useState(userData.followers.length);
  const [editProfile, setAddSocialMediaModalOpen] = useState(false);
  const [linkedIn, setLinkedIn] = useState(userData.socialMedia[0]);
  const [facebook, setFacebook] = useState(userData.socialMedia[1]);
  const [instagram, setInstagram] = useState(userData.socialMedia[2]);
  const [twitter, setTwitter] = useState(userData.socialMedia[3]);
  const [github, setGithub] = useState(userData.socialMedia[4]);

    const [roomName, setRoomName] = useState(user._id);

  const addSocialMediaModalOpen = () => setAddSocialMediaModalOpen(true);
  const addSocialMediaModalClose = () => setAddSocialMediaModalOpen(false);

  const handleClick = () => {
    if (!user) {
      //alert("please login to follow the user");
      toast.error("Please login to follow the user");
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
          setFollowers(followers - 1);
        })
        .catch((err) => console.log(err));
    }
  };
  //edits the links of different social media of the user
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
      })
      .catch((err) => console.log(err));

    setAddSocialMediaModalOpen(false);
    window.location.reload();
  };

  // TO collect user info from the backend
  useEffect(() => {
    if (user) {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/dashboard/check-follower`, {
          userId: userData._id,
          followerId: user._id,
        })
        .then((res) => {
          setCanFollow(!res.data);
        })
        .catch((err) => console.log(err));
    } else {
      setCanFollow(true);
    }

    if(user){
        if (user._id < userData._id) 
          setRoomName(user._id + userData._id);
        else 
          setRoomName(userData._id + user._id);
    }
  }, []);

  return (
    <div className="card__collection clear-fix">
      <Grid container>
        <Grid item sm={3} xs={12}>
          {/* Image of the user  */}
          <div className="cards cards--two">
            <img
              src={userData.imageUrl}
              className="img-responsive"
              alt="Cards"
              style={{ width: "300px" }}
            />
            <span className="cards--two__rect" style={{ height: "500px" }} />
            <span className="cards--two__tri" />
            <p>{userData.name}</p>
          </div>
        </Grid>
        <Grid item sm={9} xs={12}>
          <div
            style={{
              width: "100%",
              textAlign: "right",
            }}
          >
            {/* Name of the user  */}
            <h5 style={{ margin: 0 }}>Name</h5>
            <h3 style={{ marginTop: "0.3px", marginBottom: "2%" }}>
              {userData.name}
            </h3>
            {/* Email of the user  */}
            <h5 style={{ margin: 0 }}>Email</h5>
            <h3 style={{ marginTop: "0.3px", marginBottom: "2%" }}>
              {userData.email}
            </h3>
            {/* Social Medias of the user  */}
            <h5 style={{ margin: 0 }}>Social Media</h5>
            <h3 style={{ marginTop: "0.3px", marginBottom: "2%" }}>
              {userData.socialMedia[0] ? (
                <a
                  href={`${userData.socialMedia[0]}`}
                  rel="noreferrer"
                  target="_blank"
                  style={{ textDecoration: "none" }}
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
                  style={{ textDecoration: "none" }}
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
                  style={{ textDecoration: "none" }}
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
                  style={{ textDecoration: "none" }}
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
                  style={{ textDecoration: "none" }}
                >
                  <GitHubIcon />{" "}
                </a>
              ) : (
                ""
              )}
            </h3>
            {/* Information of the users related to this site.  */}
            <div
              style={{
                display: "inline-flex",
                padding: "4%",
                paddingRight: "7%",
              }}
            >
              <div className="infocard_profile">
                Total
                <br />
                Followers
                <br />
                {followers}
              </div>
              <div className="infocard_profile">
                Questions
                <br />
                Answered
                <br />
                {userData.answerShared.length}
              </div>
              <div className="infocard_profile">
                Asked
                <br />
                Questions
                <br />
                {userData.questionShared.length}
              </div>
              <div className="infocard_profile">
                Experiences
                <br />
                Shared
                <br />
                {userData.experienceShared.length}
              </div>
            </div>
            {/* Link to chat box  */}
            <div>
              <Link to={`/chatbox/${userData.name}/${userData._id}/${roomName}`}>
                <Button
                  variant="contained"
                  sx={{ marginTop: "2%", width: "165px" }}
                >
                  CHAT
                </Button>
              </Link>
            </div>
            {/* Follow/ unfollow button  */}
            <div>
              {canFollow ? (
                <Before handleClick={handleClick} />
              ) : (
                <After handleClick={handleClick} />
              )}
            </div>
            {/* If user opens his own accouny, then an option to edit profile.  */}
            {user && user._id === userData._id ? (
              <div>
                <Button
                  variant="contained"
                  sx={{ marginTop: "2%", width: "165px" }}
                  onClick={addSocialMediaModalOpen}
                >
                  Add Social Media
                </Button>
              </div>
            ) : (
              <div />
            )}
          </div>
        </Grid>
      </Grid>
      {/* Displaying Update Profile modal */}
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
                  fullwidth="true"
                  readOnly={true}
                  defaultValue={userData.email}
                  placeholder="e-mail id"
                />
              </Grid>
              <Grid item sm={2}>
                <LinkedInIcon />
              </Grid>
              <Grid item sm={10}>
                <Input
                  fullwidth="true"
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
                  fullwidth="true"
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
                  fullwidth="true"
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
                  fullwidth="true"
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
                  fullwidth="true"
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

//before the user is followed
const Before = ({ handleClick }) => {
  return (
    <div style={{ marginTop: "2%" }}>
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{
          marginTop: "2%",
          width: "165px",
        }}
      >
        Follow
      </Button>
    </div>
  );
};
//after the user is followed
const After = ({ handleClick }) => {
  return (
    <div style={{ marginTop: "2%" }}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "green",
          marginTop: "2%",
          width: "165px",
          "&:hover": {
            backgroundColor: "green",
          },
        }}
        onClick={handleClick}
      >
        Friend
      </Button>
    </div>
  );
};

export default Profile;
