// src/pages/MyEvents.js
import React, { useEffect, useState } from 'react';
import api from '../api';
import LoadingSpinner from '../components/LoadingSpinner';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyEvents = async () => {
    try {
      const res = await api.get('/events/myevents');
      setEvents(res.data);
    } catch (err) {
      console.error('Fetch my events error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLeave = async (eventId) => {
    try {
      await api.post(`/events/leave/${eventId}`);
      fetchMyEvents();
    } catch (err) {
      console.error('Leave error:', err);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  return (
    <div className="my-events-page">
      <h2 className="page-title">My Joined Events</h2>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="events-grid">
          {events.map(event => (
            <div key={event._id} className="event-card">
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <button
                onClick={() => handleLeave(event._id)}
                className="leave-btn"
              >
                Leave
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
