import Button from '@mui/material/Button';
import {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Modal, Backdrop, Box, Fade, Grid, Input} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

import axios from 'axios';

import ChatBox from './ChatBox/ChatBox';


const Profile = ({userData, handleOpen}) => {
  const [isFriendAdded, setIsHeartLiked] = useState (true);
  const [followers, setFollowers] = useState (userData.followers.length);
  const user = JSON.parse (localStorage.getItem ('profile'));
  const [editProfile, seteditProfileModalOpen] = useState (false);

  const editProfileModalOpen = () => seteditProfileModalOpen (true);
  const editProfileModalClose = () => seteditProfileModalOpen (false);

  const handleClick = () => {
    if (!user) {
      alert ('please login to follow the user');
      return;
    }
    setIsHeartLiked (!isFriendAdded);
    if (isFriendAdded) {
      // if true then user un-followed the current user
      axios
        .put (`${process.env.REACT_APP_BACKEND_URL}/dashboard/add-follower`, {
          userId: userData._id,
          followerId: user._id,
        })
        .then (res => {
          console.log ('updated');
          setFollowers (followers + 1);
        })
        .catch (err => console.log (err));
    } else {
      axios
        .put (
          `${process.env.REACT_APP_BACKEND_URL}/dashboard/remove-follower`,
          {
            userId: userData._id,
            followerId: user._id,
          }
        )
        .then (res => {
          console.log ('updated');
          setFollowers (followers - 1);
        })
        .catch (err => console.log (err));
    }
  };

  const updateProfile = () => {
    seteditProfileModalOpen (false)
  }

  useEffect (() => {
    if (user) {
      axios
        .post (
          `${process.env.REACT_APP_BACKEND_URL}/dashboard/check-follower`,
          {
            userId: userData._id,
            followerId: user._id,
          }
        )
        .then (res => {
          console.log ('hello', res.data);
          setIsHeartLiked (!res.data);
        })
        .catch (err => console.log (err));
    } else {
      setIsHeartLiked (true);
    }
  }, []);

  return (
    <div className="card__collection clear-fix" style={{display: 'flex'}}>
      <div className="cards cards--two">
        <img src={userData.imageUrl} className="img-responsive" alt="Cards" />
        <span className="cards--two__rect" />
        <span className="cards--two__tri" />
        <p>{userData.name}</p>
      </div>
      <div style={{width: '100%', textAlign: 'right'}}>
        <h3>Name: {userData.name}</h3>
        <h3>Email: {userData.email}</h3>
        <h3>
          Social Media: {userData.socialMedia.map (media => media + ' ')}
        </h3>
        <div style={{display: 'flex'}}>
          <BasicCard text="Total Followers" number={followers} />
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
        <div onClick={handleClick}>
          {isFriendAdded ? <Before /> : <After />}
        </div>
        <div>

          <Button variant="contained" sx={{marginTop: '2%'}}>CHAT</Button>
        </div>
        <div>
          <Button
            variant="contained"
            sx={{marginTop: '2%'}}
            onClick={editProfileModalOpen}
          >
            Edit Profile
          </Button>

          <Button variant="contained" sx={{marginTop: 2}}>CHAT</Button>
          <ChatBox/>

        </div>
      </div>
      {/* Displaing add question modal */}
      <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={editProfile}
          onClose={editProfileModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={editProfile}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '40%',
                background: 'white',
                padding: "1%",
                borderRadius: "1%",
              }}
            >
              <Typography align="center" variant="h6">
                <u>Edit Profile</u>
              </Typography>
              <Grid container direction="row" align="left">
                <Grid item sm={2}>
                  Name:
                </Grid>
                <Grid item sm={10}>
                  <Input fullWidth="true" defaultValue={userData.name} placeholder="name"/>
                </Grid>
                <Grid item sm={2}>
                  <AlternateEmailIcon/>
                </Grid>
                <Grid item sm={10}>
                  <Input type="email" fullWidth="true" readOnly="true" defaultValue={userData.email} placeholder="e-mail id"/>
                </Grid>
                <Grid item sm={2}>
                  <LinkedInIcon/>
                </Grid>
                <Grid item sm={10}>
                  <Input fullWidth="true" placeholder="linkedIn profile link" />
                </Grid>
                <Grid item sm={2}>
                  <FacebookIcon/>
                </Grid>
                <Grid item sm={10}>
                  <Input fullWidth="true" placeholder="facebook profile link" />
                </Grid>
                <Grid item sm={2}>
                  <InstagramIcon/>
                </Grid>
                <Grid item sm={10}>
                  <Input fullWidth="true" placeholder="instagram profile link" />
                </Grid>
                <Grid item sm={2}>
                  DP:
                </Grid>
                <Grid item sm={10}>
                  <Input type="url" fullWidth="true" placeholder="url for profile pic" />
                </Grid>
              </Grid>
              <div display="flex" justifyContent="center" alignItems="center" align="center">
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

const Before = () => {
  return (
    <div style={{marginTop: '2%'}}>
      <Button variant="contained">Follow</Button>
    </div>
  );
};

const After = () => {
  return (
    <div style={{marginTop: '2%'}}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: 'green',
          '&:hover': {
            backgroundColor: 'green',
          },
        }}
      >
        Unfollow
      </Button>
    </div>
  );
};

function BasicCard (props) {
  return (
    <Card
      sx={{
        width: 100,
        height: 100,
        paddingRight: 5,
        marginLeft: 5,
        marginTop: 6,
      }}
    >
      <CardContent>
        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
          {props.text}
        </Typography>
        <Typography sx={{mb: 1.5}} color="text.secondary">
          {props.number}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Profile;
