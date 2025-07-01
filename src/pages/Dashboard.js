// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Backend returns { user: { name, email, ... } }
        setUser(res.data.user || res.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err.response?.data || err.message);
        setError(err.response?.data?.message || 'Unauthorized or Error fetching user');
      }
    };

    if (token) fetchUser();
    else setError('Token not found. Please login again.');
  }, [token]);

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">📊 Dashboard</h2>

        {error && <p className="text-red-600 font-semibold">{error}</p>}

        {user && (
          <div className="bg-white shadow-md rounded p-4 border border-gray-200">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        )}

        {!user && !error && (
          <p className="text-gray-500">Loading...</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
