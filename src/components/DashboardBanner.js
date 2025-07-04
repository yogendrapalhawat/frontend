import React from 'react';
import bannerImage from '../assets/img.png'; // ✅ Local image import

const DashboardBanner = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(to right, #ede9fe, #ddd6fe)',
        padding: '30px 20px',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '30px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        marginBottom: '30px',
        flexWrap: 'wrap',
      }}
    >
      {/* 🖼️ Left Side Image */}
      <img
        src={bannerImage}
        alt="Dashboard Art"
        style={{
          height: '160px',
          borderRadius: '12px',
          objectFit: 'cover',
        }}
      />

      {/* 👋 Text Content */}
      <div>
        <h1 style={{ fontSize: '26px', color: '#4c1d95', marginBottom: '10px' }}>
          🎓 Welcome to One Portal Dashboard
        </h1>
        <p style={{ fontSize: '16px', color: '#4b5563', maxWidth: '500px' }}>
          Manage your campus activities, join exciting events, and stay updated with the latest happenings – all in one place!
        </p>
      </div>
    </div>
  );
};

export default DashboardBanner;
