import React from 'react';
import styles from './MobileMediaMenu.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsPlusLg } from 'react-icons/bs';
import { useSession } from 'next-auth/react';

const MobileMediaMenu = ({ input, mediaElements }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <>
      {mediaElements &&
        mediaElements.map((x, index) => {
          return (
            <div
              onClick={() => {
                input.setGridView(false);
                input.setPlayerVisibility(true);
                input.setChosenMediaForDisplay(x.presentElement);
              }}
              className={styles.mediaTypeSelector}
              key={index}
            >
              {x.mediatype.toUpperCase()}
            </div>
          );
        })}
      {session && router.query.username === session.user.username && (
        <Link href={`/u/${router.query.username}/newmedia`} passHref>
          <div className={styles.mediaTypeSelector}>
            <BsPlusLg />
            <span>NEW</span>
          </div>
        </Link>
      )}
    </>
  );
};

export default MobileMediaMenu;
