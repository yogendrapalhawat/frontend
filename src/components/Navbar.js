import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // redirect to login page
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

      {token ? (
        <div>
          <button onClick={() => navigate('/dashboard')} style={{ marginRight: '10px' }}>Dashboard</button>
          <button onClick={() => navigate('/events')} style={{ marginRight: '10px' }}>Events</button>
          <button onClick={() => navigate('/my-events')} style={{ marginRight: '10px' }}>My Events</button>
          <button onClick={() => navigate('/create-event')} style={{ marginRight: '10px' }}>Create Event</button>
          <button onClick={() => navigate('/admin')} style={{ marginRight: '10px' }}>Admin</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={() => navigate('/login')} style={{ marginRight: '10px' }}>Login</button>
          <button onClick={() => navigate('/register')}>Register</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
