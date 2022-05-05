import Form from '../components/ListingForm'

const NewListing = () => {
  const listingForm = {
    bookname: '',
    author: '',
    course: '',
    price: 0,
  }

  return <Form formId="add-listing-form" listingForm={listingForm} />
}

export default NewListing
