import React, { useState, useEffect } from 'react';

const BasicInfo = ({ data, onNext, onBack, locked }) => {
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState({});
  const [duplicate, setDuplicate] = useState(null);
  const [duplicateConfirmed, setDuplicateConfirmed] = useState(false);

  useEffect(() => {
    if (formData.pageUrl && formData.pageUrl.includes('facebook.com')) {
      const entries = JSON.parse(localStorage.getItem('surveyEntries') || '[]');
      const found = entries.find(e => e.basicInfo && e.basicInfo.pageUrl === formData.pageUrl);
      setDuplicate(found || null);
      setDuplicateConfirmed(false);
    } else {
      setDuplicate(null);
      setDuplicateConfirmed(false);
    }
  }, [formData.pageUrl]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.pageUrl) {
      newErrors.pageUrl = 'Facebook page URL is required';
    } else if (!formData.pageUrl.includes('facebook.com')) {
      newErrors.pageUrl = 'Please enter a valid Facebook URL';
    }
    
    if (!formData.pageName) {
      newErrors.pageName = 'Page name is required';
    }
    
    if (!formData.followers) {
      newErrors.followers = 'Number of followers is required';
    } else if (parseInt(formData.followers) < 5000) {
      newErrors.followers = 'Page must have at least 5,000 followers';
    }
    
    if (!formData.lastActive) {
      newErrors.lastActive = 'Last active date is required';
    }
    
    if (!formData.aboutSection) {
      newErrors.aboutSection = 'About section is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      if (duplicate && !duplicateConfirmed) return;
      onNext(formData, duplicate ? { duplicate: true } : undefined);
    }
  };

  const handleConfirmDuplicate = () => {
    setDuplicateConfirmed(true);
    // Optionally update the entry in localStorage here
    // Award 2 birr logic can be handled in parent
    onNext(formData, { duplicate: true });
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
    if (field === 'pageUrl') {
      setDuplicateConfirmed(false);
    }
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
          Section 1: Basic Information
        </div>
      </div>

      <h1>Facebook Page Details</h1>
      <p>Enter the basic information about the Facebook business page.</p>

      <div className="form-group">
        <label className="form-label">
          Facebook Page URL <span style={{ color: 'red' }}>*</span>
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="url"
            className={`form-input ${errors.pageUrl ? 'error' : ''}`}
            placeholder="https://www.facebook.com/businesspage"
            value={formData.pageUrl}
            onChange={(e) => handleChange('pageUrl', e.target.value)}
            disabled={locked}
            style={locked ? { background: '#f0f0f0', color: '#888' } : {}}
          />
          {locked && <span title="Locked" style={{ color: '#4a7bff', fontSize: 18, marginLeft: 2 }}>🔒</span>}
        </div>
        {duplicate && !duplicateConfirmed && (
          <div style={{ background: '#fff3cd', color: '#856404', padding: 10, borderRadius: 8, marginTop: 8 }}>
            <strong>Duplicate Detected:</strong> This URL already exists.<br />
            <span style={{ fontSize: 13 }}>Page Name: {duplicate.basicInfo?.pageName || 'N/A'}</span><br />
            <span style={{ fontSize: 13 }}>Followers: {duplicate.basicInfo?.followers || 'N/A'}</span><br />
            <button className="primary-button" style={{ marginTop: 8 }} onClick={handleConfirmDuplicate}>
              Confirm/Update Duplicate (Get 2 birr)
            </button>
          </div>
        )}
        {duplicate && duplicateConfirmed && (
          <div style={{ color: 'green', marginTop: 8 }}>
            Duplicate confirmed. You will get 2 birr for updating this entry.
          </div>
        )}
        {locked && formData.pageUrl && (
          <button
            className="secondary-button"
            style={{ marginTop: 8, width: '100%' }}
            onClick={() => window.open(formData.pageUrl, '_blank')}
            type="button"
          >
            Visit Page
          </button>
        )}
        {errors.pageUrl && <span className="error-text">{errors.pageUrl}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">
          Page Name <span style={{ color: 'red' }}>*</span>
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="text"
            className={`form-input ${errors.pageName ? 'error' : ''}`}
            placeholder="Business name as shown on Facebook"
            value={formData.pageName}
            onChange={(e) => handleChange('pageName', e.target.value)}
            disabled={locked}
            style={locked ? { background: '#f0f0f0', color: '#888' } : {}}
          />
          {locked && <span title="Locked" style={{ color: '#4a7bff', fontSize: 18, marginLeft: 2 }}>🔒</span>}
        </div>
        {errors.pageName && <span className="error-text">{errors.pageName}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            Number of Followers <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="number"
            className={`form-input ${errors.followers ? 'error' : ''}`}
            placeholder="Minimum 5,000"
            value={formData.followers}
            onChange={(e) => handleChange('followers', e.target.value)}
            min="5000"
          />
          {errors.followers && <span className="error-text">{errors.followers}</span>}
        </div>
        
        <div className="form-group">
          <label className="form-label">
            Last Active Date <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="date"
            className={`form-input ${errors.lastActive ? 'error' : ''}`}
            value={formData.lastActive}
            onChange={(e) => handleChange('lastActive', e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
          {errors.lastActive && <span className="error-text">{errors.lastActive}</span>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          About Section <span style={{ color: 'red' }}>*</span>
        </label>
        <textarea
          className={`form-input ${errors.aboutSection ? 'error' : ''}`}
          placeholder="Copy the business description from their About section"
          value={formData.aboutSection}
          onChange={(e) => handleChange('aboutSection', e.target.value)}
          rows="4"
          style={{ resize: 'vertical' }}
        />
        {errors.aboutSection && <span className="error-text">{errors.aboutSection}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">Primary Language</label>
        <select
          className="form-input"
          value={formData.language}
          onChange={(e) => handleChange('language', e.target.value)}
        >
          <option value="English">English</option>
          <option value="Amharic">Amharic</option>
          <option value="Mixed">Mixed (Both)</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div style={{ 
        background: '#fff3cd', 
        padding: 12, 
        borderRadius: 8, 
        marginTop: 20,
        fontSize: 14,
        color: '#856404'
      }}>
        <strong>💡 Tip:</strong> Make sure the page has posted within the last 12 months and is a real business (not a personal profile).
      </div>

      <div className="button-group">
        <button className="secondary-button" onClick={onBack}>
          Previous
        </button>
        <button className="primary-button" onClick={handleSubmit} disabled={duplicate && !duplicateConfirmed}>
          Next
        </button>
      </div>
    </div>
  );
};

export default BasicInfo; 