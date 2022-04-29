import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import Navbar from '../components/layout/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>The Infinite Jest</title>
      </Head>
      <SessionProvider>
        <Navbar />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
