import Notebook from 'components/Notebook';
import React from 'react';
import ReactPlayer from 'react-player';
import EditableNotebook from './EditableNotebook';
import styles from './NotebookDisplay.module.css';

const NotebookDisplay = ({ note, setChosenNote }) => {
  return (
    <div className={styles.outerContainer}>
      <h3>{note.name}</h3>
      <span className={styles.closeBtn} onClick={() => setChosenNote(null)}>
        X
      </span>
      <div className={styles.playerWrapper}>
        <ReactPlayer
          width='100%'
          height='100%'
          className={styles.reactPlayer}
          url={note.url}
        />
      </div>
      <EditableNotebook note={note} />
    </div>
  );
};

export default NotebookDisplay;
