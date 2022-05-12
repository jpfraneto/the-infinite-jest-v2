import '../styles/globals.css';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import Navbar from '../components/layout/Navbar';
import Loader from '../components/layout/Loader';
import Footer from 'components/layout/Footer';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const routeChangeStartHandler = () => setIsRouteChanging(true);

    const routeChangeEndHandler = () => setIsRouteChanging(false);

    router.events.on('routeChangeStart', routeChangeStartHandler);
    router.events.on('routeChangeComplete', routeChangeEndHandler);
    router.events.on('routeChangeError', routeChangeEndHandler);
    return () => {
      router.events.off('routeChangeStart', routeChangeStartHandler);
      router.events.off('routeChangeComplete', routeChangeEndHandler);
      router.events.off('routeChangeError', routeChangeEndHandler);
    };
  }, [router.events]);
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <Head>
        <title>The Infinite Jest</title>
      </Head>
      <Navbar />
      {isRouteChanging ? <Loader /> : <Component {...pageProps} />}
      <Footer />
    </SessionProvider>
  );
}

export default MyApp;
