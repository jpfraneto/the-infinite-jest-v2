import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { quotes } from '../data/quotes';
import TheInfiniteJest from '../components/TheInfiniteJest';
import Notebook from 'components/Notebook';

export default function Home() {
  const [editNotesDisplay, setEditNotesDisplay] = useState(false);
  const [notes, setNotes] = useState('');
  const [mediaTitle, setMediaTitle] = useState('');
  const [playerReference, setPlayerReference] = useState(null);
  const [recommendationId, setRecommendationId] = useState('');

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
      <div className={styles.playerLayoutWrapper}>
        <TheInfiniteJest
          setEditNotesDisplay={setEditNotesDisplay}
          setMediaTitle={setMediaTitle}
          setPlayerReference={setPlayerReference}
          setRecommendationId={setRecommendationId}
        />
      </div>
      {editNotesDisplay && (
        <Notebook
          setEditNotesDisplay={setEditNotesDisplay}
          playerReference={playerReference}
          mediaTitle={mediaTitle}
          notes={notes}
          setNotes={setNotes}
          recommendationId={recommendationId}
        />
      )}
    </div>
  );
}
