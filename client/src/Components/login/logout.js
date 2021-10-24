import React, {useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Logout = () => {
  useEffect (() => {
    setTimeout (() => {
      localStorage.removeItem ('profile');
      window.location.href = 'http://localhost:3000/';
    }, 2000);
  }, []);

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <CircularProgress />
      <CircularProgress />
      <CircularProgress />
      <CircularProgress />
      <CircularProgress />
      <CircularProgress />
      <CircularProgress />
      <CircularProgress />
      <CircularProgress />
      <CircularProgress />
      <CircularProgress />
      <CircularProgress />
      <CircularProgress />
      <CircularProgress />
      <CircularProgress />
      <CircularProgress />
      <CircularProgress />
      <CircularProgress />
    </div>
  );
};

export default Logout;
