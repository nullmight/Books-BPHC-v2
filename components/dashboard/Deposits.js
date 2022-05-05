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
      <Title>Total Listings</Title>
      <Typography component="p" variant="h2">
        16
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ flex: 1 }}>
        as of 1 May, 2022
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View all listings
        </Link>
      </div>
    </React.Fragment>
  );
}
