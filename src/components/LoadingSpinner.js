// src/components/LoadingSpinner.js
import React from 'react';
import './LoadingSpinner.css'; // ✅ Include spinner styles

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
