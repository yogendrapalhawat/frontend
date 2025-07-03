// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // ✅ Import custom CSS

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-heading">📌 Navigation</h2>
      <nav className="sidebar-nav">
        <Link to="/dashboard" className="sidebar-link">📊 Dashboard</Link>
        <Link to="/events" className="sidebar-link">📅 Events</Link>
        <Link to="/create-event" className="sidebar-link">➕ Create Event</Link>
        <Link to="/my-events" className="sidebar-link">✅ My Events</Link>
        <Link to="/admin" className="sidebar-link">🛡️ Admin Panel</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
