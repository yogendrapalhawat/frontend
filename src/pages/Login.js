// src/pages/Login.js
import React, { useState } from 'react';
import './Login.css';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://one-portal-backend.onrender.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // ✅ Required for cookies/session tokens
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        alert('✅ Login Successful!');
        window.location.href = '/dashboard'; // ✅ redirect after login
      } else {
        alert(`❌ ${data.message || 'Login Failed'}`);
      }
    } catch (error) {
      alert('❌ Login error. Check console.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-icon">
          <Lock size={32} />
        </div>
        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to your account</p>

        <div className="input-box">
          <Mail className="input-icon" size={18} />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="input-box">
          <Lock className="input-icon" size={18} />
          <input
            type={show ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div className="eye-icon" onClick={() => setShow(!show)}>
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>

        <div className="row-options">
          <label><input type="checkbox" /> Remember me</label>
          <a href="#">Forgot password?</a>
        </div>

        <button className="login-btn" onClick={handleLogin}>
          Sign In
        </button>

        <div className="divider">Or continue with</div>

        <div className="social-row">
          <button className="social-btn google">
            <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" alt="g" />
            Google
          </button>
          <button className="social-btn facebook">
            <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="f" />
            Facebook
          </button>
        </div>

        <p className="bottom-text">
          Don't have an account? <a href="/register">Sign up now</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
