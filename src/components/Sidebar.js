// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  PlusCircle,
  UserCheck,
  Shield,
  BookOpen,
  Users,
  FilePlus,
  Search,
  Mail,
  Info
} from 'lucide-react';

import './Sidebar.css';

const Sidebar = () => {
  const isLoggedIn = !!localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const isAdmin = user?.isAdmin;

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

        <Link to="/events/new" className="sidebar-link">
          <PlusCircle size={18} /> <span>Create Event</span>
        </Link>

        <Link to="/my-events" className="sidebar-link">
          <UserCheck size={18} /> <span>My Events</span>
        </Link>

        <Link to="/projects" className="sidebar-link">
          <BookOpen size={18} /> <span>Projects</span>
        </Link>

        <Link to="/projects/new" className="sidebar-link">
          <FilePlus size={18} /> <span>Create Project</span>
        </Link>

        <Link to="/match-requests" className="sidebar-link">
          <Users size={18} /> <span>Match Requests</span>
        </Link>

        <Link to="/colleges" className="sidebar-link">
          <Search size={18} /> <span>Explore Colleges</span>
        </Link>

        <Link to="/contact" className="sidebar-link">
          <Mail size={18} /> <span>Contact</span>
        </Link>

        <Link to="/terms" className="sidebar-link">
          <Info size={18} /> <span>Terms</span>
        </Link>

        {isAdmin && (
          <>
            <Link to="/admin" className="sidebar-link">
              <Shield size={18} /> <span>Admin Dashboard</span>
            </Link>

            <Link to="/moderation" className="sidebar-link">
              <Shield size={18} /> <span>Moderation Panel</span>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
