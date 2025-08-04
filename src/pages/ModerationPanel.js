import React from 'react';
import '../styles/global.css';

const ModerationPanel = () => {
  const reports = [
    { id: 1, content: "Spam event: Free Crypto Meetup", status: "Pending" },
    { id: 2, content: "Inappropriate comment by user123", status: "Resolved" }
  ];

  return (
    <div className="container">
      <h2>Moderation Panel</h2>
      {reports.map((report) => (
        <div className="card" key={report.id}>
          <p><strong>Report:</strong> {report.content}</p>
          <p><strong>Status:</strong> {report.status}</p>
          <button className="btn">Review</button>
        </div>
      ))}
    </div>
  );
};

export default ModerationPanel;
