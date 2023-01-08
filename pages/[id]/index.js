import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../lib/dbConnect'
import Listing from "../../models/Listing";

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
      <div className="card">
        <img src={listing.image_url} />
        <h5 className="listing-name">{listing.bookname}</h5>
        <div className="main-content">
          <p className="author">{listing.author}</p>
          <p className="course">Course: {listing.course}</p>
          <p className="price">Price: ₹ {listing.price}</p>

          <div className="btn-container">
            <Link href="/[id]/edit" as={`/${listing._id}/edit`} legacyBehavior>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const listing = await Listing.findById(params.id).lean()
  listing._id = listing._id.toString()

  return { props: { listing } }
}

export default ListingPage
