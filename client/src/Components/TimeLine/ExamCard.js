import React, { useState, useEffect } from "react";

import { styled } from "@mui/material/styles";
import axios from "axios";
import dompurify from "dompurify";
import {
  Tooltip,
  Collapse,
  CardActions,
  CardContent,
  CardMedia,
  CardHeader,
  Card,
  Zoom,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
//import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
//import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import EventsInExam from "./EventsInExam";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

//card for showing the details of exam
const ExamCard = ({ cardData, cardId }) => {
  const sanitizer = dompurify.sanitize;

  const user = JSON.parse(localStorage.getItem("profile"));
  const [isBookMarked, setisBookMarked] = useState(false);
  useEffect(() => {
    if (user) {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/dashboard/get-user`, {
          userId: user._id,
        })
        .then((res) => {
          if (res.data[0].bookmarked[cardId] === "T") setisBookMarked(true);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const [expanded, setExpanded] = useState(false);

  //console.log(user.bookmarked);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleHeartClick = () => {
    setisBookMarked(!isBookMarked);
  };

  const AddBookmark = () => {
    if (!user) {
      alert("Please login to save bookmark");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/dashboard/addTimeline`, {
        userId : user._id,
        timelineNo: cardId,
      })
      .then((res) => {});
  };

  const DeleteBookmark = (userId, timelineNo) => {
    if (!user) {
      alert("Please login to save bookmark");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/dashboard/delTimeline`, {
        userId,
        timelineNo: cardId,
      })
      .then((res) => {});
  };

  return (
    <Card sx={{ minWidth: 300 }}>
      <CardHeader title={cardData.name} subheader={cardData.events[0].date} />
      <CardMedia>
        <img
          src={cardData.imgLink}
          alt="exam thumbnail"
          style={{ width: "100%", height: "20em" }}
        />
      </CardMedia>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {cardData.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip TransitionComponent={Zoom} title="BookMark" placement="top">
          <IconButton aria-label="add to favorites" onClick={handleHeartClick}>
            {!isBookMarked ? (
              <BookmarkIcon />
            ) : (
              <BookmarkIcon
                style={{ color: "green" }}
                onClick={AddBookmark()}
              />
            )}
          </IconButton>
        </Tooltip>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ padding: "1px" }}>
          <Typography paragraph>Timeline:</Typography>
          <EventsInExam eventsData={cardData.events} />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ExamCard;
