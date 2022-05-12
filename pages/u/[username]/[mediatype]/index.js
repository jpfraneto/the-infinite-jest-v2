import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import MediatypePlayerMediaCard from '../../../../components/PlayerMediaCard/MediatypePlayerMediaCard';
import { connectToDatabase } from '../../../../lib/mongodb';
import Link from 'next/link';
import styles from '../../../../styles/Mediatype.module.css';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

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
  const [displayedElementId, setDisplayedElementId] = useState('');

  return (
    <>
      <Head>
        <title>
          The Infinite Jest · {router.query.username} · {router.query.mediatype}
        </title>
      </Head>
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
        </div>
        <div className={styles.btnsContainer}>
          {session && session.user.username === router.query.username && (
            <Link
              href={`/u/${router.query.username}/newmedia?type=${router.query.mediatype}`}
            >
              <a className={`${styles.backBtn} ${styles.newMedia}`}>
                ADD NEW {router.query.mediatype}
              </a>
            </Link>
          )}
          <Link href={`/u/${router.query.username}`}>
            <a className={styles.backBtn}>Go back to {router.query.username}</a>
          </Link>
        </div>
      </div>
    </>
  );
}
