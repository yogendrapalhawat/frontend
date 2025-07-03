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
      <div className="p-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-indigo-600 drop-shadow-lg">👑 Admin Dashboard</h2>

        {/* 🔍 Filter Section */}
        <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-4 rounded-md mb-6 flex flex-wrap gap-4 items-end shadow-md">
          <div>
            <label className="block font-semibold">Tag</label>
            <select className="border p-2 rounded" value={filter.tag} onChange={(e) => setFilter({ ...filter, tag: e.target.value })}>
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
            <label className="block font-semibold">Status</label>
            <select className="border p-2 rounded" value={filter.status} onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
              <option value="">All</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Past">Past</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">Start After</label>
            <input type="date" className="border p-2 rounded" value={filter.startDate} onChange={(e) => setFilter({ ...filter, startDate: e.target.value })} />
          </div>
          <button
            className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white px-4 py-2 rounded shadow"
            onClick={() => setFilter({ tag: '', status: '', startDate: '' })}
          >
            Clear Filters
          </button>
        </div>

        {/* 👤 Users Section */}
        <h3 className="text-2xl font-semibold mb-2 text-purple-700">👥 Users ({users.length})</h3>
        <ul className="mb-8 space-y-3">
          {users.map(user => (
            <li key={user._id} className="border border-gray-300 p-3 rounded-md shadow flex justify-between items-center hover:shadow-lg transition">
              <span className="text-gray-800 font-medium">{user.name} ({user.email})</span>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                onClick={() => handleDeleteUser(user._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {/* 📅 Events Section */}
        <h3 className="text-2xl font-semibold mb-2 text-blue-700">📅 Events ({filteredEvents.length})</h3>
        <ul className="space-y-4">
          {filteredEvents.map(event => (
            <li key={event._id} className="border p-4 rounded-lg shadow hover:shadow-lg transition-all bg-white">
              {editingEventId === event._id ? (
                <div className="space-y-3">
                  <input className="border p-2 w-full rounded" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
                  <select className="border p-2 w-full rounded" value={editForm.eventType} onChange={(e) => setEditForm({ ...editForm, eventType: e.target.value })}>
                    <option>Virtual</option>
                    <option>In-Person</option>
                    <option>Hybrid</option>
                  </select>
                  <input type="number" className="border p-2 w-full rounded" value={editForm.maxParticipants} onChange={(e) => setEditForm({ ...editForm, maxParticipants: e.target.value })} />
                  <input type="date" className="border p-2 w-full rounded" value={editForm.startDate} onChange={(e) => setEditForm({ ...editForm, startDate: e.target.value })} />
                  <input type="date" className="border p-2 w-full rounded" value={editForm.endDate} onChange={(e) => setEditForm({ ...editForm, endDate: e.target.value })} />
                  <div className="flex gap-3">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded" onClick={() => handleUpdateEvent(event._id)}>Save</button>
                    <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded" onClick={() => setEditingEventId(null)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-bold text-indigo-700">{event.title}</h4>
                    <p className="text-sm text-gray-700">{event.eventType} | {event.eventStatus} | {event.tags.join(', ')}</p>
                    <p className="text-sm text-gray-500">{new Date(event.startDate).toLocaleDateString()} → {new Date(event.endDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => handleEdit(event)}>Edit</button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleDeleteEvent(event._id)}>Delete</button>
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
