import React, { useState, useEffect } from 'react';

const AdminPanel = ({ onClose }) => {
  const [loginLogs, setLoginLogs] = useState([]);
  const [activeTab, setActiveTab] = useState('logs');

  useEffect(() => {
    // In a real app, this would fetch from a database
    // For demo, we'll use localStorage
    const logs = JSON.parse(localStorage.getItem('loginLogs') || '[]');
    setLoginLogs(logs);
  }, []);

  const mockLogs = [
    {
      id: 1,
      user: 'admin@admin.com',
      role: 'admin',
      loginTime: new Date().toISOString(),
      ip: '196.188.45.123',
      location: {
        city: 'Addis Ababa',
        country: 'Ethiopia',
        latitude: 9.0320,
        longitude: 38.7469
      },
      device: {
        platform: 'MacIntel',
        userAgent: 'Chrome/120.0.0.0',
        screenResolution: '1920x1080'
      }
    },
    {
      id: 2,
      user: 'user@example.com',
      role: 'user',
      loginTime: new Date(Date.now() - 3600000).toISOString(),
      ip: '196.188.45.124',
      location: {
        city: 'Dire Dawa',
        country: 'Ethiopia',
        latitude: 9.5931,
        longitude: 41.8661
      },
      device: {
        platform: 'iPhone',
        userAgent: 'Safari/604.1',
        screenResolution: '390x844'
      }
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getUserAgent = (ua) => {
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Edge')) return 'Edge';
    return 'Unknown';
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      zIndex: 1000,
      overflowY: 'auto'
    }}>
      <div style={{
        background: 'white',
        borderRadius: 16,
        maxWidth: 900,
        width: '100%',
        maxHeight: '90vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          padding: '20px 20px 16px',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h2 style={{ margin: 0 }}>Admin Panel</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 24,
              color: '#666',
              cursor: 'pointer',
              padding: 0,
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%'
            }}
          >
            ×
          </button>
        </div>

        <div style={{
          display: 'flex',
          borderBottom: '1px solid #e0e0e0',
          background: '#f8f8f8'
        }}>
          <button
            onClick={() => setActiveTab('logs')}
            style={{
              padding: '12px 24px',
              background: activeTab === 'logs' ? 'white' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'logs' ? '2px solid #4a7bff' : 'none',
              cursor: 'pointer',
              fontWeight: activeTab === 'logs' ? 600 : 400,
              color: activeTab === 'logs' ? '#4a7bff' : '#666'
            }}
          >
            Login Logs
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            style={{
              padding: '12px 24px',
              background: activeTab === 'stats' ? 'white' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'stats' ? '2px solid #4a7bff' : 'none',
              cursor: 'pointer',
              fontWeight: activeTab === 'stats' ? 600 : 400,
              color: activeTab === 'stats' ? '#4a7bff' : '#666'
            }}
          >
            Statistics
          </button>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: 20 }}>
          {activeTab === 'logs' && (
            <div>
              <h3 style={{ marginBottom: 16 }}>Recent Login Activity</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: 14
                }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                      <th style={{ padding: '12px 8px', textAlign: 'left' }}>User</th>
                      <th style={{ padding: '12px 8px', textAlign: 'left' }}>Role</th>
                      <th style={{ padding: '12px 8px', textAlign: 'left' }}>Time</th>
                      <th style={{ padding: '12px 8px', textAlign: 'left' }}>IP Address</th>
                      <th style={{ padding: '12px 8px', textAlign: 'left' }}>Location</th>
                      <th style={{ padding: '12px 8px', textAlign: 'left' }}>Device</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockLogs.map((log) => (
                      <tr key={log.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                        <td style={{ padding: '12px 8px' }}>{log.user}</td>
                        <td style={{ padding: '12px 8px' }}>
                          <span style={{
                            background: log.role === 'admin' ? '#dc3545' : '#28a745',
                            color: 'white',
                            padding: '2px 8px',
                            borderRadius: 12,
                            fontSize: 11
                          }}>
                            {log.role.toUpperCase()}
                          </span>
                        </td>
                        <td style={{ padding: '12px 8px' }}>{formatDate(log.loginTime)}</td>
                        <td style={{ padding: '12px 8px' }}>{log.ip}</td>
                        <td style={{ padding: '12px 8px' }}>
                          {log.location.city}, {log.location.country}
                          <div style={{ fontSize: 11, color: '#666' }}>
                            {log.location.latitude.toFixed(4)}, {log.location.longitude.toFixed(4)}
                          </div>
                        </td>
                        <td style={{ padding: '12px 8px' }}>
                          {log.device.platform}
                          <div style={{ fontSize: 11, color: '#666' }}>
                            {getUserAgent(log.device.userAgent)} • {log.device.screenResolution}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div>
              <h3 style={{ marginBottom: 16 }}>Login Statistics</h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 16,
                marginBottom: 24
              }}>
                <div style={{
                  background: '#e8f0ff',
                  padding: 20,
                  borderRadius: 12,
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: 32, fontWeight: 700, color: '#4a7bff' }}>
                    {mockLogs.length}
                  </div>
                  <div style={{ fontSize: 14, color: '#666', marginTop: 4 }}>
                    Total Logins Today
                  </div>
                </div>
                <div style={{
                  background: '#d4edda',
                  padding: 20,
                  borderRadius: 12,
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: 32, fontWeight: 700, color: '#155724' }}>
                    {mockLogs.filter(l => l.role === 'user').length}
                  </div>
                  <div style={{ fontSize: 14, color: '#666', marginTop: 4 }}>
                    User Logins
                  </div>
                </div>
                <div style={{
                  background: '#f8d7da',
                  padding: 20,
                  borderRadius: 12,
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: 32, fontWeight: 700, color: '#721c24' }}>
                    {mockLogs.filter(l => l.role === 'admin').length}
                  </div>
                  <div style={{ fontSize: 14, color: '#666', marginTop: 4 }}>
                    Admin Logins
                  </div>
                </div>
              </div>

              <h4 style={{ marginBottom: 12 }}>Device Distribution</h4>
              <div style={{
                background: '#f8f8f8',
                padding: 16,
                borderRadius: 12
              }}>
                <div style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span>Desktop</span>
                    <span>60%</span>
                  </div>
                  <div style={{
                    height: 8,
                    background: '#e0e0e0',
                    borderRadius: 4,
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: '60%',
                      height: '100%',
                      background: '#4a7bff',
                      borderRadius: 4
                    }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span>Mobile</span>
                    <span>40%</span>
                  </div>
                  <div style={{
                    height: 8,
                    background: '#e0e0e0',
                    borderRadius: 4,
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: '40%',
                      height: '100%',
                      background: '#28a745',
                      borderRadius: 4
                    }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 