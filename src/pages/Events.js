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
        const res = await api.get('/users/my-events', {
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
      await api.post(`/events/${eventId}/join`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Joined event successfully!');
      setJoinedEventIds(prev => new Set(prev.add(eventId)));
    } catch (err) {
      console.error('Join failed:', err.response?.data || err.message);
      alert('Failed to join event: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📅 Available Events</h2>

      {/* 🔍 Filter UI */}
      <div className="bg-gray-100 p-4 rounded-md mb-6 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block font-semibold">Tag</label>
          <select className="border p-2" value={filter.tag} onChange={e => setFilter({ ...filter, tag: e.target.value })}>
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
          <select className="border p-2" value={filter.status} onChange={e => setFilter({ ...filter, status: e.target.value })}>
            <option value="">All</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Past">Past</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold">Start After</label>
          <input type="date" className="border p-2" value={filter.startDate} onChange={e => setFilter({ ...filter, startDate: e.target.value })} />
        </div>
        <div>
          <label className="block font-semibold">Search Title</label>
          <input type="text" className="border p-2" placeholder="Search..." value={filter.search} onChange={e => setFilter({ ...filter, search: e.target.value })} />
        </div>
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded"
          onClick={() => setFilter({ tag: '', status: '', startDate: '', search: '' })}
        >
          Clear
        </button>
      </div>

      {/* 🎯 Event List */}
      {filtered.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul>
          {filtered.map(event => (
            <li key={event._id} className="border p-4 mb-4 rounded shadow bg-white">
              <h3 className="font-bold text-lg text-blue-700">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.eventStatus}</p>
              <p className="text-sm text-gray-700 mb-2">{event.description}</p>
              <p className="text-sm text-gray-500">
                <strong>Type:</strong> {event.eventType} | <strong>Tags:</strong> {event.tags.join(', ')}
              </p>
              <p className="text-sm text-gray-400">
                <strong>Dates:</strong> {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
              </p>
              <button
                className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                onClick={() => handleJoin(event._id)}
              >
                Join
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Events;
