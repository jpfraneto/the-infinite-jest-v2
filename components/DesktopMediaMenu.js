import React, { useState } from 'react';
import styles from './DesktopMediaMenu.module.css';
import PlayerMediaCard from './PlayerMediaCard/PlayerMediaCard';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsPlusLg, BsZoomIn } from 'react-icons/bs';
import { useSession } from 'next-auth/react';

const DesktopMediaMenu = ({ input, setGridView, mediaElements }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [bigger, setBigger] = useState(false);
  const [displayedElementId, setDisplayedElementId] = useState('');
  const goToRandomMoment = () => {
    setBigger(true);
    const randomMedia =
      mediaElements[Math.floor(mediaElements.length * Math.random())];
    const randomTimestampOfThisRandomMedia = Math.floor(
      (randomMedia.presentMedia.duration / 1000) * Math.random()
    );
    setDisplayedElementId(randomMedia.presentMedia._id);
  };

  return (
    <>
      <div
        className={styles.topicsMainContainer}
        style={{ marginBottom: displayedElementId ? '20px' : '0' }}
      >
        {mediaElements &&
          mediaElements.map((x, index) => {
            return (
              <PlayerMediaCard
                key={index}
                index={index}
                mediaContainer={x}
                setGridView={setGridView}
                setPlayerElement={input.setPlayerElement}
                setPlayerVisibility={input.setPlayerVisibility}
                setChosenMediaForDisplay={input.setChosenMediaForDisplay}
                bigger={bigger}
                setBigger={setBigger}
                setDisplayedElementId={setDisplayedElementId}
                displayedElementId={displayedElementId}
              />
            );
          })}
      </div>
      {!displayedElementId && (
        <div className={styles.addNewButtonContainer}>
          {session && router.query.username === session.user.username && (
            <div
              className={` ${styles.topicContainer} ${styles.newMediaTypeContainer}`}
            >
              <Link href={`/u/${router.query.username}/newmedia`} passHref>
                <h3>Agregar Nuevo</h3>
              </Link>
            </div>
          )}

          {mediaElements.length > 0 && (
            <div
              className={`${styles.mediaTypeSelector} ${styles.topicContainer} ${styles.newMediaTypeContainer}`}
            >
              <h3 onClick={goToRandomMoment}>Momento Aleatorio</h3>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DesktopMediaMenu;
