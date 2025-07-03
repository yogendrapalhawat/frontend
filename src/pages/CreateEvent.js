// src/pages/CreateEvent.js
import React, { useState } from 'react';
import api from '../api';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    tag: '',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/events/create', formData);
      alert('Event Created!');
      setFormData({ name: '', description: '', startDate: '', tag: '' });
    } catch (err) {
      console.error('Create event error:', err);
    }
  };

  return (
    <div className="create-event-page">
      <h2 className="page-title">Create New Event</h2>
      <form onSubmit={handleSubmit} className="event-form">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Event Name"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="tag"
          value={formData.tag}
          onChange={handleChange}
          placeholder="Tag (e.g. Hackathon)"
          required
        />
        <button type="submit" className="create-btn">Create</button>
      </form>
    </div>
  );
};

export default CreateEvent;
