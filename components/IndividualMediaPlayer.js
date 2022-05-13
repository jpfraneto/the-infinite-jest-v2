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
  const urlMessageRef = createRef();

  const handleShareBtn = () => {
    const currentTime = Math.floor(rlvRef.current.getCurrentTime());
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL_PATH}/u/${router.query.username}/${media.mediatype}/${media._id}` +
        `?timestamp=${currentTime}`
    );
    setCopyUrlMessage(
      'The link for this content was copied in the clipboard. Now you can paste it anywhere you want.'
    );
    setTimeout(() => setCopyUrlMessage(''), 4444);
    urlMessageRef.current.focus();
  };

  const handleRandomize = () => {
    const mediaDuration = media.duration / 1000;
    const randomPlace = Math.floor(mediaDuration * Math.random());

    if (rlvRef.current === null) return;
    rlvRef.current.seekTo(randomPlace, 'seconds');
  };

  const goToTimestamp = () => {
    if (rlvRef.current === null) return;
    if (router.query.timestamp) {
      if (rlvRef.current.getDuration() < router.query.timestamp) {
        return rlvRef.current.seekTo(0, 'seconds');
      }
      return rlvRef.current.seekTo(router.query.timestamp, 'seconds');
    }
    const randomPlace = Math.floor((media.duration / 1000) * Math.random());
    rlvRef.current.seekTo(randomPlace, 'seconds');
  };

  return (
    <>
      <Head>
        <title>
          The Infinite Jest · {router.query.username} · {media.name}
        </title>
        <meta
          name='description'
          content={`This is personal page of ${router.query.username} in The Infinite Jest. He shared with us the recommendation ${media.name}, and that is what is going on here.`}
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.mediaContainer}>
          <div className={styles.playerWrapper}>
            <ReactPlayer
              ref={rlvRef}
              className={styles.reactPlayer}
              url={media.url}
              playing={true}
              onReady={goToTimestamp}
              muted={true}
              width='100%'
              height='100%'
              controls={true}
            />
          </div>
          <p className={styles.mediaDescription}>{media.description}</p>
          <div className={styles.buttonsContainer}>
            <a
              className={`${styles.goBackBtn} ${styles.shareBtn}`}
              onClick={handleShareBtn}
            >
              Share this moment
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
              <a className={styles.goBackBtn}>
                ALL {router.query.mediatype.toUpperCase()}
              </a>
            </Link>
            <div className={styles.copiedUrlContainer} ref={urlMessageRef}>
              {copyUrlMessage && (
                <p className={styles.copyUrlMessage}>{copyUrlMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndividualMediaPlayer;
