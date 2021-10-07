import { List, ListItem, ListItemText, Grid, Paper, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Divider, Pagination } from '@mui/material';
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
    marginBottom: '20px',
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    color: 'white',
  },
  formcontrol_findmyself: {
    width: '90%',
    marginTop: '10px',
  },
  pagination_findmyself: {
    marginTop: '10px',
    paddingBottom: '10px',
  }
});

const FindMyself = () => {
  const classes = useStyles();
  const [questionSetId, setQuestionSetId] = useState("t0");
  return (
    <div>
      <h1 className="h1_findmyself">Find My Passion</h1>
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
                  <FormControl className={classes.formcontrol_findmyself} component="fieldset">
                    <FormLabel component="legend">{q.que}</FormLabel>
                    <RadioGroup row aria-label={q.que} name="row-radio-buttons-group">
                      <FormControlLabel value="option1" control={<Radio />} label="Low" />
                      <FormControlLabel value="option2" control={<Radio />} label="Medium" />
                      <FormControlLabel value="option3" control={<Radio />} label="High" />
                    </RadioGroup>
                    <Divider />
                  </FormControl>
                ))
              ))
            }
            <Pagination className={classes.pagination_findmyself} count={5} color="primary" />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default FindMyself;
