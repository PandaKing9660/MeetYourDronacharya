import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../Home/Navbar/Navbar";
import "./dashboard.scss";
import Profile from "./Profile";
import Experience from "./Experience";
import Answered from "./Answered";
import QuestionsAsked from "./QuestionsAsked";
import {
  Typography,
  CircularProgress,
  CardMedia,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
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

    // Getting user from the backend
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/dashboard/get-user`, {
        userId: to_send,
      })
      .then((res) => {
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
  };

  return (
    <div>
      <NavBar noSearch={true} />

      {loading ? (
        <CircularProgress /> // Showing progress till rendered
      ) : userMsg ? ( // If not logged in
        <Grid container>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <CardMedia
                  component="img"
                  height="470vh"
                  image={
                    "https://st2.depositphotos.com/1037178/7669/v/600/depositphotos_76695295-stock-illustration-concentrating-maharishi-vishvamitra-hindu-saint.jpg"
                  }
                  alt="Guru Dronacharya"
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} md={8}>
            <Typography
              variant="h2"
              color="text.secondary"
              gutterBottom
              sx={{
                textAlign: "center",
                padding: "auto",
              }}
            >
              {userMsg}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        // If logged in
        <div>
          <h1
            className="heading"
            style={{ marginTop: 25, marginBottom: 10, textAlign: "center" }}
          >
            PROFILE
          </h1>
          {/* Profile of the user  */}
          <div style={{ width: "100%" }}>
            <Profile
              style={{ marginLeft: "auto", marginRight: "auto" }}
              userData={userData}
              handleEdit={handleEdit}
            />
            <div
              style={{
                width: "95%",
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                paddingRight: "2%",
              }}
            >
              {/* Cards to display contribution of the user  */}
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
