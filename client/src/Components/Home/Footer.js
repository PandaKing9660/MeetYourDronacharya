import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';
import './footer.css';

export default function Footer() {
    return (
        <Box className="containerBox_footer" sx={{ width: '100%' }}>
            <Box sx={{ my: 1, mx: 2 }} className="head_footer">
                <Grid container>
                    <Grid item xs>
                        <Typography gutterBottom variant="h4" component="div">
                            Meet Your Dronacharya
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom variant="h6" component="div">
                            <Stack direction="row" spacing={1}>
                                <Chip color="primary" label="LinkedIn" />
                                <Chip color="info" label="Facebook" />
                                <Chip color="success" label="Medium" />
                                <Chip color="secondary" label="Github" />
                            </Stack>
                        </Typography>
                    </Grid>
                </Grid>
                <Typography
                    color="text.secondary"
                    variant="body2"
                    sx={{ fontStyle: 'italic' }}
                >
                    Find a career path of YOUR choice and not Sharma Ji's son.
                </Typography>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ my: 1 }}>
                {/* <Button>Add to cart</Button> */}
                <div className="footerLinkContainer">
                    <div className="footerLinks">
                        <Link to="/" >Home</Link>
                        <Link to="/ask-something">Ask Something</Link>
                        <Link to="/experience">Experience</Link>
                        <Link to="/study-material">Study Material</Link>
                        <Link to="/timeline">Time Line</Link>
                        <Link to="/dashboard">Dashboard </Link>
                        <Link to="/find-myself">Find Your Passion </Link>
                        <Link to="/about-us">About us</Link>
                    </div>
                </div>
            </Box>
            <Box className="copyright_footer" sx={{ mt: 2 }}>
                <Typography gutterBottom variant="body2">
                    © DACARPAS, 2021
                </Typography>
            </Box>
        </Box>
    );
}
