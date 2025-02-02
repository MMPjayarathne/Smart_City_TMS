import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  useTheme,
} from '@mui/material';
import { Person, Cake, Flag, FormatListNumbered } from '@mui/icons-material'; // Icons for headers

// Sample data for the table
const sampleData = [
  { id: 1, name: 'John Doe', age: 28, country: 'USA' },
  { id: 2, name: 'Jane Smith', age: 34, country: 'Canada' },
  { id: 3, name: 'Michael Johnson', age: 41, country: 'UK' },
  { id: 4, name: 'Emily Davis', age: 29, country: 'Australia' },
  { id: 5, name: 'Daniel Brown', age: 25, country: 'Germany' },
  { id: 6, name: 'Sophia Wilson', age: 31, country: 'France' },
  { id: 7, name: 'William Taylor', age: 37, country: 'Netherlands' },
];

const DataTable = () => {
  const theme = useTheme();

  const [order, setOrder] = useState('asc'); // Sorting order
  const [orderBy, setOrderBy] = useState('name'); // Sorting column
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

  // Sorting function
  const handleSort = (property) => {
    const isAscending = orderBy === property && order === 'asc';
    setOrder(isAscending ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Sorting logic
  const sortedData = [...sampleData].sort((a, b) => {
    if (order === 'asc') return a[orderBy] > b[orderBy] ? 1 : -1;
    return a[orderBy] < b[orderBy] ? 1 : -1;
  });

  // Pagination handlers
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.background.paper, boxShadow: 3 }}>
        <Table>
          {/* Table Head */}
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
              <TableCell sx={{ color: theme.palette.primary.contrastText, fontWeight: 'bold' }}>
                <TableSortLabel
                  active={orderBy === 'id'}
                  direction={orderBy === 'id' ? order : 'asc'}
                  onClick={() => handleSort('id')}
                  sx={{ color: theme.palette.primary.contrastText }}
                >
                  <FormatListNumbered sx={{ verticalAlign: 'middle', marginRight: 1 }} /> ID
                </TableSortLabel>
              </TableCell>

              <TableCell sx={{ color: theme.palette.primary.contrastText, fontWeight: 'bold' }}>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleSort('name')}
                  sx={{ color: theme.palette.primary.contrastText }}
                >
                  <Person sx={{ verticalAlign: 'middle', marginRight: 1 }} /> Name
                </TableSortLabel>
              </TableCell>

              <TableCell sx={{ color: theme.palette.primary.contrastText, fontWeight: 'bold' }}>
                <TableSortLabel
                  active={orderBy === 'age'}
                  direction={orderBy === 'age' ? order : 'asc'}
                  onClick={() => handleSort('age')}
                  sx={{ color: theme.palette.primary.contrastText }}
                >
                  <Cake sx={{ verticalAlign: 'middle', marginRight: 1 }} /> Age
                </TableSortLabel>
              </TableCell>

              <TableCell sx={{ color: theme.palette.primary.contrastText, fontWeight: 'bold' }}>
                <TableSortLabel
                  active={orderBy === 'country'}
                  direction={orderBy === 'country' ? order : 'asc'}
                  onClick={() => handleSort('country')}
                  sx={{ color: theme.palette.primary.contrastText }}
                >
                  <Flag sx={{ verticalAlign: 'middle', marginRight: 1 }} /> Country
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id} sx={{ '&:hover': { backgroundColor: theme.palette.action.hover } }}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.country}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sampleData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ backgroundColor: theme.palette.background.paper }}
      />
    </Box>
  );
};

export default DataTable;
