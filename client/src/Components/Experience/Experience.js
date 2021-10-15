import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardExperience from './CardExperience';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

const Experience = () => {
    const [experiences, setExperiences] = useState([
        { title: 'cat is very imp', author: 'amit', description: 'lorem ipsum' },
        { title: 'jee is hard', author: 'amit', description: 'lorem ipsum' },
    ]);

    return (
        <div>
            Experience
            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={12} sm={7} md={8}>
                    <Box sx={{ minWidth: 275 }}>
                        {experiences.map((experience, index) => {
                            return (
                                <Card variant="outlined">
                                    <CardExperience expData={experience} />
                                </Card>
                            );
                        })}
                    </Box>
                </Grid>
                <Grid item xs={10} sm={4} lg={3}>
                    <Box sx={{ minWidth: 205, border: 4, height: 1000 }}>
                        RIGHT SIDE NAV
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default Experience;
