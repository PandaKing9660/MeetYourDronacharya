import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';

// Contains design for a single Nav link
const NavbarLinks = ({ linkSingle }) => {
    const [linkName, setLinkName] = useState(linkSingle.linkName);
    const [linkTo, setLinkTo] = useState(`/${linkSingle.linkTo}`);
    const [IconProp, setIconProp] = useState(linkSingle.iconProp);

    return (
        <div>
            <Link to={linkTo}>
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
                {linkName}
            </Link>
        </div>
    );
};

export default NavbarLinks;
