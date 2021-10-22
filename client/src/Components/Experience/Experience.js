import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import CardExperience from './CardExperience';
import NavBar from '../Home/Navbar/Navbar';
import EditorAndPreview from '../AskSomething/EditorAndPreview';

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
    const [experiences, setExperiences] = useState([
        {
            title: 'Cat is very imp',
            author: 'Aditya Sharma ',
            date: '10/20/2021',
            description:
                'lorem ipsumLorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elit sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elit',

            link: 'www.google.com',
            rating: 3,
        },
        {
            title: 'Cat is very imp',
            author: 'Sowmya',
            date: '10/20/2021',
            description:
                'lorem ipsumLorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elit sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elit',

            link: 'www.google.com',
            rating: 4,
        },
        {
            title: 'Jee is hard',
            author: 'amit kesari ',
            date: '3/4/2091',
            description:
                'lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elit',
            link: 'www.google.com',
            rating: 3.5,
        },
    ]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <NavBar />

            <Typography variant="h3" component="h3" mb={2}>
                Experiences
            </Typography>
            <Box sx={{ flexGrow: 1 }} m={1} p={1}>
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    justifyContent="center"
                    // alignItems="center"
                >
                    {/* loop over experiences array and pass data to CardExperience component for rendering children */}
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

                    {/* right side grid division for navigation or news */}
                    <Grid item xs={10} sm={4}>
                        {/* === modal button === */}
                        <Button
                            onClick={handleOpen}
                            variant="outlined"
                            color="warning"
                        >
                            Add Experience
                        </Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <EditorAndPreview />
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
