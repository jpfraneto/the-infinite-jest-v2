import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

const Home = () => {
  const { data: session } = useSession();
  const [text, setText] = useState('');

  useEffect(() => {
    if (session) {
      setText(`Log Out`);
    } else {
      setText('Log In');
    }
  }, [session]);
  const handleSessionClick = () => {
    if (session) {
      signOut({
        callbackUrl: `/`,
      });
    } else {
      signIn();
    }
  };
  return (
    <div>
      Users:
      <ul>
        <li>
          <Link href='/u/jpfraneto'>
            <a>jpfraneto</a>
          </Link>
        </li>
        <li>
          <Link href='/u/ffraneto'>
            <a>ffraneto</a>
          </Link>
        </li>
        <li>
          <Link href='/u/nachita'>
            <a>nachita</a>
          </Link>
        </li>
        <li>
          <Link href='/u/jorge.franetovic'>
            <a>jorge.franetovic</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
