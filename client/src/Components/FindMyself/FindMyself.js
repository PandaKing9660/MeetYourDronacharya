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
  Pagination,
  Button,
  Modal,
  Backdrop,
  Box,
  Fade,
  Typography,
  CircularProgress,
} from "@mui/material";

import { Chart } from "react-google-charts";
import { makeStyles } from "@mui/styles";
import "./findMyself.css";
import { questions } from "./FindMyselfQuestion.json";
import ResultCalculation from "./ResultCalculation.js";
import React, { useState } from "react";
import findyourpassion from "./findyourpassion.png";
import NavBar from "../Home/Navbar/Navbar";

const useStyles = makeStyles({
  listitem_findmyself: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .4)",
    color: "white",
    height: 48,
    padding: "0 20px",
    margin: "20px 20px",
  },
  list_findmyself: {
    width: "90%",
    padding: "2%",
  },
  paper_findmyself: {
    width: "95%",
    marginBottom: "20px",
    padding: "2%",
    boxShadow: "5px 10px 8px 10px #888888",
    backgroundColor: "#fffafa",
    color: "black",
    height: "580px",
    overflow: "auto",
  },
  formcontrol_findmyself: {
    width: "90%",
    margin: "5%",
    padding: "5%",
  },
  pagination_findmyself: {
    marginTop: "10px",
    paddingBottom: "10px",
    justifyContent: "center",
    display: "flex",
  },
  result_modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    background: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
  submitbutton_findmyself: {
    marginBottom: "2%",
    background: "white",
    color: "black",
  },
});

const FindMyself = () => {
  const classes = useStyles();
  const [questionSetId, setQuestionSetId] = useState("t0");
  const [resultDisplay, setResultModalOpen] = useState(false);
  const [score, setScore] = useState({});
  const [careeroptions, setCareerOptions] = useState({});
  const [resultCareer, setResultCareer] = useState({});

  const resultModalOpen = () => setResultModalOpen(true);
  const resultModalClose = () => setResultModalOpen(false);

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

  const resultPreparation = async () => {
    var result = ResultCalculation(questionSetId, score, careeroptions);

    for (let i = 1; i < result.options.length; i++) {
      result.options[i][1] = parseFloat(result.options[i][1]);
    }
    setResultCareer(result);
    console.log(222, result);
    resultModalOpen();
    setScore({});
  };

  return (
    <div>
      <NavBar />
      <div className="findmyself_FindMyself">
        <h1 className="h1_findmyself">Find My Passion</h1>
        <Grid container>
          {/* Left part: Showing list of topics */}
          <Grid item sm={6}>
            <List
              className={classes.list_findmyself}
              component="nav"
              aria-label="mailbox folders"
            >
              {questions.map((m) => (
                <ListItem
                  className={classes.listitem_findmyself}
                  button
                  divider
                  onClick={() => loadQuestion(m.id)}
                >
                  <ListItemText primary={m.name} />
                </ListItem>
              ))}
            </List>
          </Grid>
          {/* Right Part: showing questions for that list */}
          <Grid item sm={6}>
            {questionSetId !== "t0" ? (
              <Paper
                className={classes.paper_findmyself}
                variant="outlined"
                square
                elevation={24}
              >
                <h1>
                  <u>Question Set</u>
                </h1>
                <p align="left">Choose the most suitable options:</p>
                <ol type="i">
                  {questions
                    .filter((queid) => queid.id === questionSetId)
                    .map((queset) =>
                      queset.questionset.map((q) => (
                        <li>
                          <FormControl
                            className={classes.formcontrol_findmyself}
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
                            <Divider padding="2px" />
                          </FormControl>
                        </li>
                      ))
                    )}
                </ol>
                <Pagination
                  className={classes.pagination_findmyself}
                  count={1}
                  color="primary"
                />
                <Button
                  className={classes.submitbutton_findmyself}
                  variant="outlined"
                  onClick={resultPreparation}
                >
                  Submit
                </Button>
              </Paper>
            ) : (
              <Paper
                className={classes.paper_findmyself}
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
            <Box className={classes.result_modal}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                <u>Result Page</u>
              </Typography>
              <Divider />
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                <h5 className="suggestion_findmyself">
                  {" "}
                  Suggested Career Option:{" "}
                </h5>
                <h1 className="careerchoice_findmyself">
                  {resultCareer["careerchoice"]}
                </h1>
                <Chart
                  chartType="PieChart"
                  loader={<CircularProgress color="secondary" />}
                  data={resultCareer["options"]}
                  options={{
                    title: "Comparision with other choices: ",
                  }}
                  rootProps={{ "data-testid": "1" }}
                />
                <p className="note_findmyself">
                  Note: Percentage calculated is with respect to the suggested
                  career option
                </p>
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default FindMyself;
