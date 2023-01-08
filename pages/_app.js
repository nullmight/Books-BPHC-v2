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

      <Nav></Nav>

      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </>
  );
}

export default MyApp
