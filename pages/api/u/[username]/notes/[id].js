import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let { db } = await connectToDatabase();
    try {
      let answer = { message: 'There are no notes in here' };
      const response = await db
        .collection('users')
        .findOne({ username: req.query.username });
      const userNotes = response.notes || [];
      console.log('a', userNotes);
      const isPresent = userNotes.filter(x => x._id === req.query.id);
      if (isPresent.length > 0)
        answer = { message: 'Here goes the notes', notes: isPresent[0] };
      console.log('THE ANSWER IS: ', answer);
      res.json(answer);
    } catch (error) {
      console.log('the error is: ', error);
      res.json({ error });
    }
  }
}
