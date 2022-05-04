import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../lib/mongodb';
const crypto = require('crypto');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let { db } = await connectToDatabase();
    try {
      const newMediaElement = {
        id: crypto.randomBytes(16).toString('hex'),
        url: req.body.url,
        mediatype: req.body.mediatype,
        description: req.body.description,
        dateAdded: new Date().getTime(),
        duration: Number(req.body.duration),
        status: 'future',
      };
      const thisUser = await db
        .collection('users')
        .findOne({ username: req.body.username });
      if (
        thisUser.mediatypes &&
        thisUser.mediatypes.includes(req.body.mediatype)
      ) {
        const updatedUserMessage = await db.collection('users').updateOne(
          {
            username: req.body.username,
            'media.mediatype': req.body.mediatype,
          },
          {
            $push: {
              'media.$.elements': newMediaElement,
            },
          }
        );
        return res.json({
          message: `The media ${req.body.mediaName} was UPDATED ${req.body.username}!`,
          success: true,
        });
      }

      newMediaElement.status = 'present';
      newMediaElement.startingMediaTimestamp = newMediaElement.dateAdded;
      newMediaElement.endingMediaTimestamp =
        newMediaElement.dateAdded + req.body.duration;
      const updatedMessage = await db.collection('users').updateOne(
        {
          username: req.body.username,
        },
        {
          $push: {
            mediatypes: req.body.mediatype,
            media: {
              elements: [newMediaElement],
              mediatype: req.body.mediatype,
            },
          },
        }
      );
      return res.json({
        message: `The media ${req.body.mediaName} was added to the user ${req.body.username}!`,
        success: true,
      });
    } catch (error) {
      console.log('the error is: ', error);
    }
  }
}
