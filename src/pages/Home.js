// === src/pages/Home.js ===
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <h1 className="home-title">One Portal, Every Campus</h1>
      <p className="home-subtitle">
        Find, Join, and Organize Campus Hackathons and Events effortlessly. One unified portal for all student campuses.
      </p>
      <div className="home-buttons">
        <Link to="/register" className="btn primary">Get Started</Link>
        <Link to="/login" className="btn secondary">Login</Link>
      </div>
    </div>
  );
};

export default Home;
