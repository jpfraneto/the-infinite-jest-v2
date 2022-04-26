import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import styles from '../../../styles/Home.module.css';
import { connectToDatabase } from '../../../lib/mongodb';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { BsPlusLg } from 'react-icons/bs';

export async function getStaticPaths() {
  const { db } = await connectToDatabase();
  const users = await db.collection('users').find({}).toArray();
  const paths = users.map(user => {
    return { params: { username: user.username.toString() } };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { db } = await connectToDatabase();
  const thisUser = await db
    .collection('users')
    .findOne({ username: params.username });
  return { props: { user: JSON.parse(JSON.stringify(thisUser)) } };
}

export default function UserJest({ user }) {
  console.log('in here, the user is: ', user);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(null);
  const [gridView, setGridView] = useState(true);
  const [playerVisibility, setPlayerVisibility] = useState(false);
  const [chosenMediaForDisplay, setChosenMediaForDisplay] = useState({});
  const [mediaTypes, setMediaTypes] = useState(null);
  const [mediaElements, setMediaElements] = useState(user.media);
  const [mobileListView, setMobileListView] = useState(true);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    if (user.media)
      setMediaTypes(() => {
        const arr = user.media.map(x => x.mediatype);
        return user.media.map(x => x.mediatype);
      });

    handleWindowSizeChange();
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const handleEliminateMediaType = async type => {
    const reqParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type,
        username: user.username,
      }),
    };
    const response = await fetch('/api/u', reqParams);
    const data = await response.json();
  };

  if (loading) return <h1>This place is being loaded!</h1>;

  return (
    <div>
      <Head>
        <title>The Infinite Jest · {router.query.username}</title>
        <meta name='description' content='This is the world of jp' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {width < 777 ? (
        <div className={styles.mobileContainer}>
          <h1
            onClick={() => {
              setMobileListView(true);
              setChosenMediaForDisplay(null);
            }}
            className={`${styles.headerSection} ${styles.mainTitle}`}
          >
            The Infinite Jest · @{router.query.username}
          </h1>
          {mobileListView ? (
            <>
              {mediaTypes &&
                mediaTypes.map(type => (
                  <div
                    onClick={() => {
                      setGridView(false);
                      setPlayerVisibility(true);
                      setChosenMediaForDisplay(type);
                      setMobileListView(false);
                    }}
                    className={styles.mediaTypeSelector}
                    key={type.id}
                  >
                    {type.type}
                  </div>
                ))}
            </>
          ) : (
            <div>
              <div>
                <select
                  onChange={e => {
                    const chosenType = mediaTypes.filter(
                      x => x.type === e.target.value
                    );
                    setChosenMediaForDisplay(chosenType[0]);
                  }}
                  className={styles.mobileSelectMediaType}
                >
                  <option>Change Media Type...</option>
                  {mediaTypes.map(type => (
                    <option key={type.id} value={type.type}>
                      {type.type}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.mobileMediaDisplay}>
                <h3>{chosenMediaForDisplay.type}</h3>
                <div className={styles.playerWrapper}>
                  <ReactPlayer
                    className={styles.reactPlayer}
                    url={chosenMediaForDisplay.url}
                    width='100%'
                    height='100%'
                    controls={true}
                  />
                </div>
                <div className={styles.textContainer}>
                  <h3>Why is this video here?</h3>
                  <p>
                    The first time I read that, in the 1990s, it sounded
                    amusingly medieval. How strange, to have to avoid committing
                    heresy. But when I reread it 20 years later it sounded like
                    a description of contemporary employment.
                  </p>
                  <p>
                    There are an ever-increasing number of opinions you can be
                    fired for. Those doing the firing don't use the word
                    "heresy" to describe them, but structurally they're
                    equivalent. Structurally there are two distinctive things
                    about heresy: (1) that it takes priority over the question
                    of truth or falsity, and (2) that it outweighs everything
                    else the speaker has done.
                  </p>
                  <p></p>
                  <p>
                    If you find yourself talking to someone who uses these
                    labels a lot, it might be worthwhile to ask them explicitly
                    if they believe any babies are being thrown out with the
                    bathwater. Can a statement be x-ist, for whatever value of
                    x, and also true? If the answer is yes, then they're
                    admitting to banning the truth. That's obvious enough that
                    I'd guess most would answer no. But if they answer no, it's
                    easy to show that they're mistaken, and that in practice
                    such labels are applied to statements regardless of their
                    truth or falsity.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <main>
          <h1 className={styles.mainTitle}>
            The Infinite Jest · @{router.query.username}
          </h1>
          {!gridView && (
            <button
              onClick={() => {
                setPlayerVisibility(false);
                setGridView(true);
              }}
            >
              Grid View
            </button>
          )}

          {playerVisibility && chosenMediaForDisplay && (
            <div className={styles.mainPlayerOuterWrapper}>
              <h3>
                {chosenMediaForDisplay.mediatype}{' '}
                <span onClick={() => handleEliminateMediaType('x')}>
                  Eliminate MediaType
                </span>
              </h3>
              <div className={styles.playerWrapper}>
                <ReactPlayer
                  playing={true}
                  className={styles.reactPlayer}
                  url={chosenMediaForDisplay.url}
                  width='100%'
                  height='100%'
                  controls={true}
                />
              </div>
              <div className={styles.textContainer}>
                <h3>Why is this video here?</h3>
                <p>{chosenMediaForDisplay.description}</p>
              </div>
            </div>
          )}
          {gridView && (
            <div className={styles.topicsMainContainer}>
              {mediaElements &&
                mediaElements.map((x, index) => {
                  return (
                    <div
                      onClick={() => {
                        setGridView(false);
                        setPlayerVisibility(true);
                        setChosenMediaForDisplay(x.elements[0]);
                      }}
                      key={index}
                      className={styles.topicContainer}
                    >
                      <h3>{x.mediatype}</h3>
                      <div
                        className={`${styles.playerWrapper} ${styles.gridPlayerWrapper}`}
                      >
                        <ReactPlayer
                          playing={false}
                          muted={true}
                          className={styles.reactPlayer}
                          url={x.elements[0].url}
                          width='100%'
                          height='100%'
                        />
                      </div>
                    </div>
                  );
                })}
              <Link href={`/u/${user.username}/newmedia`} passHref>
                <div
                  className={`${styles.topicContainer} ${styles.newMediaTypeContainer}`}
                >
                  <h3>Add new Media Type</h3>
                  <div className={styles.plusSign}>
                    <BsPlusLg />
                  </div>
                </div>
              </Link>
            </div>
          )}
        </main>
      )}
    </div>
  );
}
