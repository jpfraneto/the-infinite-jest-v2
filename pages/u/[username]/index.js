import { useRouter } from 'next/router';
import MainMediaView from '../../../components/MainMediaView';
import UserNonExistent from '../../../components/UserNonExistent';

export async function getServerSideProps({ params }) {
  let dev = process.env.NODE_ENV !== 'production';
  let { DEV_URL, PROD_URL } = process.env;
  const response = await fetch(
    `${dev ? DEV_URL : PROD_URL}/api/${params.username}`
  );
  const data = await response.json();
  return { props: { user: JSON.parse(JSON.stringify(data.user)) } };
}

export default function UserJest({ user }) {
  const router = useRouter();
  if (!user) return <UserNonExistent />;
  return <MainMediaView user={user} />;
}
