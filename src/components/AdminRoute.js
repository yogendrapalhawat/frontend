// src/components/AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (e) {
    console.error('Failed to parse user from localStorage:', e);
  }

  const isAdmin = token && user && user.isAdmin;

  return isAdmin ? children : <Navigate to="/" replace />;
};

export default AdminRoute;
