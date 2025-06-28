import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); // redirect to login
  };

  return (
    <div style={{
      background: '#f1f1f1',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h2>🎓 One Portal</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
