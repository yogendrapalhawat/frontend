// === src/pages/Home.js ===
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-hero">
      <div className="home-overlay">
        <div className="home-container">
          <h1 className="home-title">🚀 One Portal, Every Campus</h1>
          <p className="home-subtitle">
            Discover, Host, and Join college hackathons, tech fests, and learning events — all in one smart platform.
          </p>
          <div className="home-buttons">
            <Link to="/register" className="btn primary">🎓 Join Now</Link>
            <Link to="/login" className="btn secondary">🔐 Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
