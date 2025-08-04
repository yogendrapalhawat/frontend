import React from 'react';
import '../styles/global.css';

const ClubProfile = () => {
  const club = {
    name: "Tech Society",
    description: "A student-run club that hosts tech talks, hackathons, and innovation summits.",
    members: 120,
    founder: "Yogendra Palhawat"
  };

  return (
    <div className="container">
      <div className="card">
        <h2>{club.name}</h2>
        <p>{club.description}</p>
        <p><strong>Members:</strong> {club.members}</p>
        <p><strong>Founder:</strong> {club.founder}</p>
        <button className="btn">Follow Club</button>
      </div>
    </div>
  );
};

export default ClubProfile;
