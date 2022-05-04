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
    .elements.filter(x => x.id === params.id)[0];
  return {
    props: {
      media: thisMedia,
    },
  };
}

const MediaById = ({ media }) => {
  return <IndividualMediaPlayer media={media} />;
};

export default MediaById;
