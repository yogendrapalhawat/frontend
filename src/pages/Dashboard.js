import React, { useEffect, useState } from 'react';
import api from '../api';

function Dashboard() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMessage(res.data.message);
      } catch (err) {
        setMessage('Unauthorized or Error fetching data');
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>{message}</p>
    </div>
  );
}

export default Dashboard;
