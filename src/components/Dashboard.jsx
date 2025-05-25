import React, { useState } from 'react';
import Analytics from './Analytics';
import PrefilledSurvey from './PrefilledSurvey';

const Dashboard = ({ stats, onNewSurvey, onBack }) => {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedPrefilled, setSelectedPrefilled] = useState(null);
  
  const preFilledPages = [
    { id: 1, name: 'Addis Tech Solutions', category: 'Technology', followers: '12.5K', url: 'https://facebook.com/addistech' },
    { id: 2, name: 'Ethiopian Coffee Export', category: 'Agriculture', followers: '8.2K', url: 'https://facebook.com/ethcoffee' },
    { id: 3, name: 'Habesha Fashion Store', category: 'Retail', followers: '25.3K', url: 'https://facebook.com/habeshafashion' }
  ];

  const recentSubmissions = [
    { id: 1, name: 'Blue Nile Restaurant', status: 'approved', earnings: 10, date: '2 hours ago' },
    { id: 2, name: 'Addis Real Estate', status: 'pending', earnings: 20, date: '5 hours ago' },
    { id: 3, name: 'Tech Hub Ethiopia', status: 'approved', earnings: 10, date: 'Yesterday' },
    { id: 4, name: 'Fashion Boutique', status: 'rejected', earnings: 0, date: '2 days ago' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#28a745';
      case 'pending': return '#ffc107';
      case 'rejected': return '#dc3545';
      default: return '#666';
    }
  };

  const handlePrefilledComplete = (verificationData) => {
    // Handle prefilled survey completion
    console.log('Prefilled survey completed:', verificationData);
    setSelectedPrefilled(null);
    // You would typically update stats here
  };

  return (
    <>
      <div className="card card-wide">
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: window.innerWidth < 480 ? 16 : 24,
          flexWrap: 'wrap',
          gap: 12
        }}>
          <h1 style={{ margin: 0 }}>Your Dashboard</h1>
          <div style={{ display: 'flex', gap: 8 }}>
            <button 
              onClick={() => setShowAnalytics(true)}
              style={{ 
                background: '#17a2b8',
                color: 'white',
                padding: '8px 16px',
                borderRadius: 20,
                fontSize: 14
              }}
            >
              📊 Analytics
            </button>
            <button 
              onClick={onBack}
              style={{ 
                background: '#6c757d',
                color: 'white',
                padding: '8px 16px',
                borderRadius: 20,
                fontSize: 14
              }}
            >
              ← Back
            </button>
          </div>
        </div>

        <div className="earnings-highlight">
          <div style={{ fontSize: 14, marginBottom: 4 }}>Total Earnings</div>
          <div className="earnings-amount">{stats.earnings} ETB</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>Keep up the great work! 🎉</div>
        </div>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-value">{stats.submitted}</div>
            <div className="stat-label">Submitted</div>
          </div>
          <div className="stat-card" style={{ background: '#d4edda' }}>
            <div className="stat-value" style={{ color: '#155724' }}>{stats.approved}</div>
            <div className="stat-label">Approved</div>
          </div>
          <div className="stat-card" style={{ background: '#f8d7da' }}>
            <div className="stat-value" style={{ color: '#721c24' }}>{stats.rejected}</div>
            <div className="stat-label">Rejected</div>
          </div>
          <div className="stat-card" style={{ background: '#fff3cd' }}>
            <div className="stat-value" style={{ color: '#856404' }}>{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>

        {/* Recent Submissions */}
        <div style={{ marginTop: 32, marginBottom: 32 }}>
          <h2 style={{ marginBottom: 16 }}>Recent Submissions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {recentSubmissions.map((submission) => (
              <div 
                key={submission.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 16,
                  background: '#f8f8f8',
                  borderRadius: 12,
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{submission.name}</div>
                  <div style={{ fontSize: 13, color: '#666' }}>
                    {submission.date}
                  </div>
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 12 
                }}>
                  {submission.earnings > 0 && (
                    <span style={{ fontWeight: 600, fontSize: 14 }}>
                      {submission.earnings} ETB
                    </span>
                  )}
                  <span style={{
                    background: getStatusColor(submission.status),
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: 12,
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: 'capitalize'
                  }}>
                    {submission.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pre-filled Pages */}
        <div style={{ marginTop: 32 }}>
          <h2 style={{ marginBottom: 16 }}>Pre-filled Pages Available</h2>
          <p style={{ marginBottom: 16, fontSize: 14 }}>
            Complete these pre-filled surveys to earn 5 ETB each:
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {preFilledPages.map((page) => (
              <div 
                key={page.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 16,
                  background: '#f8f8f8',
                  borderRadius: 12,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => setSelectedPrefilled(page)}
              >
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{page.name}</div>
                  <div style={{ fontSize: 13, color: '#666' }}>
                    {page.category} • {page.followers} followers
                  </div>
                </div>
                <button style={{
                  background: '#17a2b8',
                  color: 'white',
                  padding: '6px 16px',
                  borderRadius: 20,
                  fontSize: 13
                }}>
                  Complete →
                </button>
              </div>
            ))}
          </div>
        </div>

        <button 
          className="primary-button" 
          onClick={onNewSurvey}
          style={{ marginTop: 32 }}
        >
          Start New Survey
        </button>

        <div style={{ 
          textAlign: 'center', 
          marginTop: 24, 
          paddingTop: 24,
          borderTop: '1px solid #e0e0e0'
        }}>
          <div style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>
            Need help? Contact support:
          </div>
          <a href="mailto:support@fbsurvey.com" style={{ color: '#4a7bff', fontSize: 14 }}>
            support@fbsurvey.com
          </a>
        </div>
      </div>

      {showAnalytics && (
        <Analytics 
          stats={stats} 
          onClose={() => setShowAnalytics(false)} 
        />
      )}

      {selectedPrefilled && (
        <PrefilledSurvey
          pageData={selectedPrefilled}
          onComplete={handlePrefilledComplete}
          onCancel={() => setSelectedPrefilled(null)}
        />
      )}
    </>
  );
};

export default Dashboard; 