import React, {useState, useEffect} from 'react';
import CardHeader from '@mui/material/CardHeader';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import {Button, CardActions} from '@mui/material';

const CardQuestion = ({quesData}) => {
  const user = JSON.parse (localStorage.getItem ('profile'));
  const [likes, setLike] = useState (quesData.liked.length);

  const [dislikes, setDislike] = useState (quesData.disliked.length);
  const [userStatus, setUserStatus] = useState ('');

  useEffect (
    () => {
      axios
        .post (`http://localhost:3001/ask-something/question/check`, {
          userId: user._id,
          questionId: quesData._id,
        })
        .then (res => {
          setUserStatus (res.data);
        })
        .catch (err => console.log (err));
    },
    [user._id, quesData._id]
  );

  const AddLikes = (userId, questionId) => {
    if (userStatus === 'success') {
      return;
    }
    axios
      .put ('http://localhost:3001/ask-something/question/addLike', {
        userId,
        questionId,
      })
      .then (res => {
        setLike (likes + 1);
        if (userStatus === 'danger') {
          setDislike (dislikes - 1);
        }
        setUserStatus ('success');
      });
  };
  const AddDislikes = (userId, questionId) => {
    if (userStatus === 'danger') {
      return;
    }
    axios
      .put ('http://localhost:3001/ask-something/question/addDisLike', {
        userId,
        questionId,
      })
      .then (res => {
        setDislike (dislikes + 1);
        if (userStatus === 'success') {
          setLike (likes - 1);
        }
        setUserStatus ('danger');
      });
  };

  return (
    <Paper sx={{p: 0, margin: '1em', minWidth: 300, flexGrow: 1}}>
      <Box
        p={3}
        // color={{ xs: 'red', sm: 'blue', md: 'green' }}
        marginY={{xs: '1em', md: '0.2em'}}
        //  This will change margin on `sm` and `md`
      >
        <CardContent>
          <Grid
            container
            rowSpacing={1}
            // columnSpacing={{ xs: 1, sm: 2, md: 4 }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item xs={6} sm={4.6} md={8} align="left">
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
                {quesData.date}
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sm={3}
              md={4}
              lg={3}
              sx={{textTransform: 'uppercase'}}
              align="left"
            >
              {/* right floating avatar and name of author */}
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
            </Grid>
          </Grid>

          <Typography variant="body2" align="justify">
            {quesData.question}
          </Typography>
        </CardContent>

        <CardActions sx={{justifyContent: 'flex-end'}}>

          <Button
            variant="outlined"
            color="success"
            onClick={() => {
              AddLikes (user._id, quesData._id);
            }}
          >
            {likes}
            <ThumbUpOffAltIcon />
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              AddDislikes (user._id, quesData._id);
            }}
          >

            <ThumbDownOffAltIcon />
            {dislikes}
          </Button>

          <Button size="small" color="primary" variant="outlined">
            Answer
          </Button>
        </CardActions>

      </Box>
    </Paper>
  );
};

export default CardQuestion;
