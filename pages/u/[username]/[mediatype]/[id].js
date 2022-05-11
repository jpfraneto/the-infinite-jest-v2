import React from 'react';
import { connectToDatabase } from '../../../../lib/mongodb';
import IndividualMediaPlayer from '../../../../components/IndividualMediaPlayer';

export async function getServerSideProps({ params }) {
  const { db } = await connectToDatabase();
  const thisUser = await db
    .collection('users')
    .findOne({ username: params.username });
  const thisMedia = thisUser.media
    .filter(x => x.mediatype === params.mediatype)[0]
    .elements.filter(x => x._id === params.id)[0];
  return {
    props: {
      media: thisMedia,
    },
  };
}

const MediaById = ({ media }) => {
  if (!media) return <h3>That recommendation doesnt exist in the system!</h3>;
  return <IndividualMediaPlayer media={media} />;
};

export default MediaById;
