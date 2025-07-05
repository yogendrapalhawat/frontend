// === src/pages/AdminDashboard.js ===
import React, { useEffect, useState, useCallback } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';
import './AdminDashboard.css';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import AdminPanelTester from '../components/AdminPanelTester';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [filter, setFilter] = useState({ tag: '', status: '', startDate: '', search: '' });

  const token = localStorage.getItem('token');

  const fetchAllData = useCallback(async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const [userRes, eventRes] = await Promise.all([
        api.get('/users', config),
        api.get('/events', config),
      ]);
      setUsers(userRes.data);
      setEvents(eventRes.data);
      setFilteredEvents(eventRes.data);
    } catch (err) {
      console.error('Admin data error:', err);
      alert('Error loading admin data');
    }
  }, [token]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  useEffect(() => {
    let result = [...events];
    if (filter.tag) result = result.filter(e => e.tags.includes(filter.tag));
    if (filter.status) result = result.filter(e => e.eventStatus === filter.status);
    if (filter.startDate) result = result.filter(e => new Date(e.startDate) >= new Date(filter.startDate));
    if (filter.search) result = result.filter(e => e.title.toLowerCase().includes(filter.search.toLowerCase()));
    setFilteredEvents(result);
  }, [filter, events]);

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await api.delete(`/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setUsers(prev => prev.filter(u => u._id !== id));
    } catch {
      alert('Failed to delete user');
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await api.delete(`/events/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setEvents(prev => prev.filter(e => e._id !== id));
    } catch {
      alert('Failed to delete event');
    }
  };

  const handleEdit = (event) => {
    setEditingEventId(event._id);
    setEditForm({
      title: event.title,
      eventType: event.eventType,
      maxParticipants: event.maxParticipants,
      startDate: event.startDate.slice(0, 10),
      endDate: event.endDate.slice(0, 10),
    });
  };

  const handleUpdateEvent = async (id) => {
    try {
      await api.put(`/events/${id}`, editForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingEventId(null);
      fetchAllData();
    } catch {
      alert('Update failed');
    }
  };

  const pieData = [
    { name: 'Upcoming', value: events.filter(e => e.eventStatus === 'Upcoming').length },
    { name: 'Ongoing', value: events.filter(e => e.eventStatus === 'Ongoing').length },
    { name: 'Past', value: events.filter(e => e.eventStatus === 'Past').length },
  ];

  const COLORS = ['#34d399', '#60a5fa', '#a78bfa'];

  return (
    <>
      <Navbar />
      <div className="admin-container">
        <h2 className="admin-heading">👑 Admin Dashboard</h2>

        {/* 📊 Stats */}
        <div className="dashboard-grid">
          <div className="card stats-card">
            <h3>Total Users 👥</h3>
            <p>{users.length}</p>
          </div>
          <div className="card stats-card">
            <h3>Total Events 📅</h3>
            <p>{events.length}</p>
          </div>
          <div className="card chart-card">
            <h3>Event Status Stats 📊</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={60}>
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 🔍 Filters */}
        <div className="filter-box">
          <input type="text" placeholder="🔍 Search event..." value={filter.search} onChange={(e) => setFilter({ ...filter, search: e.target.value })} />
          <select value={filter.tag} onChange={(e) => setFilter({ ...filter, tag: e.target.value })}>
            <option value="">All Tags</option>
            <option value="Hackathon">Hackathon</option>
            <option value="AI">AI</option>
            <option value="Workshop">Workshop</option>
            <option value="Sports">Sports</option>
            <option value="Debate">Debate</option>
            <option value="Coding">Coding</option>
          </select>
          <select value={filter.status} onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
            <option value="">All Status</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Past">Past</option>
          </select>
          <input type="date" value={filter.startDate} onChange={(e) => setFilter({ ...filter, startDate: e.target.value })} />
          <button onClick={() => setFilter({ tag: '', status: '', startDate: '', search: '' })}>Clear</button>
        </div>

        {/* 📅 Events */}
        <h3 className="section-title">📋 Manage Events</h3>
        <div className="event-list">
          {filteredEvents.map(event => (
            <div key={event._id} className="event-card">
              {editingEventId === event._id ? (
                <div className="edit-form">
                  <input value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
                  <select value={editForm.eventType} onChange={(e) => setEditForm({ ...editForm, eventType: e.target.value })}>
                    <option>Virtual</option>
                    <option>In-Person</option>
                    <option>Hybrid</option>
                  </select>
                  <input type="number" value={editForm.maxParticipants} onChange={(e) => setEditForm({ ...editForm, maxParticipants: e.target.value })} />
                  <input type="date" value={editForm.startDate} onChange={(e) => setEditForm({ ...editForm, startDate: e.target.value })} />
                  <input type="date" value={editForm.endDate} onChange={(e) => setEditForm({ ...editForm, endDate: e.target.value })} />
                  <button onClick={() => handleUpdateEvent(event._id)}>💾 Save</button>
                  <button onClick={() => setEditingEventId(null)}>❌ Cancel</button>
                </div>
              ) : (
                <>
                  <h4>{event.title}</h4>
                  <p>{event.eventType} | {event.eventStatus} | {event.tags.join(', ')}</p>
                  <p>{new Date(event.startDate).toLocaleDateString()} → {new Date(event.endDate).toLocaleDateString()}</p>
                  <div className="event-actions">
                    <button onClick={() => handleEdit(event)}>✏️ Edit</button>
                    <button onClick={() => handleDeleteEvent(event._id)}>🗑 Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* 👥 Users */}
        <h3 className="section-title">🧑‍💻 Users</h3>
        <ul className="user-list">
          {users.map(user => (
            <li key={user._id}>
              <span>{user.name} ({user.email})</span>
              <button onClick={() => handleDeleteUser(user._id)}>❌ Remove</button>
            </li>
          ))}
        </ul>

        {/* ✅ Tester */}
        <AdminPanelTester />
      </div>
    </>
  );
};

export default AdminDashboard;
