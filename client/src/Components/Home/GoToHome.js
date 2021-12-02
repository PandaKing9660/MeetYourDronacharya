import {Link} from 'react-router-dom'
import Navbar from "./Navbar/Navbar"
import { Typography } from '@mui/material';

// incase if no URL exists
const GoToHome = () => {
  return (
    <div style={{margin:"3%"}}>
      <Navbar noSearch={true}/>
      <Typography variant="h5" component="div">
        Woopsy, No URL Exists, <Link to="/">Go To Home</Link>
      </Typography>
      <img src="https://cdn.mos.cms.futurecdn.net/mYKbf3DSinvWnEzmHkEnCE-970-80.jpg.webp" alt="404"></img>
    </div>
  );
};

export default GoToHome;
