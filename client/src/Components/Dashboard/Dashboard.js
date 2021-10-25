import NavBar from '../Home/Navbar/Navbar';
import "./dashboard.scss"
import { useState } from 'react';
import sow from "../AboutUs/Photos/sow.png";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '../Materials/material.css'

const Dashboard = () => {
  return (
    <div>
      <NavBar />
      <h1 className="heading" style={{marginTop:25,marginBottom:10,textAlign:'center'}}>PROFILE</h1>
      <div style={{width:"90%"}}>
      <Profile style={{marginLeft:'auto',marginRight:'auto'}}/>
      <div style={{width:'110%',display:'flex'}}>
      <Experience />
      <QuestionsAsked />
      <Answered />
      </div>
      </div>
    </div>
  );
};

const Profile = () =>{
   const [isFriendAdded, setIsHeartLiked] = useState(true);
  const handleClick = () => {
        setIsHeartLiked(!isFriendAdded);
    };
  return(
    <div className="card__collection clear-fix" style={{display:'flex'}}>
      <div className="cards cards--two">
          <img src={sow} className="img-responsive" alt="Cards Image" />
          <span className="cards--two__rect"></span>
          <span className="cards--two__tri"></span>
          <p>Sowmya</p>
      </div>
      <div style={{width:'100%',textAlign:'right'}}>
        <h3>Name: Sowmya</h3>
        <h3>Email: cs19uwth@gmail.com</h3>
        <h3>Social Media: cs19uwth@gmail.com</h3>
        <div style={{display:'flex'}}>
          <BasicCard text="Likes" number="45" />
          <BasicCard text="Questions answered" number="2" />
          <BasicCard text="Asked questions" number="5" />
          <BasicCard text="Experiences shared" number="9" />
        </div>
          <div 
          onClick={handleClick}
                >
                    {isFriendAdded ? 
                    (<Before />)
                         :
                          ( <After />)}
          </div>
          <div>
          <Button variant="contained" sx={{marginTop:2}}>CHAT</Button>
          </div>
      </div>
    </div>
  );
};

const Before = () =>{
  return(
       <div style={{marginTop:15}}>
           <Button variant="contained">ADD FRIEND</Button>
       </div>
  );
};

const After = () =>{
  return(
       <div style={{marginTop:15}}>
           <Button variant="contained" sx={{
             backgroundColor:"green",
              '&:hover': {
                backgroundColor: "green",
              }
          }}>Friend ADded</Button>
       </div>
  );
};

const Experience = () =>{
  return(
      <div className="card-container"> 
        <div className="card"><a href="worldweb">
            <div className="card--display"><i className="material-icons">public</i>
              <h2>Experience</h2>
            </div>
            <div className="card--hover">
              <h2>Experience</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at est orci. Nam molestie pellentesque mi nec lacinia. Cras volutpat arcu sit amet elit sodales, nec volutpat velit bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at est orci. Nam molestie pellentesque mi nec lacinia.  volutpat velit bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at est orci. Nam molestie pellentesque mi nec lacinia. volutpat velit bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at est orci. Nam molestie pellentesque mi nec lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at est orci. Nam molestie pellentesque mi nec lacinia. Cras volutpat arcu sit amet elit sodales, nec volutpat velit bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at est orci. Nam molestie pellentesque mi nec lacinia.  volutpat velit bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at est orci. Nam molestie pellentesque mi nec lacinia. volutpat velit bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at est orci. Nam molestie pellentesque mi nec lacinia.</p>
              <p className="link">Click to see project</p>
            </div></a>
          <div className="card--border"></div>
        </div>
      </div>
  );
};

const QuestionsAsked = ()=>{
   return(
       <div className="card-container"> 
        <div className="card card--dark"><a href="phonesoff">
            <div className="card--display"><i className="material-icons">ring_volume</i>
              <h2>Questions asked</h2>
            </div>
            <div className="card--hover">
              <h2>Questions asked</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at est orci. Nam molestie pellentesque mi nec lacinia. Cras volutpat arcu sit amet elit sodales, nec volutpat velit bibendum.</p>
              <p className="link">Click to see project</p>
            </div></a>
          <div className="card--border"></div>
        </div>
      </div>
   );
};

const Answered = () =>{
  return(
      <div className="card-container"> 
        <div className="card"><a href="worldweb">
            <div className="card--display"><i className="material-icons">public</i>
              <h2>Answered</h2>
            </div>
            <div className="card--hover">
              <h2>Answered</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at est orci. Nam molestie pellentesque mi nec lacinia. Cras volutpat arcu sit amet elit sodales, nec volutpat velit bibendum.</p>
              <p className="link">Click to see project</p>
            </div></a>
          <div className="card--border"></div>
        </div>
      </div>
  );
};


function BasicCard(props) {
  return (
    <Card sx={{width:100,height:100,paddingRight:5,marginLeft:5,marginTop:6}}>
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


export default Dashboard;