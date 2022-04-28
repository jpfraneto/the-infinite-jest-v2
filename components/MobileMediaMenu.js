import React from 'react';
import styles from './MobileMediaMenu.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsPlusLg } from 'react-icons/bs';

const MobileMediaMenu = ({ input, mediaElements }) => {
  const router = useRouter();
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
      <Link href={`/u/${router.query.username}/newmedia`} passHref>
        <div className={styles.mediaTypeSelector}>
          <BsPlusLg />
          <span>NEW</span>
        </div>
      </Link>
    </>
  );
};

export default MobileMediaMenu;
