// src/pages/Register.js
import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // 👈 Don't forget to create this CSS file

function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post('/users/register', {
        name,
        username,
        email,
        password,
      });
      alert('🎉 Registration successful!');
      navigate('/login');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>🔐 Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="register-input"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
        />

        <button onClick={handleRegister} className="register-button">
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
