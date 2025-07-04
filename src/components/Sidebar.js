// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Calendar, PlusCircle, UserCheck, Shield } from 'lucide-react';
import './Sidebar.css'; // Link to sidebar styling

const Sidebar = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  if (!isLoggedIn) return null;

  return (
    <div className="sidebar">
      <h2 className="sidebar-heading">📌 Navigation</h2>
      <div className="sidebar-nav">
        <Link to="/dashboard" className="sidebar-link">
          <LayoutDashboard size={18} /> <span>Dashboard</span>
        </Link>
        <Link to="/events" className="sidebar-link">
          <Calendar size={18} /> <span>Events</span>
        </Link>
        <Link to="/create-event" className="sidebar-link">
          <PlusCircle size={18} /> <span>Create Event</span>
        </Link>
        <Link to="/my-events" className="sidebar-link">
          <UserCheck size={18} /> <span>My Events</span>
        </Link>
        <Link to="/admin" className="sidebar-link">
          <Shield size={18} /> <span>Admin Panel</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
