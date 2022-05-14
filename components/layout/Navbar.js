import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Navbar.module.css';
import { IoMdLogOut } from 'react-icons/io';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import useWindowDimensions from '/lib/hooks/useWindowDimensions';

export default function Navbar() {
  const { data: session } = useSession();

  const router = useRouter();

  const handleNewMediaBtn = () => {
    if (!session.user.username) {
      return alert('Before you add media, please get a username!');
    }
    router.push(`/u/${session.user.username}/newmedia`);
  };

  return (
    <nav className={styles.navigation}>
      <Link href='/'>
        <a className={styles.brandName}>
          T<span className={styles.restOfTitle}>he</span> I
          <span className={styles.restOfTitle}>nfinite</span> J
          <span className={styles.restOfTitle}>est</span>
        </a>
      </Link>

      {/* {router.query.username && (
        <h3 className={styles.userName}>· {router.query.username} ·</h3>
      )} */}
      <div className={styles.userBtns}>
        {session ? (
          <>
            <button
              onClick={handleNewMediaBtn}
              className={`${styles.newMediaBtn} ${styles.loginBtn}`}
            >
              +
            </button>
            {session.user.username ? (
              <button
                onClick={() => router.push(`/u/${session.user.username}`)}
                className={styles.loginBtn}
              >
                {session.user.username}
              </button>
            ) : (
              <button
                onClick={() => router.push(`/newusername`)}
                className={`${styles.loginBtn} ${styles.getUsernameBtn}`}
              >
                Get Username!
              </button>
            )}
            <button
              onClick={() => signOut()}
              className={`${styles.loginBtn} ${styles.logoutBtn}`}
            >
              Logout
            </button>
          </>
        ) : (
          <button onClick={() => signIn()} className={styles.loginBtn}>
            Login / Register
          </button>
        )}
      </div>
    </nav>
  );
}
