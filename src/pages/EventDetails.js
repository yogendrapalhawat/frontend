import React from 'react';
import '../styles/global.css';

const EventDetails = () => {
  // Dummy data
  const event = {
    title: "Hackathon 2025",
    description: "Join a thrilling 36-hour hackathon full of ideas and innovation.",
    date: "2025-08-10",
    location: "IIT Delhi",
    tags: ["tech", "coding", "innovation"]
  };

  return (
    <div className="container">
      <div className="card">
        <h2>{event.title}</h2>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p>{event.description}</p>
        <p><strong>Tags:</strong> {event.tags.join(', ')}</p>
        <button className="btn">Join Event</button>
      </div>
    </div>
  );
};

export default EventDetails;
