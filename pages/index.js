import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { quotes } from '../data/quotes';
import MemberCircle from '../components/MemberCircle';

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
        <h4>
          <em>{randomQuote}</em>
        </h4>
        <h2>
          We are a network of remote workers whose mission is to help develop
          the community on which we live.
        </h2>
        <h5>
          We share our offices, and we commit to create the coolest place in
          town. Each office is a cultural center. A landmark.{' '}
          <strong>The</strong> place to visit.{' '}
        </h5>
        <div className={styles.membersContainer}>
          <MemberCircle />
          <MemberCircle />
          <MemberCircle />
          <MemberCircle />
        </div>
      </section>
      <section className={styles.secondSection}>
        <h1>Locations:</h1>
      </section>
    </div>
  );
}
