import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 flex justify-between shadow-md">
      <div className="text-lg font-bold cursor-pointer" onClick={() => navigate('/')}>
        🎓 One Portal Every Campus
      </div>
      <div className="space-x-3">
        {token ? (
          <>
            <button onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button onClick={() => navigate('/events')}>Events</button>
            <button onClick={() => navigate('/my-events')}>My Events</button>
            <button onClick={() => navigate('/create-event')}>Create</button>
            {isAdmin && <button onClick={() => navigate('/admin')}>Admin</button>}
            <button onClick={handleLogout} className="bg-white text-black px-3 py-1 rounded">Logout</button>
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
