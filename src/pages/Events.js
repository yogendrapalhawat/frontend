// src/pages/Events.js
import React, { useEffect, useState } from 'react';
import api from '../api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState({ tag: '', status: '', startDate: '', search: '' });
  const [joinedEventIds, setJoinedEventIds] = useState(new Set());
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/events', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error('Error loading events:', err);
      }
    };

    const fetchMyEvents = async () => {
      try {
        const res = await api.get('/events/my', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const ids = new Set(res.data.map(e => e._id));
        setJoinedEventIds(ids);
      } catch (err) {
        console.error('Error loading joined events:', err);
      }
    };

    fetchEvents();
    fetchMyEvents();
  }, [token]);

  useEffect(() => {
    let result = [...events];
    if (filter.tag) result = result.filter(e => e.tags.includes(filter.tag));
    if (filter.status) result = result.filter(e => e.eventStatus === filter.status);
    if (filter.startDate) result = result.filter(e => new Date(e.startDate) >= new Date(filter.startDate));
    if (filter.search) result = result.filter(e => e.title.toLowerCase().includes(filter.search.toLowerCase()));
    result = result.filter(e => !joinedEventIds.has(e._id));
    setFiltered(result);
  }, [filter, events, joinedEventIds]);

  const handleJoin = async (eventId) => {
    try {
      await api.post(`/events/${eventId}/register`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('✅ Joined event successfully!');
      setJoinedEventIds(prev => new Set(prev.add(eventId)));
    } catch (err) {
      console.error('Join failed:', err.response?.data || err.message);
      alert('❌ Failed to join event: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <h2 className="text-4xl font-extrabold text-indigo-800 mb-6 text-center">📅 Explore & Join Events</h2>

      {/* 🔍 Filter UI */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-8 flex flex-wrap gap-4 justify-center">
        <select className="border p-2 rounded focus:ring-indigo-500" value={filter.tag} onChange={e => setFilter({ ...filter, tag: e.target.value })}>
          <option value="">All Tags</option>
          <option value="Hackathon">Hackathon</option>
          <option value="AI">AI</option>
          <option value="Sports">Sports</option>
          <option value="Workshop">Workshop</option>
          <option value="Debate">Debate</option>
          <option value="Coding">Coding</option>
        </select>
        <select className="border p-2 rounded focus:ring-indigo-500" value={filter.status} onChange={e => setFilter({ ...filter, status: e.target.value })}>
          <option value="">All Status</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Past">Past</option>
        </select>
        <input type="date" className="border p-2 rounded focus:ring-indigo-500" value={filter.startDate} onChange={e => setFilter({ ...filter, startDate: e.target.value })} />
        <input type="text" className="border p-2 rounded focus:ring-indigo-500" placeholder="Search Title..." value={filter.search} onChange={e => setFilter({ ...filter, search: e.target.value })} />
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          onClick={() => setFilter({ tag: '', status: '', startDate: '', search: '' })}
        >
          Reset
        </button>
      </div>

      {/* 🎯 Event List */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No events found. Try different filters.</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(event => (
            <div key={event._id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-indigo-700">{event.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{event.eventStatus}</p>
              <p className="text-gray-700 mb-2">{event.description}</p>
              <p className="text-sm text-gray-500">
                <strong>Type:</strong> {event.eventType} | <strong>Tags:</strong> {event.tags.join(', ')}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                <strong>Dates:</strong> {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
              </p>
              <button
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition"
                onClick={() => handleJoin(event._id)}
              >
                🚀 Join Event
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
