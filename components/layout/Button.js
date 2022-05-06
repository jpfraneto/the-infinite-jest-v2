import React from 'react';
import styles from './Button.module.css';

const Button = ({ handler, children }) => {
  return (
    <button className={styles.btn} onClick={handler}>
      {children}
    </button>
  );
};

export default Button;
