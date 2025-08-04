// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://my-app-f2oh.onrender.com/api',
  withCredentials: true, // ✅ Required for CORS with credentials (cookies/JWT)
  headers: {
    'Content-Type': 'application/json'
  }
});

// ✅ Automatically attach token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
