import { Router, useRouter } from 'next/router';
import React from 'react';
import PlayerMediaCard from '../../../components/PlayerMediaCard/PlayerMediaCard';
import ReactPlayer from 'react-player';
import { connectToDatabase } from '../../../lib/mongodb';
import Link from 'next/link';
import styles from '../../../styles/Mediatype.module.css';
import { useSession } from 'next-auth/react';

export async function getServerSideProps({ params }) {
  const { db } = await connectToDatabase();
  const thisUser = await db
    .collection('users')
    .findOne({ username: params.username });
  const filteredElements = thisUser.media.filter(
    x => x.mediatype === params.mediatype
  );
  return {
    props: {
      elements: JSON.parse(JSON.stringify(filteredElements[0].elements)),
    },
  };
}

export default function Mediatype({ elements }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <>
      <h4 style={{ textAlign: 'center' }}>
        This are all the videos within the {router.query.mediatype} category{' '}
      </h4>
      <div className={styles.topicsContainer}>
        {elements.map((x, index) => (
          <div key={index} className={styles.topicContainer}>
            {' '}
            <div
              className={`${styles.playerWrapper} ${styles.gridPlayerWrapper}`}
            >
              <ReactPlayer
                playing={true}
                muted={true}
                className={styles.reactPlayer}
                url={x.url}
                width='100%'
                height='100%'
              />
            </div>
          </div>
        ))}
        {session && session.user.username === router.query.username && (
          <Link
            href={`/u/${router.query.username}/newmedia?type=${router.query.mediatype}`}
            passHref
          >
            <div className={styles.topicContainer}>
              {' '}
              <div
                className={`${styles.playerWrapper} ${styles.gridPlayerWrapper}`}
              >
                <h2>Add new {`${router.query.mediatype}`}</h2>
              </div>
            </div>
          </Link>
        )}
      </div>
      <Link href={`/u/${router.query.username}`}>
        <a className={styles.backBtn}>Go back</a>
      </Link>
    </>
  );
}
