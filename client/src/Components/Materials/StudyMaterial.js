import * as React from "react";
import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import InputBase from "@mui/material/InputBase";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SearchIcon from "@mui/icons-material/Search";
import NavBar from "../Home/Navbar/Navbar";
import "./material.css";
import MaterialCard from "./materialCard";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { DropzoneArea } from "material-ui-dropzone";
import axios from "axios";

toast.configure()
// Styles for search
const Search = styled("div")(({ theme }) => ({
  position: "relative",
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

// Study Material
export default function StudyMaterial() {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue (newValue);
  };

  const [title, setTitle] = useState ('');
  const [link, setLink] = useState ('');
  const [description, setDescription] = useState ('');
  const [location, setLocation] = useState ('');
  const [tag, setTag] = useState ('meetyourdronacharya');
  // const [data, setData] = useState ({});
  const [loading, setLoading] = useState (false);
  const [materials, setMaterials] = useState ([]);
  const [upload, setUpload] = useState (true);

  // To retrieve user info if logged in
  const user = JSON.parse(localStorage.getItem("profile"));

  // Fetching previously added study materials
  useEffect (
    () => {
      setLoading(true);

    axios
      .post ( `${process.env.REACT_APP_BACKEND_URL}/study-material/fetch`, {user})
      .then (res => {
        setMaterials (res.data);
        setLoading (false);
      })
      .catch (err => console.log (err));
  }, []);

  // Save uploaded material
  // function onSaveFirstFile(file) {
  //   setData((prevState) => ({
  //     ...data,
  //     firstFile: [file],
  //   }));
  //   console.log("data", data);
  // }

  // Setting Tags
  const handleTagChange = (event, value) => {
    setTag (value);
  };

  // For uploading Study Materials
  const handleSubmit = () => {

    if(title === '')
    {
      setUpload(false);
      toast.error('Please add Heading')
    }
    else if(description === '')
    {
      setUpload(false);
      toast.error('Please add Description')
    }
    else if(link === '')
    {
      setUpload(false);
      toast.error('Please add Link')
    }
    else if(location === '')
    {
      setUpload(false);
      alert ('Please add Location');
    }
    else setUpload(true);
    
    if (upload) {
      axios
        .post ( `${process.env.REACT_APP_BACKEND_URL}/study-material/add`, {
          by: user._id,
          topic: title,
          description: description,
          link: link,
          location: location,
          // image: data,
          tags: tag,
        })
        .then (res => {
          console.log (res.data);
          toast.info('Thank you for sharing the material!!!')
          window.location.reload ();
        })
        .catch (err => console.log (err));
    }
  };

  // Showing two tabs: for displaying materials, for adding materials
  return (
    <div className="material_StudyMaterial">
      <NavBar />
      <h1 className="heading" style={{marginTop: "1%", textAlign: 'center'}}>
        STUDY MATERIAL
      </h1>
      <div className="division">
        <div className="materials">
          <Box>
            <TabContext value={value}>
              <Box sx={{borderBottom: "0.5%", borderColor: 'divider'}}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Study materials" value="1" />
                  <Tab label="Add material" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Box sx={{transform: 'translateZ(0px)', flexGrow: 1}}>
                  <Search sx={{color: 'black', background: 'white'}}>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{'aria-label': 'search'}}
                    />
                  </Search>
                  {/* If materials loaded, showing material otherwise circular progress */}
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <div>
                      {materials.map((material) => {
                        return (
                            <MaterialCard material={material} />
                        );
                      })}
                    </div>
                  )}
                </Box>
              </TabPanel>
              {/* For uploading Material */}
              <TabPanel value="4">
                <Box>
                  <form style={{display: 'inline'}}>
                    <h4 style={{textAlign: 'left'}}>
                      Heading:
                    </h4>
                    <input
                      style={{width: '100%', padding: "0.5%", marginTop: "1%", marginBottom: "1%"}}
                      type="text"
                      value={title}
                      onChange={e => setTitle (e.target.value)}
                    />
                    <h4 style={{textAlign: 'left'}}>
                      Description about the material:
                    </h4>
                    <div style={{marginTop: "1%", marginBottom: "1%"}}>
                      <ReactQuill
                        theme="snow"
                        sx={{backgroundColor: 'white', margin: "1%"}}
                        value={description}
                        onChange={setDescription}
                      />
                    </div>
                    <h4 style={{textAlign: 'left'}}>
                      Link for the material:
                    </h4>
                    <input
                      style={{width: '100%', padding: "0.5%", marginTop: "1%", marginBottom: "1%", color: 'blue', textDecoration: 'underline'}}
                      type="text"
                      onChange={e => setLink(e.target.value)}
                    />
                    <h4 style={{textAlign: 'left'}}>
                      Location:
                    </h4>
                    <input
                      style={{width: '100%', padding: "0.5%", marginTop: "1%", marginBottom: "1%"}}
                      type="text"
                      onChange={e => setLocation(e.target.value)}
                    />
                    <div>
                      <Autocomplete
                        multiple
                        id="tags-filled"
                        options={subjects.map (option => option.title)}
                        onChange={handleTagChange}
                        freeSolo
                        renderTags={(value, getTagProps) =>
                          value.map ((option, index) => (
                            <Chip
                              variant="outlined"
                              label={option}
                              {...getTagProps ({index})}
                            />
                          ))}
                        renderInput={params => (
                          <TextField
                            {...params}
                            variant="filled"
                            label="Tags"
                            placeholder="Enter the related tags"
                          />
                        )}
                      />
                    </div>


                    {/* <div style={{ margin: 40 }}>
                      For droping materials like pdf or images or videos
                      <DropzoneArea
                        showPreviews={true}
                        onChange={onSaveFirstFile}
                      />
                    </div> */}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      style={{marginTop: "1%"}}
                    >
                      Submit
                    </Button>
                  </form>
                </Box>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </div>
  );
}

const subjects = [{ title: "CAT" }, { title: "UPSC" }, { title: "JEE" }, {title: "Others"}];
