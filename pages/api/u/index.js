import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.json({ 123: 456 });
  }
  if (req.method === 'POST') {
    let { db } = await connectToDatabase();
    try {
      const response = await db
        .collection('users')
        .updateOne(
          { username: req.body.username },
          { $pull: { presentMedia: { mediatype: req.body.type } } }
        );
      res.json({ message: 'The user was updated!' });
    } catch (error) {
      console.log('the error is: ', error);
    }
  }
}
