import { useRouter } from 'next/router';
import React, { Fragment, useState } from 'react';
import styles from './EditableNotebook.module.css';

const EditableNotebook = ({ note }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [notesValue, setNotesValue] = useState(note.notes);
  const handleNotesUpdate = async () => {
    setLoading(true);
    const reqParams = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        noteId: note._id,
        updatedText: notesValue,
        username: router.query.username,
      }),
    };
    const resp = await fetch(
      `/api/u/${router.query.username}/notes`,
      reqParams
    );
    const data = await resp.json();
    setLoading(false);
    setEditMode(x => !x);
  };
  return (
    <div className={styles.editableNotebookContainer}>
      {editMode ? (
        <div className={styles.textareaContainer}>
          <textarea
            onChange={e => setNotesValue(e.target.value)}
            value={notesValue}
            className={styles.editableTextAreaFromNotebook}
          />{' '}
          <br />
          <button
            onClick={() => {
              handleNotesUpdate();
            }}
          >
            {loading ? 'Loading...' : 'Save'}
          </button>
        </div>
      ) : (
        <div onClick={() => setEditMode(x => !x)}>
          {notesValue.split('\n').map((x, index) => (
            <p key={index}>{x}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default EditableNotebook;
