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
  return <div>THis is the landing page</div>;
};

export default Home;
