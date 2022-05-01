import React, { createRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import styles from './PlayerMediaCard.module.css';

const PlayerMediaCard = ({
  mediaContainer,
  index,
  setGridView,
  setChosenMediaForDisplay,
  setPlayerVisibility,
  setPlayerElement,
}) => {
  const rlvRef = createRef();
  const [refVisible, setRefVisible] = useState(false);

  return (
    <div
      onClick={() => {
        setGridView(false);
        setPlayerVisibility(true);
        setChosenMediaForDisplay(mediaContainer.presentElement);
        setPlayerElement(() => {
          return { player: rlvRef.current };
        });
      }}
      key={index}
      className={styles.topicContainer}
    >
      <h3>{mediaContainer.mediatype}</h3>{' '}
      <div className={`${styles.playerWrapper} ${styles.gridPlayerWrapper}`}>
        <ReactPlayer
          ref={el => {
            if (el) return (rlvRef.current = el);
          }}
          playing={true}
          muted={true}
          className={styles.reactPlayer}
          url={mediaContainer.presentElement.url}
          width='100%'
          height='100%'
        />
      </div>
    </div>
  );
};

export default PlayerMediaCard;
