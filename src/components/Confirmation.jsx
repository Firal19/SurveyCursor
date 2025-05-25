import React, { useState } from 'react';

const Confirmation = ({ data, onNext, onBack }) => {
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = () => {
    if (confirmed) {
      onNext({ confirmed: true });
    }
  };

  const getCategoryName = (categoryId) => {
    const categoryNames = {
      'agriculture': 'Agriculture/Farming',
      'automotive': 'Automotive/Cars',
      'restaurant': 'Restaurant/Food',
      'retail': 'Shops/Retail',
      'real-estate': 'Real Estate/Property',
      'technology': 'Technology',
      'tourism': 'Tourism',
      'medical-equipment': 'Medical Equipment & Lab',
      'ecommerce': 'E-Commerce',
      'event-decoration': 'Event & Decoration'
    };
    return categoryNames[categoryId] || categoryId;
  };

  const getEarnings = () => {
    const followers = parseInt(data.basicInfo.followers);
    if (followers >= 50000) return 20;
    return 10;
  };

  return (
    <div className="card card-wide">
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: window.innerWidth < 480 ? 16 : 24,
        flexWrap: 'wrap',
        gap: 12
      }}>
        <div style={{ 
          background: '#4a7bff', 
          color: 'white', 
          padding: window.innerWidth < 480 ? '6px 12px' : '8px 16px', 
          borderRadius: 20,
          fontSize: window.innerWidth < 480 ? 13 : 14,
          marginRight: 'auto'
        }}>
          Section 5: Confirmation
        </div>
      </div>

      <h1>Review your submission</h1>
      <p>Please review all the information before submitting.</p>

      <div className="confirmation-summary">
        <div className="summary-section">
          <div className="summary-title">Basic Information</div>
          <div className="summary-content">
            <strong>Page Name:</strong> {data.basicInfo.pageName}<br/>
            <strong>Followers:</strong> {data.basicInfo.followers.toLocaleString()}<br/>
            <strong>Language:</strong> {data.basicInfo.language}<br/>
            <strong>URL:</strong> <a href={data.basicInfo.pageUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#4a7bff', wordBreak: 'break-all' }}>
              {data.basicInfo.pageUrl}
            </a>
          </div>
        </div>

        <div className="summary-section">
          <div className="summary-title">Business Category</div>
          <div className="summary-content">
            <strong>Category:</strong> {getCategoryName(data.businessCategory)}<br/>
            <strong>Services:</strong> {data.specificServices.join(', ')}
          </div>
        </div>

        <div className="summary-section">
          <div className="summary-title">Page Quality</div>
          <div className="summary-content">
            <strong>Overall Quality:</strong> {data.pageQuality.overallQuality}<br/>
            <strong>Post Frequency:</strong> {data.pageQuality.postFrequency}<br/>
            <strong>Engagement:</strong> {data.pageQuality.engagementLevel}<br/>
            <strong>Content Types:</strong> {data.pageQuality.contentType.join(', ')}
          </div>
        </div>

        <div className="summary-section">
          <div className="summary-title">Main Products/Services</div>
          <div className="summary-content">
            {data.pageQuality.mainProducts}
          </div>
        </div>
      </div>

      <div style={{ 
        background: '#d4edda', 
        padding: 16, 
        borderRadius: 12, 
        marginBottom: 20,
        textAlign: 'center'
      }}>
        <div style={{ fontSize: 14, color: '#155724', marginBottom: 4 }}>
          Expected Earnings for this submission:
        </div>
        <div style={{ fontSize: 28, fontWeight: 700, color: '#155724' }}>
          {getEarnings()} ETB
        </div>
        <div style={{ fontSize: 12, color: '#155724', marginTop: 4 }}>
          {parseInt(data.basicInfo.followers) >= 50000 ? '(Big page bonus!)' : '(Regular page)'}
        </div>
      </div>

      <div className="confirmation-checkbox">
        <input
          type="checkbox"
          id="confirm"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
        />
        <label htmlFor="confirm">
          I confirm that all the information provided is accurate and taken directly from the Facebook page. I understand that false or inaccurate information may result in rejection and affect my future submissions.
        </label>
      </div>

      <div className="button-group">
        <button className="secondary-button" onClick={onBack}>
          Previous
        </button>
        <button 
          className="primary-button" 
          onClick={handleSubmit}
          disabled={!confirmed}
          style={{ 
            background: confirmed ? '#28a745' : '#ccc',
            cursor: confirmed ? 'pointer' : 'not-allowed'
          }}
        >
          Submit Survey
        </button>
      </div>
    </div>
  );
};

export default Confirmation; 