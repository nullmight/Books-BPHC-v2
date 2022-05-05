import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from 'react'
import { useRouter } from 'next/router'

import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import Listing from '../models/Listing'


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Books@BPHC
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Home({ listings }) {
  const router = useRouter()
  const [message, setMessage] = useState('')

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Books@BPHC
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Books@BPHC
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              We cannot save your CG - but the books on our website can.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">View all listings</Button>
              <Button variant="outlined" href="/new">Post a listing</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {listings.map((listing) => (
              <Grid item key={listing._id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="300"
                    image="https://imgur.com/IoUBTih.jpg"
                    alt="book"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {listing.bookname}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {listing.author}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      {listing.course}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      ₹ {listing.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Link href="/[id]/edit" as={`/${listing._id}/edit`}>
                      <Button variant="outlined" startIcon={<EditIcon />}>
                        Edit
                      </Button>
                  </Link>
                  <Button variant="outlined" startIcon={<DeleteIcon />} 
                  color="error" onClick={async () => {
                    const listingID = listing._id

                    try {
                      await fetch(`/api/listings/${listingID}`, {
                        method: 'Delete',
                      })
                      router.push('/')
                    } catch (error) {
                      setMessage('Failed to delete the listing.')
                    }
                  }}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
               {message && <p>{message}</p>}
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const result = await Listing.find({})
  const listings = result.map((doc) => {
    const listing = doc.toObject()
    listing._id = listing._id.toString()
    return listing
  })

  return { props: { listings: listings } }
}