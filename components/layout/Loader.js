import React from 'react';
import styles from './Loader.module.css';
import { useRouter } from 'next/router';

const Loader = () => {
  return (
    <div className={styles.main}>
      <h2>
        I don&apos;t know how to make the process of loading this page faster.
        I&apos;m sorry for that. But one day I will, or someone will help me,
        and it will be awesome.
      </h2>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
