// src/pages/Login.js
import React, { useState } from 'react';
import api from '../api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await api.post('/users/login', { email, password });
    console.log(res.data);
    alert('Login Successful');
    localStorage.setItem('token', res.data.token);
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" onChange={(e) => setPassword(e.target.value)} type="password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
