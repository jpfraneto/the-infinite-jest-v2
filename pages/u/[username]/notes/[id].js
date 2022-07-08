import React, { useState } from 'react';
import { useRouter } from 'next/router';

const NotesPageDisplay = () => {
  const router = useRouter();
  return (
    <div>Here goes the individual notes for the note {router.query.id}</div>
  );
};

export default NotesPageDisplay;
