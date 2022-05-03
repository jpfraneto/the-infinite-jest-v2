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
        <div className={styles.btnsContainer}>
          <button className={styles.btn} onClick={() => setGridView(true)}>
            Back
          </button>
          <Link
            href={`/u/${router.query.username}/${chosenMediaForDisplay.mediatype}`}
            passHref
          >
            <button className={`${styles.allElementsBtn} ${styles.btn}`}>
              All {chosenMediaForDisplay.mediatype} elements
            </button>
          </Link>
        </div>

        <div className={styles.playerWrapper}>
          <ReactPlayer {...playerElement.player.props} />
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
