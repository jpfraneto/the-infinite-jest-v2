import React, { useState } from 'react';
import Button from './layout/Button';
import styles from './Notebook.module.css';

const Notebook = ({ mediaTitle }) => {
  const [notesText, setNotesText] = useState('');
  const handleSaveNote = () => {
    alert('save these notes to the logged in users profile!');
  };
  return (
    <div className={styles.notebookContainer}>
      <h4>Notes (Not ready yet)</h4>
      <p>{mediaTitle}</p>
      <div className={styles.notesBtns}>
        <button
          onClick={() =>
            setNotesText(
              prev =>
                prev +
                '\n 12:33: This is not ready yet, but you get the point... '
            )
          }
        >
          Paste this video timestamp
        </button>
        <button onClick={() => alert('emphasize the selected text')}>
          <em>em</em>
        </button>
        <button onClick={() => alert('darken the selected text')}>
          <strong>B</strong>
        </button>
        <button onClick={() => alert('make the font bigger')}>
          <strong>+</strong>
        </button>
        <button onClick={() => alert('make the font smaller')}>
          <strong>-</strong>
        </button>
      </div>
      <div className={styles.textareaContainer}>
        <textarea
          value={notesText}
          placeholder='This software is in testing version. If you want to help me build it, feel free to fork this repo: https://github.com/jpfraneto/the-infinite-jest-v2'
          onChange={e => setNotesText(e.target.value)}
        />
      </div>
      <Button handler={handleSaveNote}>Save notes</Button>
    </div>
  );
};

export default Notebook;
