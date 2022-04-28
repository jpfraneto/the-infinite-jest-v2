import React from 'react';
import styles from './DesktopMediaMenu.module.css';
import PlayerMediaCard from './PlayerMediaCard/PlayerMediaCard';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsPlusLg } from 'react-icons/bs';

const DesktopMediaMenu = ({ input, setGridView, mediaElements }) => {
  const router = useRouter();
  return (
    <div className={styles.topicsMainContainer}>
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
            />
          );
        })}
      <div
        className={`${styles.mediaTypeSelector} ${styles.topicContainer} ${styles.newMediaTypeContainer}`}
      >
        <Link href={`/u/${router.query.username}/newmedia`} passHref>
          <>
            {' '}
            <BsPlusLg />
            {'  '}
            <span>NEW MEDIA:</span>
          </>
        </Link>
      </div>
    </div>
  );
};

export default DesktopMediaMenu;
