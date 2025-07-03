// src/components/Modal.js
import React from 'react';

const Modal = ({ open, onClose, event }) => {
  if (!open || !event) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-xl w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-gray-500 hover:text-black text-2xl">&times;</button>
        <h2 className="text-xl font-bold text-blue-600 mb-2">{event.title}</h2>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Tags:</strong> {event.tags.join(', ')}</p>
        <p><strong>Status:</strong> {event.eventStatus}</p>
        <p><strong>Dates:</strong> {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Modal;
