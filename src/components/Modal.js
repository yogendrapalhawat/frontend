// src/components/Modal.js
import React from 'react';
import './Modal.css'; // ✅ Link to custom styles

const Modal = ({ open, onClose, event }) => {
  if (!open || !event) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close">&times;</button>
        <h2 className="modal-title">{event.title}</h2>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Tags:</strong> {event.tags?.join(', ')}</p>
        <p><strong>Status:</strong> {event.eventStatus}</p>
        <p><strong>Dates:</strong> {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Modal;
