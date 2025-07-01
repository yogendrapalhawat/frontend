// src/components/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); // redirect to home/login page
  };

  return (
    <div style={{
      background: '#f1f1f1',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h2 style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>🎓 One Portal</h2>
      <div>
        <button onClick={() => navigate('/dashboard')} style={{ marginRight: '10px' }}>Dashboard</button>
        <button onClick={() => navigate('/events')} style={{ marginRight: '10px' }}>Events</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
