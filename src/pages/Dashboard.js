// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Activity, Calendar, Trophy, Award, Star } from 'lucide-react';
import '../styles/global.css'; // 🔁 Link to custom CSS

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await fetch('https://one-portal-backend.onrender.com/api/users/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error('❌ Error fetching user:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  if (!user) {
    return <div className="dashboard-error">Error loading profile</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-banner">
        <Activity className="dashboard-banner-icon" />
        <h1>Welcome, {user.name}</h1>
        <p>Track your journey and explore events</p>
      </div>

      <div className="dashboard-profile">
        <img src={user.avatar} alt="avatar" className="dashboard-avatar" />
        <div>
          <h2>{user.name} {user.isAdmin && '🛡️'}</h2>
          <p>@{user.username}</p>
          <p>{user.email}</p>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-box">
          <Calendar className="stat-icon" />
          <div>
            <h3>Events Joined</h3>
            <p>5</p>
          </div>
        </div>
        <div className="stat-box">
          <Trophy className="stat-icon" />
          <div>
            <h3>Hackathons Won</h3>
            <p>2</p>
          </div>
        </div>
        <div className="stat-box">
          <Award className="stat-icon" />
          <div>
            <h3>Badges</h3>
            <p>4</p>
          </div>
        </div>
        <div className="stat-box">
          <Star className="stat-icon" />
          <div>
            <h3>Points</h3>
            <p>{user.points}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
