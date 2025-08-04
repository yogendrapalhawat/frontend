import React, { useState } from 'react';
import '../styles/global.css';

const CreateMatchRequest = () => {
  const [request, setRequest] = useState({
    topic: '',
    description: '',
    preferredPartner: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Creating Match Request:", request);
    // TODO: Send to backend
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Create Match Request</h2>
        <form onSubmit={handleSubmit}>
          <label>Topic</label>
          <input type="text" required value={request.topic} onChange={(e) => setRequest({ ...request, topic: e.target.value })} />

          <label>Description</label>
          <textarea required value={request.description} onChange={(e) => setRequest({ ...request, description: e.target.value })} />

          <label>Preferred Partner (optional)</label>
          <input type="text" value={request.preferredPartner} onChange={(e) => setRequest({ ...request, preferredPartner: e.target.value })} />

          <button className="btn" type="submit">Send Request</button>
        </form>
      </div>
    </div>
  );
};

export default CreateMatchRequest;
