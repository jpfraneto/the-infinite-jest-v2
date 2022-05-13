import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../lib/mongodb';
import getNextPlayedMedia from '/lib/functions';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    try {
      let { db } = await connectToDatabase();
      const deletionAnswer = await db.collection('users').updateOne(
        {
          username: req.query.username,
          'media.mediatype': req.body.mediatype,
        },
        { $pull: { 'media.$.elements': { _id: req.body._id } } }
      );

      res.json({ message: 'The media was deleted', success: true });
    } catch (error) {
      console.log(error);
      console.log('there was an error');
      res.json({
        message: 'There was an error trying to delete this media',
        success: false,
      });
    }
  }

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
          if (x.elements.length === 0) return null;
          return {
            mediatype: x.mediatype,
            presentMedia: newwww,
          };
        });
      }
      thisUserPresentMedia = thisUserPresentMedia.filter(n => n);
      res.json({ presentMedia: thisUserPresentMedia });
    } catch (error) {
      res.json({
        message: 'There was an error fetching this users information',
      });
    }
  }
}
