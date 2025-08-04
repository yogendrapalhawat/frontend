import React from 'react';
import '../styles/global.css';

const ProjectDetails = () => {
  const project = {
    name: "Campus Connect",
    domain: "Web Development",
    description: "A platform to connect students across campuses for events, ideas, and collaboration."
  };

  return (
    <div className="container">
      <div className="card">
        <h2>{project.name}</h2>
        <p><strong>Domain:</strong> {project.domain}</p>
        <p>{project.description}</p>
        <button className="btn">Join Project</button>
      </div>
    </div>
  );
};

export default ProjectDetails;
