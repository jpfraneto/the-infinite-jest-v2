import React, { useState, useEffect, useRef } from 'react';
import styles from './NewMedia.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';

const NewMedia = ({ user }) => {
  const router = useRouter();
  const [mediatypes, setMediatypes] = useState(user.mediatypes || []);
  const [mediatype, setMediatype] = useState(router.query.type || '');
  const [newMediaName, setNewMediaName] = useState('');
  const [createNewMediaType, setCreateNewMediaType] = useState(false);
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const [mediatypeMessage, setMediatypeMessage] = useState('');
  const [urlMessage, setUrlMessage] = useState('');
  const [newMediaNameMessage, setNewMediaNameMessage] = useState('');

  const mediatypeRef = useRef();
  const urlRef = useRef();
  const newMediaNameRef = useRef();

  useEffect(() => {
    if (user.media)
      return setMediatypes(() => user.media.map(x => x.mediatype));
  }, [user.media]);

  const handleNewMediaSubmit = async () => {
    if (!mediatype) {
      setMediatypeMessage('Please select a mediatype!');
      return mediatypeRef.current.focus();
    }
    if (!url) {
      setUrlMessage('Please add the url for the video');
      return urlRef.current.focus();
    }
    const youtubeCheck =
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
    if (!youtubeCheck.test(url)) {
      setUrlMessage('Please add a valid URL for the video');
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
    const response = await fetch(
      `/api/${router.query.username}/newmedia`,
      reqParams
    );
    const response2 = await fetch(
      `https://the-infinite-jest-server.herokuapp.com/api/newmedia`,
      reqParams
    );
    const data = await response.json();
    router.push(`/u/${router.query.username}/${data.mediatype}/${data.id}`);
  };
  const handleNewMediaName = e => {
    if (!newMediaName) {
      setNewMediaNameMessage('Please add a new media name!');
      return newMediaNameRef.current.focus();
    }
    setMediatypes(prev => [...prev, newMediaName]);
    setMediatype(newMediaName);
    setCreateNewMediaType(false);
  };
  const handleSelectChange = e => {
    setMediatypeMessage('');
    if (e.target.value === 'new') {
      setMediatype(e.target.value);
      return setCreateNewMediaType(true);
    }
    setCreateNewMediaType(false);
    setMediatype(e.target.value);
  };
  const handleNewMediaNameCreator = e => {
    setMediatype(e.target.value);
    setNewMediaName(e.target.value);
  };
  if (!router.query) return <h2>loading</h2>;
  return (
    <div className={styles.newMediaContainer}>
      {!loading ? (
        <>
          {' '}
          <h3>Add new media to your profile</h3>
          <div className={styles.formElementContainer}>
            <label>Media Type</label>
            <select
              ref={mediatypeRef}
              name='mediatype'
              className={styles.formElement}
              value={mediatype}
              onChange={handleSelectChange}
            >
              <option value='empty'>Choose media type...</option>
              {mediatypes &&
                mediatypes.map((x, index) => (
                  <option key={index} value={x}>
                    {x}
                  </option>
                ))}
              <option value='new'>New media type...</option>
            </select>
            {createNewMediaType && (
              <div>
                <input
                  placeholder='new media name'
                  className={styles.formElement}
                  onChange={e => setNewMediaName(e.target.value)}
                  ref={newMediaNameRef}
                />
                {newMediaNameMessage && (
                  <p className={styles.messageElement}>{newMediaNameMessage}</p>
                )}
                <div>
                  <button onClick={handleNewMediaName}>Add</button>
                  <button
                    onClick={() => {
                      setMediatype('empty');
                      setCreateNewMediaType(false);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
            {mediatypeMessage && (
              <p className={styles.messageElement}>{mediatypeMessage}</p>
            )}
          </div>
          <div className={styles.formElementContainer}>
            <label>First Url</label>
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
            <a className={styles.goBackBtn}>Go back to {user.username}</a>
          </Link>
        </>
      ) : (
        <p>Your new media is being added to the database...</p>
      )}
    </div>
  );
};

export default NewMedia;
