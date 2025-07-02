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
  const [search, setSearch] = useState('');

  const token = localStorage.getItem('token');

  // ✅ useCallback wrapped fetchAllData (fixes ESLint warning)
  const fetchAllData = useCallback(async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const userRes = await api.get('/users', config);
      const eventRes = await api.get('/events', config);
      setUsers(userRes.data);
      setEvents(eventRes.data);
      setFilteredEvents(eventRes.data);
    } catch (err) {
      alert('Error loading admin data');
    }
  }, [token]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  useEffect(() => {
    let result = [...events];

    // 🔍 Search
    if (search) {
      result = result.filter(e =>
        e.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 🔁 Filter logic
    if (filter.tag) result = result.filter(e => e.tags.includes(filter.tag));
    if (filter.status) result = result.filter(e => e.eventStatus === filter.status);
    if (filter.startDate) result = result.filter(e => new Date(e.startDate) >= new Date(filter.startDate));

    // 📤 Sort by start date ascending
    result.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    setFilteredEvents(result);
  }, [filter, events, search]);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await api.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(prev => prev.filter(user => user._id !== id));
    } catch {
      alert('Failed to delete user');
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await api.delete(`/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchAllData();
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
      await fetchAllData();
    } catch {
      alert('Update failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">👑 Admin Dashboard</h2>

        {/* 🔍 Search + Filters */}
        <div className="bg-gray-100 p-4 rounded-md mb-6 flex flex-wrap gap-4 items-end">
          <div>
            <label className="block font-semibold">Search Title</label>
            <input
              type="text"
              className="border p-2"
              placeholder="e.g. AI Hackathon"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-semibold">Tag</label>
            <select className="border p-2" value={filter.tag} onChange={(e) => setFilter({ ...filter, tag: e.target.value })}>
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
            <select className="border p-2" value={filter.status} onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
              <option value="">All</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Past">Past</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">Start After</label>
            <input
              type="date"
              className="border p-2"
              value={filter.startDate}
              onChange={(e) => setFilter({ ...filter, startDate: e.target.value })}
            />
          </div>
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded"
            onClick={() => { setFilter({ tag: '', status: '', startDate: '' }); setSearch(''); }}
          >
            Clear
          </button>
        </div>

        {/* 👤 Users */}
        <h3 className="text-xl font-semibold mb-2">👤 Users ({users.length})</h3>
        <ul className="mb-6">
          {users.map(user => (
            <li key={user._id} className="border p-2 mb-2 flex justify-between items-center">
              <span>{user.name} ({user.email})</span>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleDeleteUser(user._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {/* 📅 Events */}
        <h3 className="text-xl font-semibold mb-2">📅 Events ({filteredEvents.length})</h3>
        {filteredEvents.length === 0 ? (
          <p className="text-gray-500">No events found based on filter/search.</p>
        ) : (
          <ul>
            {filteredEvents.map(event => (
              <li key={event._id} className="border p-4 mb-4 rounded shadow-md">
                {editingEventId === event._id ? (
                  <div className="space-y-2">
                    <input className="border p-2 w-full" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} placeholder="Title" />
                    <select className="border p-2 w-full" value={editForm.eventType} onChange={(e) => setEditForm({ ...editForm, eventType: e.target.value })}>
                      <option>Virtual</option>
                      <option>In-Person</option>
                      <option>Hybrid</option>
                    </select>
                    <input className="border p-2 w-full" type="number" placeholder="Max Participants" value={editForm.maxParticipants} onChange={(e) => setEditForm({ ...editForm, maxParticipants: e.target.value })} />
                    <input className="border p-2 w-full" type="date" value={editForm.startDate} onChange={(e) => setEditForm({ ...editForm, startDate: e.target.value })} />
                    <input className="border p-2 w-full" type="date" value={editForm.endDate} onChange={(e) => setEditForm({ ...editForm, endDate: e.target.value })} />
                    <div className="flex gap-2">
                      <button className="bg-green-600 text-white px-4 py-1 rounded" onClick={() => handleUpdateEvent(event._id)}>Save</button>
                      <button className="bg-gray-500 text-white px-4 py-1 rounded" onClick={() => setEditingEventId(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-blue-600">{event.title}</h4>
                      <p className="text-sm text-gray-600">{event.eventType} | {event.eventStatus} | {event.tags.join(', ')}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(event.startDate).toLocaleDateString()} → {new Date(event.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => handleEdit(event)}>Edit</button>
                      <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleDeleteEvent(event._id)}>Delete</button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
