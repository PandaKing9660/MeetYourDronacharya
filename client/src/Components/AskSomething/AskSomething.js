import React from 'react';
import { useState } from 'react';
import NavBar from '../Home/Navbar/Navbar';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import QuestionsList from './QuestionsList';
import EditorAndPreview from './EditorAndPreview';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AskSomething = () => {
    const user = JSON.parse (localStorage.getItem ('profile'));
    const [open, setOpen] = useState(false);
    const handleOpen = () => user ? setOpen(true) : alert('Login to ask question');
    const handleClose = () => setOpen(false);
    return (
        <div>
            <NavBar />
            <Typography variant="h3" component="h3" mb={2}>
                Ask Something
            </Typography>

            <Button
                onClick={handleOpen}
                variant="outlined"
                color="warning"
                sx={{ float: 'right', marginRight: '10%' }}
            >
                Ask a Doubt
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <EditorAndPreview option='question' />
                </Box>
            </Modal>

            <QuestionsList />
        </div>
    );
};

export default AskSomething;
