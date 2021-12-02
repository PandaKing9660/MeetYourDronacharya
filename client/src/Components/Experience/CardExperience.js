import React, { useState, useEffect } from "react";
import axios from "axios";
import dompurify from "dompurify";
import { Link } from "react-router-dom";
import {
  DialogTitle,
  Dialog,
  DialogActions,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  MenuList,
  Button,
  CardActions,
  Modal,
  Typography,
  Grid,
  Avatar,
  CardContent,
  CardHeader,
  Paper,
  Box,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditorAndPreview from "../AskSomething/EditorAndPreview";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

toast.configure();

const ITEM_HEIGHT = 45;

// for styling the CSS in component
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
// card for experience
const CardExperience = ({ expData }) => {
  const sanitizer = dompurify.sanitize;

  // finding current user
  const user = JSON.parse(localStorage.getItem("profile"));
  // getting like and dislike count 
  const [likes, setLike] = useState(expData?.liked?.length);
  const [dislikes, setDislike] = useState(expData?.disliked?.length);

  const [userStatus, setUserStatus] = useState("none");
  
  // Fetch user experience
  useEffect(() => {
    if (!user) {
      return;
    }
    // finding out whether the user has liked the current post or not

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/experience/check`, {
        userId: user._id,
        experienceId: expData?._id,
      })
      .then((res) => {
        setUserStatus(res.data);
      })
      .catch((err) => console.log(err));
  }, [expData?._id]);

  // adds like to the experience shared
  const AddLikes = (userId, experienceId) => {
    if (!user) {
      // if not logged in
      toast.error("Please login to like this question");
      return;
    }
    // incase it is already liked
    if (userStatus === "liked") {
      return;
    }
    // like if is not the case
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/experience/addLike`, {
        userId,
        experienceId,
      })
      .then((res) => {
        setLike(likes + 1);
        if (userStatus === "disliked") {
          setDislike(dislikes - 1);
        }
        setUserStatus("liked");
      });
  };

  // adds dislike to the experience shared
  const AddDislikes = (userId, experienceId) => {
    if (!user) {
      // if not logged in
       toast.error("Please login to dislike this question");
      return;
    }

    // incase it is already disliked
    if (userStatus === "disliked") {
      return;
    }

    // dislike it otherwise
    axios
      .put(`${process.env.REACT_APP_BACKEND_URL}/experience/addDislike`, {
        userId,
        experienceId,
      })
      .then((res) => {
        setDislike(dislikes + 1);
        if (userStatus === "liked") {
          setLike(likes - 1);
        }
        setUserStatus("disliked");
      });
  };

  // confirming to delete the experience
  const Confirm = async (userId, experienceId) => {
    //confirm message to delete the experience from database
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/experience/deleteExp`, {
        experienceId,
      })
      .then((res) => {
        // deleting the experience from user list as well
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/dashboard/delExp`, {
          experienceId,
          userId,
        });
        window.location.reload();
      });
    return;
  };

  // for delete user
  const DeleteUser = (userId, experienceId) => {
    if (!user) {
      toast.error("Please login to delete thid.");
      return;
    }
    Confirm(userId, experienceId);
  };

  // opening the confirm box
  const [open2, setOpen2] = useState(false);

  // handling the open option
  const handleOpen2 = () =>
    user ? setOpen2(true) : toast.error("please login to add experience");
  const handleClose2 = () => setOpen2(false);

  
  const [openconfirm, setOpenConfirm] = React.useState(false);

  // handling the open confirm option
  const handleClickOpenconfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseconfirm = () => {
    setOpenConfirm(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // handling the close option
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* If the content is spam, grey it out and disable functions */}
      {expData?.isSpam === true ? (
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
            <CardContent sx={{ justify: "flex-end", float: "right" }}>
              {/* give edit and delete option only if same user */}
              {user && user._id === expData?.by ? (
                <div>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls="long-menu"
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      "aria-labelledby": "short-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 3,
                        width: "12ch",
                      },
                    }}
                  >
                    <MenuList>
                      <MenuItem>
                        <Button
                          onClick={() => {
                            handleClickOpenconfirm();
                          }}
                          sx={{ color: "black" }}
                        >
                          Delete
                        </Button>
                        <Dialog
                          open={openconfirm}
                          onClick={() => {
                            handleClose();
                            handleCloseconfirm();
                          }}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Are you sure to delete?"}
                          </DialogTitle>
                          <DialogActions>
                            <Button
                              onClick={() => {
                                handleCloseconfirm();

                                DeleteUser(user ? user._id : 0, expData?._id);
                              }}
                            >
                              Yes
                            </Button>
                            <Button onClick={handleCloseconfirm} autoFocus>
                              No
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
              ) : (
                <div />
              )}
            </CardContent>
            <CardContent sx={{ justify: "flex-end" }}>
              {/* experience content */}
              <Grid
                container
                rowSpacing={1}
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item xs={6} sm={4.6} md={8} align="left">
                  <Typography variant="h5" component="div">
                    {expData?.title}
                  </Typography>
                  <Typography
                    sx={{ mb: 1.5, fontSize: "0.91rem" }}
                    color="text.secondary"
                  >
                    {expData?.time.split("T")[0]}
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={6}
                  sm={3}
                  md={4}
                  lg={3}
                  sx={{
                    textTransform: "uppercase",
                    display: "flex",
                  }}
                  align="left"
                >
                  {/* right floating avatar and name of author */}

                  <Link
                    to={`/dashboard/${expData?.by}`}
                    style={{ textDecoration: "none" }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar
                          alt={`${expData?.userName}`}
                          src={`${expData?.userImage}`}
                        />
                      }
                      titleTypographyProps={{
                        variant: "body2",
                        color: "green",
                        align: "right",
                      }}
                      title={expData?.userName}
                    />
                  </Link>
                </Grid>
              </Grid>

              {/* html content data description */}
              <Typography variant="body2" align="justify">
                <div
                  dangerouslySetInnerHTML={{
                    __html: sanitizer(expData?.experience),
                  }}
                  style={{ padding: "1%" }}
                />
              </Typography>
            </CardContent>
          </Box>
        </Paper>
      ) : (
        // For Not spam content
        <Paper sx={{ p: 0, margin: "1em", minWidth: 300, flexGrow: 1 }}>
          <Box
            p={1}
            // color={{ xs: 'red', sm: 'blue', md: 'green' }}
            marginY={{ xs: "1em", md: "0.2em" }}
            //  This will change margin on `sm` and `md`
          >
            <CardContent sx={{ justify: "flex-end", float: "right" }}>
              {/* give edit and delete option only if same user */}
              {user && user._id === expData?.by ? (
                <div>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls="long-menu"
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      "aria-labelledby": "short-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 3,
                        width: "12ch",
                      },
                    }}
                  >
                    <MenuList>
                      <MenuItem>
                        <Button
                          onClick={() => {
                            // after clicking
                            handleClickOpenconfirm();
                          }}
                          sx={{ color: "black" }}
                        >
                          Delete
                        </Button>
                        <Dialog
                          open={openconfirm}
                          onClick={() => {
                            // closing after clicking
                            handleClose();
                            handleCloseconfirm();
                          }}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Are you sure to delete?"}
                          </DialogTitle>
                          <DialogActions>
                            <Button
                              onClick={() => {
                                // checking user options 
                                handleCloseconfirm();

                                DeleteUser(user ? user._id : 0, expData?._id);
                              }}
                            >
                              Yes
                            </Button>
                            <Button onClick={handleCloseconfirm} autoFocus>
                              No
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </MenuItem>
                      <MenuItem>
                        <Button onClick={handleOpen2} sx={{ color: "black" }}>
                          Edit
                        </Button>
                        <Modal
                          open={open2}
                          onClose={handleClose2}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                          disableEnforceFocus={true}
                        >
                          <Box sx={style}>
                            <EditorAndPreview
                              option="experience"
                              question_id={expData?._id}
                              edit="true"
                            />
                          </Box>
                        </Modal>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
              ) : (
                <div />
              )}
            </CardContent>

            {/* title and dates of the experiences */}
            <CardContent sx={{ justify: "flex-end" }}>
              <Grid
                container
                rowSpacing={1}
                // columnSpacing={{ xs: 1, sm: 2, md: 4 }}
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item xs={6} sm={4.6} md={8} align="left">
                  <Typography variant="h5" component="div">
                    {expData?.title}
                  </Typography>
                  <Typography
                    sx={{ mb: 1.5, fontSize: "0.91rem" }}
                    color="text.secondary"
                  >
                    {expData?.time.split("T")[0]}
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={6}
                  sm={3}
                  md={4}
                  lg={3}
                  sx={{
                    textTransform: "uppercase",
                    display: "flex",
                  }}
                  align="left"
                >
                  {/* right floating avatar and name of author */}

                  <Link
                    to={`/dashboard/${expData?.by}`}
                    style={{ textDecoration: "none" }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar
                          alt={`${expData?.userName}`}
                          src={`${expData?.userImage}`}
                        />
                      }
                      titleTypographyProps={{
                        variant: "body2",
                        color: "green",
                        align: "right",
                      }}
                      title={expData?.userName}
                      // subheader="September 14, 2016"
                    />
                  </Link>
                </Grid>
              </Grid>

              {/* render html description content */}
              <Typography variant="body2" align="justify">
                <div
                  dangerouslySetInnerHTML={{
                    __html: sanitizer(expData?.experience),
                  }}
                  style={{ padding: "1%" }}
                />
              </Typography>
            </CardContent>

            <div style={{ display: "flex" }}>
              {expData?.tags.map(
                (
                  tag // <Typography color="primary">#{tag}</Typography>
                ) => (
                  <Chip
                    label={"#" + tag}
                    variant="outlined"
                    sx={{
                      marginRight: "10px",
                      color: "blue",
                    }}
                  />
                )
              )}
            </div>

            {/* action buttons  */}
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                color="success"
                title="Liked it"
                onClick={() => {
                  AddLikes(user ? user._id : 0, expData?._id);
                }}
              >
                {likes}
                {userStatus === "none" ? (
                  <ThumbUpOffAltIcon />
                ) : userStatus === "disliked" ? (
                  <ThumbUpOffAltIcon />
                ) : (
                  <ThumbUpIcon />
                )}
              </Button>
              <Button
                variant="outlined"
                color="error"
                title="Disliked it"
                onClick={() => {
                  AddDislikes(user ? user._id : 0, expData?._id);
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
            </CardActions>
          </Box>
        </Paper>
      )}
    </div>
  );
};

export default CardExperience;
