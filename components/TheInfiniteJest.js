import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import styles from './TheInfiniteJest.module.css';
import Link from 'next/link';

const TheInfiniteJest = () => {
  const reactPlayerRef = useRef();
  const [loading, setLoading] = useState(true);
  const [presentRecommendation, setPresentRecommendation] = useState(null);
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
              console.log('inside the onEnded callback');
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
        <h3 className={styles.recommendationBottomMsg}>
          This piece was added by{' '}
          <Link
            href={`/u/${presentRecommendation.presentRecommendation.username}`}
          >
            <a className={styles.linkBtn}>
              {presentRecommendation.presentRecommendation.username}
            </a>
          </Link>
        </h3>
      )}
    </>
  );
};

export default TheInfiniteJest;
