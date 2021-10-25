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
import { useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { DropzoneArea } from "material-ui-dropzone";
// import {
//   AttachFile,
//   Description,
//   PictureAsPdf,
//   Theaters,
// } from "@material-ui/icons";

import axios from 'axios';

// const handlePreviewIcon = (fileObject, classes) => {
//   const { type } = fileObject.file;
//   const iconProps = {
//     className: classes.image,
//   };

//   if (type.startsWith("video/")) return <Theaters {...iconProps} />;

//   switch (type) {
//     case "application/msword":
//     case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
//       return <Description {...iconProps} />;
//     case "application/pdf":
//       return <PictureAsPdf {...iconProps} />;
//     default:
//       return <AttachFile {...iconProps} />;
//   }
// };

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function StudyMaterial() {
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [data, setData] = useState({});

  const user = JSON.parse (localStorage.getItem ('profile'));

  function onSaveFirstFile(file) {
    setData((prevState) => ({
      ...data,
      firstFile: [file],
    }));
    console.log(111, file);
  }

  const handleTagChange = (event, value) => {
    setTag(value);
  };

  const handleSubmit = () => {
    console.log(title);
    console.log(description);
    console.log(tag);
    console.log(data);
    if(description !== "") {
      axios
        .post ('http://localhost:3001/study-material/add', {
          by: user._id,
          topic: title,
          description: description,
          material: data,
          tags: tag
        })
        .then (res => {
          console.log (res.data);
          window.location.reload ();
        })
        .catch (err => console.log (err));
    }
    alert("Thank you for sharing the material!!!");
  };

  return (
    <div className="material_StudyMaterial">
      <NavBar />
      <h2 style={{ marginTop: 25, textAlign: "center" }}>STUDY MATERIAL</h2>
      <div className="division">
        {/* <div className="info">
          <div>
            Books are undeniably a blessing to humankind. And books being useful
            for us in many ways have earned the title of our best friend.
            Libraries are the storehouse of books of several genres where
            interested readers can spend time reading in silence or can borrow
            books by being a member of that library. Through this practice of
            reading, we humans also display a greater sense of being civilized.
            There are individuals like myself who like to collect books,
            especially storybooks or novels. And this habit of mine has turned
            my house into a small library in itself. I know many other readers
            who share this same obsession with reading books and collecting
            them. My conversions with them mostly revolve around the plot, the
            character development, the writing style of the authors, and other
            aspects of books.
          </div>
        </div> */}
        <div className="materials">
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Study materials" value="1" />
                  {/* <Tab label="Liked materials" value="3" /> */}
                  <Tab label="Add material" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
                  <Search sx={{ color: "black", background: "white" }}>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ "aria-label": "search" }}
                    />
                  </Search>
                  <MaterialCard />
                  <MaterialCard />
                </Box>
              </TabPanel>
              {/* <TabPanel value="3" sx={{ color: "black", background: "white" }}>
                <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ "aria-label": "search" }}
                    />
                  </Search>
                  <MaterialCard />
                  <MaterialCard />
                </Box>
              </TabPanel> */}
              <TabPanel value="4">
                <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
                  <form>
                    <label style={{ textAlign: "left" }}>
                      Enter the topic :{" "}
                    </label>
                    <input
                      style={{ width: "100%", padding: 15, marginBottom: 40 }}
                      type="text"
                      // value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <h4 style={{ textAlign: "left" }}>
                      Description about the material:
                    </h4>
                    <div>
                      <ReactQuill
                        theme="snow"
                        sx={{ backgroundColor: "white", margin: 40 }}
                        value={description}
                        onChange={setDescription}
                      />
                    </div>
                    <div>
                      <Autocomplete
                        multiple
                        id="tags-filled"
                        options={subjects.map((option) => option.title)}
                        onChange={handleTagChange}
                        freeSolo
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              variant="outlined"
                              label={option}
                              {...getTagProps({ index })}
                            />
                          ))
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="filled"
                            label="Tags"
                            placeholder="Enter the related tags"
                          />
                        )}
                      />
                    </div>

                    <div style={{ margin: 40 }}>
                      <DropzoneArea
                        showPreviews={true}
                        onChange={onSaveFirstFile}
                      />
                    </div>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
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

const subjects = [{ title: "CAT" }, { title: "physics" }];
