import React, { useState } from "react";

import { styled } from "@mui/material/styles";

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
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
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

const ExamCard = ({ cardData }) => {
  const [expanded, setExpanded] = useState(false);
  const [isBookMarked, setisBookMarked] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleHeartClick = () => {
    setisBookMarked(!isBookMarked);
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
              <BookmarkIcon style={{ color: "green" }} />
            )}
          </IconButton>
        </Tooltip>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
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
