import React, {useState} from 'react';

import './navbar.css';

import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import FlareIcon from '@mui/icons-material/Flare';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TimelineIcon from '@mui/icons-material/Timeline';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExploreIcon from '@mui/icons-material/Explore';
import PeopleIcon from '@mui/icons-material/People';
import logoutIcon from '@mui/icons-material/Logout';
import loginIcon from '@mui/icons-material/Login';

import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';

import NavbarLinks from './NavbarLinks';

const Search = styled ('div') (({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha (theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha (theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing (2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up ('sm')]: {
    marginLeft: theme.spacing (3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled ('div') (({theme}) => ({
  padding: theme.spacing (0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled (InputBase) (({theme}) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing (1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing (4)})`,
    transition: theme.transitions.create ('width'),
    width: '100%',
    [theme.breakpoints.up ('md')]: {
      width: '20ch',
    },
  },
}));

export default function NavBar () {
  const user = JSON.parse (localStorage.getItem ('profile'));
  const [linksArray, setLinksArray] = useState ([
    {linkName: 'Home', linkTo: '', iconProp: HomeIcon},
    {
      linkName: 'Ask Something',
      linkTo: 'ask-something',
      iconProp: QuestionAnswerIcon,
    },
    {linkName: 'Experience', linkTo: 'experience', iconProp: FlareIcon},
    {
      linkName: 'Study Material',
      linkTo: 'study-material',
      iconProp: MenuBookIcon,
    },
    {linkName: 'Time Line', linkTo: 'timeline', iconProp: TimelineIcon},
    {linkName: 'Dashboard', linkTo: 'dashboard', iconProp: AccountCircle},
    {
      linkName: 'Find Your Passion',
      linkTo: 'find-myself',
      iconProp: ExploreIcon,
    },
    {linkName: 'About Us', linkTo: 'about-us', iconProp: PeopleIcon},
    {
      linkName: user ? 'Logout' : 'Login',
      linkTo: user ? 'logout' : 'login',
      iconProp: user ? logoutIcon : loginIcon,
    },
  ]);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState (null);

  const isMobileMenuOpen = Boolean (mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl (null);
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl (event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {linksArray.map (linkSingle => {
        return (
          <MenuItem key={Math.random ()}>
            <NavbarLinks linkSingle={linkSingle} />
          </MenuItem>
        );
      })}
    </Menu>
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        position: 'sticky',
        display: 'block',
        margin: '5em',
        zIndex: '5',
      }}
    >
      <AppBar sx={{}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{mr: 1}}
          />

          <Button component={Link} to={'/'}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: {
                  xs: 'inline-block',
                  sm: 'block',
                },
                color: '#551a8b',
              }}
            >
              Meet Your Dronacharya
            </Typography>
          </Button>

          <Search sx={{display: {xs: 'none', sm: 'block'}}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{'aria-label': 'search'}}
            />
          </Search>
          <Box sx={{flexGrow: 1}} />
          <Box sx={{display: {xs: 'none', md: 'flex'}}}>
            {linksArray.map (linkSingle => {
              return (
                <NavbarLinks key={Math.random ()} linkSingle={linkSingle} />
              );
            })}
          </Box>
          <Box sx={{display: {xs: 'flex', md: 'none'}}}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {/* {renderMenu} */}
    </Box>
  );
}
