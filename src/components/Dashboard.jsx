import React, { useState, useEffect } from 'react';
import Analytics from './Analytics';
import PrefilledSurvey from './PrefilledSurvey';
import AdminPanel from './AdminPanel';
import { FaUserCircle, FaPlus, FaChartBar, FaMoneyBillWave, FaLock } from 'react-icons/fa';
import DailyGoalSection from './DailyGoalSection';

const Dashboard = ({ stats, onNewSurvey, onBack, currentUser, onResumeSurvey, onGoalSet }) => {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedPrefilled, setSelectedPrefilled] = useState(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [activeTab, setActiveTab] = useState('today');
  const [showFabModal, setShowFabModal] = useState(false);
  const [incompleteSurveys, setIncompleteSurveys] = useState([]);
  
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

  useEffect(() => {
    // Add mock data for incomplete surveys if none exist
    const drafts = JSON.parse(localStorage.getItem('incompleteSurveys') || '[]');
    if (drafts.length === 0) {
      const mockDrafts = [
        {
          pageName: 'Mock Business 1',
          pageUrl: 'https://facebook.com/mockbusiness1',
        },
        {
          pageName: 'Mock Business 2',
          pageUrl: 'https://facebook.com/mockbusiness2',
        }
      ];
      localStorage.setItem('incompleteSurveys', JSON.stringify(mockDrafts));
      setIncompleteSurveys(mockDrafts);
    } else {
      setIncompleteSurveys(drafts);
    }
  }, [showFabModal]);

  const handleResumeSurvey = (survey) => {
    setShowFabModal(false);
    if (onResumeSurvey) onResumeSurvey(survey);
  };

  // 1. Get language from props or default to 'en'
  const language = currentUser?.user?.language || 'en';

  // 2. Calculate today's progress
  const today = new Date().toISOString().slice(0, 10);
  const entries = JSON.parse(localStorage.getItem('surveyEntries') || '[]');
  const todayEntries = entries.filter(e => e.date && e.date.startsWith(today));
  const dailyGoal = JSON.parse(localStorage.getItem('dailyGoal') || '{}');
  const goal = parseInt(dailyGoal.goal) || 0;
  const progress = goal > 0 ? Math.min(100, Math.round((todayEntries.length / goal) * 100)) : 0;

  // 3. Avatar logic
  const userName = currentUser?.user?.name || 'Surveyor';
  const avatarUrl = currentUser?.user?.avatarUrl;
  const initials = userName.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();

  // 4. Mock earnings data for last 7 days
  const earningsData = [10, 20, 15, 30, 25, 18, 22];

  // Determine if user is admin
  const isAdmin = currentUser?.user?.role === 'admin';

  // Defensive: fallback UI if required props are missing
  if (!stats || !onNewSurvey || !onGoalSet) {
    return (
      <div style={{ padding: 32, textAlign: 'center', color: '#dc3545', fontWeight: 600 }}>
        Error: Required dashboard data is missing.<br />
        Please reload the page or contact support.
      </div>
    );
  }

  return (
    <>
      {/* Profile and Greeting */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
        {avatarUrl ? (
          <img src={avatarUrl} alt="avatar" style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: '2px solid #4a7bff' }} />
        ) : (
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#eaf6ff', color: '#4a7bff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 22, flexShrink: 0 }}>
            {initials}
          </div>
        )}
        <div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Hai {userName} 👋</div>
          <div style={{ fontSize: 14, color: '#666' }}>Welcome back!</div>
        </div>
      </div>
      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <button
          onClick={() => setActiveTab('today')}
          style={{
            background: activeTab === 'today' ? '#e8f0ff' : 'transparent',
            color: activeTab === 'today' ? '#4a7bff' : '#666',
            border: 'none',
            borderRadius: 20,
            padding: '8px 20px',
            fontWeight: activeTab === 'today' ? 600 : 400,
            fontSize: 15,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          aria-selected={activeTab === 'today'}
        >
          Today
        </button>
        <button
          onClick={() => setActiveTab('week')}
          style={{
            background: activeTab === 'week' ? '#e8f0ff' : 'transparent',
            color: activeTab === 'week' ? '#4a7bff' : '#666',
            border: 'none',
            borderRadius: 20,
            padding: '8px 20px',
            fontWeight: activeTab === 'week' ? 600 : 400,
            fontSize: 15,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          aria-selected={activeTab === 'week'}
        >
          This Week
        </button>
      </div>
      {/* Unified Earnings + Progress Card (Refined Text) */}
      <div
        className="card card-wide"
        style={{
          background: 'linear-gradient(135deg, #fafdff 60%, #eaf6ff 100%)',
          boxShadow: '0 4px 24px rgba(80,120,200,0.12)',
          border: 'none',
          marginBottom: 24,
          display: 'flex',
          flexDirection: window.innerWidth < 768 ? 'column' : 'row',
          alignItems: 'stretch',
          padding: 0,
          minHeight: 100,
          maxWidth: 700,
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          borderRadius: 28,
          fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
        }}
      >
        {/* Earnings Section (70%) */}
        <div style={{
          flex: 7,
          minWidth: 0,
          padding: window.innerWidth < 768 ? '18px 14px 10px 14px' : '18px 20px 18px 28px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 4,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 2 }}>
            <div style={{
              background: 'linear-gradient(135deg, #4a7bff 60%, #7ee8fa 100%)',
              borderRadius: 12,
              width: 38,
              height: 38,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(74,123,255,0.10)'
            }}>
              <FaMoneyBillWave size={22} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 13, color: '#8a97b3', fontWeight: 400, marginBottom: 0, letterSpacing: 0.15, lineHeight: 1.2 }}>Total Earnings</div>
              <div style={{ fontSize: 24, fontWeight: 600, color: '#1a2340', letterSpacing: '-0.5px', lineHeight: 1.1 }}>{stats.earnings} <span style={{ fontSize: 14, color: '#4a7bff', fontWeight: 500, letterSpacing: 0.1 }}>ETB</span></div>
              <div style={{ fontSize: 11, color: '#4a7bff', marginTop: 0, fontWeight: 400, letterSpacing: 0.12 }}>Keep up the great work! 🎉</div>
            </div>
          </div>
          {/* Earnings Sparkline */}
          <div style={{ width: '100%', marginTop: 2, marginBottom: 0 }}>
            <svg width="100%" height="22" viewBox="0 0 140 22" style={{ display: 'block' }}>
              <polyline
                fill="none"
                stroke="#4a7bff"
                strokeWidth="2"
                points={earningsData.map((v, i) => `${i * 20},${22 - (v / Math.max(...earningsData)) * 16}`).join(' ')}
              />
              {earningsData.map((v, i) => (
                <circle key={i} cx={i * 20} cy={22 - (v / Math.max(...earningsData)) * 16} r="1.7" fill="#4a7bff" />
              ))}
            </svg>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#b0b8c9', marginTop: 0, fontWeight: 300, letterSpacing: 0.1 }}>
              <span>7d ago</span>
              <span>Today</span>
            </div>
          </div>
        </div>
        {/* Divider */}
        <div
          style={{
            width: window.innerWidth < 768 ? '80%' : 2,
            height: window.innerWidth < 768 ? 2 : '70%',
            background: 'linear-gradient(180deg, #e0e7ff 0%, #c7d2fe 100%)',
            margin: window.innerWidth < 768 ? '0 auto 0 auto' : 'auto 0',
            borderRadius: 8,
            alignSelf: 'center',
            opacity: 0.8,
            boxShadow: window.innerWidth < 768 ? '0 1px 4px #eaf6ff' : '1px 0 4px #eaf6ff',
          }}
        />
        {/* Progress Section (30%) */}
        <div style={{
          flex: 3,
          minWidth: 0,
          padding: window.innerWidth < 768 ? '10px 12px 14px 12px' : '16px 12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#f7faff',
          position: 'relative',
          borderTopRightRadius: 28,
          borderBottomRightRadius: 28,
          borderTopLeftRadius: window.innerWidth < 768 ? 0 : 0,
          borderBottomLeftRadius: window.innerWidth < 768 ? 0 : 0,
          minHeight: 100,
          fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
        }}>
          <DailyGoalSection
            onGoalSet={onGoalSet}
            compact
            progress={progress}
            language={language}
            sectionTitle={dailyGoal.goal ? (language === 'am' ? 'እድገት' : 'Progress') : undefined}
            locked={!!dailyGoal.goal}
            isAdmin={isAdmin}
          />
        </div>
      </div>
      {/* Centered Floating Action Button (FAB) */}
      <div style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 32,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 200
      }}>
        <button
          className="fab"
          onClick={() => setShowFabModal(true)}
          aria-label="Add New Survey"
          style={{
            margin: '0 auto',
            boxShadow: '0 8px 24px rgba(74,123,255,0.18)',
            background: '#4a7bff',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: 64,
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            cursor: 'pointer',
            transition: 'background 0.2s, box-shadow 0.2s',
          }}
        >
          <FaPlus />
        </button>
        <div style={{
          marginTop: 10,
          fontSize: 16,
          fontWeight: 600,
          color: '#4a7bff',
          background: 'rgba(255,255,255,0.9)',
          borderRadius: 16,
          padding: '4px 18px',
          boxShadow: '0 2px 8px rgba(74,123,255,0.08)'
        }}>
          New / Review Old
        </div>
      </div>
      {/* FAB Modal */}
      {showFabModal && (
        <div style={{
          position: 'fixed',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.25)',
          zIndex: 300,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
          onClick={() => setShowFabModal(false)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '24px 24px 0 0',
              boxShadow: '0 -4px 24px rgba(80,120,200,0.10)',
              width: '100%',
              maxWidth: 420,
              padding: 32,
              marginBottom: 0,
              animation: 'slideUp 0.3s',
              border: 'none',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 8, color: '#222' }}>What would you like to do?</div>
            </div>
            <button
              className="primary-button"
              style={{ marginBottom: 16, fontSize: 18, fontWeight: 700 }}
              onClick={() => {
                setShowFabModal(false);
                onNewSurvey();
              }}
            >
              + New Survey
            </button>
            <button
              className="secondary-button"
              style={{ marginBottom: 24, fontSize: 17, fontWeight: 600 }}
              onClick={() => {}}
              disabled={incompleteSurveys.length === 0}
            >
              Review Old ({incompleteSurveys.length})
            </button>
            {incompleteSurveys.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: '#4a7bff' }}>Incomplete Surveys</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {incompleteSurveys.map((survey, idx) => (
                    <div key={idx} style={{
                      background: '#f8f8f8',
                      borderRadius: 14,
                      padding: 16,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 10,
                      boxShadow: '0 1px 4px rgba(80,120,200,0.04)'
                    }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{survey.pageName || 'Untitled'}</div>
                        <div style={{ fontSize: 13, color: '#4a7bff', wordBreak: 'break-all' }}>{survey.pageUrl}</div>
                      </div>
                      <button
                        className="primary-button"
                        style={{ width: 90, fontSize: 14, padding: '8px 0', margin: 0 }}
                        onClick={() => handleResumeSurvey(survey)}
                      >
                        Resume
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button
              className="secondary-button"
              style={{ marginTop: 32, fontSize: 16 }}
              onClick={() => setShowFabModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
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

      {showAdminPanel && (
        <AdminPanel onClose={() => setShowAdminPanel(false)} />
      )}
    </>
  );
};

export default Dashboard; 