import React from 'react';
import '../styles/global.css';

const NotFound = () => {
  return (
    <div className="container">
      <div className="card">
        <h2>404 - Page Not Found</h2>
        <p>Sorry, the page you're looking for doesn't exist.</p>
        <button className="btn" onClick={() => window.location.href = '/'}>Go Home</button>
      </div>
    </div>
  );
};

export default NotFound;
