import React, { useState, useEffect } from "react";
import axios from "axios";
import dompurify from "dompurify";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import AddCommentRoundedIcon from "@mui/icons-material/AddCommentRounded";
import { Link } from "react-router-dom";

import EditorAndPreview from "./EditorAndPreview";
import {
    Button,
    CardActions,
    Modal,
    Grid,
    Typography,
    Avatar,
    CardContent,
    CardHeader,
    Box,
    Paper,
} from '@mui/material';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

toast.configure();

// Style for the webpage
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CardQuestion = ({ quesData, showAnswer }) => {
    const sanitizer = dompurify.sanitize;
    const user = JSON.parse(localStorage.getItem('profile'));
    const [likes, setLike] = useState(quesData?.liked?.length);
    const [dislikes, setDislike] = useState(quesData?.disliked?.length);
    const [userStatus, setUserStatus] = useState('none');
    const [numAnswers, setNumAnswers] = useState(quesData?.answers?.length);
    const [open, setOpen] = useState(false);
    const handleOpen = () =>
        user ? setOpen(true) : toast.error('Login to ask question');
    const handleClose = () => setOpen(false);

  // Retrieving Questions from backend
  useEffect(() => {
    if (!user) {
      return;
    }
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/ask-something/question/check`,
        {
          userId: user._id,
          questionId: quesData?._id,
        }
      )
      .then((res) => {
        setUserStatus(res.data);
      })
      .catch((err) => console.log(err));
  }, [quesData?._id]);

    // Adding like to questions and storing it in backend
    const AddLikes = (userId, questionId) => {
        if (!user) {
            toast.error('Please login to like this question');
            return;
        }

    if (userStatus === "liked") {
      return;
    }
    axios
      .put(
          `${process.env.REACT_APP_BACKEND_URL}/ask-something/question/addLike`,
          {
              userId,
              questionId,
          }
      )
      .then((res) => {
          setLike(likes + 1);
          if (userStatus === 'disliked') {
              setDislike(dislikes - 1);
          }
          setUserStatus('liked');
      });
    };

    // Adding dislike to questions and storing it in backend
    const AddDislikes = (userId, questionId) => {
        if (!user) {
            toast.error('Please login to dislike this question');
            return;
        }
        setUserStatus("liked");
      };
 
  return (
    <div>
      {/* if spam is detected, grey it out and disable functionalities */}
      {quesData?.isSpam === true ? (
        <Paper
          sx={{
            p: 0,
            margin: "1em",
            minWidth: 300,
            flexGrow: 1,
            background: "#f0564a",
            opacity: 0.8,
          }}
        >
          <Box
            p={1}
            marginY={{ xs: "1em", md: "0.2em" }}
            //  This will change margin on `sm` and `md`
          >
            {/* spam warning */}
            <Typography
              sx={{ mb: 1.5, fontSize: "0.91rem" }}
              color="text.secondary"
            >
              <i> Spam Detected</i>
            </Typography>
            <CardContent>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                {/* put in link for going to all answers */}
                <Link
                  to={`/ask-something/${quesData?._id}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <Grid item align="left">
                    <Typography variant="h5" component="div">
                      {quesData?.title}
                    </Typography>
                    <Typography
                      sx={{
                        mb: 1.5,
                        fontSize: "0.91rem",
                      }}
                      color="text.secondary"
                    >
                      {quesData?.time.split("T")[0]}
                    </Typography>
                  </Grid>
                </Link>

                {/* avatar and user details */}
                <Grid
                  item
                  sx={{
                    textTransform: "uppercase",
                    display: "flex",
                  }}
                  align="right"
                >
                  <Link
                    to={`/dashboard/${quesData?.by}`}
                    style={{ textDecoration: "none" }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar
                          alt={`${quesData?.userName}`}
                          src={`${quesData?.userImage}`}
                        />
                      }
                      titleTypographyProps={{
                        variant: "body2",
                        color: "green",
                        align: "right",
                      }}
                      title={quesData?.userName}
                      // subheader="September 14, 2016"
                    />
                  </Link>
                </Grid>
              </Grid>

              <Typography variant="body2" align="justify">
                <div
                  dangerouslySetInnerHTML={{
                    __html: sanitizer(quesData?.question),
                  }}
                  style={{ padding: "1%" }}
                />
              </Typography>
            </CardContent>

            {/* Action buttons, disabled*/}

            <CardActions sx={{ justifyContent: "flex-end" }}>
              {showAnswer && (
                <Button
                  variant="outlined"
                  color="primary"
                  title="Check answers"
                  disabled
                  sx={{ textTransform: "capitalize" }}
                  onClick={() =>
                    localStorage.setItem("id", JSON.stringify(quesData?._id))
                  }
                >
                  <Link
                    to={`/ask-something/${quesData?._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <QuestionAnswerRoundedIcon />
                    {numAnswers}
                  </Link>
                </Button>
              )}

              {/* likes and dislikes buttons , disabled*/}
              <Button
                variant="outlined"
                color="success"
                title="Liked it"
                disabled
                onClick={() => {
                  AddLikes(user ? user._id : 0, quesData?._id);
                }}
              >
                {userStatus === "none" ? (
                  <ThumbUpOffAltIcon />
                ) : userStatus === "disliked" ? (
                  <ThumbUpOffAltIcon />
                ) : (
                  <ThumbUpIcon />
                )}
                {likes}
              </Button>
              <Button
                variant="outlined"
                color="error"
                title="Disliked it"
                disabled
                onClick={() => {
                  AddDislikes(user ? user._id : 0, quesData?._id);
                }}
              >
                {userStatus === "none" ? (
                  <ThumbDownOffAltIcon />
                ) : userStatus === "liked" ? (
                  <ThumbDownOffAltIcon />
                ) : (
                  <ThumbDownIcon />
                )}

                {dislikes}
              </Button>

              {/* open for answering */}
              <Button
                onClick={handleOpen}
                variant="outlined"
                color="primary"
                disabled
                title="Answer the question"
                sx={{
                  float: "right",
                  marginRight: "1%",
                  textTransform: "capitalize",
                }}
              >
                <AddCommentRoundedIcon />
              </Button>

              {/* editor and preview modal , but disabled*/}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableEnforceFocus={true}
              >
                <Box sx={style}>
                  <EditorAndPreview
                    option="answer"
                    question_id={quesData?._id}
                  />
                </Box>
              </Modal>
            </CardActions>
          </Box>
        </Paper>
      ) : (
        // if not spam is detected, keep it normal

        <Paper sx={{ p: 0, margin: "1em", minWidth: 300, flexGrow: 1 }}>
          <Box p={1} marginY={{ xs: "1em", md: "0.2em" }}>
            <CardContent>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                {/* put in link for going to all answers */}
                <Link
                  to={`/ask-something/${quesData?._id}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <Grid item align="left">
                    <Typography variant="h5" component="div">
                      {quesData.title}
                    </Typography>
                    <Typography
                      sx={{
                        mb: 1.5,
                        fontSize: "0.91rem",
                      }}
                      color="text.secondary"
                    >
                      {quesData.time.split("T")[0]}
                    </Typography>
                  </Grid>
                </Link>

                {/* right side avatar and data display */}
                <Grid
                  item
                  sx={{
                    textTransform: "uppercase",
                    display: "flex",
                  }}
                  align="right"
                >
                  <Link
                    to={`/dashboard/${quesData.by}`}
                    style={{ textDecoration: "none" }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar
                          alt={`${quesData.userName}`}
                          src={`${quesData.userImage}`}
                        />
                      }
                      titleTypographyProps={{
                        variant: "body2",
                        color: "green",
                        align: "right",
                      }}
                      title={quesData.userName}
                      // subheader="September 14, 2016"
                    />
                  </Link>
                </Grid>
              </Grid>

              {/* question content display and render */}
              <Typography variant="body2" align="justify">
                <div
                  dangerouslySetInnerHTML={{
                    __html: sanitizer(quesData.question),
                  }}
                  style={{ padding: "1%" }}
                />
              </Typography>
            </CardContent>

            {/* Action buttons */}
            <CardActions sx={{ justifyContent: "flex-end" }}>
              {showAnswer && (
                <Button
                  variant="outlined"
                  color="primary"
                  title="Check answers"
                  sx={{ textTransform: "capitalize" }}
                  onClick={() =>
                    localStorage.setItem("id", JSON.stringify(quesData._id))
                  }
                >
                  {/* Link to all answers */}
                  <Link
                    to={`/ask-something/${quesData._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <QuestionAnswerRoundedIcon />
                    {numAnswers}
                  </Link>
                </Button>
              )}
              {/* like and dislikes */}
              <Button
                variant="outlined"
                color="success"
                title="Liked it"
                onClick={() => {
                  AddLikes(user ? user._id : 0, quesData._id);
                }}
              >
                {userStatus === "none" ? (
                  <ThumbUpOffAltIcon />
                ) : userStatus === "disliked" ? (
                  <ThumbUpOffAltIcon />
                ) : (
                  <ThumbUpIcon />
                )}
                {likes}
              </Button>
              <Button
                variant="outlined"
                color="error"
                title="Disliked it"
                onClick={() => {
                  AddDislikes(user ? user._id : 0, quesData._id);
                }}
              >
                {userStatus === "none" ? (
                  <ThumbDownOffAltIcon />
                ) : userStatus === "liked" ? (
                  <ThumbDownOffAltIcon />
                ) : (
                  <ThumbDownIcon />
                )}

                {dislikes}
              </Button>

              {/* comments */}
              <Button
                onClick={handleOpen}
                variant="outlined"
                color="primary"
                title="Answer the question"
                sx={{
                  float: "right",
                  marginRight: "1%",
                  textTransform: "capitalize",
                }}
              >
                <AddCommentRoundedIcon />
              </Button>
              {/* editor and preview modal */}

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableEnforceFocus={true}
              >
                <Box sx={style}>
                  <EditorAndPreview
                    option="answer"
                    question_id={quesData._id}
                  />
                </Box>
              </Modal>
            </CardActions>
          </Box>
        </Paper>
      )}
    </div>
  );
};

export default CardQuestion;
