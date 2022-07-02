import React, { useState } from 'react';
import Button from './layout/Button';
import styles from './Notebook.module.css';

const Notebook = ({ mediaTitle }) => {
  const [notesText, setNotesText] = useState('');
  return (
    <div className={styles.notebookContainer}>
      <h4>Notes</h4>
      <p>{mediaTitle}</p>
      <div className={styles.notesBtns}>
        <button onClick={() => setNotesText(prev => prev + '\n 12:33: ')}>
          Paste this video timestamp
        </button>
        <button>
          <em>em</em>
        </button>
        <button>
          <strong>B</strong>
        </button>
        <button>
          <strong>+</strong>
        </button>
        <button>
          <strong>-</strong>
        </button>
      </div>
      <div className={styles.textareaContainer}>
        <textarea
          value={notesText}
          onChange={e => setNotesText(e.target.value)}
        />
      </div>
      <Button onClick={() => alert('save these notes to the users profile!')}>
        Save notes
      </Button>
    </div>
  );
};

export default Notebook;
