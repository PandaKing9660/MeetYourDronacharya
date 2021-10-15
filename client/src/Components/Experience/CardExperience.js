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
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

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

const CardExperience = ({ expData }) => {
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
                        columnSpacing={{ xs: 1, sm: 2, md: 4 }}
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Grid item xs={7} align="left">
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{ textDecoration: 'underline' }}
                            >
                                {expData.title}
                            </Typography>
                            <Typography
                                sx={{ mb: 1.5, fontSize: '0.91rem' }}
                                color="text.secondary"
                            >
                                {expData.date}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            md={2.7}
                            // Warning may come for non integer value of md, but runs good
                            sx={{ textTransform: 'uppercase' }}
                            align="left"
                        >
                            {/* right floating avatar and name of author */}
                            <CardHeader
                                avatar={
                                    <Avatar
                                        aria-label="recipe"
                                        {...stringAvatar(expData.author)}
                                    ></Avatar>
                                }
                                titleTypographyProps={{
                                    variant: 'body2',
                                    color: 'green',
                                    align: 'right',
                                }}
                                title={expData.author}
                                // subheader="September 14, 2016"
                            />
                        </Grid>
                    </Grid>

                    <Typography variant="body2" align="justify">
                        {expData.description}
                    </Typography>
                </CardContent>

                {/* Rating of the experience out of 5 */}
                <Box
                    sx={{
                        '& > legend': { mt: 2 },
                        marginLeft: '1em',
                    }}
                >
                    <Typography component="legend" align="left" variant="body2">
                        Exp Meter : {!rating ? expData.rating : rating}
                    </Typography>
                    <StyledRating
                        name="customized-color"
                        defaultValue={expData.rating}
                        getLabelText={(value) =>
                            `${value} Heart${value !== 1 ? 's' : ''}`
                        }
                        precision={0.5}
                        icon={<FavoriteIcon fontSize="inherit" />}
                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                        sx={{
                            display: 'flex',
                            align: 'left',
                            width: '5em',
                        }}
                        onChange={handleRatingChange}
                        size="small"
                    />
                </Box>
            </Box>
        </Paper>
    );
};

export default CardExperience;
