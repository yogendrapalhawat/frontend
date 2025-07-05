// === src/App.js ===
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Help from './pages/Help';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import CreateEvent from './pages/CreateEvent';
import MyEvents from './pages/MyEvents';
import AdminDashboard from './pages/AdminDashboard';

import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

import './App.css'; // ✅ Global styles for layout, fonts, shadows, etc.

const Layout = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  const publicRoutes = ['/', '/about', '/help', '/login', '/register'];
  const isPublic = publicRoutes.includes(location.pathname);

  return (
    <div className="app-container">
      {/* ✅ Show Navbar if NOT public route and user is logged in */}
      {!isPublic && token && <Navbar />}

      <div className="main-layout">
        {/* ✅ Sidebar only on logged-in pages */}
        {!isPublic && token && <Sidebar />}

        <main className="main-content">
          {children}
        </main>
      </div>

      {/* ✅ Footer always visible */}
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* 🌐 Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔐 Protected Routes */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
          <Route
            path="/events"
            element={<ProtectedRoute><Events /></ProtectedRoute>}
          />
          <Route
            path="/create-event"
            element={<ProtectedRoute><CreateEvent /></ProtectedRoute>}
          />
          <Route
            path="/my-events"
            element={<ProtectedRoute><MyEvents /></ProtectedRoute>}
          />
          <Route
            path="/admin"
            element={<AdminRoute><AdminDashboard /></AdminRoute>}
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
