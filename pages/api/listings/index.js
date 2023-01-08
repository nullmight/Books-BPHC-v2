import dbConnect from '../../../lib/dbConnect'
import Listing from "../../../models/Listing";

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const listings = await Listing.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: listings })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const listing = await Listing.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: listing })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
