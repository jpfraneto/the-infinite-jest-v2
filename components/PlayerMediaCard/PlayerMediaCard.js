import React, { createRef } from 'react';
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
  const ref = createRef();
  return (
    <div
      onClick={() => {
        setGridView(false);
        setPlayerVisibility(true);
        setChosenMediaForDisplay(mediaContainer.presentElement);
        setPlayerElement({ ref, msg: '123' });
      }}
      key={index}
      className={styles.topicContainer}
    >
      <h3>{mediaContainer.mediatype}</h3>{' '}
      <div className={`${styles.playerWrapper} ${styles.gridPlayerWrapper}`}>
        <ReactPlayer
          ref={ref}
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
