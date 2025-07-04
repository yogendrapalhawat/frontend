// src/pages/CreateEvent.js
import React, { useState } from 'react';
import api from '../api';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('Hackathon');
  const [status, setStatus] = useState('Upcoming');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [registrationLink, setRegistrationLink] = useState('');

  const token = localStorage.getItem('token');

  const handleCreateEvent = async () => {
    try {
      await api.post(
        '/events/create',
        {
          title,
          description,
          tag,
          status,
          startDate,
          endDate,
          location,
          organizer,
          registrationLink,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('✅ Event created successfully!');
      setTitle('');
      setDescription('');
      setTag('Hackathon');
      setStatus('Upcoming');
      setStartDate('');
      setEndDate('');
      setLocation('');
      setOrganizer('');
      setRegistrationLink('');
    } catch (err) {
      console.error('Error creating event:', err);
      alert('❌ Failed to create event');
    }
  };

  return (
    <div className="create-event-page" style={{ padding: '30px', maxWidth: '600px', margin: 'auto' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#6b21a8' }}>🛠️ Create New Event</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-input"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="form-input"
        rows={4}
      />

      <select value={tag} onChange={(e) => setTag(e.target.value)} className="form-input">
        <option>Hackathon</option>
        <option>Workshop</option>
        <option>Seminar</option>
        <option>Tech Fest</option>
        <option>Bootcamp</option>
      </select>

      <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-input">
        <option>Upcoming</option>
        <option>Ongoing</option>
        <option>Completed</option>
      </select>

      <input
        type="date"
        placeholder="Start Date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="form-input"
      />

      <input
        type="date"
        placeholder="End Date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="form-input"
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="form-input"
      />

      <input
        type="text"
        placeholder="Organizer"
        value={organizer}
        onChange={(e) => setOrganizer(e.target.value)}
        className="form-input"
      />

      <input
        type="text"
        placeholder="Registration Link"
        value={registrationLink}
        onChange={(e) => setRegistrationLink(e.target.value)}
        className="form-input"
      />

      <button
        onClick={handleCreateEvent}
        style={{
          backgroundColor: '#6b21a8',
          color: '#fff',
          padding: '12px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          marginTop: '10px',
        }}
      >
        🚀 Create Event
      </button>
    </div>
  );
};

export default CreateEvent;
