import React, {useState, useEffect} from 'react';
import axios from 'axios';
import dompurify from 'dompurify';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import {Link} from 'react-router-dom';

import EditorAndPreview from './EditorAndPreview';
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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CardQuestion = ({quesData, showAnswer}) => {
  const sanitizer = dompurify.sanitize;
  const user = JSON.parse (localStorage.getItem ('profile'));
  const [likes, setLike] = useState (quesData.liked.length);
  const [dislikes, setDislike] = useState (quesData.disliked.length);
  const [userStatus, setUserStatus] = useState ('none');
  const [numAnswers, setNumAnswers] = useState (quesData.answers.length);
  const [open, setOpen] = useState (false);
  const handleOpen = () =>
    user ? setOpen (true) : alert ('Login to ask question');
  const handleClose = () => setOpen (false);

  // Retrieving Questions from backend
  useEffect (
    () => {
      if (!user) {
        return;
      }
      // console.log (quesData);
      axios
        .post (
          `${process.env.REACT_APP_BACKEND_URL}/ask-something/question/check`,
          {
            userId: user._id,
            questionId: quesData._id,
          }
        )
        .then (res => {
          setUserStatus (res.data);
        })
        .catch (err => console.log (err));
    },
    [quesData._id]
  );

  // Adding like to questions and storing it in backend
  const AddLikes = (userId, questionId) => {
    if (!user) {
      alert ('Please login to like this question');
      return;
    }

    if (userStatus === 'liked') {
      return;
    }
    axios
      .put (
        `${process.env.REACT_APP_BACKEND_URL}/ask-something/question/addLike`,
        {
          userId,
          questionId,
        }
      )
      .then (res => {
        setLike (likes + 1);
        if (userStatus === 'disliked') {
          setDislike (dislikes - 1);
        }
        setUserStatus ('liked');
      });
  };

  // Adding dislike to questions and storing it in backend
  const AddDislikes = (userId, questionId) => {
    if (!user) {
      alert ('Please login to like this question');
      return;
    }

    if (userStatus === 'disliked') {
      return;
    }
    axios
      .put (
        `${process.env.REACT_APP_BACKEND_URL}/ask-something/question/addDisLike`,
        {
          userId,
          questionId,
        }
      )
      .then (res => {
        setDislike (dislikes + 1);
        if (userStatus === 'liked') {
          setLike (likes - 1);
        }
        setUserStatus ('disliked');
      });
  };

  return (
    <div>
      <Paper sx={{p: 0, margin: '1em', minWidth: 300, flexGrow: 1}}>
        <Box
          p={1}
          marginY={{xs: '1em', md: '0.2em'}}
          //  This will change margin on `sm` and `md`
        >
          <CardContent>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item align="left">
                <Typography
                  variant="h5"
                  component="div"
                  sx={{textDecoration: 'underline'}}
                >
                  {quesData.title}
                </Typography>
                <Typography
                  sx={{mb: 1.5, fontSize: '0.91rem'}}
                  color="text.secondary"
                >
                  {quesData.time.split ('T')[0]}
                </Typography>
              </Grid>

              <Grid
                item
                sx={{
                  textTransform: 'uppercase',
                  display: 'flex',
                }}
                align="right"
              >
              
                <Link to={`/dashboard/${quesData.by}`}>
                <CardHeader
                  avatar={
                    <Avatar
                      alt={`${quesData.userName}`}
                      src={`${quesData.userImage}`}
                    />
                  }
                  titleTypographyProps={{
                    variant: 'body2',
                    color: 'green',
                    align: 'right',
                  }}
                  title={quesData.userName}
                  // subheader="September 14, 2016"
                />
                </Link>
              </Grid>
            </Grid>

            <Typography variant="body2" align="justify">
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizer (quesData.question),
                }}
                style={{padding: '1%'}}
              />
            </Typography>
          </CardContent>

          <CardActions sx={{justifyContent: 'flex-end'}}>
            {showAnswer &&
              <Button
                variant="outlined"
                color="primary"
                title="Check answers"
                sx={{textTransform: 'capitalize'}}
                onClick={() =>
                  localStorage.setItem ('id', JSON.stringify (quesData._id))}
              >
                <Link to={`/ask-something/${quesData._id}`} style={{textDecoration:"none"}} >
                  {numAnswers + '  '}
                  Answers
                </Link>
              </Button>}
            <Button
              variant="outlined"
              color="success"
              title="Liked it"
              onClick={() => {
                AddLikes (user ? user._id : 0, quesData._id);
              }}
            >
              {likes}
              {userStatus === 'none'
                ? <ThumbUpOffAltIcon />
                : userStatus === 'disliked'
                    ? <ThumbUpOffAltIcon />
                    : <ThumbUpIcon />}
            </Button>
            <Button
              variant="outlined"
              color="error"
              title="Disliked it"
              onClick={() => {
                AddDislikes (user ? user._id : 0, quesData._id);
              }}
            >
              {userStatus === 'none'
                ? <ThumbDownOffAltIcon />
                : userStatus === 'liked'
                    ? <ThumbDownOffAltIcon />
                    : <ThumbDownIcon />}

              {dislikes}
            </Button>

            <Button
              onClick={handleOpen}
              variant="outlined"
              color="primary"
              title="Answer the question"
              sx={{
                float: 'right',
                marginRight: '1%',
                textTransform: 'capitalize',
              }}
            >
              Answer
            </Button>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              disableEnforceFocus={true}
            >
              <Box sx={style}>
                <EditorAndPreview option="answer" question_id={quesData._id} />
              </Box>
            </Modal>
          </CardActions>
        </Box>
      </Paper>
    </div>
  );
};

export default CardQuestion;
