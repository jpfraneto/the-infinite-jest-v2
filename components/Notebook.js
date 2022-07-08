import React, { useState, useRef, useEffect } from 'react';
import Button from './layout/Button';
import styles from './Notebook.module.css';
import { AiOutlineClockCircle, AiOutlineClose } from 'react-icons/ai';
import { useSession } from 'next-auth/react';

function secondsToTime(e) {
  const h = Math.floor(e / 3600)
      .toString()
      .padStart(2, '0'),
    m = Math.floor((e % 3600) / 60)
      .toString()
      .padStart(2, '0'),
    s = Math.floor(e % 60)
      .toString()
      .padStart(2, '0');

  return h + ':' + m + ':' + s;
}

const Notebook = ({
  playerReference,
  notes,
  setNotes,
  setEditNotesDisplay,
  recommendation,
}) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const notebookRef = useRef();

  const handleSaveNote = async () => {
    setLoading(true);
    if (!session)
      return alert('Please log in to add this notes to your profile!');
    const reqParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        notes,
        username: session.user.username,
        recommendation: recommendation.presentRecommendation,
      }),
    };
    const resp = await fetch(
      `/api/u/${session.user.username}/notes`,
      reqParams
    );
    const data = await resp.json();
    setLoading(false);
    setMessage(data.message);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };
  const handleCloseNotebook = () => {
    setEditNotesDisplay(false);
  };
  const handlePasteTimestamp = () => {
    setNotes(prev => {
      return {
        ...prev,
        notes:
          (prev?.notes || '') +
          `\n ${secondsToTime(
            Math.floor(playerReference.current.getCurrentTime())
          )}: `,
      };
    });
    notebookRef.current.focus();
  };
  return (
    <div className={styles.notebookContainer}>
      <h3>{recommendation.presentRecommendation.name}</h3>
      <div className={styles.notesBtns}>
        <Button handler={handlePasteTimestamp}>
          <AiOutlineClockCircle size={20} />
        </Button>
        <Button handler={handleCloseNotebook}>
          <AiOutlineClose size={20} />
        </Button>
      </div>
      <div className={styles.textareaContainer}>
        <textarea
          value={notes?.notes || ''}
          ref={notebookRef}
          placeholder='This software is in testing version. If you want to help me build it, feel free to fork this repo: https://github.com/jpfraneto/the-infinite-jest-v2'
          onChange={e => setNotes(prev => ({ ...prev, notes: e.target.value }))}
        />
      </div>
      <Button handler={handleSaveNote}>
        {loading ? 'Loading...' : 'Save notes'}
      </Button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Notebook;
