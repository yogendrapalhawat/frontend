// src/pages/Dashboard.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import './dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="dashboard-widgets">
          <div className="card gradient-card">
            <h3>🎯 Total Events</h3>
            <p>12 Active</p>
          </div>
          <div className="card gradient-card-blue">
            <h3>👥 Total Students</h3>
            <p>256+</p>
          </div>
          <div className="card gradient-card-green">
            <h3>📚 My Events</h3>
            <p>4 Joined</p>
          </div>
          <div className="card gradient-card-orange">
            <h3>🛠️ Skills Trending</h3>
            <p>ReactJS, ML, Web3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
