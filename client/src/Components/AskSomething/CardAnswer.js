import React, {useState, useEffect} from 'react';
import axios from 'axios';
import dompurify from 'dompurify';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

import {
  Button,
  CardActions,
  Grid,
  Typography,
  Avatar,
  CardContent,
  CardHeader,
  Box,
  Paper,
} from '@mui/material';

const CardAnswer = ({ansData}) => {
  const sanitizer = dompurify.sanitize;

  const user = JSON.parse (localStorage.getItem ('profile'));
  const [likes, setLike] = useState (ansData.liked.length);
  const [dislikes, setDislike] = useState (ansData.disliked.length);

  const [userStatus, setUserStatus] = useState ('none');

  useEffect (
    () => {
      if (!user) {
        return;
      }

      axios
        .post (`${process.env.BACKEND_URL}/ask-something/answer/check`, {
          userId: user._id,
          answerId: ansData._id,
        })
        .then (res => {
          setUserStatus (res.data);
        })
        .catch (err => console.log (err));
    },
    [ansData._id]
  );

  const AddLikes = (userId, answerId) => {
    if (!user) {
      alert ('Please login to like this answer');
      return;
    }

    if (userStatus === 'liked') {
      return;
    }
    axios
      .put (`${process.env.BACKEND_URL}/ask-something/answer/addLike`, {
        userId,
        answerId,
      })
      .then (res => {
        setLike (likes + 1);
        if (userStatus === 'disliked') {
          setDislike (dislikes - 1);
        }
        setUserStatus ('liked');
      });
  };

  const AddDislikes = (userId, answerId) => {
    if (!user) {
      alert ('Please login to like this answer');
      return;
    }

    if (userStatus === 'disliked') {
      return;
    }
    axios
      .put (`${process.env.BACKEND_URL}/ask-something/answer/addDisLike`, {
        userId,
        answerId,
      })
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
          // color={{ xs: 'red', sm: 'blue', md: 'green' }}
          marginY={{xs: '1em', md: '0.2em'}}
          //  This will change margin on `sm` and `md`
        >
          <CardContent>
            <Grid
              container
              // rowSpacing={1}
              // columnSpacing={{ xs: 1, sm: 2, md: 4 }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item align="left">
                <Typography
                  variant="h5"
                  component="div"
                  sx={{textDecoration: 'underline'}}
                >
                  {ansData.title}
                </Typography>
                <Typography
                  sx={{mb: 1.5, fontSize: '0.91rem'}}
                  color="text.secondary"
                >
                  {ansData.time.split ('T')[0]}
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
                {/* right floating avatar and name of author */}
                <CardHeader
                  avatar={
                    <Avatar
                      alt={`${ansData.userName}`}
                      src={`${ansData.userImage}`}
                    />
                  }
                  titleTypographyProps={{
                    variant: 'body2',
                    color: 'green',
                    align: 'right',
                  }}
                  title={ansData.userName}
                  // subheader="September 14, 2016"
                />
              </Grid>
            </Grid>

            <Typography variant="body2" align="justify">
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizer (ansData.answer),
                }}
                style={{padding: '1%'}}
              />
            </Typography>
          </CardContent>

          <CardActions sx={{justifyContent: 'flex-end'}}>

            <Button
              variant="outlined"
              color="success"
              title="Liked it"
              onClick={() => {
                AddLikes (user ? user._id : 0, ansData._id);
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
                AddDislikes (user ? user._id : 0, ansData._id);
              }}
            >
              {userStatus === 'none'
                ? <ThumbDownOffAltIcon />
                : userStatus === 'liked'
                    ? <ThumbDownOffAltIcon />
                    : <ThumbDownIcon />}

              {dislikes}
            </Button>

          </CardActions>
        </Box>
      </Paper>
    </div>
  );
};

export default CardAnswer;
