import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../../../lib/mongodb';
const crypto = require('crypto');

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    let { db } = await connectToDatabase();
    try {
      const updatedMsg = await db
        .collection('users')
        .updateOne(
          { username: req.body.username },
          { $set: { 'notes.$[elem].notes': req.body.updatedText } },
          { arrayFilters: [{ 'elem._id': req.body.noteId }] }
        );
      res.json({ message: 'The notes were updated successfully' });
    } catch (error) {
      res
        .status(401)
        .json({ message: 'There was an error updating the field' });
    }
  }

  //I WANT TO UPDATE THIS NOTE!
  if (req.method === 'POST') {
    let { db } = await connectToDatabase();
    try {
      const user = await db
        .collection('users')
        .findOne({ username: req.body.username });

      if (!user.notes) user.notes = [];

      if (req.body.notes._id) {
        const thisIndex = user.notes.findIndex(
          x => x._id === req.body.notes._id
        );
        if (thisIndex > -1) user.notes[thisIndex] = req.body.notes;
      } else {
        user.notes.push({
          _id: req.body.recommendation._id,
          name: req.body.recommendation.name,
          url: req.body.recommendation.url,
          notes: req.body.notes.notes,
        });
      }
      const response = await db
        .collection('users')
        .replaceOne({ username: req.body.username }, user);
      res.json({ message: 'The user was updated with this notes' });
    } catch (error) {
      console.log('the error is: ', error);
      res.json({ error });
    }
  }
}
