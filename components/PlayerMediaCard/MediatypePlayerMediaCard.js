import Link from 'next/link';
import React, { createRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import styles from './MediatypePlayerMediaCard.module.css';
import { useRouter } from 'next/router';

const MediatypePlayerMediaCard = ({
  x,
  displayedElementId,
  setDisplayedElementId,
}) => {
  const router = useRouter();
  const rlvRef = createRef();
  const [mediaForPlaying, setMediaForPlaying] = useState(x);
  const [copyUrlMessage, setCopyUrlMessage] = useState('');
  const [playerWidth, setPlayerWidth] = useState('');
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(true);
  const [bigger, setBigger] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);

  const handleRandomize = () => {
    const mediaDuration = rlvRef.current.getDuration();
    const randomPlace = mediaDuration * [Math.random()];
    rlvRef.current.seekTo(randomPlace, 'seconds');
  };

  const handleShareBtn = () => {
    // const newUrl = `https://www.theinfinitejest.tv${router.asPath}`;
    const newUrl = `http://localhost:3000${router.asPath}`;
    const currentTime = Math.floor(rlvRef.current.getCurrentTime());
    navigator.clipboard.writeText(
      newUrl + `/${x._id}?timestamp=${currentTime}`
    );
    setCopyUrlMessage(
      'The link for this content was copied in the clipboard. Now you can paste it anywhere you want.'
    );
    setTimeout(() => setCopyUrlMessage(''), 4444);
  };
  const handleDeleteMedia = async () => {
    console.log('x', x);
    alert(`the media should be deleted ${x._id}`);
  };
  return (
    <div
      className={styles.topicContainer}
      style={{
        width: bigger ? '60%' : '273px',
        display: displayedElementId
          ? mediaForPlaying._id === displayedElementId
            ? 'inline-block'
            : 'none'
          : 'inline-block',
      }}
    >
      <h5>
        {bigger && (
          <>
            <span className={styles.deleteBtn} onClick={handleDeleteMedia}>
              Delete
            </span>
            <span
              className={styles.closeBtn}
              onClick={() => {
                setTimeout(() => setDisplayedElementId(''), 3000);
                setBigger(false);
              }}
            >
              Close
            </span>
          </>
        )}
      </h5>

      <div
        onClick={() => setPlayerWidth('70%')}
        className={`${styles.playerWrapper} ${styles.gridPlayerWrapper}`}
      >
        {loadingNext ? (
          <p>L O A D I N G N E X T</p>
        ) : (
          <ReactPlayer
            ref={el => {
              if (el) return (rlvRef.current = el);
            }}
            playing={true}
            muted={muted}
            controls={true}
            onReady={handleRandomize}
            className={styles.reactPlayer}
            url={mediaForPlaying.url}
            width='100%'
            volume={volume}
            height='100%'
          />
        )}
        <div
          className={`${styles.ghostDiv} `}
          onClick={() => {
            setBigger(true);
            setDisplayedElementId(mediaForPlaying._id);
          }}
          style={{ display: !bigger ? 'block' : 'none' }}
        ></div>
      </div>
      {bigger && (
        <>
          <div className={styles.descriptionContainer}>
            <h3>Why is this video here?</h3>
            {mediaForPlaying.description}
            <br />
            <button className={styles.randomBtn} onClick={handleRandomize}>
              Random Spot
            </button>
            <button
              className={`${styles.randomBtn} ${styles.shareBtn}`}
              onClick={handleShareBtn}
            >
              Copy Link
            </button>
          </div>
          {copyUrlMessage && (
            <p className={styles.copyUrlMessage}>{copyUrlMessage}</p>
          )}
        </>
      )}
    </div>
  );
};

export default MediatypePlayerMediaCard;
