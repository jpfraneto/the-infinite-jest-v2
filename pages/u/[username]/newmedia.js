import React, { useState, useEffect } from 'react';
import { connectToDatabase } from '../../../lib/mongodb';
import { useRouter } from 'next/router';
import styles from '../../../styles/NewMedia.module.css';
import NewMedia from '../../../components/NewMedia';
import Link from 'next/link';

// export async function getStaticPaths() {
//   const { db } = await connectToDatabase();
//   const users = await db.collection('users').find({}).toArray();
//   const paths = users.map(user => {
//     return { params: { username: user.username.toString() } };
//   });
//   return {
//     paths,
//     fallback: false,
//   };
// }

export async function getServerSideProps({ params }) {
  const { db } = await connectToDatabase();
  const thisUser = await db
    .collection('users')
    .findOne({ username: params.username });
  return { props: { user: JSON.parse(JSON.stringify(thisUser)) } };
}

const NewMedia2 = ({ user }) => {
  return (
    <>
      <NewMedia user={user} />
    </>
  );
};

export default NewMedia2;
