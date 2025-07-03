// src/components/Layout.js
import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';
import './Layout.css'; // ✅ Use a local CSS file

const Layout = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
