import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import './home.css';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {textAlign} from '@mui/system';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NavbarLinks from './Navbar/NavbarLinks';
import MenuItem from '@mui/material/MenuItem';

const top100Films = [
  {label: 'The Shawshank Redemption', year: 1994},
  {label: 'The Godfather', year: 1972},
  {label: 'The Godfather: Part II', year: 1974},
  {label: 'The Dark Knight', year: 2008},
  {label: '12 Angry Men', year: 1957},
  {label: "Schindler's List", year: 1993},
  {label: 'Pulp Fiction', year: 1994},
];

const Home = () => {
  const {height, width} = useWindowDimensions ();
  let history = useHistory ();
  return (
    <div className="home">
      {/* <h1 className="head_home">MEET YOUR DRONACHARYA</h1> */}
      <Stack direction="row" spacing={0}>
        {!JSON.parse (localStorage.getItem ('profile'))
          ? <Button
              variant="outlined"
              href="/login"
              sx={{marginLeft: 160 * width / 1500}}
            >
              Sign up/Login
            </Button>
          : <MenuItem sx={{marginLeft: 160 * width / 1500}}>
              <NavbarLinks
                linkSingle={{
                  linkName: 'Dashboard',
                  linkTo: 'dashboard',
                  iconProp: AccountCircle,
                }}
              />
            </MenuItem>}
      </Stack>
      <h1 className="head_home">Meet Your Dronacharya</h1>
      <div className="remaining">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          sx={{
            width: 500,
            marginLeft: width * 60 / 1500,
            border: 5,
            borderRadius: 4,
            background: 'white',
          }}
          renderInput={params => <TextField {...params} label="Search" />}
        />
        <div>
          <button
            className="button1"
            onClick={() => history.push ('/ask-something')}
            style={{
              width: '350px',
              height: '75px',
              fontSize: 20,
              color: 'white',
              borderRadius: 15,
              marginRight: width - 720,
              marginTop: 100,
            }}
          >
            Ask something
          </button>
          <button
            className="button2"
            onClick={() => history.push ('/experience')}
            style={{
              width: '350px',
              height: '75px',
              fontSize: 20,
              color: 'white',
              borderRadius: 15,
            }}
          >
            Experience
          </button>
        </div>
        <div>
          <button
            className="button3"
            onClick={() => history.push ('/study-material')}
            style={{
              width: '400px',
              height: '75px',
              fontSize: 20,
              color: 'white',
              marginRight: width - 820,
              borderRadius: 15,
            }}
          >
            Study material
          </button>
          <button
            className="button4"
            onClick={() => history.push ('/timeline')}
            style={{
              width: '400px',
              height: '75px',
              fontSize: 20,
              color: 'white',
              borderRadius: 15,
            }}
          >
            Timeline
          </button>
        </div>
        <div>
          <button
            className="button5"
            onClick={() => history.push ('/dashboard')}
            style={{
              width: '450px',
              height: '75px',
              fontSize: 20,
              marginRight: width - 920,
              borderRadius: 15,
              color: 'white',
            }}
          >
            Dashboard
          </button>
          <button
            className="button6"
            onClick={() => history.push ('/find-myself')}
            style={{
              width: '450px',
              height: '75px',
              fontSize: 20,
              borderRadius: 15,
              color: 'white',
            }}
          >
            Find your passion
          </button>
        </div>
        <div>
          <button
            className="button7"
            onClick={() => history.push ('/about-us')}
            style={{
              width: '500px',
              height: '75px',
              fontSize: 20,
              marginBottom: 10,
              borderRadius: 15,
              marginRight: width - 1020,
              color: 'white',
            }}
          >
            About us
          </button>
          <button
            className="button8"
            onClick={() => history.push ('/')}
            style={{
              width: '500px',
              height: '75px',
              fontSize: 20,
              borderRadius: 15,
              color: 'white',
            }}
          >
            Extra
          </button>
        </div>
      </div>
    </div>
  );
};

function getWindowDimensions () {
  const {innerWidth: width, innerHeight: height} = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions () {
  const [windowDimensions, setWindowDimensions] = useState (
    getWindowDimensions ()
  );

  useEffect (() => {
    function handleResize () {
      setWindowDimensions (getWindowDimensions ());
    }

    window.addEventListener ('resize', handleResize);
    return () => window.removeEventListener ('resize', handleResize);
  }, []);

  return windowDimensions;
}

export default Home;
