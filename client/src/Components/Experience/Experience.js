import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import {
    Typography,
    Grid,
    Modal,
    Button,
    Select,
    FormControl,
    MenuItem,
    InputLabel,
    CircularProgress,
} from '@mui/material';

import axios from 'axios';
import CardExperience from './CardExperience';
import NavBar from '../Home/Navbar/Navbar';
import EditorAndPreview from '../AskSomething/EditorAndPreview';
import MotivationPoint from './MotivationPoint/MotivationPoint';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import '../Materials/material.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

toast.configure();

// for styling react components
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

const Experience = () => {
    // dummy data for experience posts
    const [experiences, setExperiences] = useState([]);
    const user = JSON.parse(localStorage.getItem('profile'));
    const [order, setOrder] = useState('reverse-time-sort');
    const [loading, setLoading] = useState(false);

    const [open, setOpen] = React.useState(false);

    // variables for searched Data and spam data
    const [searchedExperience, setSearchedExperience] = useState([]);
    const [searchResult, setSearchResult] = useState('');
    const [showSpam, setShowSpam] = useState(false);
    const [spamExp, setSpamExp] = useState([]);

    // for toggling the spam and non-spam section
    const handleSpamChange = () => {
        setShowSpam(!showSpam);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    // for adding experience, text editor
    const handleOpen = () =>
        user ? setOpen(true) : toast.error('Please login to add experience');
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setLoading(true);

        // for ordering of experience
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/experience/${order}`, {
                user,
            })
            .then((res) => {
                let good_exp = [];
                let bad_exp = [];

                res.data.forEach((ele) => {
                    if (ele.isSpam) {
                        bad_exp.push(ele);
                    } else {
                        good_exp.push(ele);
                    }
                });

                // differentiating between good experience and bad experience
                setExperiences(good_exp);
                setSearchedExperience(good_exp);
                setSpamExp(bad_exp);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, [order]);

    useEffect(() => {
        // if showing spam is not needed, we search in experience array
        if (showSpam === false) {
            const newSearchedExperience = experiences.filter((experience) => {
                if (
                    experience.title
                        .toLowerCase()
                        .includes(searchResult.toLowerCase())
                )
                    return true;
                if (
                    experience.experience
                        .toLowerCase()
                        .includes(searchResult.toLowerCase())
                )
                    return true;
                if (
                    experience.userName
                        .toLowerCase()
                        .includes(searchResult.toLowerCase())
                )
                    return true;

                const res = experience.tags.filter((tag) => {
                    return tag
                        .toLowerCase()
                        .includes(searchResult.toLowerCase());
                });

                if (res.length) return true;

                return false;
            });
            setSearchedExperience(newSearchedExperience);
        } else {
            // else we search in Spam experience array
            const newSearchedExperience = spamExp.filter((experience) => {
                if (
                    experience.title
                        .toLowerCase()
                        .includes(searchResult.toLowerCase())
                )
                    return true;
                if (
                    experience.experience
                        .toLowerCase()
                        .includes(searchResult.toLowerCase())
                )
                    return true;
                if (
                    experience.userName
                        .toLowerCase()
                        .includes(searchResult.toLowerCase())
                )
                    return true;

                const res = experience.tags.filter((tag) => {
                    return tag
                        .toLowerCase()
                        .includes(searchResult.toLowerCase());
                });

                if (res.length) return true;

                return false;
            });
            setSearchedExperience(newSearchedExperience);
        }
    }, [searchResult, showSpam, experiences, spamExp]);

    // for changing the ordering
    const handleChange = (event) => {
        if (event.target.value.includes('user') && !user) {
            //alert("Login to use this feature");
            toast.error('Login to use this feature');
        } else {
            setOrder(event.target.value);
        }
    };

    return (
        <div>
            <NavBar setSearchResult={setSearchResult} />

            <h1
                className="heading"
                style={{ marginTop: 25, textAlign: 'center' }}
            >
                EXPERIENCES
            </h1>

            <Box sx={{ flexGrow: 1 }} m={1} p={1}>
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    justifyContent="center"
                >
                    {/* Conditional Rendering based on loading variable and length of experience */}
                    {loading ? (
                        <CircularProgress />
                    ) : searchedExperience.length > 0 ? (
                        /* loop over experiences array and pass data to
                         CardExperience component for rendering children */

                        <Grid item xs={12} sm={12} md={8}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                spacing={2}
                                p={2}
                            >
                                <Grid item>
                                    {/* for selecting the options on experience */}

                                    <Box
                                        sx={{ flexGrow: 1, paddingLeft: '4%' }}
                                        m={0}
                                        p={0}
                                        mt={2}
                                    >
                                        <Box
                                            sx={{
                                                minWidth: 150,
                                                textAlign: 'start',
                                            }}
                                        >
                                            <FormControl
                                                style={{ minWidth: 140 }}
                                            >
                                                <InputLabel id="demo-simple-select-label">
                                                    Order
                                                </InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={order}
                                                    label="order"
                                                    onChange={handleChange}
                                                >
                                                    <MenuItem
                                                        selected
                                                        value={
                                                            'reverse-time-sort'
                                                        }
                                                    >
                                                        Recently Added
                                                    </MenuItem>
                                                    <MenuItem
                                                        value={'user-list'}
                                                    >
                                                        Added by you
                                                    </MenuItem>
                                                    <MenuItem
                                                        value={'user-likes'}
                                                    >
                                                        Liked by you
                                                    </MenuItem>
                                                    <MenuItem
                                                        value={'user-dislikes'}
                                                    >
                                                        Disliked by you
                                                    </MenuItem>
                                                    <MenuItem
                                                        value={'time-sort'}
                                                    >
                                                        Last Added
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Box>
                                </Grid>

                                <Grid item>
                                    {/* === modal button === */}
                                    <div
                                        style={{
                                            marginTop: 12,
                                            paddingLeft: '4%',
                                        }}
                                    >
                                        <Button
                                            onClick={handleOpen}
                                            variant="outlined"
                                            color="warning"
                                        >
                                            Add Experience
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>

                            {showSpam ? (
                                // If selected to show spam questions.
                                <div>
                                    <Button
                                        variant="contained"
                                        style={{ margin: '1.7%' }}
                                        onClick={handleSpamChange}
                                    >
                                        Experiences
                                    </Button>
                                    <Box sx={{ minWidth: 275 }}>
                                        {searchedExperience.map(
                                            (experience, index) => {
                                                return (
                                                    <CardExperience
                                                        expData={experience}
                                                        key={experience._id}
                                                    />
                                                );
                                            }
                                        )}
                                    </Box>
                                </div>
                            ) : (
                                // Show non-spam questions
                                <div>
                                    <Button
                                        variant="contained"
                                        style={{ margin: '1.7%' }}
                                        onClick={handleSpamChange}
                                    >
                                        Spam
                                    </Button>
                                    <Box sx={{ minWidth: 275 }}>
                                        {searchedExperience.map(
                                            (experience, index) => {
                                                return (
                                                    <CardExperience
                                                        expData={experience}
                                                        key={experience._id}
                                                    />
                                                );
                                            }
                                        )}
                                    </Box>
                                </div>
                            )}
                        </Grid>
                    ) : (
                        <div>
                            <Button
                                variant="contained"
                                style={{ margin: '1.7%' }}
                                onClick={handleSpamChange}
                            >
                                Experiences
                            </Button>
                            <Typography variant="h4" >
                                No Spam Experience till now !!!
                            </Typography>
                        </div>
                    )}

                    {/* right side grid division for navigation or news */}
                    <Grid item xs={10} sm={4}>
                        {/* Modal */}
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            disableEnforceFocus={true}
                        >
                            <Box sx={style}>
                                <IconButton
                                    aria-label="Close"
                                    sx={{ float: 'right' }}
                                    onClick={handleClose}
                                >
                                    <CloseIcon />
                                </IconButton>
                                <EditorAndPreview option="experience" />
                            </Box>
                        </Modal>
                        {/* === end modal button === */}
                        <Box
                            sx={{
                                minWidth: 205,
                                height: 800,
                                marginTop: 2,
                            }}
                        >
                            <Typography variant="h5" mb={2}>
                                Featured
                            </Typography>
                            <MotivationPoint />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default Experience;
