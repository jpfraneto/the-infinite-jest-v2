import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import styles from './TheInfiniteJest.module.css';

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
      setPresentRecommendation(data.recommendation);
      reactPlayerRef.current.seekTo(0, 'seconds');
    }
  };
  if (!presentRecommendation) return <></>;
  return (
    <div className={styles.playerWrapper}>
      {loading ? (
        <p>Loading</p>
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
          }}
          width='100%'
          height='100%'
          playing
          muted={true}
          url={presentRecommendation.presentRecommendation.url}
        />
      )}
    </div>
  );
};

export default TheInfiniteJest;
