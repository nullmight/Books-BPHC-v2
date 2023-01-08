import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import Listing from '../models/Listing'

const Index = ({ listings }) => (
  <>
    {/* Create a card for each listing */}
    {listings.map((listing) => (
      <div key={listing._id}>
        <div className="card">
          <img src={listing.image_url} />
          <h5 className="listing-name">{listing.bookname}</h5>
          <div className="main-content">
            <p className="author">{listing.author}</p>
            <p className="course">Course: {listing.course}</p>
            <p className="price">Price: ₹ {listing.price}</p>

            <div className="btn-container">
              <Link
                href="/[id]/edit"
                as={`/${listing._id}/edit`}
                legacyBehavior
              >
                <button className="btn edit">Edit</button>
              </Link>
              <Link href="/[id]" as={`/${listing._id}`} legacyBehavior>
                <button className="btn view">View</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
);

/* Retrieves listing(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const result = await Listing.find({})
  const listings = result.map((doc) => {
    const listing = doc.toObject()
    listing._id = listing._id.toString()
    return listing
  })
  console.log(listings)
  return { props: { listings: listings } }
}

export default Index
