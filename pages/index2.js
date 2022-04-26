import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import styles from '../styles/Home.module.css';

const outerMediaTypes = [
  {
    id: 'dws123',
    type: 'Deep Work Set',
    url: 'https://soundcloud.com/doobdoob/doob-janoma-garbicz-festival-2018-buk-corner',
  },
  {
    id: 'film123',
    type: 'Film',
    url: 'https://www.youtube.com/watch?v=uDZ9yp76NSc',
  },
  {
    id: 'doc123',
    type: 'Documentary',
    url: 'https://www.youtube.com/watch?v=7gUh8j5ui0o',
  },
  {
    id: 'pod123',
    type: 'Podcast',
    url: 'https://www.youtube.com/watch?v=yujP3-AxXsI',
  },
  {
    id: 'natu132',
    type: 'Nature',
    url: 'https://www.youtube.com/watch?v=AhP5Tg_BLIk',
  },
  {
    id: 'music213',
    type: 'Music',
    url: 'https://www.youtube.com/watch?v=BI8N2569jSg',
  },
  {
    id: 'scied123',
    type: 'Science',
    url: 'https://www.youtube.com/watch?v=9BEytifFFpc',
  },
  {
    id: 'spac123',
    type: 'Space',
    url: 'https://www.youtube.com/watch?v=hlGCcM_V3HI',
  },
  {
    id: 'comdq123',
    type: 'Comedy',
    url: 'https://www.youtube.com/watch?v=OVseBDBDdlk',
  },
  {
    id: 'eslf2',
    type: 'Self',
    url: 'https://www.youtube.com/watch?v=H9i2gj6sv3k',
  },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState(null);
  const [gridView, setGridView] = useState(true);
  const [playerVisibility, setPlayerVisibility] = useState(false);
  const [chosenMediaForDisplay, setChosenMediaForDisplay] = useState({});
  const [mediaTypes, setMediaTypes] = useState(outerMediaTypes);
  const [mobileListView, setMobileListView] = useState(true);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    const fetching = async () => {
      const response = await fetch(
        'https://www.theinfinitejest.tv/api/u/jpfraneto'
      );
      const data = await response.json();
      setLoading(false);
      setMediaTypes(data.foundUser.presentMedia);
    };
    fetching();
    handleWindowSizeChange();
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  if (loading) return <h1>This place is being loaded!</h1>;

  return (
    <div>
      <Head>
        <title>The Infinite Jest · jpfraneto</title>
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
            The Infinite Jest · @jpfraneto
          </h1>
          {mobileListView ? (
            <>
              {mediaTypes.map(type => (
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
          <h1 className={styles.mainTitle}>The Infinite Jest · @jpfraneto</h1>
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
              <h3>{chosenMediaForDisplay.type}</h3>
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
                <p>
                  The first time I read that, in the 1990s, it sounded amusingly
                  medieval. How strange, to have to avoid committing heresy. But
                  when I reread it 20 years later it sounded like a description
                  of contemporary employment.
                </p>
                <p>
                  There are an ever-increasing number of opinions you can be
                  fired for. Those doing the firing don't use the word "heresy"
                  to describe them, but structurally they're equivalent.
                  Structurally there are two distinctive things about heresy:
                  (1) that it takes priority over the question of truth or
                  falsity, and (2) that it outweighs everything else the speaker
                  has done.
                </p>
                <p>
                  For example, when someone calls a statement "x-ist," they're
                  also implicitly saying that this is the end of the discussion.
                  They do not, having said this, go on to consider whether the
                  statement is true or not. Using such labels is the
                  conversational equivalent of signalling an exception. That's
                  one of the reasons they're used: to end a discussion.
                </p>
                <p>
                  If you find yourself talking to someone who uses these labels
                  a lot, it might be worthwhile to ask them explicitly if they
                  believe any babies are being thrown out with the bathwater.
                  Can a statement be x-ist, for whatever value of x, and also
                  true? If the answer is yes, then they're admitting to banning
                  the truth. That's obvious enough that I'd guess most would
                  answer no. But if they answer no, it's easy to show that
                  they're mistaken, and that in practice such labels are applied
                  to statements regardless of their truth or falsity.
                </p>
              </div>
            </div>
          )}
          {gridView && (
            <div className={styles.topicsMainContainer}>
              {mediaTypes.map(type => (
                <div
                  onClick={() => {
                    setGridView(false);
                    setPlayerVisibility(true);
                    setChosenMediaForDisplay(type);
                  }}
                  key={type.id}
                  className={styles.topicContainer}
                >
                  <h3>{type.type}</h3>
                  <div
                    className={`${styles.playerWrapper} ${styles.gridPlayerWrapper}`}
                  >
                    <ReactPlayer
                      playing={false}
                      muted={true}
                      className={styles.reactPlayer}
                      url={type.url}
                      width='100%'
                      height='100%'
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}
    </div>
  );
}
