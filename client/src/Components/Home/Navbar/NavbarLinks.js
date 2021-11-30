import React from 'react';
import {Link} from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// Contains design for a single Nav link
const NavbarLinks = ({linkSingle}) => {
  // variables to be used
  const linkName = linkSingle.linkName;
  const linkTo = `/${linkSingle.linkTo}`;
  const IconProp = linkSingle.iconProp;
  const color = linkSingle.color;

  return (
    <div>
      <Link
        to={linkTo}
        target="_parent"
        style={{fontSize: '1em', padding: '0.05em'}}
      >
        {/* Showing the icon perfectly and making surrounding white */}
        <Tooltip title={linkName}>
          <IconButton
            size="small"
            aria-label="show new home"
            edge="end"
            color={color ? 'warning' : 'inherit'}
            sx={{color: 'blue', background: 'white', margin: '0.2em'}}
          >
            <IconProp />
          </IconButton>
        </Tooltip>
      </Link>
    </div>
  );
};

export default NavbarLinks;
