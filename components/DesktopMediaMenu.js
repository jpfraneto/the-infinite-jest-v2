import React, { useState } from 'react';
import styles from './DesktopMediaMenu.module.css';
import PlayerMediaCard from './PlayerMediaCard/PlayerMediaCard';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsPlusLg, BsZoomIn } from 'react-icons/bs';
import { useSession } from 'next-auth/react';

const DesktopMediaMenu = ({ input, setGridView, mediaElements }) => {
  console.log('aaaa', mediaElements);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [displayedElementId, setDisplayedElementId] = useState('');

  return (
    <>
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
                setDisplayedElementId={setDisplayedElementId}
                displayedElementId={displayedElementId}
              />
            );
          })}
      </div>
      {session && router.query.username === session.user.username && (
        <Link href={`/u/${router.query.username}/newmedia`} passHref>
          <div
            className={`${styles.mediaTypeSelector} ${styles.topicContainer} ${styles.newMediaTypeContainer}`}
          >
            <h3>ADD NEW</h3>
          </div>
        </Link>
      )}
    </>
  );
};

export default DesktopMediaMenu;
