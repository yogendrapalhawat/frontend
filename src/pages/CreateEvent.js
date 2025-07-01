// src/pages/CreateEvent.js
import React, { useState } from 'react';
import api from '../api';
import Navbar from '../components/Navbar';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [],
    eventType: '',
    location: '',
    startDate: '',
    endDate: '',
    college: '',
    maxParticipants: 10
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'tags' ? value.split(',') : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await api.post('/events/create', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Event created successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Event creation failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" placeholder="Title" onChange={handleChange} required />
          <textarea name="description" placeholder="Description" onChange={handleChange} required />
          <input name="tags" placeholder="Tags (comma-separated)" onChange={handleChange} required />
          <select name="eventType" onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="Virtual">Virtual</option>
            <option value="In-Person">In-Person</option>
            <option value="Hybrid">Hybrid</option>
          </select>
          {(formData.eventType === 'In-Person' || formData.eventType === 'Hybrid') && (
            <input name="location" placeholder="Location" onChange={handleChange} required />
          )}
          <input name="startDate" type="date" onChange={handleChange} required />
          <input name="endDate" type="date" onChange={handleChange} required />
          <input name="college" placeholder="College ID (from DB)" onChange={handleChange} required />
          <input name="maxParticipants" type="number" onChange={handleChange} required />
          <button type="submit">Create Event</button>
        </form>
      </div>
    </>
  );
};

export default CreateEvent;
