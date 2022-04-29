import React from 'react';
import styles from './MediaPlayer.module.css';
import ReactPlayer from 'react-player';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MediaPlayer = ({
  playerElement,
  chosenMediaForDisplay,
  setGridView = { setGridView },
}) => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.mainPlayerOuterWrapper}>
        <button onClick={() => setGridView(true)}>Back</button>
        <Link
          href={`/u/${router.query.username}/${chosenMediaForDisplay.mediatype}`}
          passHref
        >
          <h3>{chosenMediaForDisplay.mediatype}</h3>
        </Link>
        <div className={styles.playerWrapper}>
          <ReactPlayer
            className={styles.reactPlayer}
            url={chosenMediaForDisplay.url}
            width='100%'
            height='100%'
            controls={true}
            playing={true}
          />
        </div>
        <div className={styles.textContainer}>
          <h3>Why is this video here?</h3>
          {chosenMediaForDisplay.description}
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;
