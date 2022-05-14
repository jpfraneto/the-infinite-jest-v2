import Link from 'next/link';
import React, { createRef, useState, useEffect } from 'react';
import { findDOMNode } from 'react-dom';
import ReactPlayer from 'react-player';
import styles from './MobileMediaPlayer.module.css';
import { useRouter } from 'next/router';

const MobileMediaPlayer = ({ mediaContainer, setDisplayedElement }) => {
  const sharedTextMessage =
    'This moment got frozen as a link in your clipboard';
  const router = useRouter();
  const rlvRef = createRef();
  const [sharedText, setSharedText] = useState(false);
  const [mediaForPlaying, setMediaForPlaying] = useState(
    mediaContainer.presentMedia
  );
  const [alreadyPlayed, setAlreadyPlayed] = useState([]);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(true);
  const [loadingNext, setLoadingNext] = useState(false);

  const fetchNextMedia = async () => {
    setLoadingNext(true);
    setAlreadyPlayed(x => [...x, mediaForPlaying._id]);
    const reqParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        alreadyPlayedElements: [...alreadyPlayed, mediaForPlaying._id],
        mediatype: mediaContainer.presentMedia.mediatype,
      }),
    };
    const response = await fetch(
      `/api/${router.query.username}/getNextMedia`,
      reqParams
    );
    const data = await response.json();

    setMediaForPlaying(data.data.nextMedia);
    rlvRef.current.seekTo(0, 'seconds');
    setLoadingNext(false);
  };

  const handleRandomize = () => {
    const mediaDuration = rlvRef.current.getDuration();
    const randomPlace = mediaDuration * [Math.random()];
    rlvRef.current.seekTo(randomPlace, 'seconds');
  };

  const handleShareBtn = () => {
    const currentTimestamp = Math.floor(rlvRef.current.getCurrentTime());
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL_PATH}/u/${router.query.username}/${mediaContainer.mediatype}/${mediaContainer.presentMedia._id}` +
        `?timestamp=${currentTimestamp}`
    );
    setSharedText(true);
    setTimeout(() => setSharedText(false), 4444);
  };

  return (
    <div className={styles.mobileMediaPlayerContainer}>
      <Link
        href={`/u/${router.query.username}/${mediaContainer.mediatype}`}
        passHref
      >
        <button className={styles.mediaTypeButton}>
          {mediaContainer.mediatype}
        </button>
      </Link>
      <div className={styles.topicContainer}>
        <div className={`${styles.playerWrapper} ${styles.gridPlayerWrapper}`}>
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
              onEnded={fetchNextMedia}
              width='100%'
              volume={volume}
              height='100%'
            />
          )}
        </div>
        <div className={styles.descriptionContainer}>
          <h3>Why is this video here?</h3>
          {mediaForPlaying.description ? (
            <p>{mediaForPlaying.description}</p>
          ) : (
            <p>This video does not have a description</p>
          )}
          <br />
          <button className={styles.randomBtn} onClick={handleRandomize}>
            Random Spot
          </button>
          <button
            className={`${styles.randomBtn} ${styles.shareBtn}`}
            onClick={handleShareBtn}
          >
            Share this moment
          </button>
          {sharedText && (
            <p className={styles.copyUrlMessage}>{sharedTextMessage}</p>
          )}
        </div>
      </div>
      <button
        className={styles.backBtn}
        onClick={() => {
          setDisplayedElement(null);
        }}
      >
        Back
      </button>
    </div>
  );
};

export default MobileMediaPlayer;
