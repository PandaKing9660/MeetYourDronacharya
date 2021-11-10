import React, {useState, useEffect,Alert} from 'react';
import axios from 'axios';
import dompurify from 'dompurify';
import {Link} from 'react-router-dom';
import CardHeader from '@mui/material/CardHeader';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {Button, CardActions} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditorAndPreview from '../AskSomething/EditorAndPreview';

import { confirm } from "react-confirm-box";

const ITEM_HEIGHT = 48;


const CardExperience = ({expData}) => {
  const sanitizer = dompurify.sanitize;

  const user = JSON.parse (localStorage.getItem ('profile'));
  const [likes, setLike] = useState (expData.liked.length);
  const [dislikes, setDislike] = useState (expData.disliked.length);

  const [userStatus, setUserStatus] = useState ('none');

  useEffect (
    () => {
      if (!user) {
        return;
      }

      axios
        .post (`${process.env.REACT_APP_BACKEND_URL}/experience/check`, {
          userId: user._id,
          experienceId: expData._id,
        })
        .then (res => {
          setUserStatus (res.data);
        })
        .catch (err => console.log (err));
    },
    [expData._id]
  );

  const AddLikes = (userId, experienceId) => {
    if (!user) {
      alert ('Please login to like this question');
      return;
    }
    console.log (experienceId);
    if (userStatus === 'liked') {
      return;
    }
    axios
      .put (`${process.env.REACT_APP_BACKEND_URL}/experience/addLike`, {
        userId,
        experienceId,
      })
      .then (res => {
        setLike (likes + 1);
        if (userStatus === 'disliked') {
          setDislike (dislikes - 1);
        }
        setUserStatus ('liked');
      });
  };
  const AddDislikes = (userId, experienceId) => {
    if (!user) {
      alert ('Please login to like this question');
      return;
    }

    if (userStatus === 'disliked') {
      return;
    }
    axios
      .put (`${process.env.REACT_APP_BACKEND_URL}/experience/addDislike`, {
        userId,
        experienceId,
      })
      .then (res => {
        setDislike (dislikes + 1);
        if (userStatus === 'liked') {
          setLike (likes - 1);
        }
        setUserStatus ('disliked');
      });
  };

  const Confirm = async (userId,experienceId) => {
   const result = await confirm("Are you sure?");
   if (result) {
      axios
        .post (`${process.env.REACT_APP_BACKEND_URL}/experience/deleteExp`, {
          experienceId,
        })
        .then (res => {
          window.location.reload();
        });
     return;
   }
   console.log("You click No!");
 };

  const DeleteUser = (userId,experienceId) => {
    if (!user) {
      alert ('Please login to like this question');
      return;
    }
   Confirm (userId,experienceId) ;
  };

   const Edit = (userId,experienceId) => {
    if (!user) {
      alert ('Please login to like this question');
      return;
    }
    console.log(userId,experienceId)
    axios
      .post (`${process.env.REACT_APP_BACKEND_URL}/experience/editExp`, {
        experienceId,
      })
      .then (res => {
         window.location.reload();
      });
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  /*
  const handleOnClick = async () => {
  if (await confirm({
    confirmation: 'Are you sure?'
  })) {
    console.log('yes');
  } else {
    console.log('no');
  }
}
*/

  return (
    <div>
      <Paper sx={{p: 0, margin: '1em', minWidth: 300, flexGrow: 1}}>
        <Box
          p={3}
          // color={{ xs: 'red', sm: 'blue', md: 'green' }}
          marginY={{xs: '1em', md: '0.2em'}}
          //  This will change margin on `sm` and `md`
        >
          <CardContent sx={{justify: 'flex-end',float:'right'}}>
              {user && user._id === expData.by?
                  <div>
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls="long-menu"
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      MenuListProps={{
                        'aria-labelledby': 'long-button',
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: '20ch',
                        },
                      }}
                    >
                        <MenuList  onClick={handleClose}>
                            <MenuItem onClick={() => {DeleteUser (user ? user._id : 0, expData._id);}}>Delete</MenuItem>
                            <MenuItem onClick={() => <EditorAndPreview option="experience" />}>Edit</MenuItem>
                        </MenuList>  
                    </Menu>
                  </div>
            : <div /> 
          }
          </CardContent>
          <CardContent sx={{justify: 'flex-end'}}>
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
                  {expData.title}
                </Typography>
                <Typography
                  sx={{mb: 1.5, fontSize: '0.91rem'}}
                  color="text.secondary"
                >
                  {expData.time.split ('T')[0]}
                </Typography>
              </Grid>

              <Grid
                item
                xs={6}
                sm={3}
                md={4}
                lg={3}
                sx={{textTransform: 'uppercase', display: 'flex'}}
                align="left"
              >
                {/* right floating avatar and name of author */}

                <Link to={`/dashboard/${expData.by}`}>
                  <CardHeader
                    avatar={
                      <Avatar
                        alt={`${expData.userName}`}
                        src={`${expData.userImage}`}
                      />
                    }
                    titleTypographyProps={{
                      variant: 'body2',
                      color: 'green',
                      align: 'right',
                    }}
                    title={expData.userName}
                    // subheader="September 14, 2016"
                  />
                </Link>
              </Grid>
            </Grid>

            <Typography variant="body2" align="justify">
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizer (expData.experience),
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
                AddLikes (user ? user._id : 0, expData._id);
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
                AddDislikes (user ? user._id : 0, expData._id);
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

export default CardExperience;
