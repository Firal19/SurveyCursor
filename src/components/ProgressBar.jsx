import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      zIndex: 100,
      padding: '12px 16px'
    }}>
      <div style={{
        maxWidth: 600,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }}>
        <div style={{
          flex: 1,
          height: 6,
          background: '#e0e0e0',
          borderRadius: 3,
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: '#4a7bff',
            transition: 'width 0.3s ease',
            borderRadius: 3
          }} />
        </div>
        <span style={{
          fontSize: 13,
          color: '#666',
          fontWeight: 500,
          minWidth: 60
        }}>
          {currentStep}/{totalSteps}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar; 