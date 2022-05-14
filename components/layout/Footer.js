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
