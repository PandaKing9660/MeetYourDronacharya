import React, { useState } from 'react';
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import CardExperience from './CardExperience';

const Experience = () => {
    const [experiences, setExperiences] = useState([
        {
            title: 'Cat is very imp',
            author: 'amit kes',
            date: '10/20/2021',
            description:
                'lorem ipsumLorem ipsum dolor Lorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elit sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elit',

            link: 'www.google.com',
        },
        {
            title: 'Jee is hard',
            author: 'amit kesari ',
            date: '3/4/2091',
            description:
                'lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elit',
            link: 'www.google.com',
        },
    ]);

    return (
        <div>
            <h2>Experience</h2>
            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                justifyContent="center"
                // alignItems="center"
            >
                <Grid item xs={12} sm={7} md={8}>
                    <Box sx={{ minWidth: 275 }}>
                        {experiences.map((experience, index) => {
                            return (
                                // <Card variant="outlined">
                                <CardExperience expData={experience} key={index}/>
                                // </Card>
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
