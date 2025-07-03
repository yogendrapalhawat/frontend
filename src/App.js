// ✅ FINAL MODERN UI SETUP WITH PLAIN CSS (NO TAILWIND)
// Includes: Navbar, Sidebar, Home, About, Help, Footer, Full Routing

// === src/App.js ===
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

import './styles/styles.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-layout">
          <Sidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/help" element={<Help />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
              <Route path="/create-event" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
              <Route path="/my-events" element={<ProtectedRoute><MyEvents /></ProtectedRoute>} />
              <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
