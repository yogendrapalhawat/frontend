// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import api from '../api';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  return (
    <div className="p-6 md:ml-64 bg-gradient-to-br from-blue-50 to-white min-h-screen transition-all">
      <h2 className="text-3xl font-bold mb-6 text-blue-800">👤 User Dashboard</h2>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : user ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 🎯 Card 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition duration-300">
            <h3 className="text-lg font-semibold text-gray-700">👤 Name</h3>
            <p className="text-blue-800 mt-2 text-xl">{user.name}</p>
          </div>

          {/* 🎯 Card 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition duration-300">
            <h3 className="text-lg font-semibold text-gray-700">📛 Username</h3>
            <p className="text-blue-800 mt-2 text-xl">{user.username || '—'}</p>
          </div>

          {/* 🎯 Card 3 */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition duration-300">
            <h3 className="text-lg font-semibold text-gray-700">📧 Email</h3>
            <p className="text-blue-800 mt-2 text-xl">{user.email}</p>
          </div>

          {/* 🎯 Card 4 */}
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition duration-300">
            <h3 className="text-lg font-semibold text-gray-700">🔐 Role</h3>
            <p className={`mt-2 text-xl font-semibold ${user.isAdmin ? 'text-green-600' : 'text-gray-700'}`}>
              {user.isAdmin ? 'Admin' : 'User'}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-red-600 mt-10 text-center">
          ⚠️ Error loading user profile.
        </div>
      )}
    </div>
  );
};

export default Dashboard;
