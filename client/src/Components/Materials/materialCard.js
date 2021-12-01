import React, {useState, useEffect} from "react";
import {Card, CardHeader, CardContent, Avatar, MenuItem,
    Typography, Button, Grid, IconButton, Menu, MenuList,
    Dialog, DialogActions, DialogTitle} from "@mui/material";
import { red } from "@mui/material/colors";
import dompurify from "dompurify";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

toast.configure();

const MaterialCard = ({ material }) => {
  const sanitizer = dompurify.sanitize;
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = JSON.parse(localStorage.getItem("profile"));
  const open = Boolean(anchorEl);

  const [roomName, setRoomName] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Confirming to delete the material
  const Confirm = async (userId, materialId) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/study-material/deleteMaterial`,
        {
          materialId,
        }
      )
      .then((res) => {
        window.location.reload();
      });
    return;
  };

  const [openconfirm, setOpenConfirm] = React.useState(false);

  const handleClickOpenconfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseconfirm = () => {
    setOpenConfirm(false);
  };

  // Deleting Material
  const DeleteMat = (userId, experienceId) => {
    if (!user) {
      //alert("Please login to like this question");
      toast.error("Please login to like this question");
      return;
    }
    Confirm(userId, experienceId);
  };

  const handleIsLogin = () => {
    if (!user) {
      // inform to login
      alert ('Please login for chatting to user');
    }
  }

  useEffect(() => {
    
    if(user){
        if (user._id < material.by) 
          setRoomName(user._id + material.by);
        else 
          setRoomName(material.by + user._id);
    }
  }, []);


  // For showing cards displaying studying material
  return (
    <div>
      {/* Card to display materials */}
      <Card
        sx={{
          marginTop: "2%",
          padding: "1.5%",
          background: "#EAE6F8",
        }}
      >
        <CardContent sx={{ justify: "flex-end", float: "right" }}>
          {user && user._id === material.by ? (
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
                {/* Menu to edit and delete */}
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
                            DeleteMat(user ? user._id : 0, material._id);
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
          {/* Card for materials */}
        </CardContent>
        <Grid container>
          <Grid item sm={4} md={3}>
            <Link to={`/dashboard/${material.by}`}>
              {/* User Info */}
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: red[500] }}
                    aria-label="recipe"
                    alt={`${material.userName}`}
                    src={`${material.userImage}`}
                  />
                }
                title={material.userName}
                subheader={material.date.split("T")[0]}
              />
            </Link>
            <div style={{ display: "inline-block" }}>
              {/* Button to view demo material */}
              <Button
                variant="outlined"
                href={material.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ margin: "2% 5%" }}
              >
                View Material
              </Button>

              {/* Button to chat with user */}
              <Link 
                to={user ? `/chatbox/${material.userName}/${material.by}/${roomName}` : `/login`} 
                onClick={handleIsLogin}>
                <Button variant="outlined" style={{ margin: "2% 5%" }}>
                  Chat
                </Button>
              </Link>
            </div>
          </Grid>
          <Grid item sm={8} md={9}>
            <CardContent>
              {/* Material Topic */}
              <Typography variant="h4" color="text.primary">
                {material.topic}
              </Typography>
              {/* Material Description */}
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="justify"
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: sanitizer(material.description),
                  }}
                  style={{ padding: "1%", textAlign: "justify" }}
                />
              </Typography>
              {/* Seller Location */}
              <Typography variant="h7" color="text.primary">
                {material.location}
              </Typography>
            </CardContent>
            {/* Tags */}
            <div style={{ padding: "0.5%" }}>
              {material.tags.map((tag) => (
                <Typography display="inline" color="primary">
                  #{tag}{" "}
                </Typography>
              ))}
            </div>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default MaterialCard;
