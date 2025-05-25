import React from 'react';

const StepComplete = ({ onContinue }) => {
  return (
    <div className="card">
      <div className="success-illustration">
        <span className="success-icon">👍</span>
        <div className="confetti">
          {/* Add confetti elements here if needed */}
        </div>
      </div>

      <h1 style={{ textAlign: 'center' }}>Nice work!</h1>
      <p style={{ textAlign: 'center' }}>You've completed the first step.</p>

      <button className="primary-button" onClick={onContinue}>
        Continue
      </button>
    </div>
  );
};

export default StepComplete; 