import Button from '@mui/material/Button';
import {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import axios from 'axios';

import ChatBox from './ChatBox/ChatBox';

const Profile = ({userData, handleOpen}) => {
  const [canFollow, setCanFollow] = useState (true);
  const [followers, setFollowers] = useState (userData.followers.length);
  const user = JSON.parse (localStorage.getItem ('profile'));

  const handleClick = () => {
    if (!user) {
      alert ('please login to follow the user');
      return;
    }
    setCanFollow (!canFollow);
    if (canFollow) {
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
          setCanFollow (!res.data);
        })
        .catch (err => console.log (err));
    } else {
      setCanFollow (true);
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
        <div >
          {canFollow
            ? <Before handleClick={handleClick} />
            : <After handleClick={handleClick} />}
        </div>
        <div>

          <Button variant="contained" sx={{marginTop: '2%'}}>CHAT</Button>
        </div>
        <div>
          <Button
            variant="contained"
            sx={{marginTop: '2%'}}
            onClick={handleOpen}
          >
            Edit Profile
          </Button>

          <Button variant="contained" sx={{marginTop: 2}}>CHAT</Button>
          <ChatBox />

        </div>
      </div>
    </div>
  );
};

const Before = ({handleClick}) => {
  return (
    <div style={{marginTop: '2%'}}>
      <Button variant="contained" onClick={handleClick}>Follow</Button>
    </div>
  );
};

const After = ({handleClick}) => {
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
        onClick={handleClick}
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
