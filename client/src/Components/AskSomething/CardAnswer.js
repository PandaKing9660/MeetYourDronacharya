import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dompurify from 'dompurify';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { Modal } from '@mui/material';
import { Link } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditorAndPreview from '../AskSomething/EditorAndPreview';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
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

const ITEM_HEIGHT = 45;

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

// To show Answers retrieved from backend by Answer Card
const CardAnswer = ({ ansData, questionId }) => {
    const sanitizer = dompurify.sanitize;

    const user = JSON.parse(localStorage.getItem('profile'));
    const [likes, setLike] = useState(ansData.liked.length);
    const [dislikes, setDislike] = useState(ansData.disliked.length);

    const [userStatus, setUserStatus] = useState('none');

    // Retrieving answers from backend
    useEffect(() => {
        if (!user) {
            return;
        }

        axios
            .post(
                `${process.env.REACT_APP_BACKEND_URL}/ask-something/answer/check`,
                {
                    userId: user._id,
                    answerId: ansData._id,
                }
            )
            .then((res) => {
                setUserStatus(res.data);
            })
            .catch((err) => console.log(err));
    }, [ansData._id]);

    // adding likes and storing it in backend for each answers
    const AddLikes = (userId, answerId) => {
        if (!user) {
            alert('Please login to like this answer');
            return;
        }

        if (userStatus === 'liked') {
            return;
        }
        axios
            .put(
                `${process.env.REACT_APP_BACKEND_URL}/ask-something/answer/addLike`,
                {
                    userId,
                    answerId,
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

    const Confirm = async (userId, answerId) => {
        //const result = await confirm("Are you sure?");
        axios
            .post(
                `${process.env.REACT_APP_BACKEND_URL}/ask-something/answer/deleteAnswer`,
                {
                    answerId,
                }
            )
            .then((res) => {
                axios.put(
                    `${process.env.REACT_APP_BACKEND_URL}/dashboard/delAnswer`,
                    {
                        answerId,
                        userId,
                    }
                );

                axios.put(
                    `${process.env.REACT_APP_BACKEND_URL}/askSomethingQuestion/delAnswer`,
                    {
                        answerId,
                        questionId,
                    }
                );
                window.location.reload();
            });
        return;
    };

    const DeleteAnswer = (userId, answerId) => {
        if (!user) {
            alert('Please login to like this question');
            return;
        }
        Confirm(userId, answerId);
    };

    // adding dislikes and storing it in backend for each answers
    const AddDislikes = (userId, answerId) => {
        if (!user) {
            alert('Please login to like this answer');
            return;
        }

        if (userStatus === 'disliked') {
            return;
        }
        axios
            .put(
                `${process.env.REACT_APP_BACKEND_URL}/ask-something/answer/addDisLike`,
                {
                    userId,
                    answerId,
                }
            )
            .then((res) => {
                setDislike(dislikes + 1);
                if (userStatus === 'liked') {
                    setLike(likes - 1);
                }
                setUserStatus('disliked');
            });
    };

    const [openconfirm, setOpenConfirm] = React.useState(false);

    const handleClickOpenconfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseconfirm = () => {
        setOpenConfirm(false);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [open2, setOpen2] = useState(false);
    const handleOpen2 = () =>
        user ? setOpen2(true) : alert('please login to add experience');
    const handleClose2 = () => setOpen2(false);

    return (
        <div>
            {ansData.isSpam === true ? (
                <Paper
                    sx={{
                        p: 0,
                        margin: '1em',
                        minWidth: 300,
                        flexGrow: 1,
                        background: '#f0564a',
                        opacity: 0.8,
                    }}
                >
                    <Box
                        p={1}
                        marginY={{ xs: '1em', md: '0.2em' }}
                        //  This will change margin on `sm` and `md`
                    >
                        {/* spam warning */}
                        <Typography
                            sx={{ mb: 1.5, fontSize: '0.91rem' }}
                            color="text.secondary"
                        >
                            <i> Spam Detected</i>
                        </Typography>
                        <CardContent
                            sx={{ justify: 'flex-end', float: 'right' }}
                        >
                            {/* give edit and delete option only if same user */}

                            {user && user._id === ansData.by ? (
                                <div>
                                    <IconButton
                                        aria-label="more"
                                        id="long-button"
                                        aria-controls="long-menu"
                                        aria-expanded={
                                            open ? 'true' : undefined
                                        }
                                        aria-haspopup="true"
                                        onClick={handleClick}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        id="long-menu"
                                        MenuListProps={{
                                            'aria-labelledby': 'short-button',
                                        }}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        PaperProps={{
                                            style: {
                                                maxHeight: ITEM_HEIGHT * 3,
                                                width: '12ch',
                                            },
                                        }}
                                    >
                                        <MenuList>
                                            <MenuItem>
                                                <Button
                                                    onClick={() => {
                                                        {
                                                            handleClickOpenconfirm();
                                                        }
                                                    }}
                                                    sx={{ color: 'black' }}
                                                >
                                                    Delete
                                                </Button>
                                                <Dialog
                                                    open={openconfirm}
                                                    onClick={() => {
                                                        {
                                                            handleClose();
                                                            handleCloseconfirm();
                                                        }
                                                    }}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                >
                                                    <DialogTitle id="alert-dialog-title">
                                                        {
                                                            'Are you sure to delete?'
                                                        }
                                                    </DialogTitle>
                                                    <DialogActions>
                                                        <Button
                                                            onClick={() => {
                                                                {
                                                                    handleCloseconfirm();
                                                                }
                                                                DeleteAnswer(
                                                                    user
                                                                        ? user._id
                                                                        : 0,
                                                                    ansData._id
                                                                );
                                                            }}
                                                        >
                                                            Yes
                                                        </Button>
                                                        <Button
                                                            onClick={
                                                                handleCloseconfirm
                                                            }
                                                            autoFocus
                                                        >
                                                            No
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </MenuItem>
                                            <MenuItem>
                                                <Button
                                                    onClick={handleOpen2}
                                                    sx={{ color: 'black' }}
                                                >
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
                                                            question_id={
                                                                ansData._id
                                                            }
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

                        <CardContent>
                            <Grid
                                container
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                {/*Displaying Answer Title and time */}
                                <Grid item align="left">
                                    <Typography variant="h5" component="div">
                                        {ansData.title}
                                    </Typography>
                                    <Typography
                                        sx={{ mb: 1.5, fontSize: '0.91rem' }}
                                        color="text.secondary"
                                    >
                                        {ansData.time.split('T')[0]}
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

                                    <Link
                                        to={`/dashboard/${ansData.by}`}
                                        style={{ textDecoration: 'none' }}
                                    >
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
                                        />
                                    </Link>
                                </Grid>
                            </Grid>

                            {/*Displaying Answers changing it from html to normal text */}
                            <Typography variant="body2" align="justify">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: sanitizer(ansData.answer),
                                    }}
                                    style={{ padding: '1%' }}
                                />
                            </Typography>
                        </CardContent>
                        <div style={{ display: 'flex' }}>
                            {ansData.tags.map(
                                (
                                    tag // <Typography color="primary">#{tag}</Typography>
                                ) => (
                                    <Chip
                                        label={'#' + tag}
                                        variant="outlined"
                                        sx={{
                                            marginRight: '10px',
                                            color: 'blue',
                                        }}
                                    />
                                )
                            )}
                        </div>
                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                            {/*Buttons for like and dislike */}
                            <Button
                                variant="outlined"
                                color="success"
                                title="Liked it"
                                disabled
                                onClick={() => {
                                    AddLikes(user ? user._id : 0, ansData._id);
                                }}
                            >
                                {likes}
                                {userStatus === 'none' ? (
                                    <ThumbUpOffAltIcon />
                                ) : userStatus === 'disliked' ? (
                                    <ThumbUpOffAltIcon />
                                ) : (
                                    <ThumbUpIcon />
                                )}
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                title="Disliked it"
                                disabled
                                onClick={() => {
                                    AddDislikes(
                                        user ? user._id : 0,
                                        ansData._id
                                    );
                                }}
                            >
                                {userStatus === 'none' ? (
                                    <ThumbDownOffAltIcon />
                                ) : userStatus === 'liked' ? (
                                    <ThumbDownOffAltIcon />
                                ) : (
                                    <ThumbDownIcon />
                                )}

                                {dislikes}
                            </Button>
                        </CardActions>
                    </Box>
                </Paper>
            ) : (
                <Paper sx={{ p: 0, margin: '1em', minWidth: 300, flexGrow: 1 }}>
                    <Box
                        p={1}
                        marginY={{ xs: '1em', md: '0.2em' }}
                        //  This will change margin on `sm` and `md`
                    >
                        <CardContent
                            sx={{ justify: 'flex-end', float: 'right' }}
                        >
                            {/* give edit and delete option only if same user */}

                            {user && user._id === ansData.by ? (
                                <div>
                                    <IconButton
                                        aria-label="more"
                                        id="long-button"
                                        aria-controls="long-menu"
                                        aria-expanded={
                                            open ? 'true' : undefined
                                        }
                                        aria-haspopup="true"
                                        onClick={handleClick}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        id="long-menu"
                                        MenuListProps={{
                                            'aria-labelledby': 'short-button',
                                        }}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        PaperProps={{
                                            style: {
                                                maxHeight: ITEM_HEIGHT * 3,
                                                width: '12ch',
                                            },
                                        }}
                                    >
                                        <MenuList>
                                            <MenuItem>
                                                <Button
                                                    onClick={() => {
                                                        {
                                                            handleClickOpenconfirm();
                                                        }
                                                    }}
                                                    sx={{ color: 'black' }}
                                                >
                                                    Delete
                                                </Button>
                                                <Dialog
                                                    open={openconfirm}
                                                    onClick={() => {
                                                        {
                                                            handleClose();
                                                            handleCloseconfirm();
                                                        }
                                                    }}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                >
                                                    <DialogTitle id="alert-dialog-title">
                                                        {
                                                            'Are you sure to delete?'
                                                        }
                                                    </DialogTitle>
                                                    <DialogActions>
                                                        <Button
                                                            onClick={() => {
                                                                {
                                                                    handleCloseconfirm();
                                                                }
                                                                DeleteAnswer(
                                                                    user
                                                                        ? user._id
                                                                        : 0,
                                                                    ansData._id
                                                                );
                                                            }}
                                                        >
                                                            Yes
                                                        </Button>
                                                        <Button
                                                            onClick={
                                                                handleCloseconfirm
                                                            }
                                                            autoFocus
                                                        >
                                                            No
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </MenuItem>
                                            <MenuItem>
                                                <Button
                                                    onClick={handleOpen2}
                                                    sx={{ color: 'black' }}
                                                >
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
                                                            question_id={
                                                                ansData._id
                                                            }
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

                        <CardContent>
                            <Grid
                                container
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                {/*Displaying Answer Title and time */}
                                <Grid item align="left">
                                    <Typography variant="h5" component="div">
                                        {ansData.title}
                                    </Typography>
                                    <Typography
                                        sx={{ mb: 1.5, fontSize: '0.91rem' }}
                                        color="text.secondary"
                                    >
                                        {ansData.time.split('T')[0]}
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

                                    <Link
                                        to={`/dashboard/${ansData.by}`}
                                        style={{ textDecoration: 'none' }}
                                    >
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
                                        />
                                    </Link>
                                </Grid>
                            </Grid>

                            {/*Displaying Answers changing it from html to normal text */}
                            <Typography variant="body2" align="justify">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: sanitizer(ansData.answer),
                                    }}
                                    style={{ padding: '1%' }}
                                />
                            </Typography>
                        </CardContent>
                        <div style={{ display: 'flex' }}>
                            {ansData.tags.map(
                                (
                                    tag // <Typography color="primary">#{tag}</Typography>
                                ) => (
                                    <Chip
                                        label={'#' + tag}
                                        variant="outlined"
                                        sx={{
                                            marginRight: '10px',
                                            color: 'blue',
                                        }}
                                    />
                                )
                            )}
                        </div>
                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                            {/*Buttons for like and dislike */}
                            <Button
                                variant="outlined"
                                color="success"
                                title="Liked it"
                                onClick={() => {
                                    AddLikes(user ? user._id : 0, ansData._id);
                                }}
                            >
                                {likes}
                                {userStatus === 'none' ? (
                                    <ThumbUpOffAltIcon />
                                ) : userStatus === 'disliked' ? (
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
                                    AddDislikes(
                                        user ? user._id : 0,
                                        ansData._id
                                    );
                                }}
                            >
                                {userStatus === 'none' ? (
                                    <ThumbDownOffAltIcon />
                                ) : userStatus === 'liked' ? (
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

export default CardAnswer;
