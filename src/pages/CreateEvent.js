// src/pages/CreateEvent.js
import React, { useState } from 'react';
import api from '../api';
import '../styles/createEvent.css';

const CreateEvent = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    tag: 'Hackathon',
    eventType: 'In-Person',
    location: '',
    startDate: '',
    endDate: '',
    maxParticipants: 100,
    college: '',
    registrationLink: '',
    eventStatus: 'Upcoming'
  });

  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateEvent = async () => {
    try {
      await api.post('/events', {
        ...form,
        tags: [form.tag]
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('✅ Event created successfully!');
      setForm({
        title: '',
        description: '',
        tag: 'Hackathon',
        eventType: 'In-Person',
        location: '',
        startDate: '',
        endDate: '',
        maxParticipants: 100,
        college: '',
        registrationLink: '',
        eventStatus: 'Upcoming'
      });
    } catch (err) {
      console.error('❌ Error creating event:', err);
      alert('❌ Failed to create event');
    }
  };

  return (
    <div className="create-event-page">
      <div className="create-event-card">
        <h2>🎯 Create a New Event</h2>
        <p className="subtitle">Fill in the details below to host an event for your campus.</p>

        <input name="title" value={form.title} onChange={handleChange} placeholder="Event Title" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" rows={3} />

        <div className="form-grid">
          <div>
            <label>Tag</label>
            <select name="tag" value={form.tag} onChange={handleChange}>
              <option>Hackathon</option>
              <option>AI</option>
              <option>Workshop</option>
              <option>Sports</option>
              <option>Debate</option>
              <option>Coding</option>
            </select>
          </div>

          <div>
            <label>Event Type</label>
            <select name="eventType" value={form.eventType} onChange={handleChange}>
              <option>Virtual</option>
              <option>In-Person</option>
              <option>Hybrid</option>
            </select>
          </div>
        </div>

        <input name="location" value={form.location} onChange={handleChange} placeholder="Location (if applicable)" />
        <input name="startDate" type="date" value={form.startDate} onChange={handleChange} />
        <input name="endDate" type="date" value={form.endDate} onChange={handleChange} />
        <input name="maxParticipants" type="number" value={form.maxParticipants} onChange={handleChange} placeholder="Max Participants" />
        <input name="college" value={form.college} onChange={handleChange} placeholder="College ID (MongoDB _id)" />
        <input name="registrationLink" value={form.registrationLink} onChange={handleChange} placeholder="Registration Link (optional)" />

        <label>Status</label>
        <select name="eventStatus" value={form.eventStatus} onChange={handleChange}>
          <option>Upcoming</option>
          <option>Ongoing</option>
          <option>Past</option>
        </select>

        <button onClick={handleCreateEvent}>🚀 Create Event</button>
      </div>
    </div>
  );
};

export default CreateEvent;
