import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';
import { connectToDatabase } from '../../../../lib/mongodb';

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();
  const thisUser = await db
    .collection('users')
    .findOne({ username: context.query.username });
  return { props: { notes: thisUser.notes } };
}

const Notes = ({ notes }) => {
  const router = useRouter();
  if (!notes) return <p>Loading!</p>;
  return (
    <div>
      <ul>
        {notes.map(note => (
          <div>
            <Link href={`/u/${router.query.username}/notes/${note._id}`}>
              {note._id}
            </Link>
            {note.notes.split('\n').map(x => (
              <p>{x}</p>
            ))}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
