import React, { useState, useRef } from 'react';
import Button from './layout/Button';
import styles from './Notebook.module.css';
import {
  AiOutlineClockCircle,
  AiOutlineClose,
  AiOutlineConsoleSql,
} from 'react-icons/ai';
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
  //return `${h}:${m}:${s}`;
}

const Notebook = ({
  mediaTitle,
  playerReference,
  notes,
  setNotes,
  setEditNotesDisplay,
  recommendationId,
}) => {
  const { data: session } = useSession();
  const notebookRef = useRef();
  const handleSaveNote = async () => {
    if (!session) return alert('there is no user!');
    const reqParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        notes: notes,
        username: session.user.username,
        recommendationId: recommendationId,
      }),
    };
    const resp = await fetch('/api/u/notes', reqParams);
    const data = await resp.json();
    alert('the notes were added to your profile!');
  };
  const handleCloseNotebook = () => {
    setEditNotesDisplay(false);
  };
  const handlePasteTimestamp = () => {
    setNotes(
      prev =>
        prev +
        `\n ${secondsToTime(
          Math.floor(playerReference.current.getCurrentTime())
        )}: `
    );
    notebookRef.current.focus();
  };
  return (
    <div className={styles.notebookContainer}>
      <p>{mediaTitle}</p>
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
          value={notes}
          ref={notebookRef}
          placeholder='This software is in testing version. If you want to help me build it, feel free to fork this repo: https://github.com/jpfraneto/the-infinite-jest-v2'
          onChange={e => setNotes(e.target.value)}
        />
      </div>
      <Button handler={handleSaveNote}>Save notes</Button>
    </div>
  );
};

export default Notebook;
