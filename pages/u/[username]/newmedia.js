import React, { useState } from 'react';
import { useRouter } from 'next/router';

const NewMedia = () => {
  const router = useRouter();
  const [mediaName, setMediaName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const handleNewMediaSubmit = async () => {
    if (!url) return alert('please add the url for the first video!');
    if (!description) return alert('please add a description!');
    setLoading(true);
    const reqParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mediaName,
        url,
        username: router.query.username,
        description,
      }),
    };
    const response = await fetch(
      `/api/${router.query.username}/newmedia`,
      reqParams
    );
    console.log('in here!');
    router.push(`/u/${router.query.username}`);
  };
  if (loading) return <h2>Loading!!</h2>;
  return (
    <div>
      <h3>Add new media type to your profile</h3>
      <label>Media Name</label>
      <input
        type='text'
        onChange={e => setMediaName(e.target.value)}
        name='newmedia'
      />
      <br />
      <label>First Url</label>
      <input type='text' onChange={e => setUrl(e.target.value)} name='url' />
      <br />
      <label>Description</label>
      <textarea
        onChange={e => setDescription(e.target.value)}
        name='description'
      />
      <button onClick={handleNewMediaSubmit}>Handle submit</button>
    </div>
  );
};

export default NewMedia;
