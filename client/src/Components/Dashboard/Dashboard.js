import * as React from 'react';
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

export default function StickyHeadTable() {
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
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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