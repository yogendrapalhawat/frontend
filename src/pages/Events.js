// src/pages/Events.js
import React, { useEffect, useState } from 'react';
import api from '../api';
import LoadingSpinner from '../components/LoadingSpinner';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [joining, setJoining] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await api.get('/events');
      setEvents(res.data);
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (eventId) => {
    setJoining(eventId);
    try {
      await api.post(`/events/join/${eventId}`);
      fetchEvents();
    } catch (err) {
      console.error('Join error:', err);
    } finally {
      setJoining(null);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="events-page">
      <h2 className="page-title">Discover Events</h2>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="events-grid">
          {events.map(event => (
            <div key={event._id} className="event-card">
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <p><strong>Tag:</strong> {event.tag}</p>
              <p><strong>Date:</strong> {new Date(event.startDate).toDateString()}</p>
              <button
                onClick={() => handleJoin(event._id)}
                disabled={joining === event._id}
                className="join-btn"
              >
                {joining === event._id ? 'Joining...' : 'Join'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
