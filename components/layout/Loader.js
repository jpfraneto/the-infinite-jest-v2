import React from 'react';
import styles from './Loader.module.css';
import { useRouter } from 'next/router';

const Loader = () => {
  return (
    <div className={styles.main}>
      <h2>The page you requested is being loaded</h2>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
