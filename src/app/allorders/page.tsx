// components/Table.tsx
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// Define the type for the data rows
interface Data {
  name: string;
  age: number;
  email: string;
}

// Update the createData function with typed parameters
const createData = (name: string, age: number, email: string): Data => {
  return { name, age, email };
};

const rows: Data[] = [
  createData('John Doe', 25, 'john.doe@example.com'),
  createData('Jane Smith', 30, 'jane.smith@example.com'),
  createData('Alice Johnson', 28, 'alice.johnson@example.com'),
  createData('Michael Brown', 35, 'michael.brown@example.com'),
];

const BasicTable: React.FC = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
