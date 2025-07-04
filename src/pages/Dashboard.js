// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import api from '../api';
import LoadingSpinner from '../components/LoadingSpinner';
import DashboardBanner from '../components/DashboardBanner';

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
    <div className="dashboard-page" style={{ padding: '20px', background: '#f3f0ff', minHeight: '100vh' }}>
      <DashboardBanner />

      {loading ? (
        <LoadingSpinner />
      ) : user ? (
        <>
          {/* 👤 Profile Card */}
          <div style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
            marginBottom: '20px',
            maxWidth: '600px'
          }}>
            <h2 style={{ color: '#6b21a8' }}>Welcome, {user.name} 👋</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.isAdmin ? 'Admin' : 'Student'}</p>
          </div>

          {/* 📊 Quick Stats */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
            {[
              { label: 'Events Joined', value: 5 },
              { label: 'Hackathons Won', value: 2 },
              { label: 'Badges Earned', value: 4 },
            ].map((stat, idx) => (
              <div key={idx} style={{
                flex: '1 1 150px',
                background: '#ede9fe',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              }}>
                <h3 style={{ fontSize: '20px', color: '#7e22ce' }}>{stat.value}</h3>
                <p style={{ color: '#4b5563' }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* 📅 Upcoming Events */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '10px', color: '#6b21a8' }}>📅 Upcoming Events</h3>
            <div style={{ display: 'flex', overflowX: 'auto', gap: '20px' }}>
              {[1, 2, 3].map((i) => (
                <div key={i} style={{
                  minWidth: '250px',
                  background: '#fff',
                  borderRadius: '10px',
                  padding: '15px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                }}>
                  <h4 style={{ color: '#4c1d95' }}>Hackathon {i}</h4>
                  <p style={{ fontSize: '14px' }}>Campus-wide coding challenge.</p>
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>Start Date: 2025-07-10</p>
                </div>
              ))}
            </div>
          </div>

          {/* 🏆 Achievements */}
          <div style={{
            background: '#fff',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
            marginBottom: '30px'
          }}>
            <h3 style={{ color: '#6b21a8' }}>🏆 Your Achievements</h3>
            <ul style={{ marginTop: '10px' }}>
              <li>🏅 Won HackRush 2024</li>
              <li>🎖️ Organizer of CodeFest</li>
              <li>💻 Participated in 8+ events</li>
            </ul>
          </div>

          {/* 📣 Announcements */}
          <div style={{
            background: '#fef9ff',
            borderLeft: '4px solid #d946ef',
            padding: '15px',
            borderRadius: '8px'
          }}>
            <h4 style={{ color: '#a21caf', marginBottom: '5px' }}>📣 Announcements</h4>
            <p style={{ fontSize: '14px' }}>New campus hackathon is coming next week. Register soon!</p>
          </div>
        </>
      ) : (
        <p style={{ color: 'red' }}>❌ Error loading profile.</p>
      )}
    </div>
  );
};

export default Dashboard;
