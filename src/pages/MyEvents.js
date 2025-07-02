// src/pages/MyEvents.js
import React, { useEffect, useState } from 'react';
import api from '../api';

const MyEvents = () => {
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchJoinedEvents = async () => {
      try {
        const res = await api.get('/events/joined', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const uniqueEvents = Array.from(
          new Map(res.data.map((e) => [e._id, e])).values()
        );
        setJoinedEvents(uniqueEvents);
      } catch (err) {
        console.error('Error loading joined events', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJoinedEvents();
  }, [token]);

  const handleLeave = async (eventId) => {
    if (!window.confirm('Are you sure you want to leave this event?')) return;
    try {
      await api.post(`/events/${eventId}/leave`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJoinedEvents(prev => prev.filter(e => e._id !== eventId));
    } catch (err) {
      alert('Failed to leave event');
    }
  };

  if (loading) return <div className="p-6">Loading your events...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📝 My Registered Events</h2>
      {joinedEvents.length === 0 ? (
        <p>You haven’t joined any events yet.</p>
      ) : (
        <ul>
          {joinedEvents.map(event => (
            <li key={event._id} className="border p-4 mb-4 rounded shadow">
              <h3 className="font-bold text-lg text-blue-700">{event.title}</h3>
              <p className="text-sm text-gray-700">{event.description}</p>
              <p className="text-sm text-gray-500">
                {event.eventType} | {event.eventStatus} | {event.tags?.join(', ')}
              </p>
              <p className="text-sm text-gray-400">
                {new Date(event.startDate).toLocaleDateString()} → {new Date(event.endDate).toLocaleDateString()}
              </p>
              <button
                className="bg-red-500 text-white px-3 py-1 mt-2 rounded hover:bg-red-600"
                onClick={() => handleLeave(event._id)}
              >
                Leave Event
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyEvents;
