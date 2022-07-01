import React, { useState, useEffect, useRef } from 'react';
import styles from './NewMedia.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

const NewMedia = ({ user }) => {
  const router = useRouter();
  const [mediatypes, setMediatypes] = useState([
    'podcast',
    'documental',
    'noticias',
    'mainstream-media',
    'conferencia',
    'video-informativo',
  ]);
  const [mediatype, setMediatype] = useState(router.query.type || '');
  const [mediatypeMessage, setMediatypeMessage] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const [urlMessage, setUrlMessage] = useState('');

  const urlRef = useRef();
  const newMediatypeRef = useRef();

  const handleNewMediaSubmit = async () => {
    setMediatypeMessage('');
    setUrlMessage('');
    if (!mediatype) {
      setMediatypeMessage('Selecciona un tipo de contenido.');
      return newMediatypeRef.current.focus();
    }
    if (!url) {
      setUrlMessage('Agrega una url para el video');
      return urlRef.current.focus();
    }
    const youtubeCheck =
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
    if (!youtubeCheck.test(url) || url.includes('shorts')) {
      setUrlMessage('Agrega una url de youtube válida');
      return urlRef.current.focus();
    }
    setLoading(true);
    const reqParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mediatype: mediatype.trim(),
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
        <title>21tv · Agregar Contenido</title>
      </Head>
      <div className={styles.newMediaContainer}>
        {!loading ? (
          <>
            <p>Agrega un Video A Tu Perfil</p>
            <div className={`${styles.formElementContainer}`}>
              <h4>Tipo de Contenido: {mediatype}</h4>
              <div className={styles.mediatypesOptions}>
                {mediatypes.map((x, index) => {
                  if (!x) return;
                  return (
                    <span
                      key={index}
                      onClick={() => setMediatype(x)}
                      id={mediatype === x && 'selectedMediaType'}
                      className={`${styles.mediatypeType}`}
                    >
                      {x}
                    </span>
                  );
                })}
              </div>
              {mediatypeMessage && (
                <p className={styles.messageElement}>{mediatypeMessage}</p>
              )}
            </div>
            <div className={styles.formElementContainer}>
              <h4>Link de Youtube:</h4>
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
              <h4>Description</h4>
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
          </>
        ) : (
          <p>Tu video se está agregando a la base de datos...</p>
        )}
      </div>
    </>
  );
};

export default NewMedia;
