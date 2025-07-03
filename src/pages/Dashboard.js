// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import api from '../api';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/users/profile');
      setUser(res.data);
    } catch (err) {
      console.error('Error fetching user:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="dashboard-page">
      {loading ? (
        <LoadingSpinner />
      ) : user ? (
        <div className="dashboard-card">
          <h2>Welcome, {user.name} 👋</h2>
          <div className="dashboard-info">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.isAdmin ? 'Admin' : 'Student'}</p>
          </div>
        </div>
      ) : (
        <p className="error-text">Error loading profile.</p>
      )}
    </div>
  );
};

export default Dashboard;
