// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="custom-navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">🎓 One Portal</Link>
      </div>
      <div className="navbar-right">
        <Link to="/about" className="navbar-link">About</Link>
        <Link to="/help" className="navbar-link">Help</Link>
        {token && (
          <button onClick={handleLogout} className="navbar-link logout-btn">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
