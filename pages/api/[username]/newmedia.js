import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let { db } = await connectToDatabase();
    try {
      const updatedMessage = await db.collection('users').updateOne(
        { username: req.body.username },
        {
          $push: {
            media: {
              elements: [
                {
                  url: req.body.url,
                  mediatype: req.body.mediaName,
                  description: req.body.description,
                },
              ],
              mediatype: req.body.mediaName,
            },
          },
        }
      );
      res.json({
        message: `The media ${req.body.mediaName} was added to the user ${req.body.username}!`,
        success: true,
      });
    } catch (error) {
      console.log('the error is: ', error);
    }
  }
}
