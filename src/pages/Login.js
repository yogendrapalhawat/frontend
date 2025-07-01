// src/pages/Login.js
import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post('/users/login', { email, password });

      // ✅ Store token
      localStorage.setItem('token', res.data.token);

      // ✅ Success alert & navigation
      alert('Login Successful');
      console.log('Token:', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>🔐 Login</h2>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: '10px', width: '250px', margin: '10px' }}
      />
      <br />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: '10px', width: '250px', margin: '10px' }}
      />
      <br />
      <button
        onClick={handleLogin}
        style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
