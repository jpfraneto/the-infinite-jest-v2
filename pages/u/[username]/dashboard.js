import { useRouter } from 'next/router';
import React from 'react';

const Dashboard = () => {
  const router = useRouter();
  return (
    <div>
      This is the dashboard for the user {router.query.username}. Here I will
      show his topics and everything invovled.
    </div>
  );
};

export default Dashboard;
