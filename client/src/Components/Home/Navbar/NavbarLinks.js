import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// Contains design for a single Nav link
const NavbarLinks = ({linkSingle}) => {
  const [linkName, setLinkName] = useState (linkSingle.linkName);
  const [linkTo, setLinkTo] = useState (`/${linkSingle.linkTo}`);
  const [IconProp, setIconProp] = useState (linkSingle.iconProp);
  const [color, setColor] = useState (linkSingle.color);

  return (
    <div>
      <Link to={linkTo} style={{fontSize: '1em', padding: '0.05em'}}>
        <Button
          sx={{
            textAlign: 'center',
            color: 'white',
            textTransform: 'capitalize',
          }}
          fullWidth="true"
        >
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

            {/* {linkName} */}
          </Tooltip>
        </Button>
      </Link>
    </div>
  );
};

export default NavbarLinks;
