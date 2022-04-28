import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let { db } = await connectToDatabase();
    const thisUser = await db
      .collection('users')
      .findOne({ username: req.query.username });
    let presentMedia = [];
    if (thisUser.media) {
      presentMedia = thisUser.media.map(x => {
        const length = x.elements.length;
        const randomIndex = Math.floor(length * Math.random());
        return {
          mediatype: x.mediatype,
          presentElement: x.elements[randomIndex],
        };
      });
    }
    delete thisUser.media;
    thisUser.presentMedia = presentMedia;
    res.json({ user: thisUser });
  }
}
