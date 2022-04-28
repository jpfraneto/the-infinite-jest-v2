import React, { useState, useEffect } from 'react';
import styles from './NewMedia.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';

const NewMedia = ({ user }) => {
  const router = useRouter();
  const [mediatypes, setMediatypes] = useState(user.mediatypes);
  const [mediatype, setMediatype] = useState(router.query.type || '');
  const [newMediaName, setNewMediaName] = useState('');
  const [createNewMediaType, setCreateNewMediaType] = useState(false);
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.media)
      return setMediatypes(() => user.media.map(x => x.mediatype));
  }, [user.media]);

  const handleNewMediaSubmit = async () => {
    if (!mediatype) return alert('please choose a media type!');
    if (!url) return alert('please add the url for the first video!');
    if (!description) return alert('please add a description!');
    if (!duration) return alert('please add the duration of the media');
    setLoading(true);
    const reqParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mediatype,
        url,
        username: router.query.username,
        description,
        duration,
      }),
    };
    const response = await fetch(
      `/api/${router.query.username}/newmedia`,
      reqParams
    );
    router.push(`/u/${router.query.username}`);
  };
  const handleNewMediaName = e => {
    setMediatypes(prev => [...prev, newMediaName]);
    setMediatype(newMediaName);
    setCreateNewMediaType(false);
  };
  const handleSelectChange = e => {
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
  if (loading) return <h2>Loading!!</h2>;
  return (
    <div className={styles.newMediaContainer}>
      <h3>Add new media to your profile</h3>
      <div className={styles.formElementContainer}>
        <label>Media Type</label>
        <select
          name='mediatype'
          className={styles.formElement}
          value={mediatype}
          onChange={handleSelectChange}
        >
          <option>Choose media type...</option>
          {mediatypes.map((x, index) => (
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
            />
            <div>
              <button onClick={handleNewMediaName}>Add</button>
              <button onClick={() => setCreateNewMediaType(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <div className={styles.formElementContainer}>
        <label>First Url</label>
        <input
          type='text'
          className={styles.formElement}
          placeholder='www.youtube.com'
          onChange={e => setUrl(e.target.value)}
          name='url'
        />
      </div>

      <div className={styles.formElementContainer}>
        <label>Duration (In milliseconds)</label>
        <input
          type='number'
          min={0}
          className={styles.formElement}
          onChange={e => setDuration(e.target.value)}
          name='duration'
        />
      </div>
      <div className={styles.formElementContainer}>
        <label>Description</label>
        <textarea
          className={styles.formElement}
          onChange={e => setDescription(e.target.value)}
          name='description'
        />
      </div>

      <button onClick={handleNewMediaSubmit}>Add</button>
      <br />
      <Link href={`/u/${user.username}`}>
        <a>Go back to {user.username}</a>
      </Link>
    </div>
  );
};

export default NewMedia;
