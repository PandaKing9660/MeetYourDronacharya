import NavBar from '../Home/Navbar/Navbar';
import "./dashboard.scss"
import sow from "../AboutUs/Photos/sow.png";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Dashboard = () => {
  return (
    <div>
      <NavBar />
      <div style={{width:"90%",marginLeft:'auto',marginRight:'auto'}}>
      <Profile />
      <Experience />
      <QuestionsAsked />
      <Answered />
      </div>
    </div>
  );
};

const Profile = () =>{
  return(
    <div class="card__collection clear-fix" style={{display:'flex'}}>
      <div class="cards cards--two">
          <img src={sow} class="img-responsive" alt="Cards Image" />
          <span class="cards--two__rect"></span>
          <span class="cards--two__tri"></span>
          <p>Sowmya</p>
      </div>
      <div style={{width:'100%',textAlign:'right'}}>
        <h2>Profile</h2>
        <h3>Name: Sowmya</h3>
        <h3>Email: cs19uwth@gmail.com</h3>
        <h3>Social Media: cs19uwth@gmail.com</h3>
        <div style={{display:'flex'}}>
          <BasicCard text="Likes" number="45" />
          <BasicCard text="Questions answered" number="2" />
          <BasicCard text="Asked questions" number="5" />
          <BasicCard text="Experiences shared" number="9" />
        </div>
        
          <Button variant="contained" sx={{marginTop:3}}>ADD FRIEND</Button>
          <div>
          <Button variant="contained" sx={{marginTop:2}}>CHAT</Button>
          </div>
      </div>
    </div>
  );
};

const Experience = () =>{
  return(
      <div class="card-container"> 
        <div class="card"><a href="worldweb">
            <div class="card--display"><i class="material-icons">public</i>
              <h2>Experience</h2>
            </div>
            <div class="card--hover">
              <h2>Experience</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at est orci. Nam molestie pellentesque mi nec lacinia. Cras volutpat arcu sit amet elit sodales, nec volutpat velit bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at est orci. Nam molestie pellentesque mi nec lacinia.  volutpat velit bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at est orci. Nam molestie pellentesque mi nec lacinia. volutpat velit bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at est orci. Nam molestie pellentesque mi nec lacinia.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at est orci. Nam molestie pellentesque mi nec lacinia. Cras volutpat arcu sit amet elit sodales, nec volutpat velit bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at est orci. Nam molestie pellentesque mi nec lacinia.  volutpat velit bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at est orci. Nam molestie pellentesque mi nec lacinia. volutpat velit bibendum.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at est orci. Nam molestie pellentesque mi nec lacinia.</p>
              <p class="link">Click to see project</p>
            </div></a>
          <div class="card--border"></div>
        </div>
      </div>
  );
};

const QuestionsAsked = ()=>{
   return(
       <div class="card-container"> 
        <div class="card card--dark"><a href="phonesoff">
            <div class="card--display"><i class="material-icons">ring_volume</i>
              <h2>Questions asked</h2>
            </div>
            <div class="card--hover">
              <h2>Questions asked</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at est orci. Nam molestie pellentesque mi nec lacinia. Cras volutpat arcu sit amet elit sodales, nec volutpat velit bibendum.</p>
              <p class="link">Click to see project</p>
            </div></a>
          <div class="card--border"></div>
        </div>
      </div>
   );
};

const Answered = () =>{
  return(
      <div class="card-container"> 
        <div class="card"><a href="worldweb">
            <div class="card--display"><i class="material-icons">public</i>
              <h2>Answered</h2>
            </div>
            <div class="card--hover">
              <h2>Answered</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at est orci. Nam molestie pellentesque mi nec lacinia. Cras volutpat arcu sit amet elit sodales, nec volutpat velit bibendum.</p>
              <p class="link">Click to see project</p>
            </div></a>
          <div class="card--border"></div>
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