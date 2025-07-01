// src/components/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // 💅 Stylish CSS

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  let isAdmin = false;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      isAdmin = payload?.isAdmin;
    } catch (err) {
      console.error("Token decode error:", err);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={() => navigate('/')}>
        🎓 <span className="logo-text">One Portal Every Campus</span>
      </div>
      <div className="navbar-right">
        {token ? (
          <>
            <button onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button onClick={() => navigate('/events')}>Events</button>
            <button onClick={() => navigate('/my-events')}>My Events</button>
            <button onClick={() => navigate('/create-event')}>Create</button>
            {isAdmin && <button onClick={() => navigate('/admin')}>Admin</button>}
            <button className="logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/register')}>Register</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
