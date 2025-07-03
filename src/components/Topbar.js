// src/components/Topbar.js
import React from 'react';
import './topbar.css';

const Topbar = () => {
  const name = 'Yogendra';

  return (
    <div className="topbar">
      <div className="welcome-msg">👋 Welcome back, {name}</div>
      <div className="profile-circle">YP</div>
    </div>
  );
};

export default Topbar;
