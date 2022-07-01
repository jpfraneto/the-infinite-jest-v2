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
            ))}
            <a
              className={`${styles.contributeBtn}`}
              target='_blank'
              rel='noreferrer'
              href='https://github.com/jpfraneto/the-infinite-jest-v2/blob/main/pages/api/auth/%5B...nextauth%5D.js'
            >
              Otro
            </a>
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
