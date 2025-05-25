import React from 'react';

const SurveyComplete = ({ onNewSurvey, onDashboard }) => {
  return (
    <div className="card">
      <div style={{ textAlign: 'center' }}>
        <div style={{ 
          width: window.innerWidth < 480 ? 100 : 120, 
          height: window.innerWidth < 480 ? 100 : 120, 
          background: '#28a745',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          marginBottom: window.innerWidth < 480 ? 20 : 24,
          position: 'relative'
        }}>
          <span style={{ fontSize: window.innerWidth < 480 ? 50 : 60 }}>✓</span>
          
          {/* Confetti decoration */}
          <div style={{ position: 'absolute', top: -20, left: -20 }}>
            <span style={{ fontSize: 20 }}>🎉</span>
          </div>
          <div style={{ position: 'absolute', top: -10, right: -10 }}>
            <span style={{ fontSize: 16 }}>✨</span>
          </div>
          <div style={{ position: 'absolute', bottom: -10, left: -10 }}>
            <span style={{ fontSize: 18 }}>🎊</span>
          </div>
          <div style={{ position: 'absolute', bottom: -20, right: -20 }}>
            <span style={{ fontSize: 20 }}>💰</span>
          </div>
        </div>

        <h1>Survey Submitted!</h1>
        <p style={{ marginBottom: 24 }}>
          Great job! Your survey has been submitted for review.
        </p>

        <div style={{ 
          background: '#e8f0ff', 
          padding: 16, 
          borderRadius: 12, 
          marginBottom: 24,
          fontSize: 14
        }}>
          <strong>What happens next?</strong>
          <div style={{ marginTop: 8, textAlign: 'left' }}>
            • Your submission will be reviewed within 24-48 hours<br/>
            • You'll receive a notification once approved<br/>
            • Payment will be added to your account immediately after approval
          </div>
        </div>

        <button 
          className="primary-button" 
          onClick={onNewSurvey}
          style={{ marginBottom: 12 }}
        >
          Submit Another Survey
        </button>

        <button 
          onClick={onDashboard}
          style={{ 
            background: 'none',
            color: '#4a7bff',
            padding: '12px 24px',
            fontSize: 15,
            fontWeight: 600,
            width: '100%'
          }}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SurveyComplete; 