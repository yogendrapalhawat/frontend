// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // ✅ Import custom CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          🎓 One Portal, Every Campus
        </Link>
        <div className="navbar-links">
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/help" className="nav-link">Help</Link>
          <Link to="/login" className="nav-button">Login</Link>
          <Link to="/register" className="nav-button">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
