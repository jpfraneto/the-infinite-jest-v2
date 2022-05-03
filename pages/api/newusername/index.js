import { getSession } from 'next-auth/react';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.json({ message: 'There is no endpoint here!' });
  const session = await getSession({ req });
  const { db } = await connectToDatabase();
  const checkUsername = await db
    .collection('users')
    .find({ username: req.body.newUsername })
    .toArray();
  console.log('here', checkUsername);
  if (checkUsername.length > 0)
    return res.json({ message: 'That username is already taken.' });
  const thisUser = await db
    .collection('users')
    .findOne({ email: session.user.email });
  if (thisUser.username)
    return res.json({
      message: `The user already has the following username: ${thisUser.username}`,
    });
  const updatedMsg = await db
    .collection('users')
    .updateOne(
      { email: session.user.email },
      { $set: { username: req.body.newUsername } }
    );
  return res.json({
    message: `Your profile was updated with the following username: ${req.body.newUsername}`,
  });
}
