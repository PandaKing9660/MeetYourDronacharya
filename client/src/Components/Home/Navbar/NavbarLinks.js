import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// Contains design for a single Nav link
const NavbarLinks = ({ linkSingle }) => {
    const [linkName, setLinkName] = useState(linkSingle.linkName);
    const [linkTo, setLinkTo] = useState(`/${linkSingle.linkTo}`);
    const [IconProp, setIconProp] = useState(linkSingle.iconProp);

    return (
        <div>
            <Link to={linkTo} style={{ fontSize: '0.9em', padding: '0.1em' }}>
                <Tooltip title={linkName}>
                    <IconButton
                        size="small"
                        aria-label="show new home"
                        edge="end"
                        color="inherit"
                        // aria-controls={menuId}
                        // aria-haspopup="true"
                        // onClick={handleProfileMenuOpen}
                    >
                        <IconProp />
                    </IconButton>
                    {/* {linkName} */}
                </Tooltip>
            </Link>
        </div>
    );
};

export default NavbarLinks;
