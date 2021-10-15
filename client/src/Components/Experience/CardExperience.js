import React from 'react';
import CardHeader from '@mui/material/CardHeader';

import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

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

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
            
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

const CardExperience = ({ expData }) => {
    return (
        <Paper sx={{ p: 2, margin:"1em", minWidth: 300, flexGrow: 1 }}>
            
            <CardContent>
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 4 }}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item xs={7} align="left">
                        <Typography variant="h5" component="div" sx={{ textDecoration: 'underline' }}>
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
                        sx={{ textTransform: 'uppercase' }}
                        align="left"
                    >
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
                                align:"right"
                            }}
                            title={expData.author}
                            // subheader="September 14, 2016"
                        />
                    </Grid>
                </Grid>

                <Typography variant="body2">{expData.description}</Typography>
            </CardContent>
            {/* <CardActions>
                <Button size="small">{expData.link}</Button>
            </CardActions> */}
        </Paper>
    );
};

export default CardExperience;
