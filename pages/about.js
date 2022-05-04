import React, { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';

const About = () => {
  const [aloja, setAloja] = useState(null);
  useEffect(() => {
    const getInfo = async () => {
      const session = await getSession();
      console.log('the sesion is: ', session);
      if (session) {
        const userId = session.user.image;
        setAloja(session);
      }
    };
    getInfo();
  }, []);
  return (
    <div>
      What is this place about?
      <button onClick={() => console.log(aloja)}>console</button>
    </div>
  );
};

export default About;
