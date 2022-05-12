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
        href='https://www.youtube.com/watch?v=2doZROwdte4'
        style={{ color: hovered ? 'white' : 'black' }}
      >
        David Foster Wallace
      </a>{' '}
      and all the victims of depression.
    </nav>
  );
};

export default Footer;
