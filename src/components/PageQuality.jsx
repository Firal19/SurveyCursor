import React, { useState } from 'react';

const PageQuality = ({ data, onNext, onBack }) => {
  const [formData, setFormData] = useState(data);
  const [errors, setErrors] = useState({});

  const qualityOptions = ['Poor', 'Fair', 'Good', 'Excellent'];
  const frequencyOptions = ['Rarely', 'Monthly', 'Weekly', 'Daily'];
  const engagementOptions = ['Very Low', 'Low', 'Medium', 'High'];
  const contentTypes = ['Photos', 'Videos', 'Text Posts', 'Live Videos', 'Stories', 'Events'];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.overallQuality) {
      newErrors.overallQuality = 'Please rate the overall quality';
    }
    
    if (!formData.contentFocus) {
      newErrors.contentFocus = 'Content focus is required';
    }
    
    if (!formData.lastPostDate) {
      newErrors.lastPostDate = 'Last post date is required';
    }
    
    if (!formData.lastPostUrl) {
      newErrors.lastPostUrl = 'Last post URL is required';
    }
    
    if (!formData.mainProducts) {
      newErrors.mainProducts = 'Main products/services description is required';
    }
    
    if (!formData.postFrequency) {
      newErrors.postFrequency = 'Please select post frequency';
    }
    
    if (!formData.engagementLevel) {
      newErrors.engagementLevel = 'Please select engagement level';
    }
    
    if (formData.contentType.length === 0) {
      newErrors.contentType = 'Please select at least one content type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const toggleContentType = (type) => {
    const currentTypes = formData.contentType || [];
    if (currentTypes.includes(type)) {
      handleChange('contentType', currentTypes.filter(t => t !== type));
    } else {
      handleChange('contentType', [...currentTypes, type]);
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
          Section 4: Page Quality Check
        </div>
      </div>

      <h1>Analyze the page quality</h1>
      <p>Evaluate the content and engagement of this Facebook page.</p>

      <div className="form-group">
        <label className="form-label">
          Overall Page Quality <span style={{ color: 'red' }}>*</span>
        </label>
        <div className="quality-rating">
          {qualityOptions.map((option) => (
            <button
              key={option}
              className={`quality-option ${formData.overallQuality === option ? 'selected' : ''}`}
              onClick={() => handleChange('overallQuality', option)}
            >
              {option}
            </button>
          ))}
        </div>
        {errors.overallQuality && <span className="error-text">{errors.overallQuality}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">
          Content Focus <span style={{ color: 'red' }}>*</span>
        </label>
        <textarea
          className={`form-input ${errors.contentFocus ? 'error' : ''}`}
          placeholder="What type of content do they mainly post? (e.g., product showcases, promotions, educational content)"
          value={formData.contentFocus}
          onChange={(e) => handleChange('contentFocus', e.target.value)}
          rows="3"
        />
        {errors.contentFocus && <span className="error-text">{errors.contentFocus}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">
            Last Post Date <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="date"
            className={`form-input ${errors.lastPostDate ? 'error' : ''}`}
            value={formData.lastPostDate}
            onChange={(e) => handleChange('lastPostDate', e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
          {errors.lastPostDate && <span className="error-text">{errors.lastPostDate}</span>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">
          Last Post URL <span style={{ color: 'red' }}>*</span>
        </label>
        <input
          type="url"
          className={`form-input ${errors.lastPostUrl ? 'error' : ''}`}
          placeholder="https://www.facebook.com/..."
          value={formData.lastPostUrl}
          onChange={(e) => handleChange('lastPostUrl', e.target.value)}
        />
        {errors.lastPostUrl && <span className="error-text">{errors.lastPostUrl}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">
          Main Products/Services <span style={{ color: 'red' }}>*</span>
        </label>
        <textarea
          className={`form-input ${errors.mainProducts ? 'error' : ''}`}
          placeholder="List their main products or services based on their posts"
          value={formData.mainProducts}
          onChange={(e) => handleChange('mainProducts', e.target.value)}
          rows="3"
        />
        {errors.mainProducts && <span className="error-text">{errors.mainProducts}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">
          Post Frequency <span style={{ color: 'red' }}>*</span>
        </label>
        <div className="quality-rating">
          {frequencyOptions.map((option) => (
            <button
              key={option}
              className={`quality-option ${formData.postFrequency === option ? 'selected' : ''}`}
              onClick={() => handleChange('postFrequency', option)}
            >
              {option}
            </button>
          ))}
        </div>
        {errors.postFrequency && <span className="error-text">{errors.postFrequency}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">
          Engagement Level <span style={{ color: 'red' }}>*</span>
        </label>
        <div className="quality-rating">
          {engagementOptions.map((option) => (
            <button
              key={option}
              className={`quality-option ${formData.engagementLevel === option ? 'selected' : ''}`}
              onClick={() => handleChange('engagementLevel', option)}
            >
              {option}
            </button>
          ))}
        </div>
        {errors.engagementLevel && <span className="error-text">{errors.engagementLevel}</span>}
      </div>

      <div className="form-group">
        <label className="form-label">
          Content Types <span style={{ color: 'red' }}>*</span>
        </label>
        <div className="service-grid">
          {contentTypes.map((type) => (
            <div
              key={type}
              className={`service-item ${(formData.contentType || []).includes(type) ? 'selected' : ''}`}
              onClick={() => toggleContentType(type)}
            >
              <input
                type="checkbox"
                className="service-checkbox"
                checked={(formData.contentType || []).includes(type)}
                onChange={() => toggleContentType(type)}
                onClick={(e) => e.stopPropagation()}
              />
              <label className="service-label">{type}</label>
            </div>
          ))}
        </div>
        {errors.contentType && <span className="error-text">{errors.contentType}</span>}
      </div>

      <div className="button-group">
        <button className="secondary-button" onClick={onBack}>
          Previous
        </button>
        <button className="primary-button" onClick={handleSubmit}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PageQuality; 