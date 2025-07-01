// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://one-portal-backend.onrender.com/api',  // ✅ Your correct backend URL
});


export const getAllEvents = async () => {
  const token = localStorage.getItem('token');
  const res = await api.get('/events', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export default api;
