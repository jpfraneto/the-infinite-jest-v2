import { useRouter } from 'next/router';
import MainMediaView from '../../../components/MainMediaView';
import UserNonExistent from '../../../components/UserNonExistent';

export async function getServerSideProps({ params }) {
  let dev = process.env.NODE_ENV !== 'production';
  let { DEV_URL, PROD_URL } = process.env;
  const response = await fetch(
    `${dev ? DEV_URL : PROD_URL}/api/${params.username}`
  );
  const presentMedia = await response.json();
  return {
    props: {
      presentMedia: JSON.parse(JSON.stringify(presentMedia.presentMedia)),
    },
  };
}

export default function UserJest({ presentMedia }) {
  const router = useRouter();
  if (!presentMedia) return <UserNonExistent />;
  return <MainMediaView presentMedia={presentMedia} />;
}
