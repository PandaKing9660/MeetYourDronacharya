import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';

import LaptopMacIcon from '@mui/icons-material/LaptopMac';


const EventsInExam = ({ eventsData }) => {
    return (
        <Timeline position="alternate">
            {eventsData.map((event, index) => {
                return (
                    <TimelineItem key={index}>
                        <TimelineOppositeContent
                            sx={{ m: 'auto 0' }}
                            align="right"
                            variant="body2"
                            color="text.secondary"
                        >
                            {event.date}
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            {/* <TimelineConnector /> */}
                            <TimelineDot color="primary" variant="outlined">
                                <LaptopMacIcon />
                            </TimelineDot>
                            {index !== eventsData.length - 1 && (
                                <TimelineConnector
                                    sx={{ bgcolor: 'secondary.main' }}
                                />
                            )}
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <Typography variant="h6" component="span">
                                {event.info}
                            </Typography>
                            <Typography>
                                {/* null check of string */}
                                {event.extra ? event.extra : ''}
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>
                );
            })}
        </Timeline>
    );
};

export default EventsInExam;
