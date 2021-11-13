import Button from '@mui/material/Button';
import {useState} from 'react';
import sow from '../AboutUs/Photos/sow.png';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ChatBox from './ChatBox/ChatBox';

const Profile = ({userData}) => {
  console.log (userData);
  const [isFriendAdded, setIsHeartLiked] = useState (true);
  const handleClick = () => {
    setIsHeartLiked (!isFriendAdded);
  };
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
          Social Media: {userData.socialMedia.map (media => <p>{media}</p>)}
        </h3>
        <div style={{display: 'flex'}}>
          <BasicCard text="Followers" number={userData.followers.length} />
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
          <Button variant="contained" sx={{marginTop: 2}}>CHAT</Button>
          <ChatBox/>
        </div>
      </div>
    </div>
  );
};

const Before = () => {
  return (
    <div style={{marginTop: 15}}>
      <Button variant="contained">ADD FRIEND</Button>
    </div>
  );
};

const After = () => {
  return (
    <div style={{marginTop: 15}}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: 'green',
          '&:hover': {
            backgroundColor: 'green',
          },
        }}
      >
        Friend ADded
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
