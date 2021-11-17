import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../Home/Navbar/Navbar";
import "./dashboard.scss";
import Profile from "./Profile";
import Experience from "./Experience";
import Answered from "./Answered";
import QuestionsAsked from "./QuestionsAsked";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import "../Materials/material.css";
import { useParams } from "react-router-dom";
import Followers from "./Followers";

const Dashboard = () => {
  // finding id in the url
  const { user_id } = useParams();

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [userMsg, setUserMsg] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    setLoading(true);
    if (!user && !user_id) {
      setUserMsg("Login to see profile");
      setLoading(false);
      return;
    }
    if (user && user._id === user_id) {
      window.location = process.env.REACT_APP_FRONTEND_URL + "/dashboard";
    }
    const to_send = user_id ? user_id : user ? user._id : "-1";

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/dashboard/get-user`, {
        userId: to_send,
      })
      .then((res) => {
        console.log(res.data.length);
        if (res.data.length === 0) {
          if (user_id) setUserMsg("No User Found");
          else setUserMsg("Login to see profile");
        } else {
          setUserData(res.data[0]);
        }
      })
      .catch((err) => console.log(err));

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleEdit = () => {
    console.log("helo sire i m here");
  };

  return (
    <div>
      <NavBar />

      {loading ? (
        <CircularProgress />
      ) : userMsg ? (
        <Typography
          sx={{ mb: 1.5, fontSize: "0.91rem" }}
          color="text.secondary"
        >
          {userMsg}
        </Typography>
      ) : (
        <div>
          <h1
            className="heading"
            style={{ marginTop: 25, marginBottom: 10, textAlign: "center" }}
          >
            PROFILE
          </h1>
          <div style={{ width: "100%" }}>
            <Profile
              style={{ marginLeft: "auto", marginRight: "auto" }}
              userData={userData}
              handleEdit={handleEdit}
            />
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Experience id={userData._id} current_profile={user_id} />
              <QuestionsAsked id={userData._id} current_profile={user_id} />
              <Answered id={userData._id} current_profile={user_id} />
              <Followers id={userData._id} current_profile={user_id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
