import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.json({ message: 'non valid route!' });
  try {
    console.log('in here!');
    const { db } = await connectToDatabase();
    const user = await db
      .collection('users')
      .findOne({ username: req.query.username });
    if (user)
      return res.json({
        available: false,
        message: 'The username is already taken',
      });
    return res.json({ available: true, message: 'The username is available!' });
  } catch (error) {}
}
