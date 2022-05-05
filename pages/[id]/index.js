import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../lib/dbConnect'
import Listing from '../../models/Listing'

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'

/* Allows you to view listing card info and delete listing card*/
const ListingPage = ({ listing }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const listingID = router.query.id

    try {
      await fetch(`/api/listings/${listingID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the listing.')
    }
  }

  return (
    <div key={listing._id}>

    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/src/book.jpg"
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
        color="error" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
    
      {message && <p>{message}</p>}
    </div>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const listing = await Listing.findById(params.id).lean()
  listing._id = listing._id.toString()

  return { props: { listing } }
}

export default ListingPage
