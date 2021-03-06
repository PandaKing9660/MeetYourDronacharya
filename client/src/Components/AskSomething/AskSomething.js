import React from "react";
import { useState } from "react";
import { Grid, Modal, Button, Box } from "@mui/material";

import NavBar from "../Home/Navbar/Navbar";
import QuestionsList from "./QuestionsList";
import NewsPoint from "./NewsPoint/NewsPoint";
import EditorAndPreview from "./EditorAndPreview";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "../Materials/material.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

// Style for the page
toast.configure();
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// ASK SOMETHING
const AskSomething = () => {
  const user = JSON.parse(localStorage.getItem("profile")); // Storing details of the user
  const [open, setOpen] = useState(false); // For modal
  const [searchResult, setSearchResult] = useState(""); // Storing search input

  const handleOpen = () =>
    user ? setOpen(true) : toast.error("Login to ask question");
  const handleClose = () => setOpen(false);
  
  return (
    <div>
      <NavBar setSearchResult={setSearchResult} />
      <h1 className="heading" style={{ marginTop: 25, textAlign: "center" }}>
        ASK SOMETHING
      </h1>

      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-start"
        overflow="hidden"
      >
        <Grid item md={8} sm={12}>
          {/* Button to write a doubt */}
          <Button
            onClick={handleOpen}
            variant="outlined"
            color="warning"
            size="large"
            sx={{ float: "right", marginRight: "3%", marginTop: "3%" }}
          >
            Ask a Doubt
          </Button>
          {/* Modal for writing doubt */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            disableEnforceFocus={true}
          >
            <Box sx={style}>
              <IconButton
                aria-label="Close"
                sx={{ float: "right" }}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
              <EditorAndPreview option="question" />{" "}
              {/* Called from EditorAndPreview.js for editing and previewing the doubt asked.*/}
            </Box>
          </Modal>

          {/*Displaying all previously asked questions. Called from QuestionList.js */}
          <QuestionsList
            searchResult={searchResult}
            setSearchResult={setSearchResult}
          />
        </Grid>
        <Grid item md={4} pr={3} mt={4}>
          {/* Display news feed item */}
          <NewsPoint />
        </Grid>
      </Grid>
    </div>
  );
};

export default AskSomething;
