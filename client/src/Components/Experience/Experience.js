import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import CardExperience from './CardExperience';
import NavBar from '../Home/Navbar/Navbar';
import EditorAndPreview from '../AskSomething/EditorAndPreview';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../Materials/material.css'

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
    const handleOpen = () =>
        user ? setOpen(true) : alert('please login to add experience');
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setLoading(true);

        axios
            .post(`${process.env.BACREACT_APP_BACKEND_URLKEND_URL}/experience/${order}`, { user })
            .then((res) => {
                setExperiences(res.data);
                setLoading(false);
                console.log(res.data[0]);
            })
            .catch((err) => console.log(err));
    }, [order]);

    const handleChange = (event) => {
        if (event.target.value.includes('user') && !user) {
            alert('Login to use this feature');
        } else {
            setOrder(event.target.value);
        }
    };

    return (
        <div>
            <NavBar />

            <h1 className="heading" style={{marginTop:25,textAlign:'center'}}>EXPERIENCES</h1>

            <Box sx={{ flexGrow: 1 }} m={1} p={1}>
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    justifyContent="center"
                    // alignItems="center"
                >
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        /* loop over experiences array and pass data to CardExperience component for rendering children */
                        <Grid item xs={12} sm={12} md={8}>
                            <Box sx={{ minWidth: 275 }}>
                                {experiences.map((experience, index) => {
                                    return (
                                        <CardExperience
                                            expData={experience}
                                            key={index}
                                        />
                                    );
                                })}
                            </Box>
                        </Grid>
                    )}

                    {/* right side grid division for navigation or news */}
                    <Grid item xs={10} sm={4}>
                        <Box sx={{ flexGrow: 1 }} m={0} p={0} mt={2}>
                            <Box sx={{ minWidth: 150, textAlign: 'start' }}>
                                <FormControl style={{ minWidth: 140 }}>
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
                                            value={'reverse-time-sort'}
                                        >
                                            Recently Added
                                        </MenuItem>
                                        <MenuItem value={'user-list'}>
                                            Added by you
                                        </MenuItem>
                                        <MenuItem value={'user-likes'}>
                                            Liked by you
                                        </MenuItem>
                                        <MenuItem value={'user-dislikes'}>
                                            Disliked by you
                                        </MenuItem>
                                        <MenuItem value={'time-sort'}>
                                            Last Added
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        {/* === modal button === */}
                       <div style={{marginTop:10}}>
                        <Button
                            onClick={handleOpen}
                            variant="outlined"
                            color="warning"
                        >
                            Add Experience
                        </Button>
                        </div>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <EditorAndPreview option="experience" />
                            </Box>
                        </Modal>
                        {/* === modal button === */}
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
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography
                                        sx={{ fontSize: 16 }}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        I am dummy news
                                    </Typography>

                                    <Typography variant="body2">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                                    <Typography variant="body2">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                                </CardContent>
                                <CardActions
                                    sx={{ justifyContent: 'flex-end' }}
                                >
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                            <Card sx={{ minWidth: 275, marginTop: 2 }}>
                                <CardContent>
                                    <Typography
                                        sx={{ fontSize: 16 }}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        Lo and behold featured
                                    </Typography>

                                    <Typography variant="body2">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                                    <Typography variant="body2">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                                </CardContent>
                                <CardActions
                                    sx={{ justifyContent: 'flex-end' }}
                                >
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default Experience;
