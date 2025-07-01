import React, { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/events/my', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEvents(res.data);
      } catch {
        alert('Error fetching your events');
      }
    };
    fetch();
  }, [token]);

  const handleLeave = async (id) => {
    try {
      await api.post(`/events/${id}/leave`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(prev => prev.filter(e => e._id !== id));
    } catch {
      alert('Leave failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">🎟 My Registered Events</h2>
        {events.length === 0 ? (
          <p className="text-center text-gray-500">No events joined yet.</p>
        ) : events.map(event => (
          <div key={event._id} className="bg-white p-4 border mb-4 rounded shadow">
            <h3 className="text-xl font-bold text-blue-600">{event.title}</h3>
            <p>{event.description}</p>
            <p className="text-sm text-gray-600">
              {event.eventType} | {event.tags.join(', ')}
            </p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              onClick={() => handleLeave(event._id)}
            >
              Leave Event
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyEvents;
