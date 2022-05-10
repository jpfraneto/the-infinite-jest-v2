import { useRouter } from 'next/router';
import React, { useState, createRef } from 'react';
import ReactPlayer from 'react-player';
import Link from 'next/link';
import styles from './IndividualMediaPlayer.module.css';
import Head from 'next/head';

const IndividualMediaPlayer = ({ media }) => {
  const router = useRouter();
  const [copyUrlMessage, setCopyUrlMessage] = useState('');
  const [timestamp, setTimestamp] = useState(router.query.timestamp || 0);
  const rlvRef = createRef();

  const handleShareBtn = () => {
    const newUrl = `https://www.theinfinitejest.tv/${router.asPath}`.split(
      '?timestamp'
    );
    navigator.clipboard.writeText(newUrl + `?timestamp=${timestamp}`);
    setCopyUrlMessage(
      'The link for this content was copied in the clipboard. Now you can paste it anywhere you want.'
    );
    setTimeout(() => setCopyUrlMessage(''), 4444);
  };

  const handleRandomize = () => {
    console.log('adasd', rlvRef.current);
    if (!rlvRef.current) {
      console.log('lojsad');
      return;
    }
    const mediaDuration = rlvRef.current.getDuration();
    const randomPlace = mediaDuration * [Math.random()];
    setTimestamp(randomPlace);
    console.log('HERE', rlvRef);
    rlvRef.current.seekTo(randomPlace, 'seconds');
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
              ref={rlvRef}
              className={styles.reactPlayer}
              url={media.url}
              playing={true}
              onReady={handleRandomize}
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
            <a
              className={`${styles.goBackBtn} ${styles.randomBtn}`}
              onClick={handleRandomize}
            >
              Random Spot
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
