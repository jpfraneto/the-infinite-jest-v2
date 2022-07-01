import React from 'react';
import styles from './Loader.module.css';
import { useRouter } from 'next/router';

const Loader = () => {
  return (
    <div className={styles.main}>
      <h2>
        No sé cómo cargar esta página más rápido. Si quieres ayudarme, por favor
        contribuye al proyecto en github{' '}
        <a
          className={`${styles.contributeBtn}`}
          target='_blank'
          rel='noreferrer'
          href='https://github.com/jpfraneto/the-infinite-jest-v2'
        >
          acá
        </a>
      </h2>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
