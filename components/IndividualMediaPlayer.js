import { useRouter } from 'next/router';
import React from 'react';
import ReactPlayer from 'react-player';
import Link from 'next/link';
import styles from './IndividualMediaPlayer.module.css';

const IndividualMediaPlayer = ({ media }) => {
  console.log('the media is: ', media);
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.mediaContainer}>
        <div className={styles.playerWrapper}>
          <ReactPlayer
            className={styles.reactPlayer}
            url={media.url}
            width='100%'
            height='100%'
          />
        </div>
        <p>{media.description}</p>
        <Link href={`/u/${router.query.username}/${router.query.mediatype}`}>
          <a>Go Back!</a>
        </Link>
      </div>
    </div>
  );
};

export default IndividualMediaPlayer;
