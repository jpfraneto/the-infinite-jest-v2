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
  const [playerWidth, setPlayerWidth] = useState('');
  const [hideGhostDiv, setHideGhostDiv] = useState('');
  const [bigger, setBigger] = useState(false);

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
          ? mediaContainer.presentElement.id === displayedElementId
            ? 'inline-block'
            : 'none'
          : 'inline-block',
      }}
    >
      <Link
        href={`/u/${router.query.username}/${mediaContainer.mediatype}`}
        passHref
      >
        <h3>{mediaContainer.mediatype}</h3>
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
        <ReactPlayer
          ref={el => {
            if (el) return (rlvRef.current = el);
          }}
          playing={true}
          muted={true}
          controls={true}
          className={styles.reactPlayer}
          url={mediaContainer.presentElement.url}
          width='100%'
          height='100%'
        />
        <div
          className={`${styles.ghostDiv} `}
          onClick={() => {
            setBigger(true);
            setDisplayedElementId(mediaContainer.presentElement.id);
          }}
          style={{ display: !bigger ? 'block' : 'none' }}
        ></div>
      </div>
      {bigger && (
        <div className={styles.descriptionContainer}>
          <h3>Why is this video here?</h3>
          {mediaContainer.presentElement.description}
        </div>
      )}
    </div>
  );
};

export default PlayerMediaCard;
