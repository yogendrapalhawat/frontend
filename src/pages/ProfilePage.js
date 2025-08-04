import React from 'react';
import '../styles/global.css';

const ProfilePage = () => {
  const user = {
    name: "Yogendra Palhawat",
    email: "yogendra@example.com",
    college: "ABC Institute",
    role: "Student"
  };

  return (
    <div className="container">
      <div className="card">
        <h2>My Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>College:</strong> {user.college}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
