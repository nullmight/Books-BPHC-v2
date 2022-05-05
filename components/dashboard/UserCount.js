import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Total Number of Registered Users</Title>
      <Typography component="p" variant="h2">
        69
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ flex: 1 }}>
        as of 1 May, 2022
      </Typography>
      <Typography component="p" variant="h3">
        14
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ flex: 1 }}>
        new users in the last month
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View all users
        </Link>
      </div>
    </React.Fragment>
  );
}
