// src/components/Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="logo">🎓 One Portal</div>
      <button onClick={() => navigate('/dashboard')}>🏠 Dashboard</button>
      <button onClick={() => navigate('/events')}>📅 Events</button>
      <button onClick={() => navigate('/my-events')}>⭐ My Events</button>
      <button onClick={() => navigate('/create-event')}>➕ Create Event</button>
      <button onClick={() => navigate('/admin')}>🛡️ Admin Panel</button>
    </div>
  );
};

export default Sidebar;
