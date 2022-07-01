import React, { useState, useRef } from 'react';
import { useSession, getSession } from 'next-auth/react';
import styles from './NewUsername.module.css';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import Button from '../layout/Button';

const NewUsername = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [newUsername, setNewUsername] = useState('');
  const [serverResponse, setServerResponse] = useState('');
  const [usernameAvailability, setUsernameAvailability] = useState(false);
  const [secondLoading, setSecondLoading] = useState(false);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [availabilityMessage, setAvailabilityMessage] = useState('');

  const usernameRef = useRef();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return <p>Access Denied</p>;
  }
  const checkUsernameAvailability = async () => {
    setAvailabilityLoading(true);
    const response = await fetch(`/api/newusername/${newUsername}`);
    const data = await response.json();
    setUsernameAvailability(data.available);
    setAvailabilityMessage(data.message);
    if (!data.available) {
      usernameRef.current.focus();
    }
    setAvailabilityLoading(false);
  };
  const handleNewUsername = async () => {
    setAvailabilityMessage('');
    setSecondLoading(true);
    setServerResponse('Loading...');
    const reqParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        newUsername,
        session,
      }),
    };
    const response = await fetch(`/api/newusername`, reqParams);
    const data = await response.json();
    setTimeout(() => router.reload(`/u/${newUsername}`), 0);
  };
  if (session.user && session.user.username) {
    return (
      <div className={styles.container}>
        <h2>Bienvenido a 21tv , {session.user.username}</h2>

        <Link href={`/u/${session.user.username}/newmedia`}>
          <a className={styles.newMediaBtn}>Agrega contenido</a>
        </Link>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <h2>Obtener nombre de usuario</h2>
      <h4>¿Cuál es el que quieres?</h4>

      <>
        <input
          onChange={e => {
            setUsernameAvailability(false);
            setNewUsername(e.target.value);
            setAvailabilityMessage('');
          }}
          ref={usernameRef}
          type='text'
          placeholder='username'
        />
        {!usernameAvailability ? (
          <>
            {newUsername && (
              <Button handler={checkUsernameAvailability}>
                {availabilityLoading
                  ? 'Cargando...'
                  : 'Verificar disponibilidad'}
              </Button>
            )}
          </>
        ) : (
          <>
            <Button handler={handleNewUsername}>
              {!secondLoading
                ? 'Actualizar mi nombre de usuario'
                : `Hodl, ${newUsername}`}
            </Button>
          </>
        )}
        {availabilityMessage && <p>{availabilityMessage}</p>}
      </>
    </div>
  );
};

export default NewUsername;
