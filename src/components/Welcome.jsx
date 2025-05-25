import React, { useState } from 'react';
import Guidelines from './Guidelines';

const Welcome = ({ onNext, onDashboard }) => {
  const [showGuidelines, setShowGuidelines] = useState(false);
  
  const surveySteps = [
    { id: 1, text: 'Basic Information', description: "Facebook page URL, name, followers" },
    { id: 2, text: 'Business Category', description: "What type of business is it?" },
    { id: 3, text: 'Specific Services', description: "Detailed products/services" },
    { id: 4, text: 'Page Quality', description: "Content and engagement analysis" },
    { id: 5, text: 'Confirmation', description: "Review and submit" }
  ];

  return (
    <>
      <div className="card">
        <button 
          className="dashboard-button" 
          onClick={onDashboard}
          style={{ 
            float: 'right', 
            background: '#4a7bff',
            color: 'white',
            padding: '8px 16px',
            borderRadius: 20,
            fontSize: 14,
            marginBottom: 16
          }}
        >
          📊 Dashboard
        </button>
        
        <div className="checklist-icon">💰</div>
        
        <h2>Facebook Page Survey</h2>
        <h1>Earn money by finding business pages!</h1>
        
        <div style={{ 
          background: '#e8f0ff', 
          padding: 16, 
          borderRadius: 12, 
          marginBottom: 20,
          fontSize: window.innerWidth < 480 ? 14 : 15
        }}>
          <div style={{ marginBottom: 8 }}>
            <strong>💵 Earnings per page:</strong>
          </div>
          <div style={{ paddingLeft: 16 }}>
            • Regular page (5K+ followers): <strong>10 ETB</strong><br/>
            • Big page (50K+ followers): <strong>20 ETB</strong><br/>
            • Pre-filled page: <strong>5 ETB</strong>
          </div>
        </div>

        <h3 style={{ marginBottom: 12 }}>Survey Steps:</h3>
        <div className="checklist">
          {surveySteps.map((item) => (
            <div key={item.id} className="checklist-item">
              <div className="checklist-number">
                {item.id}
              </div>
              <div className="checklist-text">
                <div style={{ fontWeight: 600 }}>{item.text}</div>
                <div style={{ fontSize: window.innerWidth < 480 ? 13 : 14, color: '#666', marginTop: 4 }}>
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="primary-button" onClick={onNext}>
          Start New Survey
        </button>

        <div style={{ 
          textAlign: 'center', 
          marginTop: 16, 
          fontSize: 13, 
          color: '#666' 
        }}>
          <button 
            onClick={() => setShowGuidelines(true)}
            style={{ 
              color: '#4a7bff', 
              textDecoration: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 'inherit'
            }}
          >
            View Guidelines & Tips
          </button>
        </div>
      </div>

      {showGuidelines && (
        <Guidelines onClose={() => setShowGuidelines(false)} />
      )}
    </>
  );
};

export default Welcome; 