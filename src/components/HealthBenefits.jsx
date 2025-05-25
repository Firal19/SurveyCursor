import React from 'react';

const HealthBenefits = ({ benefits, onNext }) => {
  const StarRating = ({ rating }) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={`star ${star <= rating ? 'filled' : ''}`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  const isMobile = window.innerWidth < 480;

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: isMobile ? 12 : 16,
      width: '100%',
      maxWidth: 800,
      margin: '0 auto'
    }}>
      <div className="card">
        <div style={{ 
          width: isMobile ? 50 : 60, 
          height: isMobile ? 50 : 60, 
          background: '#4a7bff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          marginBottom: isMobile ? 16 : 24,
          color: 'white',
          fontSize: isMobile ? 20 : 24
        }}>
          👂
        </div>

        <h2 style={{ textAlign: 'center' }}>Hearing benefits</h2>
        <p style={{ marginBottom: 8, textAlign: 'center' }}>Extremely important</p>
        <StarRating rating={benefits.hearing} />
      </div>

      <div className="card">
        <div style={{ 
          width: isMobile ? 50 : 60, 
          height: isMobile ? 50 : 60, 
          background: '#4a7bff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          marginBottom: isMobile ? 16 : 24,
          color: 'white',
          fontSize: isMobile ? 20 : 24
        }}>
          👁️
        </div>

        <h2 style={{ textAlign: 'center' }}>Vision benefits</h2>
        <p style={{ marginBottom: 8, textAlign: 'center' }}>Somewhat important</p>
        <StarRating rating={benefits.vision} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: isMobile ? 12 : 20 }}>
        <button className="primary-button" style={{ maxWidth: 200, marginTop: 0 }} onClick={onNext}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default HealthBenefits; 