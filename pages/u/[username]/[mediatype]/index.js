import { Router, useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import MediatypePlayerMediaCard from '../../../../components/PlayerMediaCard/MediatypePlayerMediaCard';
import ReactPlayer from 'react-player';
import { connectToDatabase } from '../../../../lib/mongodb';
import Link from 'next/link';
import styles from '../../../../styles/Mediatype.module.css';
import { useSession } from 'next-auth/react';

export async function getServerSideProps({ params }) {
  const { db } = await connectToDatabase();
  const thisUser = await db
    .collection('users')
    .findOne({ username: params.username });
  const filteredElements = thisUser.media.filter(
    x => x.mediatype === params.mediatype
  );
  console.log('the filtered elements are: ', filteredElements);
  return {
    props: {
      elements: JSON.parse(JSON.stringify(filteredElements[0].elements)),
    },
  };
}

export default function Mediatype({ elements }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [displayedElementId, setDisplayedElementId] = useState('');

  return (
    <div className={styles.container}>
      <h4 style={{ textAlign: 'center' }}>
        This are all {router.query.username}&apos;s videos within the{' '}
        {router.query.mediatype} category{' '}
      </h4>
      <div className={styles.topicsContainer}>
        {elements.map((x, index) => (
          <MediatypePlayerMediaCard
            key={x._id}
            index={index}
            x={x}
            displayedElementId={displayedElementId}
            setDisplayedElementId={setDisplayedElementId}
          />
        ))}
        {session && session.user.username === router.query.username && (
          <Link
            href={`/u/${router.query.username}/newmedia?type=${router.query.mediatype}`}
            passHref
          >
            <div
              className={`${styles.topicContainer} ${styles.newTopicContainer}`}
            >
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
    </div>
  );
}
