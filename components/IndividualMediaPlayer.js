import { useRouter } from 'next/router';
import React, { useState, createRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Link from 'next/link';
import styles from './IndividualMediaPlayer.module.css';
import Head from 'next/head';

const IndividualMediaPlayer = ({ media }) => {
  const router = useRouter();
  const [copyUrlMessage, setCopyUrlMessage] = useState('');
  const [timestamp, setTimestamp] = useState(router.query.timestamp || 0);
  const rlvRef = createRef();

  useEffect(() => {
    console.log('the useEffect is running again', useEffect);
    if (rlvRef.current === null) return;
    if (router.query.timestamp) {
      if (rlvRef.current.getDuration > router.query.timestamp)
        return rlvRef.current.seekTo(0, 'seconds');
      return rlvRef.current.seekTo(router.query.timestamp, 'seconds');
    }
    const randomPlace = Math.floor((media.duration / 1000) * Math.random());
    rlvRef.current.seekTo(randomPlace, 'seconds');
  }, [rlvRef, router.query.timestamp, media.duration]);

  const handleShareBtn = () => {
    // const newUrl = `http://localhost:3000/${router.asPath}`.split('?timestamp');
    const currentTime = Math.floor(rlvRef.current.getCurrentTime());
    navigator.clipboard.writeText(
      `https://www.theinfinitejest.tv/${router.query.username}/${media.mediatype}/${media._id}` +
        `?timestamp=${currentTime}`
    );
    setCopyUrlMessage(
      'The link for this content was copied in the clipboard. Now you can paste it anywhere you want.'
    );
    setTimeout(() => setCopyUrlMessage(''), 4444);
  };

  const handleRandomize = () => {
    const mediaDuration = media.duration / 1000;
    const randomPlace = Math.floor(mediaDuration * Math.random());

    if (rlvRef.current === null) return;
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
              muted={true}
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
