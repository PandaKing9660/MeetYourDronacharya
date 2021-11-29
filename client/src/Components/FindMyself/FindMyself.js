import {
  List,
  ListItem,
  ListItemText,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Divider,
  Button,
  Modal,
  Backdrop,
  Box,
  Fade,
  Typography,
  CircularProgress,
  Tooltip,
} from "@mui/material";

import { Chart } from "react-google-charts";
import "./findMyself.css";
import { questions } from "./FindMyselfQuestion.json";
import ResultCalculation from "./ResultCalculation.js";
import React, { useState } from "react";
import findyourpassion from "./findyourpassion.png";
import NavBar from "../Home/Navbar/Navbar";

const FindMyself = () => {
  const [questionSetId, setQuestionSetId] = useState("t0");
  const [resultDisplay, setResultModalOpen] = useState(false);
  const [addque, setaddqueModalOpen] = useState(false);
  const [score, setScore] = useState({});
  const [careeroptions, setCareerOptions] = useState({});
  const [resultCareer, setResultCareer] = useState({});

  const resultModalOpen = () => setResultModalOpen(true);
  const resultModalClose = () => setResultModalOpen(false);

  const addqueModalOpen = () => setaddqueModalOpen(true);
  const addqueModalClose = () => setaddqueModalOpen(false);

  // Loading questions from JSON
  const loadQuestion = (id) => {
    setQuestionSetId(id);
    questions
      .filter((queid) => queid.id === id)
      .map(
        (queset) => (
          setCareerOptions(queset.options[0]),
          queset.questionset.map((q) => (score[q.id] = 0))
        )
      );
  };

  // Selecting options in bullet button
  const optionSelect = (event) => {
    const id = event.target.value;
    const quesid = id.substring(0, 5);
    const optionid = id.substring(5, id.length);
    switch (optionid) {
      case "option1":
        score[quesid] = 1;
        break;
      case "option2":
        score[quesid] = 2;
        break;
      case "option3":
        score[quesid] = 3;
        break;
      default:
        window.alert("In Development");
    }
  };

  // Preparing Results and opening modal to display result
  const resultPreparation = async () => {
    var result = ResultCalculation(questionSetId, score, careeroptions);

    for (let i = 1; i < result.options.length; i++) {
      result.options[i][1] = parseFloat(result.options[i][1]);
    }
    setResultCareer(result);
    resultModalOpen();
    setScore({});
  };

  return (
    <div>
      <NavBar noSearch={true} />
      <div className="findmyself_FindMyself">
        <h1 className="h1_findmyself">Find My Passion</h1>
        <Grid
          container
          p={1}
          direction="row"
          rowSpacing={{ xs: 1 }}
          justifyContent="space-around"
          alignItems="center"
        >
          {/* Left part: Showing list of topics */}
          <Grid item xs={12} sm={6}>
            <Button style={{ margin: "1%" }} onClick={addqueModalOpen}>
              Add Question
            </Button>
            <List
              component="nav"
              aria-label="mailbox folders"
              style={{
                width: "90%",
                padding: "1%",
              }}
            >
              {questions.map((m) => (
                <ListItem
                  button
                  divider
                  onClick={() => loadQuestion(m.id)}
                  key={m.id}
                  style={{
                    background:
                      "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                    border: 0,
                    borderRadius: 3,
                    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .4)",
                    color: "white",
                    height: 48,
                    padding: "0 20px",
                    margin: "20px 20px",
                  }}
                >
                  <ListItemText primary={m.name} />
                </ListItem>
              ))}
            </List>
          </Grid>
          {/* Right Part: showing questions for that list */}
          {/* Showing message if question set is not selected otherwise questions */}
          <Grid item xs={12} sm={6}>
            {questionSetId !== "t0" ? (
              <Paper
                variant="outlined"
                square
                elevation={24}
                style={{
                  overflow: "auto",
                  width: "95%",
                  marginBottom: "20px",
                  padding: "2%",
                  boxShadow: "5px 10px 8px 10px #888888",
                  backgroundColor: "#fffafa",
                  color: "black",
                  height: "570px",
                }}
              >
                <h1 style={{ textAlign: "center" }}>
                  <u>Question Set</u>
                </h1>
                <h4 style={{ textAlign: "right" }}>
                  {questions
                    .filter((queid) => queid.id === questionSetId)
                    .map((queset) => (
                      <u>- {queset.setby}</u>
                    ))}
                </h4>
                <p align="left">Choose the most suitable options:</p>
                <ol type="1" style={{ padding: "0 3%" }}>
                  {questions
                    .filter((queid) => queid.id === questionSetId)
                    .map((queset) =>
                      queset.questionset.map((q) => (
                        <li>
                          <FormControl
                            style={{ width: "90%" }}
                            component="fieldset"
                          >
                            <FormLabel component="legend"> {q.que}</FormLabel>
                            <RadioGroup
                              row
                              aria-label={q.que}
                              name="row-radio-buttons-group"
                              onChange={optionSelect}
                            >
                              <FormControlLabel
                                value={q.id + "option1"}
                                control={<Radio />}
                                label="Low"
                              />
                              <FormControlLabel
                                value={q.id + "option2"}
                                control={<Radio />}
                                label="Medium"
                              />
                              <FormControlLabel
                                value={q.id + "option3"}
                                control={<Radio />}
                                label="High"
                              />
                            </RadioGroup>
                            <Divider padding="1px" />
                          </FormControl>
                        </li>
                      ))
                    )}
                </ol>
                <Button
                  style={{
                    marginBottom: "2%",
                    background: "white",
                    color: "black",
                    align: "center",
                  }}
                  variant="outlined"
                  onClick={resultPreparation}
                >
                  Submit
                </Button>
              </Paper>
            ) : (
              <Paper
                style={{
                  overflow: "auto",
                  width: "95%",
                  marginBottom: "20px",
                  padding: "2%",
                  boxShadow: "5px 10px 8px 10px #888888",
                  backgroundColor: "#fffafa",
                  color: "black",
                  height: "570px",
                }}
                variant="outlined"
                square
                elevation={24}
              >
                <div className="message_findmyself">
                  <h1>
                    <u>
                      <b>WELCOME</b>
                    </u>
                  </h1>
                  <p>
                    Hey, its me Anand and welcome to the page "Find your
                    Passion" to know one of the most difficult and equally
                    important question of student life "What should be our
                    career???"
                    <br />
                    Select a domain from the left and start answering to the
                    questions asked by thinking from mind and answering through
                    your heart.
                  </p>
                  <img src={findyourpassion} alt="FIND YOUR PASSION" />
                  <p>
                    The career shown by us will be calculated according to the
                    given score for each options. We strongly advice you to talk
                    to you known ones, explore this website and googles and then
                    select a career which really suits you. Don't go with flow
                    by thinking everyone is doing this or that, it must be
                    awesome. Everyone is different and possess unique talents.
                  </p>
                </div>
              </Paper>
            )}
          </Grid>
        </Grid>

        {/* Displaing result modal */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={resultDisplay}
          onClose={resultModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={resultDisplay}>
            <Box
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "white",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                align="center"
              >
                <u>Result Page</u>
              </Typography>
              <Divider />
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                <h5 className="suggestion_findmyself">
                  Suggested Career Option
                </h5>
                <Typography
                  className="careerchoice_findmyself"
                  align="center"
                  sx={{ color: "black", fontSize: "40px"}}
                >
                  <b>{resultCareer["careerchoice"]}</b>
                </Typography>
                <Chart
                  height="300px"
                  width="500px"
                  chartType="PieChart"
                  loader={<CircularProgress color="secondary" />}
                  data={resultCareer["options"]}
                  options={{
                    title: "Comparision with other choices",
                  }}
                  rootProps={{ "data-testid": "1" }}
                />
                <p className="note_findmyself">
                  Percentage calculated is with respect to the suggested
                  career option
                </p>
              </Typography>
            </Box>
          </Fade>
        </Modal>

        {/* Displaing add question modal */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={addque}
          onClose={addqueModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={addque}>
            <Box
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "65%",
                background: "white",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography align="center" variant="h6" padding="2%">
                <u>Add Question</u>
              </Typography>
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ borderRight: "2px grey solid", padding: "2%" }}
                >
                  <b>How?</b>
                  <br />
                  <ul padding="2%">
                    <li>Click on the link given and fill the google form.</li>
                    <li>The template for the question is provided.</li>
                    <li>Stick to the template.</li>
                  </ul>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ padding: "2%" }}>
                  <b>Why?</b>
                  <ul padding="2%">
                    <li>Contribute to the society.</li>
                    <li>Free promotion through our website.</li>
                    <li>
                      Enlighten others with your experience and knowledge.
                    </li>
                  </ul>
                </Grid>
              </Grid>
              <Tooltip followCursor title="Click to add your questions">
                <Button
                  href="https://forms.gle/At8dji4KerQYtQm8A"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Click Here
                </Button>
              </Tooltip>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default FindMyself;
