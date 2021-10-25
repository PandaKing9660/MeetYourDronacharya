import React, {useEffect} from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import {Box} from '@mui/system';
import {Typography} from '@mui/material';

const Logout = () => {
  useEffect (() => {
    setTimeout (() => {
      localStorage.removeItem ('profile');
      window.location.href = 'http://localhost:3000/';
    }, 2000);
  }, []);

  return (
    <Box>
      
      <Stack sx={{width: '100%', color: 'grey.500'}} spacing={3} mt={4}>
      <Typography variant="h4">
  Signing You out...
</Typography>
        <LinearProgress color="secondary" />
        <LinearProgress color="success" />
        <LinearProgress color="inherit" />
      </Stack>
    </Box>
  );
};

export default Logout;
