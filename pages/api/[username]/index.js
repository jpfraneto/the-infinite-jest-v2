import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../lib/mongodb';
import getNextPlayedMedia from '/lib/functions';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let { db } = await connectToDatabase();
      const thisUser = await db
        .collection('users')
        .findOne({ username: req.query.username });
      let presentMedia = [];
      let thisUserPresentMedia = [];
      if (!thisUser)
        return res.json({
          user: null,
          message: 'User doesnt exist',
        });
      if (thisUser && thisUser.media) {
        thisUserPresentMedia = thisUser.media.map(x => {
          const newwww = getNextPlayedMedia(x.elements, []);
          return {
            mediatype: x.mediatype,
            presentMedia: newwww,
          };
        });
      }
      res.json({ presentMedia: thisUserPresentMedia });
    } catch (error) {
      res.json({
        message: 'There was an error fetching this users information',
      });
    }
  }
}
