import { getProviders, signIn } from 'next-auth/react';
import styles from '../../styles/Signin.module.css';
import { FaTwitter } from 'react-icons/fa';

export default function SignIn({ providers }) {
  return (
    <div className={styles.mainContainer}>
      <h3>Welcome</h3>
      <p>
        Here you can sign in. For the sake of simplicity, now you can only sign
        in with a Twitter account.
      </p>
      {Object.values(providers).map(provider => (
        <div key={provider.name} className={styles.providerBtnContainer}>
          <button
            className={styles.signInBtn}
            onClick={() => signIn(provider.id)}
          >
            <span className={styles.googleIcon}>
              <FaTwitter />
            </span>{' '}
            Log In With {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
