import React, { useState } from 'react';
import ExamCard from './ExamCard';
import Grid from '@mui/material/Grid';

// COntains the s and their respective timelines
// Timeline.js -> ExamCard.js -> EventsInExam.js
const TimeLine = () => {
    const [examCards, setExamCards] = useState([
        {
            name: 'UPSC',
            description: 'lorem ipsum lorem ipsum',
            imgLink:
                'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80',
            events: [
                { date: '01/01/2021', info: 'Exam Date', extra: '' },
                {
                    date: '21/02/2021',
                    info: 'Result Date',
                    extra: 'extra time',
                },
            ],
        },
        {
            name: 'CAT',
            description: 'lorem ipsum lorem ipsum',
            imgLink:
                'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
            events: [
                { date: '01/01/2021', info: 'Exam Date', extra: 'yuho' },
                { date: '01/01/2021', info: 'Prep Date', extra: 'yuho1234' },
                { date: '21/02/2021', info: 'Result Date', extra: '' },
            ],
        },
        {
            name: 'CAT',
            description: 'lorem ipsum lorem ipsum',
            imgLink:
                'https://images.unsplash.com/photo-1629218079827-3b28e2466725?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80',
            events: [
                { date: '01/01/2021', info: 'Exam Date', extra: 'All the very best for this things' },
                { date: '21/02/2021', info: 'Result Date', extra: '' },
            ],
        },
        {
            name: 'JEE',
            description: 'lorem ipsum lorem ipsum',
            imgLink:
                'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
            events: [
                { date: '01/01/2021', info: 'Exam Date', extra: '' },
                { date: '21/02/2021', info: 'Result Date', extra: '' },
            ],
        },
    ]);
    return (
        <div>
            <h2>Timeline</h2>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 2, sm: 8, md: 12 }}
                padding={{ xs: 1 }}
            >
                {examCards.map((examCard) => {
                    return (
                        <Grid item xs={4} sm={4} md={4} key={Math.random()}>
                            <ExamCard cardData={examCard} />
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
};

export default TimeLine;
