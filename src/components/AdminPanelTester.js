// src/components/AdminPanelTester.js
import React, { useEffect, useState } from 'react';
import api from '../api';

const AdminPanelTester = () => {
  const [testResults, setTestResults] = useState({
    isAdmin: false,
    userFetch: false,
    eventFetch: false,
    deleteTest: null,
    editTest: null,
  });

  const token = localStorage.getItem('token');

  const runTests = async () => {
    let newResults = { ...testResults };

    try {
      const profileRes = await api.get('/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });

      newResults.isAdmin = profileRes.data.isAdmin;

      if (!profileRes.data.isAdmin) {
        setTestResults(newResults);
        return;
      }

      const usersRes = await api.get('/users', {
        headers: { Authorization: `Bearer ${token}` }
      });

      newResults.userFetch = usersRes.status === 200;

      const eventsRes = await api.get('/events', {
        headers: { Authorization: `Bearer ${token}` }
      });

      newResults.eventFetch = eventsRes.status === 200;

      const dummyEvent = eventsRes.data[0];

      if (dummyEvent) {
        // Edit Test
        const editRes = await api.put(`/events/${dummyEvent._id}`, {
          ...dummyEvent,
          title: dummyEvent.title + ' [TestEdit]'
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        newResults.editTest = editRes.status === 200;

        // Delete Test (we'll skip real delete to avoid data loss)
        newResults.deleteTest = 'Skipped';
      }

    } catch (err) {
      console.error('Admin Test Error:', err);
    }

    setTestResults(newResults);
  };

  useEffect(() => {
    runTests();
  }, []);

  const renderResult = (val) => {
    if (val === true) return <span style={{ color: 'green' }}>✅ Pass</span>;
    if (val === false) return <span style={{ color: 'red' }}>❌ Fail</span>;
    if (val === 'Skipped') return <span style={{ color: 'orange' }}>⚠️ Skipped</span>;
    return <span style={{ color: 'gray' }}>⏳ Loading...</span>;
  };

  return (
    <div style={{
      background: '#f1f5f9',
      borderRadius: '10px',
      padding: '20px',
      maxWidth: '500px',
      margin: '40px auto',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      fontFamily: 'Segoe UI'
    }}>
      <h2>🧪 Admin Panel Test Results</h2>
      <ul style={{ listStyle: 'none', paddingLeft: 0, lineHeight: '2' }}>
        <li>🔐 Is Admin: {renderResult(testResults.isAdmin)}</li>
        <li>👥 User Fetch: {renderResult(testResults.userFetch)}</li>
        <li>📅 Event Fetch: {renderResult(testResults.eventFetch)}</li>
        <li>✏️ Edit Test: {renderResult(testResults.editTest)}</li>
        <li>🗑️ Delete Test: {renderResult(testResults.deleteTest)}</li>
      </ul>
    </div>
  );
};

export default AdminPanelTester;
