import './aboutus.css';
import * as React from 'react';
import {Grid, Divider} from '@mui/material';
import NavBar from '../Home/Navbar/Navbar';

import adi from './Photos/adi.jpg';
import amit from './Photos/amit.png';
import anu from './Photos/anu.jpg';
import sow from './Photos/sow.png';

// Action Card for displaying image
function ActionAreaCard (props) {
  return (
    <div className="us_AboutUs">
      <div className="image_AboutUs">
        <img src={props.photo} alt="profile" />
        <h3>{props.name}</h3>
        <p>{props.roll}</p>
        <p>{props.text}</p>
      </div>
    </div>
  );
}

// Displaying purpose of the website
const Aboutwebsite = () => {
  return (
    <div className="aboutwebsite_AboutUs">
      <h1 className="heading">ABOUT WEBSITE</h1>
      <div className="idea_AboutUs">
        <h3>Idea</h3>
        <p>
          Sadly, in our country many students do their graduation first and then
          think about their career of interest, because of this we are
          developing a working class which might be good at their work but not
          interested in it, so we are not able to innovate much as compared to
          other developed nations. The main goal of our website is to help
          someone with their career path as ACHARYA DRONACHARYA helped Arjun,
          and we will do it not just by ourselves but with the help of a
          community.
        </p>
      </div>
      <Divider />
      <div className="how_AboutUs">
        <h3>How to contribute</h3>
        <p>
          A student and an expert have to login first to contribute. Without
          login, anyone can only see the displayed data. A student can
          contribute by asking career related questions and uploading their
          study materials which can be used by other students. An expert can
          contribute by answering question of students and sharing their
          experiences. An expert can also add qestionset, answering which a
          student will get the most suitable career choice along with relative
          grading of other all career choices.
        </p>
      </div>
      <Divider />
      <div className="purpose_AboutUs">
        <h3>Purpose</h3>
        <p>
          We have developed a platform where one can come and do various
          activities such as asking doubts about their career as a student, add
          experience as an expert, share study material as a senior and discuss
          things as friends. We also have things such as a timeline for
          important events/exams and a page to find your career interest.
        </p>
      </div>
    </div>
  );
};

// Displaying a card showing a message and the developers
const AboutTeam = () => {
  return (
    <div className="aboutteam_AboutUs">
      <div className="team_AboutUs">
        <h1 className="mess_AboutUs">Contribute to spread experience!!!</h1>
        <Grid
          className="teampic_AboutUs"
          container
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item sm={12}>
            <h2 style={{textAlign: 'center', display: 'block'}}>
              {' '}
              DEVELOPERS{' '}
            </h2>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ActionAreaCard
              photo={adi}
              name="Aditya Sharma"
              roll="CS19B001"
              text="Avoid thinking about your career after B.Tech. It's late but not the end."
            />
            <ActionAreaCard
              photo={amit}
              name="Amit Kesari"
              roll="CS19B003"
              text="Don't let AI or society decide your future."
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ActionAreaCard
              photo={sow}
              name="Emani Sowmya"
              roll="CS19B045"
              text="Be faithful to yourself and decide your career which will interests you."
            />
            <ActionAreaCard
              photo={anu}
              name="Anu Anand Annu"
              roll="CS19B044"
              text="The one-liner of other three is written by me!!!"
            />

          </Grid>
        </Grid>
      </div>
    </div>
  );
};

// About US
const AboutUs = () => {
  return (
    <div className="aboutus_AboutUs">
      <NavBar noSearch={true} />
      <Grid container spacing={2}>
        <Grid item sm={12} md={7}>
          <Aboutwebsite />
        </Grid>
        <Grid item sm={12} md={5}>
          <AboutTeam />
        </Grid>
      </Grid>
    </div>
  );
};

export default AboutUs;
