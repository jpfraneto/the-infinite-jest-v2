import React, { useState } from 'react';
import { useSession, getSession } from 'next-auth/react';
import styles from './NewUsername.module.css';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';

const NewUsername = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [newUsername, setNewUsername] = useState('');
  const [serverResponse, setServerResponse] = useState('');
  const [usernameAvailability, setUsernameAvailability] = useState(false);
  const [availabilityMessage, setAvailabilityMessage] = useState('');
  if (status === 'loading') {
    return <p>Loading...</p>;
  }
  if (status === 'unauthenticated') {
    return <p>Access Denied</p>;
  }
  const checkUsernameAvailability = async () => {
    const response = await fetch(`/api/newusername/${newUsername}`);
    const data = await response.json();
    setUsernameAvailability(data.available);
    setAvailabilityMessage(data.message);
  };
  const handleNewUsername = async () => {
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
    router.push(`/u/${newUsername}`);
  };
  if (session.user.username) {
    return (
      <div className={styles.container}>
        <h2>You already have a username!</h2>
        <Link href={`/u/${session.user.username}`}>
          <a>Go to your universe</a>
        </Link>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <h2>Get username</h2>
      <h4>
        In the world of The Infinite Jest, we work with usernames. Which is the
        one that you want?
      </h4>

      <>
        <input
          onChange={e => {
            setNewUsername(e.target.value);
          }}
          type='text'
          placeholder='username'
        />
        {availabilityMessage && <p>{availabilityMessage}</p>}
        {!usernameAvailability ? (
          <button onClick={checkUsernameAvailability}>
            Check if available
          </button>
        ) : (
          <>
            <button onClick={handleNewUsername}>Update my username</button>
          </>
        )}
      </>
    </div>
  );
};

export default NewUsername;
