import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './Components/Home/Navbar';
import Home from './Components/Home/Home';
import AboutUs from './Components/Home/AboutUs';
import GoToHome from './Components/Home/GoToHome';
import Footer from './Components/Home/Footer';
import AskSomething from './Components/AskSomething/AskSomething';
import Experience from './Components/Experience/Experience';
import StudyMaterial from './Components/Materials/StudyMaterial';
import TimeLine from './Components/TimeLine/TimeLine';
import UserInfo from './Components/UserPage/UserInfo';

function App () {
  return (
    <Router>
      <Route>
        <NavBar />
      </Route>
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
        <Route exact path="/user-info">
          <UserInfo />
        </Route>
        <Route exact path="/about-us">
          <AboutUs />
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
