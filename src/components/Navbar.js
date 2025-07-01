// src/components/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // ✅ External CSS file (create this)

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  let isAdmin = false;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      isAdmin = payload?.isAdmin;
      console.log("JWT Payload ➜", payload); // For debug
    } catch (err) {
      console.error("❌ Token decode error:", err);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h2 className="brand" onClick={() => navigate('/')}>🎓 One Portal</h2>
      <div className="nav-links">
        {token ? (
          <>
            <button onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button onClick={() => navigate('/events')}>Events</button>
            <button onClick={() => navigate('/my-events')}>My Events</button>
            <button onClick={() => navigate('/create-event')}>Create Event</button>
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
