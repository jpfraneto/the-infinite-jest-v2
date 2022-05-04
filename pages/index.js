import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { quotes } from '../data/quotes';
import MemberCircle from '../components/MemberCircle';
import TheInfiniteJest from '../components/TheInfiniteJest';

export default function Home() {
  const [aloja, setAloja] = useState(null);
  const [randomQuote, setRandomQuote] = useState('');
  useEffect(() => {
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const handleClick = async () => {
    try {
      const reqOptions = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      };
      const response = await fetch('http://localhost:3000/api', reqOptions);
      const data = await response.json();
      setAloja(data);
    } catch (error) {
      console.log(error);
      console.log('there was an error fetching the api route');
    }
  };
  return (
    <div className={styles.mainContainer}>
      <section className={styles.firstSection}>
        <div className={styles.playerLayoutWrapper}>
          <TheInfiniteJest />
        </div>
      </section>
      <section className={styles.secondSection}></section>
      <section className={styles.thirdSection}></section>
    </div>
  );
}
