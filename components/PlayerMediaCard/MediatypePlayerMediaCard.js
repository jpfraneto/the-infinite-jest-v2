import Link from 'next/link';
import React, { createRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import styles from './MediatypePlayerMediaCard.module.css';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const MediatypePlayerMediaCard = ({
  x,
  displayedElementId,
  setDisplayedElementId,
}) => {
  const { data: session } = useSession();

  const sharedTextMessage =
    'Este momento fue congelado como un link en tu portapapeles';
  const router = useRouter();
  const rlvRef = createRef();
  const [mediaForPlaying, setMediaForPlaying] = useState(x);
  const [sharedText, setSharedText] = useState(false);
  const [playerWidth, setPlayerWidth] = useState('');
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(true);
  const [bigger, setBigger] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);
  const [deletingMessage, setDeletingMessage] = useState('');

  const handleRandomize = () => {
    const mediaDuration = rlvRef.current.getDuration();
    const randomPlace = mediaDuration * [Math.random()];
    rlvRef.current.seekTo(randomPlace, 'seconds');
  };

  return (
    <div className={styles.topicContainer} style={{}}>
      <div className={`${styles.playerWrapper} ${styles.gridPlayerWrapper}`}>
        {loadingNext ? (
          <p>Cargando</p>
        ) : (
          <ReactPlayer
            ref={el => {
              if (el) return (rlvRef.current = el);
            }}
            playing={true}
            muted={muted}
            controls={true}
            onReady={handleRandomize}
            className={styles.reactPlayer}
            url={mediaForPlaying.url}
            width='100%'
            volume={volume}
            height='100%'
          />
        )}
        <div
          className={`${styles.ghostDiv} `}
          onClick={() => {
            router.push(
              `/u/${router.query.username}/${router.query.mediatype}/${mediaForPlaying._id}`
            );
          }}
        ></div>
      </div>
    </div>
  );
};

export default MediatypePlayerMediaCard;
