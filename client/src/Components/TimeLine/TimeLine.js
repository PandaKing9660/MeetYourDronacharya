import React, { useState } from 'react';
import ExamCard from './ExamCard';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import NavBar from '../Home/Navbar/Navbar';
import { Divider } from '@mui/material';

// COntains the s and their respective timelines
// Timeline.js -> ExamCard.js -> EventsInExam.js

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <NavBar />
       <h2>Timeline</h2>
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{borderColor: 'divider', marginTop:20}}
      >
        <Tab label="  Separate  " {...a11yProps(0)} />
        <Tab label="  Combined  " {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TimeLine />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <StickyHeadTable  sx={{width:'100%' }}/>
      </TabPanel>
    </Box>
       </div>
  );
}
const TimeLine = () => {
    const [examCards, setExamCards] = useState([
        {
            name: 'UPSC',
            description: 'lorem ipsum lorem ipsum',
            imgLink:
                'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80',
            events: [
                { date: '01/01/2021', info: 'Exam Date', extra: '' },
                {
                    date: '21/02/2021',
                    info: 'Result Date',
                    extra: 'extra time',
                },
            ],
        },
        {
            name: 'CAT',
            description: 'lorem ipsum lorem ipsum',
            imgLink:
                'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
            events: [
                { date: '01/01/2021', info: 'Exam Date', extra: 'yuho' },
                { date: '01/01/2021', info: 'Prep Date', extra: 'yuho1234' },
                { date: '21/02/2021', info: 'Result Date', extra: '' },
            ],
        },
        {
            name: 'CAT',
            description: 'lorem ipsum lorem ipsum',
            imgLink:
                'https://images.unsplash.com/photo-1629218079827-3b28e2466725?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80',
            events: [

                { date: '01/01/2021', info: 'Exam Date', extra: 'All the very best for this things' },

                { date: '21/02/2021', info: 'Result Date', extra: '' },
            ],
        },
        {
            name: 'JEE',
            description: 'lorem ipsum lorem ipsum',
            imgLink:
                'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
            events: [
                { date: '01/01/2021', info: 'Exam Date', extra: '' },
                { date: '21/02/2021', info: 'Result Date', extra: '' },
            ],
        },
    ]);
    return (
      <div>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
          padding={{ xs: 0 }}
        >
          {examCards.map((examCard, index) => {
            return (
              <Grid item xs={4} sm={4} md={4} key={index}>
                <ExamCard cardData={examCard} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
};



const columns = [
  { id: 'date', label: 'Date' },
  { id: 'jan', label: 'January' },
  { id: 'feb', label: 'Febrauary' },
  { id: 'mar', label: 'March' },
  { id: 'apr', label: 'April' },
  { id: 'may', label: 'May' },
  { id: 'jun', label: 'June' },
  { id: 'jul', label: 'July' },
  { id: 'aug', label: 'August' },
  { id: 'sept', label: 'September' },
  { id: 'oct', label: 'October' },
  { id: 'nov', label: 'Novemver' },
  { id: 'dec', label: 'December' },
];

function createData(date,jan,feb,mar,apr,may,jun,jul,aug,sept,oct,nov,dec) {
  return { date,jan,feb,mar,apr,may,jun,jul,aug,sept,oct,nov,dec };
}

function ClickeableChips() {
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <div>
    <Stack direction="row" spacing={1}>
      <Chip label="CAT" variant="outlined" onClick={handleClick} />
    </Stack>
    <Stack direction="row" spacing={1}>
      <Chip label="BAT" variant="outlined" onClick={handleClick} />
    </Stack>
    </div>
  );
}


const rows = [
    createData(1,2,2,3,4,5,6,7,8,9,10,11,12),
  createData(2,1,ClickeableChips(),3,4,5,6,7,8,9,10,11,12),
  createData(3,1,2,ClickeableChips(),4,5,6,7,8,9,10,11,12),
  createData(4,ClickeableChips(),2,3,4,5,6,7,8,9,10,11,12),
  createData(5,1,ClickeableChips(),3,4,5,6,7,8,9,10,11,12),
  createData(6,1,2,ClickeableChips(),4,5,6,7,8,9,10,11,12),
  createData(7,ClickeableChips(),2,3,4,5,6,7,8,9,10,11,12),
  createData(8,1,ClickeableChips(),3,4,5,6,7,8,9,10,11,12),
  createData(9,1,2,ClickeableChips(),4,5,6,7,8,9,10,11,12),
  createData(10,ClickeableChips(),2,3,4,5,6,7,8,9,10,11,12),
  createData(11,1,ClickeableChips(),3,4,5,6,7,8,9,10,11,12),
  createData(12,1,2,ClickeableChips(),4,5,6,7,8,9,10,11,12),
  createData(13,ClickeableChips(),2,3,4,5,6,7,8,9,10,11,12),
  createData(14,1,ClickeableChips(),3,4,5,6,7,8,9,10,11,12),
  createData(15,1,2,ClickeableChips(),4,5,6,7,8,9,10,11,12),
  createData(16,ClickeableChips(),2,3,4,5,6,7,8,9,10,11,12),
  createData(17,1,ClickeableChips(),3,4,5,6,7,8,9,10,11,12),
  createData(18,1,2,ClickeableChips(),4,5,6,7,8,9,10,11,12),
  createData(19,ClickeableChips(),2,3,4,5,6,7,8,9,10,11,12),
  createData(20,1,ClickeableChips(),3,4,5,6,7,8,9,10,11,12),
  createData(21,1,2,ClickeableChips(),4,5,6,7,8,9,10,11,12),
  createData(22,ClickeableChips(),2,3,4,5,6,7,8,9,10,11,12),
  createData(23,1,ClickeableChips(),3,4,5,6,7,8,9,10,11,12),
  createData(24,1,2,ClickeableChips(),4,5,6,7,8,9,10,11,12),
  createData(25,ClickeableChips(),2,3,4,5,6,7,8,9,10,11,12),
  createData(26,1,ClickeableChips(),3,4,5,6,7,8,9,10,11,12),
  createData(27,1,2,ClickeableChips(),4,5,6,7,8,9,10,11,12),
  createData(28,ClickeableChips(),2,3,4,5,6,7,8,9,10,11,12),
  createData(29,1,ClickeableChips(),3,4,5,6,7,8,9,10,11,12),
  createData(30,1,2,ClickeableChips(),4,5,6,7,8,9,10,11,12),
  createData(31,ClickeableChips(),2,3,4,5,6,7,8,9,10,11,12),
];

const StickyHeadTable = ()  =>{
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{overflowX: 'hidden' ,width:"100%"}}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}