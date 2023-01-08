import Head from 'next/head'
import Link from 'next/link'

import { NextUIProvider } from "@nextui-org/react";
import Nav from "../components/NavComponents/Nav"


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Books@BPHC</title>
      </Head>

      {/* <div className="top-bar">
        <div className="nav">
          <Link href="/">Home</Link>
          <Link href="/new">Add Listing</Link>
        </div>
      </div> */}

      <Nav></Nav>

      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </>
  );
}

export default MyApp
