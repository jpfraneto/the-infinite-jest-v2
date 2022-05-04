import React from 'react';
import styles from './UserNonExistent.module.css';
import { useRouter } from 'next/router';

const UserNonExistent = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <h1>404. Non existent user.</h1>
    </div>
  );
};

export default UserNonExistent;
