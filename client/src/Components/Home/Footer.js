import React, {useState} from 'react';

import {
  Typography,
  Divider,
  Stack,
  Grid,
  Chip,
  Box,
  Button,
} from '@mui/material';

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

import {Link} from 'react-router-dom';
import './footer.css';

// Footer Buttons
const FooterButton = ({footerName}) => {
  return (
    <Link to={footerName.linkTo}>
      <Button
        sx={{
          textAlign: 'center',
          color: 'white',
          textTransform: 'capitalize',
        }}
        fullWidth
      >
        {footerName.name}
      </Button>
    </Link>
  );
};

export default function Footer () {
  const [footerNames, setfooterNames] = useState ([
    {name: 'Home', linkTo: '/'},
    {name: 'Ask Something', linkTo: '/ask-something'},
    {name: 'Experience', linkTo: '/experience'},
    {name: 'Study Material', linkTo: '/study-material'},
    {name: 'Time Line', linkTo: '/timeline'},
    {name: 'Dashboard', linkTo: '/dashboard'},
    {name: 'Find Passion', linkTo: '/find-myself'},
    {name: 'About us', linkTo: '/about-us'},
  ]);

  const [socialLinks, setSocialLinks] = useState ([
    {
      name: 'Facebook',
      link: 'https://www.facebook.com/profile.php?id=100071815530465',
      color: 'info',
      icon: <FacebookIcon />,
    },
    {
      name: 'LinkedIn',
      link: 'https://www.linkedin.com/in/meetyour-dronacharya-5ba431224/',
      color: 'primary',
      icon: <LinkedInIcon />,
    },
    {
      name: 'Github',
      link: 'https://github.com/PandaKing9660/MeetYourDronacharya',
      color: 'secondary',
      icon: <GitHubIcon />,
    },
  ]);

  return (
    <Box className="containerBox_footer" sx={{width: '100%'}}>
      <Box sx={{my: 1, mx: 2}} className="head_footer">
        <Grid container>
          <Grid item xs>
            <Typography gutterBottom variant="h4" component="div">
              Meet Your Dronacharya
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6" component="div">
              <Stack direction="row" spacing={1}>
                {socialLinks.map ((socialLink, index) => {
                  return (
                    <Chip
                      color={socialLink.color}
                      label={socialLink.name}
                      component="a"
                      href={socialLink.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      clickable
                      variant="contained"
                      icon={socialLink.icon}
                      key={index}
                    />
                  );
                })}
              </Stack>
            </Typography>
          </Grid>
        </Grid>
        <Typography
          color="text.secondary"
          variant="body2"
          sx={{fontStyle: 'italic', color: 'white'}}
        >
          Find a career path of YOUR choice and not Sharma Ji's son.
        </Typography>
      </Box>
      <Divider variant="middle" />
      <Box sx={{my: 1}}>
        <Grid
          className="footerLinks"
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          {footerNames.map ((footerName, index) => {
            return (
              <Grid item xs={6} sm={4} md={2} lg={1} key={index}>
                <FooterButton footerName={footerName} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Box className="copyright_footer" sx={{mt: 2}}>
        <Typography gutterBottom variant="body2">
          © DACARPAS, 2021
        </Typography>
      </Box>
    </Box>
  );
}
