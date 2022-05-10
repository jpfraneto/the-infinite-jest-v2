import Link from 'next/link';
import React, { createRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import styles from './PlayerMediaCard.module.css';
import { useRouter } from 'next/router';

const PlayerMediaCard = ({
  mediaContainer,
  index,
  setGridView,
  setChosenMediaForDisplay,
  setPlayerVisibility,
  setPlayerElement,
  setDisplayedElementId,
  displayedElementId,
}) => {
  const router = useRouter();
  const rlvRef = createRef();
  const [refVisible, setRefVisible] = useState(false);
  const [mediaForPlaying, setMediaForPlaying] = useState(
    mediaContainer.presentMedia
  );
  const [playerWidth, setPlayerWidth] = useState('');
  const [hideGhostDiv, setHideGhostDiv] = useState('');
  const [alreadyPlayed, setAlreadyPlayed] = useState([]);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(true);
  const [bigger, setBigger] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);

  const fetchNextMedia = async () => {
    setVolume(0.5);
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

  return (
    <div
      onClick={() => {
        // setGridView(false);
        // setPlayerVisibility(true);
        // setChosenMediaForDisplay(mediaContainer.presentElement);
        // setPlayerElement(() => {
        //   return { player: rlvRef.current };
        // });
      }}
      key={index}
      className={styles.topicContainer}
      style={{
        width: bigger ? '60%' : '273px',
        display: displayedElementId
          ? mediaForPlaying.id === displayedElementId
            ? 'inline-block'
            : 'none'
          : 'inline-block',
      }}
    >
      <Link
        href={`/u/${router.query.username}/${mediaContainer.mediatype}`}
        passHref
      >
        <h3 className={styles.mediatypeTitle}>{mediaContainer.mediatype}</h3>
      </Link>
      {bigger && (
        <span
          className={styles.closeBtn}
          onClick={() => {
            setTimeout(() => setDisplayedElementId(''), 3000);
            setBigger(false);
          }}
        >
          Close
        </span>
      )}

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
            className={styles.reactPlayer}
            url={mediaForPlaying.url}
            onEnded={fetchNextMedia}
            width='100%'
            volume={volume}
            height='100%'
          />
        )}
        <div
          className={`${styles.ghostDiv} `}
          onClick={() => {
            setBigger(true);
            setDisplayedElementId(mediaForPlaying.id);
          }}
          style={{ display: !bigger ? 'block' : 'none' }}
        ></div>
      </div>
      {bigger && (
        <div className={styles.descriptionContainer}>
          <h3>Why is this video here?</h3>
          {mediaForPlaying.description}
        </div>
      )}
    </div>
  );
};

export default PlayerMediaCard;
