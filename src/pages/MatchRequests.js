import React from 'react';
import '../styles/global.css';

const MatchRequests = () => {
  const requests = [
    { id: 1, sender: 'John', topic: 'Hackathon', status: 'Pending' },
    { id: 2, sender: 'Aditi', topic: 'ML Project', status: 'Accepted' }
  ];

  return (
    <div className="container">
      <h2>Match Requests</h2>
      {requests.map(req => (
        <div className="card" key={req.id}>
          <p><strong>From:</strong> {req.sender}</p>
          <p><strong>Topic:</strong> {req.topic}</p>
          <p><strong>Status:</strong> {req.status}</p>
        </div>
      ))}
    </div>
  );
};

export default MatchRequests;
