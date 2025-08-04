// === src/pages/Events.js ===
import React, { useEffect, useState } from 'react';
import api from '../api';
import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/global.css'; // ✅ Only global CSS

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
      await api.post(`/events/${eventId}/register`);
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
      <h2 className="events-heading">🎯 Explore Campus Events</h2>

      {loading ? (
        <LoadingSpinner />
      ) : events.length === 0 ? (
        <p className="no-events">No events found.</p>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              <div className="card-header">
                <h3>{event.title}</h3>
                <span className={`status ${event.eventStatus?.toLowerCase()}`}>
                  {event.eventStatus}
                </span>
              </div>

              <p className="description">{event.description}</p>

              <div className="tags">
                {event.tags?.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>

              <p className="date">
                📅 {new Date(event.startDate).toLocaleDateString()} → {new Date(event.endDate).toLocaleDateString()}
              </p>

              <p className="location">📍 {event.location || "Virtual"}</p>

              <button
                onClick={() => handleJoin(event._id)}
                disabled={joining === event._id}
                className="join-btn"
              >
                {joining === event._id ? '⏳ Joining...' : '🚀 Join Now'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
