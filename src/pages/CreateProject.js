// src/pages/CreateProject.js
import React, { useState } from 'react';
import './CreateProject.css';
import { FolderPlus, Globe, FileText, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

const CreateProject = () => {
  const [project, setProject] = useState({
    name: '',
    domain: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulated API
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("Creating Project:", project);
    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      setProject({ name: '', domain: '', description: '' });
      setCurrentStep(1);
    }, 3000);
  };

  const handleInputChange = (field, value) => {
    setProject({ ...project, [field]: value });

    if (field === 'name' && value && currentStep === 1) setCurrentStep(2);
    else if (field === 'domain' && value && currentStep === 2) setCurrentStep(3);
  };

  const isFormValid = project.name && project.domain && project.description;

  if (isSuccess) {
    return (
      <div className="project-success">
        <div className="success-card">
          <div className="success-icon">
            <CheckCircle className="icon" />
          </div>
          <h2>Success!</h2>
          <p>Your project "{project.name}" has been created successfully.</p>
          <div className="project-info">
            <p><strong>Name:</strong> {project.name}</p>
            <p><strong>Domain:</strong> {project.domain}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-container">
      {/* Background blobs */}
      <div className="bg-blobs">
        <div className="blob purple"></div>
        <div className="blob pink"></div>
        <div className="blob indigo"></div>
      </div>

      <div className="project-wrapper">
        <div className="project-header">
          <div className="header-icon">
            <FolderPlus className="icon" />
          </div>
          <h1>Create New Project</h1>
          <p>Bring your ideas to life with our platform</p>
        </div>

        <div className="steps">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div className={`step ${currentStep >= step ? 'active' : ''}`}>{step}</div>
              {step < 3 && <ArrowRight className="arrow" />}
            </React.Fragment>
          ))}
        </div>

        <form className="project-form" onSubmit={handleSubmit}>
          <label>
            <span><Sparkles size={18} /> Project Name</span>
            <input
              type="text"
              placeholder="Enter your project name"
              value={project.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </label>

          <label>
            <span><Globe size={18} /> Domain</span>
            <input
              type="text"
              placeholder="e.g., technology, healthcare, education"
              value={project.domain}
              onChange={(e) => handleInputChange('domain', e.target.value)}
              required
            />
          </label>

          <label>
            <span><FileText size={18} /> Description</span>
            <textarea
              placeholder="Describe your project, its goals, and key features..."
              value={project.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              required
            ></textarea>
          </label>

          <button type="submit" disabled={!isFormValid || isSubmitting}>
            {isSubmitting ? 'Creating Project...' : 'Create Project'}
          </button>
          <p className="footer-text">✨ Your project will be ready in seconds</p>
        </form>

        <div className="support-text">
          Need help? <a href="#">Contact our support team</a>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
