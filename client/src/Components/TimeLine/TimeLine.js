import React, { useState, useEffect } from 'react';
import ExamCard from './ExamCard';
import Grid from '@mui/material/Grid';

const TimeLine = () => {
    const [examCards, setExamCards] = useState([
        {
            name: 'UPSC',
            description: 'lorem ipsum lorem ipsum',
            imgLink: 'https://unsplash.com/photos/qDgTQOYk6B8',
            events: [
                { date: '01/01/2021', info: 'Exam Date' },
                { date: '21/02/2021', info: 'Result Date' },
            ],
        },
        {
            name: 'CAT',
            description: 'lorem ipsum lorem ipsum',
            imgLink: 'https://unsplash.com/photos/qDgTQOYk6B8',
            events: [
                { date: '01/01/2021', info: 'Exam Date' },
                { date: '21/02/2021', info: 'Result Date' },
            ],
        },
        {
          name: 'CAT',
          description: 'lorem ipsum lorem ipsum',
          imgLink: 'https://unsplash.com/photos/qDgTQOYk6B8',
          events: [
              { date: '01/01/2021', info: 'Exam Date' },
              { date: '21/02/2021', info: 'Result Date' },
          ],
      },
        {
            name: 'JEE',
            description: 'lorem ipsum lorem ipsum',
            events: [
                { date: '01/01/2021', info: 'Exam Date' },
                { date: '21/02/2021', info: 'Result Date' },
            ],
        },
    ]);
    return (
        <div>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
            >
                {examCards.map((examCard) => {
                    return (
                        <Grid item xs={2} sm={4} md={4} key={Math.random()}>
                            <ExamCard cardData={examCard} />
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
};

export default TimeLine;
