import { getProviders, signIn } from 'next-auth/react';
import styles from '../../styles/Signin.module.css';
import { FcGoogle } from 'react-icons/fc';
import { FiGithub } from 'react-icons/fi';
import Head from 'next/head';

export default function SignIn({ providers }) {
  const getProviderIcon = provider => {
    switch (provider) {
      case 'Google':
        return <FcGoogle />;
      case 'GitHub':
        return (
          <FiGithub style={{ color: 'white' }} value={{ color: 'white' }} />
        );
    }
  };
  const handleLightningLogin = () => {
    alert('Im working on this functionality...');
  };
  var o = {
    english: 'Welcome',
    czech: 'Vitejte',
    danish: 'Velkomst',
    dutch: 'Welkom',
    estonian: 'Tere tulemast',
    finnish: 'Tervetuloa',
    flemish: 'Welgekomen',
    french: 'Bienvenue',
    german: 'Willkommen',
    irish: 'Failte',
    italian: 'Benvenuto',
    latvian: 'Gaidits',
    lithuanian: 'Laukiamas',
    polish: 'Witamy',
    spanish: 'Bienvenido',
    swedish: 'Valkommen',
    welsh: 'Croeso',
  };
  return (
    <>
      <Head>
        <title>21tv · Entrar</title>
      </Head>
      <div className={styles.mainContainer}>
        <div className={styles.loginBox}>
          <div className={styles.topBox}>
            {/* <p>
          Este es un flujo infinito de información en torno a la tecnología
          que va a revolucionar la forma en la que interactuamos como
          humanidad:
        </p>
        <p className={styles.btcText}>BITCOIN</p> */}
            <p>The best way in is through.</p>
          </div>

          <div className={styles.providerBtnsContainer}>
            {Object.values(providers).map(provider => (
              <button
                key={provider.name}
                className={styles.signInBtn}
                onClick={() => signIn(provider.id)}
              >
                {getProviderIcon(provider.name)}
              </button>
            ))}{' '}
            <button
              onClick={handleLightningLogin}
              className={styles.loginWithLightningBtn}
            >
              <svg
                class='mr-3'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M19 10.1907L8.48754 21L12.6726 12.7423H5L14.6157 3L11.5267 10.2835L19 10.1907Z'
                  fill='black'
                ></path>
              </svg>
              | Lightning Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
