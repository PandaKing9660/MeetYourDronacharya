import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Components/Home/Home";
import AboutUs from "./Components/AboutUs/AboutUs";
import GoToHome from "./Components/Home/GoToHome";
import Footer from "./Components/Home/Footer";
import AskSomething from "./Components/AskSomething/AskSomething";
import Experience from "./Components/Experience/Experience";
import StudyMaterial from "./Components/Materials/StudyMaterial";
import TimeLine from "./Components/TimeLine/TimeLine";
import Dashboard from "./Components/Dashboard/Dashboard";
import FindMyself from "./Components/FindMyself/FindMyself";
import Login from "./Components/Login/Login";
import Signup from "./Components/Login/Signup";
import AskSomethingAnswer from "./Components/AskSomething/AskSomethingAnswer";
import Logout from "./Components/Login/Logout";
import "./App.css";
import Verify from "./Components/Login/Verify";
import ResetPassword from "./Components/Login/ResetPassword";
import UserAnswered from "./Components/Dashboard/UserAnswered";
import UserExperience from "./Components/Dashboard/UserExperience";
import UserQuestion from "./Components/Dashboard/UserQuestion";
import ChatBox from "./Components/Dashboard/ChatBox/ChatBox";
import UserFollowers from "./Components/Dashboard/UserFollowers";
import Guruji from "./Components/Guruji/Guruji";

/**
 * @brief added all other routers
 *
 * @returns Main app component
 */

function App() {
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
        <Route exact path="/dashboard/:user_id">
          <Dashboard />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/dashboard/:userId/user-experience">
          <UserExperience />
        </Route>
        <Route exact path="/dashboard/:userId/user-answer">
          <UserAnswered />
        </Route>
        <Route exact path="/dashboard/:userId/user-question">
          <UserQuestion />
        </Route>
        <Route exact path="/chatbox/:nameYou/:idYou/:roomName">
          <ChatBox />
        </Route>
        <Route exact path="/dashboard/:userId/user-followers">
          <UserFollowers />
        </Route>
        <Route exact path="/about-us">
          <AboutUs />
        </Route>
        <Route exact path="/find-myself">
          <FindMyself />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/logout">
          <Logout />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/verify/:email">
          <Verify />
        </Route>
        <Route exact path="/ask-something/:question_id">
          <AskSomethingAnswer />
        </Route>
        <Route exact path="/reset-password/:email">
          <ResetPassword />
        </Route>
        <Route exact path="/guruji">
          <Guruji />
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
