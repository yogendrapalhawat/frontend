import React, { useEffect, useState } from 'react';
import { Calendar, Clock, Users, LogOut, Sparkles, Heart } from 'lucide-react';
import './MyEvents.css';

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leavingEvent, setLeavingEvent] = useState(null);

  const fetchEvents = async () => {
    await new Promise((r) => setTimeout(r, 1000));
    setEvents([
      {
        _id: '1',
        title: 'Tech Conference 2025',
        description: 'Join us for the biggest tech conference of the year with amazing speakers and networking opportunities',
        startDate: '2025-08-15T09:00:00Z',
        eventStatus: 'upcoming',
        attendees: 250
      },
      {
        _id: '2',
        title: 'Music Festival Summer',
        description: 'Three days of non-stop music with top artists from around the world',
        startDate: '2025-07-20T18:00:00Z',
        eventStatus: 'confirmed',
        attendees: 5000
      },
      {
        _id: '3',
        title: 'Workshop: Digital Marketing',
        description: 'Learn the latest digital marketing strategies from industry experts',
        startDate: '2025-08-01T14:00:00Z',
        eventStatus: 'upcoming',
        attendees: 45
      }
    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleLeave = (id) => {
    setLeavingEvent(id);
    setTimeout(() => {
      setEvents(events.filter(e => e._id !== id));
      setLeavingEvent(null);
    }, 1000);
  };

  const getStatusColor = (status) => {
    if (status === 'upcoming') return 'blue';
    if (status === 'confirmed') return 'green';
    if (status === 'cancelled') return 'red';
    return 'gray';
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

  return (
    <div className="my-events">
      <div className="header">
        <div className="icon"><Heart size={28} color="white" /></div>
        <h1>🎟️ My Joined Events</h1>
        <p>Discover and manage all the amazing events you've joined</p>
      </div>

      {loading ? (
        <div className="loading"><Sparkles className="spin" /></div>
      ) : events.length === 0 ? (
        <p className="no-events">😔 You haven't joined any events yet.</p>
      ) : (
        <div className="event-list">
          {events.map(event => (
            <div className="event-card" key={event._id}>
              <div className={`bar ${getStatusColor(event.eventStatus)}`}></div>
              <div className="content">
                <h2>{event.title}</h2>
                <p>{event.description.slice(0, 100)}...</p>
                <div className="details">
                  <span><Calendar size={14} /> {formatDate(event.startDate)}</span>
                  <span><Clock size={14} /> {event.eventStatus}</span>
                  <span><Users size={14} /> {event.attendees} attendees</span>
                </div>
                <button onClick={() => handleLeave(event._id)} disabled={leavingEvent === event._id}>
                  {leavingEvent === event._id ? 'Leaving...' : <><LogOut size={14} /> Leave Event</>}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEvents;
