import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../lib/mongodb';
import getNextPlayedMedia from '/lib/functions';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      let { db } = await connectToDatabase();
      const thisUser = await db
        .collection('users')
        .findOne({ username: req.query.username });
      const nextMedia = getNextPlayedMedia(
        thisUser.media.filter(x => x.mediatype === req.body.mediatype)[0]
          .elements,
        req.body.alreadyPlayedElements
      );
      res.json({ message: 'Aloja', success: true, data: { nextMedia } });
    } catch (error) {
      res.json({
        message: 'There was an error fetching this users information',
      });
    }
  }
}
