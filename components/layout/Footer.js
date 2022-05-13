import React, { useState } from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <nav
      className={`${styles.footerMainContainer} ${
        hovered ? styles.hoveredContainer : styles.footerContainer
      }`}
    >
      <strong>In Memoriam:</strong>{' '}
      <a
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={styles.dfwname}
        target='_blank'
        rel='noreferrer'
        href='https://www.youtube.com/watch?v=YlZhA61qtvQ'
        style={{ color: hovered ? 'white' : 'black' }}
      >
        David Foster Wallace
      </a>{' '}
      <span className={styles.restOfText}>
        and all the victims of depression.
      </span>
    </nav>
  );
};

export default Footer;
