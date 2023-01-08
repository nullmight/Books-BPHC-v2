import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import Listing from '../models/Listing'
import { Grid, Card, Text, Button, Row, Col } from "@nextui-org/react";
import { Router, useRouter } from 'next/router';


export default function Index({ listings }) {
  const router = useRouter();

  const MockItem = ({ image_url, bookname, price, id }) => {
    return (
      <Card isPressable isHoverable onPress={(e) => router.push(`/${id}`)}>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src="/book.png"
            objectFit="cover"
            width="75%"
            height="75%"
            alt={bookname}
          />
        </Card.Body>
        <Card.Divider />
        <Card.Footer css={{ justifyItems: "flex-start" }}>
          <Row wrap="wrap" justify="space-between" align="center">
              <Text b>{bookname}</Text>
            <Text
              css={{
                color: "$accents7",
                fontWeight: "$semibold",
                fontSize: "$sm",
              }}
            >
              {"₹ " + price}
            </Text>
          </Row>
          {/* <Row justify="flex-end">
              <Button
                size="sm"
                light
                onPress={(e) => router.push(`/${id}/edit`)}
              >
                Edit
              </Button>
              <Button size="sm" onPress={(e) => router.push(`/${id}`)}> View </Button>
          </Row> */}
        </Card.Footer>
      </Card>
    );
  };
  return (
    <Grid.Container gap={2} justify="center">
      {listings.map((listing) => (
        <Grid xs={6} md={3}>
          <MockItem image_url={listing.image_url} bookname={listing.bookname} price={listing.price} id={listing._id}/>
        </Grid>
      ))}
    </Grid.Container>
  );
}

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
