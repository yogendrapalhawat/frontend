// src/pages/MyEvents.js
import React, { useEffect, useState } from 'react';
import api from '../api';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const res = await api.get('/events/my-events'); // Backend route
        setEvents(res.data);
      } catch (err) {
        console.error('Failed to fetch joined events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  return (
    <div className="my-events-page" style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '28px', color: '#6b21a8', marginBottom: '20px' }}>🎉 My Joined Events</h2>

      {loading ? (
        <p>Loading...</p>
      ) : events.length === 0 ? (
        <p style={{ fontSize: '18px', color: '#888' }}>You haven't joined any events yet.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {events.map((event) => (
            <div
              key={event._id}
              style={{
                backgroundColor: '#fff',
                borderRadius: '10px',
                padding: '20px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                transition: 'transform 0.3s',
              }}
              className="event-card"
            >
              <h3 style={{ fontSize: '20px', color: '#333' }}>{event.title}</h3>
              <p><strong>Date:</strong> {new Date(event.startDate).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {event.status}</p>
              <p><strong>Tag:</strong> {event.tag}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
