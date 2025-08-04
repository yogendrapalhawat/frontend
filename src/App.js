// src/App.js
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
import EventDetails from './pages/EventDetails';
import CreateEvent from './pages/CreateEvent';
import MyEvents from './pages/MyEvents';
import AdminDashboard from './pages/AdminDashboard';
import ProfilePage from './pages/ProfilePage';
import MatchRequests from './pages/MatchRequests';
import CreateMatchRequest from './pages/CreateMatchRequest';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import CreateProject from './pages/CreateProject';
import ClubProfile from './pages/ClubProfile';
import ModerationPanel from './pages/ModerationPanel';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import ExploreColleges from './pages/ExploreColleges';

import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

import './App.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  const publicRoutes = ['/', '/about', '/help', '/login', '/register', '/contact', '/terms', '/colleges'];
  const isPublic = publicRoutes.includes(location.pathname);

  return (
    <div className="app-container">
      {!isPublic && token && <Navbar />}
      <div className="main-layout">
        {!isPublic && token && <Sidebar />}
        <main className="main-content">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/colleges" element={<ExploreColleges />} />

          {/* Protected */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile/:id" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
          <Route path="/events/:id" element={<ProtectedRoute><EventDetails /></ProtectedRoute>} />
          <Route path="/events/new" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
          <Route path="/match-requests" element={<ProtectedRoute><MatchRequests /></ProtectedRoute>} />
          <Route path="/match-requests/new" element={<ProtectedRoute><CreateMatchRequest /></ProtectedRoute>} />
          <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
          <Route path="/projects/new" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
          <Route path="/projects/:id" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
          <Route path="/clubs/:id" element={<ProtectedRoute><ClubProfile /></ProtectedRoute>} />

          {/* Admin Only */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/moderation" element={<AdminRoute><ModerationPanel /></AdminRoute>} />

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
