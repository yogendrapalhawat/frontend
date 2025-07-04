// src/pages/CreateEvent.js
import React, { useState } from 'react';
import api from '../api';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('Hackathon');
  const [eventType, setEventType] = useState('In-Person');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [maxParticipants, setMaxParticipants] = useState(100);
  const [college, setCollege] = useState('');
  const [registrationLink, setRegistrationLink] = useState('');
  const [eventStatus, setEventStatus] = useState('Upcoming');

  const token = localStorage.getItem('token');

  const handleCreateEvent = async () => {
    try {
      const response = await api.post(
        '/events',
        {
          title,
          description,
          tags: [tag], // ✅ backend expects array
          eventType,
          location,
          startDate,
          endDate,
          maxParticipants,
          college,
          registrationLink,
          eventStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('✅ Event created successfully!');
      // Reset form
      setTitle('');
      setDescription('');
      setTag('Hackathon');
      setEventType('In-Person');
      setLocation('');
      setStartDate('');
      setEndDate('');
      setMaxParticipants(100);
      setCollege('');
      setRegistrationLink('');
      setEventStatus('Upcoming');
    } catch (err) {
      console.error('❌ Error creating event:', err);
      alert('❌ Failed to create event');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '30px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#4b0082' }}>🚀 Create New Event</h2>

      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />

      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />

      <label style={{ fontWeight: 'bold' }}>Tag:</label>
      <select value={tag} onChange={(e) => setTag(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px' }}>
        <option>Hackathon</option>
        <option>AI</option>
        <option>Workshop</option>
        <option>Sports</option>
        <option>Debate</option>
        <option>Coding</option>
      </select>

      <label style={{ fontWeight: 'bold' }}>Event Type:</label>
      <select value={eventType} onChange={(e) => setEventType(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px' }}>
        <option>Virtual</option>
        <option>In-Person</option>
        <option>Hybrid</option>
      </select>

      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />

      <input type="date" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />

      <input type="date" placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />

      <input type="number" placeholder="Max Participants" value={maxParticipants} onChange={(e) => setMaxParticipants(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />

      <input type="text" placeholder="College ID (MongoDB _id)" value={college} onChange={(e) => setCollege(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />

      <input type="text" placeholder="Registration Link (https://...)" value={registrationLink} onChange={(e) => setRegistrationLink(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />

      <label style={{ fontWeight: 'bold' }}>Event Status:</label>
      <select value={eventStatus} onChange={(e) => setEventStatus(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '20px' }}>
        <option>Upcoming</option>
        <option>Ongoing</option>
        <option>Past</option>
      </select>

      <button onClick={handleCreateEvent} style={{ width: '100%', padding: '12px', backgroundColor: '#4b0082', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px' }}>
        📅 Create Event
      </button>
    </div>
  );
};

export default CreateEvent;
