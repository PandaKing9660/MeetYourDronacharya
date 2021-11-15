import {useEffect, useState} from 'react';
import axios from 'axios';
import NavBar from '../Home/Navbar/Navbar';
import './dashboard.scss';
import Profile from './Profile';
import CircularProgress from '@mui/material/CircularProgress';

import '../Materials/material.css';
import {useParams} from 'react-router-dom';

const Dashboard = () => {
  // finding id in the url
  const {user_id} = useParams ();

  const [loading, setLoading] = useState (true);
  const [userData, setUserData] = useState ({});

  useEffect (() => {
    setLoading (true);

    axios
      .post (`${process.env.REACT_APP_BACKEND_URL}/dashboard/get-user`, {
        userId: user_id,
      })
      .then (res => {
        setUserData (res.data[0]);
        
      })
      .catch (err => console.log (err));

    setTimeout (() => {
      setLoading (false);
    }, 2000);
  }, []);

  return (
    <div className="dashboard">
      <NavBar />
      {loading
        ? <CircularProgress />
        : <div>
            <h1
              className="heading"
              style={{marginTop: 25, marginBottom: 10, textAlign: 'center'}}
            >
              PROFILE
            </h1>
            <div style={{width: '90%'}}>
              <Profile style={{marginLeft: 'auto', marginRight: 'auto'}} userData={userData}/>
              <div style={{width: '110%', display: 'flex'}}>
                <Experience />
                <QuestionsAsked />
                <Answered />
              </div>
            </div>
          </div>}
    </div>
  );
};

const Experience = () => {
  return (
    <div className="card-container">
      <div className="card">
        <a href="worldweb">
          <div className="card--display">
            <i className="material-icons">public</i>
            <h2>Experience</h2>
          </div>
          <div className="card--hover">
            <h2>Experience</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at est orci. Nam molestie pellentesque mi nec lacinia.
            </p>
            <p className="link">Click to see project</p>
          </div>
        </a>
        <div className="card--border" />
      </div>
    </div>
  );
};

const QuestionsAsked = () => {
  return (
    <div className="card-container">
      <div className="card card--dark">
        <a href="phonesoff">
          <div className="card--display">
            <i className="material-icons">ring_volume</i>
            <h2>Questions asked</h2>
          </div>
          <div className="card--hover">
            <h2>Questions asked</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at est orci. Nam molestie pellentesque mi nec lacinia. Cras volutpat arcu sit amet elit sodales, nec volutpat velit bibendum.
            </p>
            <p className="link">Click to see project</p>
          </div>
        </a>
        <div className="card--border" />
      </div>
    </div>
  );
};

const Answered = () => {
  return (
    <div className="card-container">
      <div className="card">
        <a href="worldweb">
          <div className="card--display">
            <i className="material-icons">public</i>
            <h2>Answered</h2>
          </div>
          <div className="card--hover">
            <h2>Answered</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at est orci. Nam molestie pellentesque mi nec lacinia. Cras volutpat arcu sit amet elit sodales, nec volutpat velit bibendum.
            </p>
            <p className="link">Click to see project</p>
          </div>
        </a>
        <div className="card--border" />
      </div>
    </div>
  );
};

export default Dashboard;
