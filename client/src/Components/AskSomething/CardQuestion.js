import React, { useState } from 'react';
import CardHeader from '@mui/material/CardHeader';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import { Button, CardActionArea, CardActions } from '@mui/material';

// Generates color depending on the initials of the author for the avatar
function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

// Process and takes out initials from the name of the author
function stringAvatar(name) {
    let avatarName = '';

    // Check if name has spaces etc. Also check if there is last name or not
    if (name.trim().split(' ').length > 1) {
        avatarName = `${name.trim().split(' ')[0][0]}${
            name.trim().split(' ')[1][0]
        }`;
    } else {
        avatarName = `${name.trim().split(' ')[0][0]}`;
    }
    // console.log("LENGTH",name.trim().split(' ').length );
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: avatarName,
    };
}

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

const CardQuestion = ({ quesData }) => {
    // set dummy rating
    const [rating, setRating] = useState(0);

    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };
    return (
        <Paper sx={{ p: 0, margin: '1em', minWidth: 300, flexGrow: 1 }}>
            <Box
                p={3}
                // color={{ xs: 'red', sm: 'blue', md: 'green' }}
                marginY={{ xs: '1em', md: '0.2em' }}
                //  This will change margin on `sm` and `md`
            >
                <CardContent>
                    <Grid
                        container
                        rowSpacing={1}
                        // columnSpacing={{ xs: 1, sm: 2, md: 4 }}
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item xs={6} sm={4.6} md={8} align="left">
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{ textDecoration: 'underline' }}
                            >
                                {quesData.title}
                            </Typography>
                            <Typography
                                sx={{ mb: 1.5, fontSize: '0.91rem' }}
                                color="text.secondary"
                            >
                                {quesData.date}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            sm={3}
                            md={4}
                            lg={3}
                            sx={{ textTransform: 'uppercase' }}
                            align="left"
                        >
                            {/* right floating avatar and name of author */}
                            <CardHeader
                                avatar={
                                    <Avatar
                                        aria-label="recipe"
                                        {...stringAvatar(quesData.author)}
                                    ></Avatar>
                                }
                                titleTypographyProps={{
                                    variant: 'body2',
                                    color: 'green',
                                    align: 'right',
                                }}
                                title={quesData.author}
                                // subheader="September 14, 2016"
                            />
                        </Grid>
                    </Grid>

                    <Typography variant="body2" align="justify">
                        {quesData.description}
                    </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button size="small" color="primary" variant="outlined">
                        Answer
                    </Button>
                </CardActions>
            </Box>
        </Paper>
    );
};

export default CardQuestion;
