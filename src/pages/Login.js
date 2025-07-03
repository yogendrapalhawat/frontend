// src/pages/Login.js
import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Make sure to create this CSS file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post('/users/login', { email, password });

      localStorage.setItem('token', res.data.token);

      alert('Login Successful');
      console.log('Token:', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>🔐 Login to Your Account</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
