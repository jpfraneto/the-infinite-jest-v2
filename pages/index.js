import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { quotes } from '../data/quotes';
import TheInfiniteJest from '../components/TheInfiniteJest';
import Notebook from 'components/Notebook';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export async function getServerSideProps() {
  const response = await fetch(
    'https://the-infinite-jest-server.herokuapp.com/api/present'
  );
  const data = await response.json();
  return { props: { data } };
}
export default function Home({ data }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [editNotesDisplay, setEditNotesDisplay] = useState(false);
  const [notes, setNotes] = useState(null);
  const [playerReference, setPlayerReference] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  useEffect(() => {
    setRecommendation(data.recommendation);
    const getNotesFromUser = async () => {
      const response = await fetch(
        `/api/u/${session.user.username}/notes/${data.recommendation.presentRecommendation._id}`
      );
      const notesData = await response.json();
      if (notesData.notes) return setNotes(notesData.notes);
      else setNotes(null);
    };
    if (session) getNotesFromUser();
  }, [data, session]);
  if (!recommendation) return <p>Loading...</p>;
  return (
    <div className={styles.mainContainer}>
      <div className={styles.playerLayoutWrapper}>
        <TheInfiniteJest
          setEditNotesDisplay={setEditNotesDisplay}
          setPlayerReference={setPlayerReference}
          recommendation={recommendation}
          setRecommendation={setRecommendation}
          setNotes={setNotes}
        />
      </div>
      {editNotesDisplay && (
        <Notebook
          setEditNotesDisplay={setEditNotesDisplay}
          playerReference={playerReference}
          notes={notes}
          recommendation={recommendation}
          setNotes={setNotes}
        />
      )}
    </div>
  );
}
