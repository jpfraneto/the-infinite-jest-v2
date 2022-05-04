import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import ReactPlayer from 'react-player';
import { connectToDatabase } from '../../../lib/mongodb';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { BsPlusLg } from 'react-icons/bs';
import PlayerMediaCard from '../../../components/PlayerMediaCard/PlayerMediaCard';
import MainMediaView from '../../../components/MainMediaView';

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

export default function UserJest({ user }) {
  const router = useRouter();
  return (
    <>
      <MainMediaView user={user} />
    </>
  );
}
