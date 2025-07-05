// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import api from '../api';
import LoadingSpinner from '../components/LoadingSpinner';
import DashboardBanner from '../components/DashboardBanner';
import './Dashboard.css';

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

  // ✅ Console log user whenever it's updated
  useEffect(() => {
    console.log('Fetched user:', user);
  }, [user]);

  return (
    <div className="dashboard-wrapper">
      <DashboardBanner />
      {loading ? (
        <LoadingSpinner />
      ) : user ? (
        <div className="dashboard-content">
          {/* 👤 Profile Info */}
          <div className="dashboard-card profile-card">
            <h2>👋 Welcome, {user.name}</h2>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.isAdmin ? 'Admin 🛡️' : 'Student 🎓'}</p>
          </div>

          {/* 📊 Quick Stats */}
          <div className="stat-grid">
            {[
              { label: 'Events Joined', value: 5, icon: '📅' },
              { label: 'Hackathons Won', value: 2, icon: '🏆' },
              { label: 'Badges Earned', value: 4, icon: '🎖️' },
            ].map((stat, idx) => (
              <div key={idx} className="dashboard-card stat-card">
                <h3>{stat.icon} {stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* 📅 Upcoming Events */}
          <div className="dashboard-section">
            <h3>📅 Upcoming Events</h3>
            <div className="scroll-cards">
              {[1, 2, 3].map((i) => (
                <div key={i} className="dashboard-card event-card">
                  <h4>Hackathon {i}</h4>
                  <p>🔥 Campus-wide coding battle</p>
                  <span className="event-date">Starts: 2025-07-10</span>
                </div>
              ))}
            </div>
          </div>

          {/* 🏆 Achievements */}
          <div className="dashboard-card">
            <h3>🏅 Achievements</h3>
            <ul className="achievement-list">
              <li>🥇 Won HackRush 2024</li>
              <li>👨‍💻 Organized CodeFest</li>
              <li>🚀 Participated in 8+ tech events</li>
            </ul>
          </div>

          {/* 📣 Announcements */}
          <div className="announcement-box">
            <h4>📢 Announcement</h4>
            <p>New Inter-College AI Hackathon launching next week. Don’t miss it!</p>
          </div>
        </div>
      ) : (
        <p className="error-msg">❌ Failed to load user profile.</p>
      )}
    </div>
  );
};

export default Dashboard;
