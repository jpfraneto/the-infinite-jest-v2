import React from 'react';
import Image from 'next/image';
import styles from './MemberCircle.module.css';
import Link from 'next/link';

const MemberCircle = () => {
  return (
    <Link href='/u/jpfraneto' passHref>
      <div className={styles.memberImageContainer}>
        <Image
          alt='Host Image'
          src={'/images/jpfraneto.jpg'}
          width='60'
          height='60'
        />
      </div>
    </Link>
  );
};

export default MemberCircle;
