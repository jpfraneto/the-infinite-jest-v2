import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import styles from './TheInfiniteJest.module.css';
import Link from 'next/link';
import Button from './layout/Button';
import { BsShare, BsSave } from 'react-icons/bs';
import { CgNotes } from 'react-icons/cg';

const TheInfiniteJest = ({ setEditNotes, setMediaTitle }) => {
  const reactPlayerRef = useRef();
  const [loading, setLoading] = useState(true);
  const [presentRecommendation, setPresentRecommendation] = useState(null);
  const [text, setText] = useState('');
  const [muted, setMuted] = useState(true);
  const [intervalId, setIntervalId] = useState(null);
  useEffect(() => {
    const fetchRecommendation = async () => {
      const response = await fetch(
        'https://the-infinite-jest-server.herokuapp.com/api/present'
      );
      const data = await response.json();
      if (data) {
        setLoading(false);
        console.log('HERE', data.recommendation);
        setMediaTitle(data.recommendation.presentRecommendation.title);
        return setPresentRecommendation(data.recommendation);
      }
    };
    fetchRecommendation();
  }, []);
  const queryNextRecommendation = async () => {
    const response = await fetch(
      'https://the-infinite-jest-server.herokuapp.com/api/present'
    );
    const data = await response.json();
    if (data) {
      setLoading(false);
      data.recommendation.elapsedSeconds = 0;
      setPresentRecommendation(data.recommendation.presentRecommendation.title);
      setMediaTitle(data.recommendation.title);
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
    setText('Este momento fue congelado como un link en tu portapapeles');
    setIntervalId(setTimeout(() => setText(null), 4444));
  };

  const handleFavoriteMoment = () => {
    clearInterval(intervalId);
    setText('Add this moment to the users profile');
    setIntervalId(setTimeout(() => setText(null), 4444));
  };

  const handleOpenNotepad = () => {
    setEditNotes(prev => !prev);
    clearInterval(intervalId);
    setText('Add the notepad functionality');
    setIntervalId(setTimeout(() => setText(null), 4444));
  };

  return (
    <>
      <div className={styles.playerWrapper}>
        {loading || !presentRecommendation ? (
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
