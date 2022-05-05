import { getProviders, signIn } from 'next-auth/react';
import styles from '../../styles/Signin.module.css';
import { BsGoogle } from 'react-icons/bs';
import { AiFillGithub } from 'react-icons/ai';

export default function SignIn({ providers }) {
  const getProviderIcon = provider => {
    console.log(provider);
    switch (provider) {
      case 'Google':
        return <BsGoogle />;
      case 'GitHub':
        return <AiFillGithub />;
    }
  };
  return (
    <div className={styles.mainContainer}>
      <h3>Welcome to The Infinite Jest</h3>
      <p>Here you can sign in with the following providers:</p>
      <div className={styles.providerBtnsContainer}>
        {Object.values(providers).map(provider => (
          <div key={provider.name} className={styles.providerBtnContainer}>
            <button
              className={styles.signInBtn}
              onClick={() => signIn(provider.id)}
            >
              {getProviderIcon(provider.name)}
            </button>
          </div>
        ))}
      </div>

      <p>
        Adding the functionality for more providers was out of my reach, if you
        can do it, please fork the github repo{' '}
        <a
          target='_blank'
          rel='noreferrer'
          href='https://github.com/jpfraneto/the-infinite-jest-v2'
        >
          here!
        </a>
      </p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
