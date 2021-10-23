import "./aboutus.css";
import * as React from "react";
import { Grid, Divider } from "@mui/material";
import NavBar from '../Home/Navbar/Navbar';

import adi from "./Photos/adi.png";
import amit from "./Photos/amit.png";
import anu from "./Photos/anu.png";
import sow from "./Photos/sow.png";

function ActionAreaCard(props) {
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

const Aboutwebsite = () => {
  return (
    <div className="aboutwebsite_AboutUs">
      <h1>ABOUT WEBSITE</h1>
      <h3>Idea</h3>
      <p>
        Far far away, behind the word mountains, far from the countries Vokalia
        and Consonantia, there live the blind texts. Separated they live in
        Bookmarksgrove right at the coast of the Semantics, a large language
        ocean. A small river named Duden flows by their place and supplies it
        with the necessary regelialia. It is a paradisematic country, in which
        roasted parts of sentences fly into your mouth.
      </p>
      <Divider />
      <h3>How to contribute</h3>
      <p>
        Far far away, behind the word mountains, far from the countries Vokalia
        and Consonantia, there live the blind texts. Separated they live in
        Bookmarksgrove right at the coast of the Semantics, a large language
        ocean. A small river named Duden flows by their place and supplies it
        with the necessary regelialia. It is a paradisematic country, in which
        roasted parts of sentences fly into your mouth.
      </p>
      <Divider />
      <h3>Purpose</h3>
      <p>
        Far far away, behind the word mountains, far from the countries Vokalia
        and Consonantia, there live the blind texts. Separated they live in
        Bookmarksgrove right at the coast of the Semantics, a large language
        ocean. A small river named Duden flows by their place and supplies it
        with the necessary regelialia. It is a paradisematic country, in which
        roasted parts of sentences fly into your mouth.
      </p>
    </div>
  );
};

const AboutTeam = () => {
  return (
    <div className="aboutteam_AboutUs">
      <div className="team_AboutUs">
        <h1 className="mess_AboutUs">Contribute to spread experience!!!</h1>
        <Grid className="teampic_AboutUs" container justifyContent="flex-start" alignItems="center">
          <Grid item sm={12}>
            <h2> DEVELOPERS </h2>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ActionAreaCard
              photo={adi}
              name="Aditya Sharma"
              roll="CS19B001"
              text="Panda Sharma"
            />
            <ActionAreaCard
              photo={amit}
              name="Amit Kesari"
              roll="CS19B003"
              text="Robot"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ActionAreaCard
              photo={anu}
              name="Anu Anand Annu"
              roll="CS19B044"
              text="Billa"
            />
            <ActionAreaCard
              photo={sow}
              name="Emani Sowmya"
              roll="CS19B045"
              text="Somu Sowmya"
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const AboutUs = () => {
  return (
    <div className="aboutus_AboutUs">
      <NavBar />
      <Grid container spacing={2}>
        <Grid item sx={12} md={7}>
          <Aboutwebsite />
        </Grid>
        <Grid item sx={12} md={5}>
          <AboutTeam />
        </Grid>
      </Grid>
    </div>
  );
};

export default AboutUs;
