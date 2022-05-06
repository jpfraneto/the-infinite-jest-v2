import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import Link from 'next/link';
import styles from './IndividualMediaPlayer.module.css';
import Head from 'next/head';

const IndividualMediaPlayer = ({ media }) => {
  const router = useRouter();
  const [copyUrlMessage, setCopyUrlMessage] = useState('');
  const handleShareBtn = () => {
    navigator.clipboard.writeText(
      `https://www.theinfinitejest.tv/${router.asPath}`
    );
    setCopyUrlMessage(
      'The link for this content was copied in the clipboard. Now you can paste it anywhere you want.'
    );
    setTimeout(() => setCopyUrlMessage(''), 4444);
  };

  return (
    <>
      <Head>
        <title>The Infinite Jest · {router.query.username}</title>
        <meta name='description' content={media.description} />
      </Head>
      <div className={styles.container}>
        <div className={styles.mediaContainer}>
          <div className={styles.playerWrapper}>
            <ReactPlayer
              className={styles.reactPlayer}
              url={media.url}
              width='100%'
              height='100%'
              controls={true}
            />
          </div>
          <p>{media.description}</p>
          <div>
            <a
              className={`${styles.goBackBtn} ${styles.shareBtn}`}
              onClick={handleShareBtn}
            >
              Copy Link
            </a>
            <Link
              href={`/u/${router.query.username}/${router.query.mediatype}`}
            >
              <a className={styles.goBackBtn}>Go Back!</a>
            </Link>
          </div>

          {copyUrlMessage && (
            <p className={styles.copyUrlMessage}>{copyUrlMessage}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default IndividualMediaPlayer;
