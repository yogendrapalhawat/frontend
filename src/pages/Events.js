// src/pages/Events.js
import React, { useEffect, useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const payload = JSON.parse(atob(token.split('.')[1]));
    setUserId(payload.userId);

    const fetchEvents = async () => {
      try {
        const res = await api.get('/events');
        setEvents(res.data);
      } catch (err) {
        alert('Error loading events');
      }
    };

    fetchEvents();
  }, []);

  const handleJoin = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await api.post(`/events/${id}/register`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Registered!');
      const res = await api.get('/events');
      setEvents(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Join failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-center">Available Events</h2>
        {events.length === 0 ? (
          <p className="text-center text-gray-600">No events available right now.</p>
        ) : (
          events.map(event => {
            const isRegistered = event.registeredUsers?.includes(userId);
            return (
              <div key={event._id} className="bg-white shadow-md rounded-md p-4 mb-6 border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-blue-600">{event.title}</h3>
                  <span className={`text-sm font-semibold px-2 py-1 rounded ${event.eventStatus === 'Upcoming' ? 'bg-yellow-100 text-yellow-800' : event.eventStatus === 'Ongoing' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                    {event.eventStatus}
                  </span>
                </div>
                <p className="text-gray-700 mb-2">{event.description}</p>
                <p className="text-sm text-gray-600">
                  <strong>Type:</strong> {event.eventType} | <strong>Tags:</strong> {event.tags.join(', ')}<br />
                  <strong>Dates:</strong> {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                </p>
                <div className="mt-4">
                  {isRegistered ? (
                    <button disabled className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed">
                      ✅ Registered
                    </button>
                  ) : (
                    <button onClick={() => handleJoin(event._id)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                      Join
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Events;
