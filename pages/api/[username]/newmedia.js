import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../lib/mongodb';
const crypto = require('crypto');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let { db } = await connectToDatabase();
    try {
      const newMediaElement = req.body.newRecommendation;
      console.log('the new media element is: ', newMediaElement);
      const thisUser = await db
        .collection('users')
        .findOne({ username: newMediaElement.author.username });
      if (
        thisUser.mediatypes &&
        thisUser.mediatypes.includes(newMediaElement.mediatype)
      ) {
        const updatedUserMessage = await db.collection('users').updateOne(
          {
            username: newMediaElement.author.username,
            'media.mediatype': newMediaElement.mediatype,
          },
          {
            $push: {
              'media.$.elements': newMediaElement,
            },
          }
        );
        return res.json({
          message: `The media ${newMediaElement.mediatype} of ${newMediaElement.author.username} was updated with the recommendation ${newMediaElement.name}!`,
          id: newMediaElement._id,
          mediatype: newMediaElement.mediatype,
          success: true,
        });
      }
      const mediaToNewMediatype = await db.collection('users').updateOne(
        {
          username: newMediaElement.author.username,
        },
        {
          $push: {
            mediatypes: newMediaElement.mediatype,
            media: {
              elements: [newMediaElement],
              mediatype: newMediaElement.mediatype,
            },
          },
        }
      );
      return res.json({
        message: `The media ${newMediaElement.name} was added to the user ${newMediaElement.username}!`,
        success: true,
        id: newMediaElement._id,
        mediatype: newMediaElement.mediatype,
      });
    } catch (error) {
      console.log('the error is: ', error);
      res.json({
        success: false,
        message:
          'There was a problem adding the recommendation to the database. Please try again later',
      });
    }
  }
}
