import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import styles from './TheInfiniteJest.module.css';
import Link from 'next/link';
import { GoUnmute } from 'react-icons/go';

const TheInfiniteJest = () => {
  const sharedTextMessage =
    'This moment got frozen as a link in your clipboard';
  const reactPlayerRef = useRef();
  const [loading, setLoading] = useState(true);
  const [presentRecommendation, setPresentRecommendation] = useState(null);
  const [sharedText, setSharedText] = useState(false);
  const [muted, setMuted] = useState(true);
  useEffect(() => {
    const fetchRecommendation = async () => {
      const response = await fetch(
        'https://the-infinite-jest-server.herokuapp.com/api/present'
      );
      const data = await response.json();
      if (data) {
        setLoading(false);
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
      setPresentRecommendation(data.recommendation);
    }
  };
  const handleSharePresent = () => {
    const currentTimestamp = Math.floor(
      reactPlayerRef.current.getCurrentTime()
    );
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL_PATH}/u/${presentRecommendation.presentRecommendation.username}/${presentRecommendation.presentRecommendation.mediatype}/${presentRecommendation.presentRecommendation._id}` +
        `?timestamp=${currentTimestamp}`
    );
    setSharedText(true);
    setTimeout(() => setSharedText(false), 4444);
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
        <>
          <button
            className={`${styles.goBackBtn} ${styles.randomBtn}`}
            onClick={handleSharePresent}
          >
            Share the present moment
          </button>

          {sharedText && (
            <p className={styles.sharedTextMessage}>{sharedTextMessage}</p>
          )}
        </>
      )}
    </>
  );
};

export default TheInfiniteJest;
