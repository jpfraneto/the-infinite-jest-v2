import React, { useState, useEffect } from 'react';
import MobileMediaMenu from './MobileMediaMenu';
import DesktopMediaMenu from './DesktopMediaMenu';
import MediaPlayer from './MediaPlayer';
import styles from './MainMediaView.module.css';
import { useRouter } from 'next/router';

const MainMediaView = ({ user }) => {
  const router = useRouter();
  const [width, setWidth] = useState(null);
  const [gridView, setGridView] = useState(true);
  const [loading, setLoading] = useState(false);
  const [playerElement, setPlayerElement] = useState(null);
  const [playerVisibility, setPlayerVisibility] = useState(false);
  const [chosenMediaForDisplay, setChosenMediaForDisplay] = useState({});
  const [mediaTypes, setMediaTypes] = useState(user.mediatypes);
  const [mediaElements, setMediaElements] = useState(user.presentMedia);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const handleNewMediaSelect = e => {
    const yes = confirm(`Do you want to add a new ${e.target.value} media?`);
    if (yes) setLoading(true);
    router.push(`/u/${router.query.username}/newmedia?type=${e.target.value}`);
  };
  if (loading) return <h2>Loading!</h2>;

  return (
    <>
      {gridView ? (
        <>
          {width < 777 ? (
            <MobileMediaMenu
              input={{
                setGridView,
                setPlayerVisibility,
                setChosenMediaForDisplay,
                handleNewMediaSelect,
              }}
              mediaElements={mediaElements}
              setGridView={setGridView}
            />
          ) : (
            <DesktopMediaMenu
              input={{
                setGridView,
                setPlayerVisibility,
                setChosenMediaForDisplay,
                handleNewMediaSelect,
                setPlayerElement,
              }}
              mediaElements={mediaElements}
              setGridView={setGridView}
            />
          )}
        </>
      ) : (
        <MediaPlayer
          playerElement={playerElement}
          setGridView={setGridView}
          chosenMediaForDisplay={chosenMediaForDisplay}
        />
      )}
    </>
  );
};

export default MainMediaView;
