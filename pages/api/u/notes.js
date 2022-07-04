import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let { db } = await connectToDatabase();
    try {
      const response = await db.collection('users').updateOne(
        { username: req.body.username },
        {
          $push: {
            notes: { _id: req.body.recommendationId, notes: req.body.notes },
          },
        }
      );
      console.log('here1 it was added to the db', response);
      res.json({
        message: 'The user was updated with the notes for this episode!',
      });
    } catch (error) {
      console.log('the error is: ', error);
      res.json({ error });
    }
  }
}
