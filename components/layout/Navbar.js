import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Navbar.module.css';
import { CgNotes } from 'react-icons/cg';
import canal21 from '../../public/canal21.png';
import Link from 'next/link';
import Image from 'next/image';
import Button from './Button';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();
  const [height, setHeight] = useState('212121');

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
      <div className={styles.logoContainer}>
        <Link href='/' passHref>
          <Image
            src={canal21}
            width={44}
            height={44}
            alt='The most horrible logo in the world'
          />
        </Link>
        <span className={styles.restOfTitle}>BETA</span>
      </div>

      {/* {router.query.username && (
        <h3 className={styles.userName}>· {router.query.username} ·</h3>
      )} */}
      {height && (
        <div>
          {height} |
          <select className={styles.languagePicker} name='lang'>
            <option value='en'>English</option>
          </select>
        </div>
      )}
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
            <Button
              handler={() => router.push(`/u/${session.user.username}/notes`)}
            >
              <CgNotes />
            </Button>
            <button
              onClick={() => signOut()}
              className={`${styles.loginBtn} ${styles.logoutBtn}`}
            >
              Salir
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
