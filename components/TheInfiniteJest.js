import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import styles from './TheInfiniteJest.module.css';
import Link from 'next/link';
import Button from './layout/Button';
import { BsShare, BsSave } from 'react-icons/bs';
import { CgNotes } from 'react-icons/cg';
import { useSession } from 'next-auth/react';

const TheInfiniteJest = ({
  setEditNotesDisplay,
  setPlayerReference,
  recommendation,
  setRecommendation,
  setNotes,
}) => {
  const { data: session } = useSession();
  const reactPlayerRef = useRef();
  const [presentRecommendation, setPresentRecommendation] =
    useState(recommendation);
  const [text, setText] = useState('');
  const [intervalId, setIntervalId] = useState(null);

  const queryNextRecommendation = async () => {
    const response = await fetch(
      'https://the-infinite-jest-server.herokuapp.com/api/present'
    );
    const data = await response.json();
    if (data) {
      data.recommendation.elapsedSeconds = 0;
      setRecommendation(data.recommendation);
    }
  };
  const handleSharePresent = () => {
    clearInterval(intervalId);
    const currentTimestamp = Math.floor(
      reactPlayerRef.current.getCurrentTime()
    );
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL_PATH}/u/${presentRecommendation.presentRecommendation.username}/${presentRecommendation.presentRecommendation.mediatype}/${presentRecommendation.presentRecommendation._id}` +
        `?timestamp=${currentTimestamp}`
    );
    setText('This moment was christalized as a link in your clipboard');
    setIntervalId(setTimeout(() => setText(null), 4444));
  };

  const handleFavoriteMoment = () => {
    clearInterval(intervalId);
    setText(
      'Add the functionality so that this moment can be saved in the users profile'
    );
    setIntervalId(setTimeout(() => setText(null), 4444));
  };

  const handleOpenNotepad = () => {
    setEditNotesDisplay(prev => !prev);
    setPlayerReference(reactPlayerRef);
    clearInterval(intervalId);
    setIntervalId(setTimeout(() => setText(null), 4444));
  };

  return (
    <>
      <div className={styles.playerWrapper}>
        {!presentRecommendation ? (
          <div className={styles.reactPlayer}></div>
        ) : (
          <ReactPlayer
            ref={reactPlayerRef}
            className={styles.reactPlayer}
            controls
            onReady={() => {
              reactPlayerRef.current.seekTo(
                presentRecommendation.elapsedSeconds,
                'seconds'
              );
            }}
            onEnded={() => {
              queryNextRecommendation();
              reactPlayerRef.current.seekTo(0, 'seconds');
            }}
            width='100%'
            height='100%'
            playing
            muted={true}
            url={presentRecommendation.presentRecommendation.url}
          />
        )}
      </div>
      {presentRecommendation && (
        <div className={styles.bottomContainer}>
          <Button handler={handleSharePresent}>
            <BsShare size={20} />
          </Button>
          <Button handler={handleFavoriteMoment}>
            <BsSave size={20} />
          </Button>
          <Button handler={handleOpenNotepad}>
            <CgNotes size={20} />
          </Button>
          {text && (
            <p
              style={{ marginTop: '3px' }}
              className={styles.sharedTextMessage}
            >
              {text}
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default TheInfiniteJest;
