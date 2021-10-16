import './aboutus.css';
import * as React from 'react';
import adi from './Photos/adi.png'
import amit from './Photos/amit.png'
import anu from './Photos/anu.png'
import sow from './Photos/sow.png'


function ActionAreaCard(props) {
  return (
    <div className="photos">
        <img src={props.photo} height={200} alt="profile" />
       <h3>{props.text} <br /> {props.roll}</h3>
    </div>
  );
};

const Aboutwebsite = () => {
   return(
        <div className = "website">
          <h1>ABOUT WEBSITE</h1>
        </div>
   );
}

const Names = () => {
  return(
        <div className  = "names">
          <h2 style={{color:"white"}}> DEVELOPERS </h2>
          <ActionAreaCard photo={adi} text="Adiya Sharma" roll="CS19B001"/>
          <ActionAreaCard photo={amit} text="Amit Kesari" roll="CS19B003"/>
          <ActionAreaCard photo={anu} text="Anu Anand Annu" roll="CS19B044"/>
          <ActionAreaCard photo={sow} text="Emani Sowmya" roll="CS19B045"/>
        </div>
  );
}

const AboutUs = () => {
  return (
    <div className = "main">
      <Aboutwebsite/>
      <Names/>
    </div>
  );
};

export default AboutUs;
