import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Navbar.module.css';
import { IoMdLogOut } from 'react-icons/io';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();
  const [height, setHeight] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res1 = await fetch('https://api.blockcypher.com/v1/btc/main');
      const data1 = await res1.json();
      if (data1) setHeight(data1.height);
    };
    getData();
  }, []);

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
          21<span className={styles.restOfName}>tv</span>
        </a>
      </Link>

      {/* {router.query.username && (
        <h3 className={styles.userName}>· {router.query.username} ·</h3>
      )} */}
      {height && <span>{height}</span>}
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
              Salir
            </button>
          </>
        ) : (
          <button onClick={() => signIn()} className={styles.loginBtn}>
            Entrar / Registrarte
          </button>
        )}
      </div>
    </nav>
  );
}
