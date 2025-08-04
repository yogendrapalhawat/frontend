import React from 'react';
import '../styles/global.css';

const ExploreColleges = () => {
  const colleges = [
    { name: "IIT Delhi", city: "New Delhi" },
    { name: "NIT Trichy", city: "Tiruchirappalli" },
    { name: "BITS Pilani", city: "Pilani" }
  ];

  return (
    <div className="container">
      <h2>Explore Colleges</h2>
      {colleges.map((college, idx) => (
        <div className="card" key={idx}>
          <h3>{college.name}</h3>
          <p><strong>City:</strong> {college.city}</p>
          <button className="btn">View Profile</button>
        </div>
      ))}
    </div>
  );
};

export default ExploreColleges;
