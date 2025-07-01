// src/components/Navbar.js
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
      console.log("JWT Payload ➜", payload); // Optional debug
    } catch (err) {
      console.error("❌ Token decode error:", err);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 shadow-md flex justify-between items-center">
      <h2
        className="text-xl font-bold cursor-pointer hover:text-yellow-300 transition"
        onClick={() => navigate('/')}
      >
        🎓 One Portal
      </h2>

      {token ? (
        <div className="flex gap-4 items-center">
          <button className="hover:text-yellow-300" onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button className="hover:text-yellow-300" onClick={() => navigate('/events')}>Events</button>
          <button className="hover:text-yellow-300" onClick={() => navigate('/my-events')}>My Events</button>
          <button className="hover:text-yellow-300" onClick={() => navigate('/create-event')}>Create Event</button>
          {isAdmin && (
            <button className="hover:text-yellow-300" onClick={() => navigate('/admin')}>Admin</button>
          )}
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
