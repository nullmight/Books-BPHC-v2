import { useRouter } from 'next/router'
import useSWR from 'swr'
import Form from '../../components/ListingForm'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditListing = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: listing, error } = useSWR(id ? `/api/listings/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (!listing) return <p>Loading...</p>

  const listingForm = {
    bookname: listing.bookname,
    author: listing.author,
    course: listing.course,
    price: listing.price,
  }

  return <Form formId="edit-listing-form" listingForm={listingForm} forNewListing={false} />
}

export default EditListing
