import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Link from 'next/link';
import { connectToDatabase } from '../../../../lib/mongodb';
import NotebookDisplay from 'components/NotesDisplay/NotebookDisplay';
import styles from '../../../../styles/UserNotes.module.css';

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();
  const thisUser = await db
    .collection('users')
    .findOne({ username: context.query.username });
  return { props: { notes: thisUser.notes } };
}

const Notes = ({ notes }) => {
  const [chosenNote, setChosenNote] = useState(null);
  const router = useRouter();
  if (!notes) return <p>Loading!</p>;
  return (
    <div>
      <ul>
        {notes.map(note => {
          return (
            <div key={note._id}>
              <p
                className={styles.episodeLinkBtn}
                onClick={() => setChosenNote(note)}
              >
                {note.name || ''}
              </p>
            </div>
          );
        })}
      </ul>
      {chosenNote && (
        <NotebookDisplay note={chosenNote} setChosenNote={setChosenNote} />
      )}
    </div>
  );
};

export default Notes;
