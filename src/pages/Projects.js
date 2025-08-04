import React from 'react';
import '../styles/global.css';

const Projects = () => {
  const projectList = [
    { id: 1, name: 'Campus Connect', domain: 'Web App' },
    { id: 2, name: 'StudyBuddy', domain: 'AI Assistant' }
  ];

  return (
    <div className="container">
      <h2>Projects</h2>
      {projectList.map(project => (
        <div className="card" key={project.id}>
          <h3>{project.name}</h3>
          <p><strong>Domain:</strong> {project.domain}</p>
          <button className="btn">View Details</button>
        </div>
      ))}
    </div>
  );
};

export default Projects;
