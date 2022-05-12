import React, { useState } from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const links = [
    'https://www.youtube.com/watch?v=8CrOL-ydFMI',
    'https://www.youtube.com/watch?v=2doZROwdte4',
  ];
  const [hovered, setHovered] = useState(false);
  const randomLink = links[Math.floor(links.length * Math.random())];
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
        href={randomLink}
        style={{ color: hovered ? 'white' : 'black' }}
      >
        David Foster Wallace
      </a>{' '}
      and all the victims of depression.
    </nav>
  );
};

export default Footer;
