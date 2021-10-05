import { List, ListItem, ListItemText, Grid, Paper, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';
import "./findMyself.css"
import { questions } from "./FindMyselfQuestion.json";
import React, { useState } from 'react';

const useStyles = makeStyles({
  listitem_findmyself: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .4)',
    color: 'white',
    height: 48,
    padding: '0 20px',
    margin: '20px 20px',
  },
  list_findmyself: {
    width: '90%',
  },
  paper_findmyself: {
    width: '95%',
  },
});

const FindMyself = () => {
  const classes = useStyles();
  const [questionSetId, setQuestionSetId] = useState("t0");
  return (
    <div>
      <h1>Find Myself</h1>
      <Grid container>
        {/* Left part: Showing list of topics */}
        <Grid item sm={6}>
          <List className={classes.list_findmyself} component="nav" aria-label="mailbox folders">
            {
              questions.map(m => (
                <ListItem className={classes.listitem_findmyself} button divider onClick = {() => setQuestionSetId(m.id)}>
                  <ListItemText primary={m.name} />
                </ListItem>
              ))}
          </List>
        </Grid>
        {/* Right Par: showing questions for that list */}
        <Grid item sm={6}>
          <Paper className={classes.paper_findmyself} variant="outlined" square elevation={24} >
            {
              questions.filter(queid => queid.id == questionSetId).map (queset => (
                queset.questionset.map (q => (
                  <FormControl component="fieldset">
                    <FormLabel component="legend">{q.que}</FormLabel>
                    <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                  </FormControl>
                ))
              ))
            }
            {/* <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl> */}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default FindMyself;
