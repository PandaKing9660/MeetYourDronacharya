import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './Components/Home/Navbar/Navbar';
import Home from './Components/Home/Home';
import AboutUs from './Components/AboutUs/AboutUs';
import GoToHome from './Components/Home/GoToHome';
import Footer from './Components/Home/Footer';
import AskSomething from './Components/AskSomething/AskSomething';
import Experience from './Components/Experience/Experience';
import StudyMaterial from './Components/Materials/StudyMaterial';
import TimeLine from './Components/TimeLine/TimeLine';
import Dashboard from './Components/Dashboard/Dashboard';
import FindMyself from './Components/FindMyself/FindMyself';
import Login from './Components/login/login';
import Signup from './Components/login/signup';
// import "./app.css";


/**
 * @brief added all other routers
 * 
 * @returns Main app component
 */

function App () {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/ask-something">
          <AskSomething />
        </Route>
        <Route exact path="/experience">
          <Experience />
        </Route>
        <Route exact path="/study-material">
          <StudyMaterial />
        </Route>
        <Route exact path="/timeline">
          <TimeLine />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/about-us">
          <AboutUs />
        </Route>
        <Route exact path="/find-myself">
          <FindMyself />
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="/signup" >
<Signup/>
        </Route>

        <Route path="/*">
          <GoToHome />
        </Route>
      </Switch>
      <Route>
        <Footer />
      </Route>
    </Router>
  );
}

export default App;
