import mongoose from "mongoose";

/* ListingSchema will correspond to a collection in your MongoDB database. */
const ListingSchema = new mongoose.Schema({
  bookname: {
    /* The name of this book */

    type: String,
    required: [true, "Please provide the name of the book."],
  },
  author: {
    /* The author of this book */

    type: String,
    required: [true, "Please provide the author's name."],
  },
  course: {
    /* The course code of this book */

    type: String,
    required: [true, "Please provide the course code."],
  },
  price: {
    /* The course code of this book */

    type: Number,
    required: [true, "Please enter the price."],
  },
});

export default mongoose.models.Listing ||
  mongoose.model("Listing", ListingSchema);
