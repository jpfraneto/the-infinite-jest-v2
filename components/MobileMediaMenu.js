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
    <div className={styles.mediaMenuContainer}>
      {mediaElements &&
        mediaElements.map((x, index) => {
          return (
            <Link
              href={`/u/${router.query.username}/${x.mediatype}`}
              key={index}
              passHref
            >
              <span
                className={styles.mediaTypeSelector}
                style={{
                  height: `${
                    (window.height - 44) / mediaElements.length + 1
                  }px`,
                }}
              >
                {x.mediatype.toUpperCase()}
              </span>
            </Link>
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
    </div>
  );
};

export default MobileMediaMenu;
