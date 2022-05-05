import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '30 April, 2022',
    'Let Us C',
    'CS F111',
    'Jilind Main',
    250.00,
  ),
  createData(
    1,
    '30 April, 2022',
    'Microprocessors',
    'CS F241',
    'Prashant Wali',
    400,
  ),
  createData(2, 
    '30 April, 2022', 
    'Introduction to Algorithms', 
    'CS F211', 
    'Tom Scholz', 
    500
  ),
  createData(
    3,
    '30 April, 2022',
    'Let Us C',
    'CS F111',
    'Vijay Kumar',
    300,
  ),
  createData(
    4,
    '29 April, 2022',
    'Differential Equations',
    'MATH F211',
    'Michael Alphonse',
    200,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Recent Listings</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Book Name</TableCell>
            <TableCell>Course Code</TableCell>
            <TableCell>Seller Name</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`₹${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        Load more listings
      </Link>
    </React.Fragment>
  );
}
