import React, { useState, useEffect, useRef } from 'react';
import styles from './NewMedia.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

const NewMedia = ({ user }) => {
  const router = useRouter();
  const [mediatypes, setMediatypes] = useState(user.mediatypes || []);
  const [mediatype, setMediatype] = useState(router.query.type || '');
  const [mediatypeMessage, setMediatypeMessage] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const [urlMessage, setUrlMessage] = useState('');

  const urlRef = useRef();
  const newMediatypeRef = useRef();

  useEffect(() => {
    if (user.media)
      return setMediatypes(() => user.media.map(x => x.mediatype));
  }, [user.media]);

  const handleNewMediaSubmit = async () => {
    setMediatypeMessage('');
    setUrlMessage('');
    if (!mediatype) {
      setMediatypeMessage('Please select a mediatype.');
      return newMediatypeRef.current.focus();
    }
    if (!url) {
      setUrlMessage('Please add the url for the video.');
      return urlRef.current.focus();
    }
    const youtubeCheck =
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
    if (!youtubeCheck.test(url) || url.includes('shorts')) {
      setUrlMessage('Please add a valid youtube URL for the video. ');
      return urlRef.current.focus();
    }
    setLoading(true);
    const reqParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mediatype,
        url,
        username: router.query.username,
        description,
      }),
    };

    const serverResponse = await fetch(
      `https://the-infinite-jest-server.herokuapp.com/api/newmedia`,
      reqParams
    );
    const responseData = await serverResponse.json();
    const reqParams2 = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        newRecommendation: responseData.newRecommendation,
      }),
    };
    const frontEndServerResponse = await fetch(
      `/api/${router.query.username}/newmedia`,
      reqParams2
    );
    const data = await frontEndServerResponse.json();
    router.push(`/u/${router.query.username}/${data.mediatype}/${data.id}`);
  };

  if (!router.query) return <h2>loading</h2>;
  return (
    <>
      <Head>
        <title>The Infinite Jest · Add Media</title>
      </Head>
      <div className={styles.newMediaContainer}>
        {!loading ? (
          <>
            <h3>Add new media to your profile</h3>
            <div className={`${styles.formElementContainer}`}>
              <label>Media Type: {mediatype}</label>
              <div className={styles.mediatypesOptions}>
                {mediatypes.map((x, index) => {
                  if (!x) return;
                  return (
                    <span
                      key={index}
                      onClick={() => setMediatype(x)}
                      className={`${styles.mediatypeType} ${
                        mediatype === x && styles.selectedMediaType
                      }`}
                    >
                      {x}
                    </span>
                  );
                })}
                <input
                  className={`${styles.mediatypeType}`}
                  placeholder='New'
                  ref={newMediatypeRef}
                  onFocus={() => setMediatype('')}
                  onChange={e => setMediatype(e.target.value)}
                />
              </div>
              {mediatypeMessage && (
                <p className={styles.messageElement}>{mediatypeMessage}</p>
              )}
            </div>
            <div className={styles.formElementContainer}>
              <label>Youtube Link to the video:</label>
              <input
                type='text'
                ref={urlRef}
                className={styles.formElement}
                placeholder='www.youtube.com'
                onChange={e => {
                  setUrlMessage('');
                  setUrl(e.target.value);
                }}
                name='url'
              />
              {urlMessage && (
                <p className={styles.messageElement}>{urlMessage}</p>
              )}
            </div>
            <div className={styles.formElementContainer}>
              <label>Description</label>
              <textarea
                className={styles.formElement}
                onChange={e => setDescription(e.target.value)}
                name='description'
              />
            </div>
            <button className={styles.addBtn} onClick={handleNewMediaSubmit}>
              Add
            </button>
            <br />
            <Link href={`/u/${user.username}`}>
              <a className={styles.goBackBtn}>Go back to your profile</a>
            </Link>
          </>
        ) : (
          <p>Your new media is being added to the database...</p>
        )}
      </div>
    </>
  );
};

export default NewMedia;
