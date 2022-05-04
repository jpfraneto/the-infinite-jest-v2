import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Navbar.module.css';
import { TiThMenu } from 'react-icons/ti';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  const router = useRouter();
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className={styles.navigation}>
      <Link href='/'>
        <a className={styles.brandName}>The Infinite Jest</a>
      </Link>

      {/* {router.query.username && (
        <h3 className={styles.userName}>· {router.query.username} ·</h3>
      )} */}
      <div className={styles.userBtns}>
        {session ? (
          <>
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
                className={styles.loginBtn}
              >
                Get Username!
              </button>
            )}

            <button
              onClick={() => signOut()}
              className={styles.loginBtn}
              style={{ backgroundColor: 'red' }}
            >
              Logout
            </button>
          </>
        ) : (
          <button onClick={() => signIn()} className={styles.loginBtn}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
