import React, { useState } from 'react';
import styles from './MobileMediaMenu.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsPlusLg } from 'react-icons/bs';
import { useSession } from 'next-auth/react';
import MobileMediaPlayer from './PlayerMediaCard/MobileMediaPlayer';

const MobileMediaMenu = ({ input, mediaElements }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [displayedElement, setDisplayedElement] = useState(null);
  const handleRandomizer = () => {
    const randomMedia =
      mediaElements[Math.floor(mediaElements.length * Math.random())];
    setDisplayedElement(randomMedia);
  };
  return (
    <div className={styles.mediaMenuContainer}>
      {!displayedElement && (
        <button
          onClick={handleRandomizer}
          className={`${styles.mediaTypeSelector} ${styles.randomBtn}`}
        >
          👽 {router.query.username} 👽
        </button>
      )}
      {displayedElement ? (
        <MobileMediaPlayer
          setDisplayedElement={setDisplayedElement}
          mediaContainer={displayedElement}
        />
      ) : (
        <>
          {mediaElements &&
            mediaElements.map((x, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    setDisplayedElement(x);
                  }}
                  className={`${styles.mediaTypeSelector} ${styles.randomBtn}`}
                >
                  {x.mediatype.toUpperCase()}
                </button>
              );
            })}
          {session && router.query.username === session.user.username && (
            <Link href={`/u/${router.query.username}/newmedia`} passHref>
              <div
                className={`${styles.mediaTypeSelector} ${styles.randomBtn}`}
              >
                <BsPlusLg size={24} />
                <span style={{ marginLeft: '6px' }}> NEW</span>
              </div>
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default MobileMediaMenu;
