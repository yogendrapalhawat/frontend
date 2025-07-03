// src/pages/AdminDashboard.js
import React, { useEffect, useState, useCallback } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [filter, setFilter] = useState({ tag: '', status: '', startDate: '' });

  const token = localStorage.getItem('token');

  const fetchAllData = useCallback(async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const [userRes, eventRes] = await Promise.all([
        api.get('/users', config),
        api.get('/events', config)
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
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingEventId(null);
      fetchAllData();
    } catch {
      alert('Update failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="admin-container">
        <h2 className="admin-heading">👑 Admin Dashboard</h2>

        <div className="filter-box">
          <div>
            <label>Tag</label>
            <select value={filter.tag} onChange={(e) => setFilter({ ...filter, tag: e.target.value })}>
              <option value="">All</option>
              <option value="Hackathon">Hackathon</option>
              <option value="AI">AI</option>
              <option value="Sports">Sports</option>
              <option value="Workshop">Workshop</option>
              <option value="Debate">Debate</option>
              <option value="Coding">Coding</option>
            </select>
          </div>
          <div>
            <label>Status</label>
            <select value={filter.status} onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
              <option value="">All</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Past">Past</option>
            </select>
          </div>
          <div>
            <label>Start After</label>
            <input type="date" value={filter.startDate} onChange={(e) => setFilter({ ...filter, startDate: e.target.value })} />
          </div>
          <button className="btn-clear" onClick={() => setFilter({ tag: '', status: '', startDate: '' })}>Clear</button>
        </div>

        <h3 className="section-title">👥 Users ({users.length})</h3>
        <ul className="user-list">
          {users.map(user => (
            <li key={user._id}>
              <span>{user.name} ({user.email})</span>
              <button className="btn-danger" onClick={() => handleDeleteUser(user._id)}>Delete</button>
            </li>
          ))}
        </ul>

        <h3 className="section-title">📅 Events ({filteredEvents.length})</h3>
        <ul className="event-list">
          {filteredEvents.map(event => (
            <li key={event._id}>
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
                  <div className="edit-actions">
                    <button className="btn-success" onClick={() => handleUpdateEvent(event._id)}>Save</button>
                    <button className="btn-secondary" onClick={() => setEditingEventId(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="event-card">
                  <div>
                    <h4>{event.title}</h4>
                    <p>{event.eventType} | {event.eventStatus} | {event.tags.join(', ')}</p>
                    <p>{new Date(event.startDate).toLocaleDateString()} → {new Date(event.endDate).toLocaleDateString()}</p>
                  </div>
                  <div className="event-actions">
                    <button className="btn-edit" onClick={() => handleEdit(event)}>Edit</button>
                    <button className="btn-danger" onClick={() => handleDeleteEvent(event._id)}>Delete</button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AdminDashboard;
