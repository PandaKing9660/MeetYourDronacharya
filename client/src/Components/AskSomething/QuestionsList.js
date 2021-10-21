import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import CardQuestion from './CardQuestion';

const QuestionsList = () => {
    // dummy data for experience posts
    const [questions, setQuestions] = useState([
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
            title: 'Jee is hard, but is it or is it not i am not sure',
            author: 'amit kesari ',
            date: '3/4/2091',
            description:
                'lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elitLorem ipsum dolor sit amet, consectetur adipisicing elit',
            link: 'www.google.com',
            rating: 3.5,
        },
    ]);

    return (
        <Box sx={{ flexGrow: 1 }} m={1} p={1} mt={2}>
            <Typography variant="h4" component="h2" align="left" ml={2}>
                Questions:
            </Typography>

            {/* loop over experiences array and pass data to CardExperience component for rendering children */}

            <Grid
                container
                // spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                justifyContent="flex-start"
                alignItems="center"
            >
                {questions.map((question, index) => {
                    return (
                        <Grid item xs={12} md={6} key={index}>
                            <CardQuestion quesData={question} />;
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default QuestionsList;
