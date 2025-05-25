import React, { useState } from 'react';

const MailOrder = ({ onNext, onBack }) => {
  const [selected, setSelected] = useState('yes');

  const handleNext = () => {
    onNext({ mailOrder: selected === 'yes' });
  };

  return (
    <div className="card">
      <h1>Do you mail order your medications?</h1>

      <div className="radio-group">
        <div 
          className={`radio-option ${selected === 'yes' ? 'selected' : ''}`}
          onClick={() => setSelected('yes')}
        >
          <input
            type="radio"
            className="radio-input"
            checked={selected === 'yes'}
            onChange={() => setSelected('yes')}
          />
          <label className="radio-label">Yes</label>
        </div>

        <div 
          className={`radio-option ${selected === 'no' ? 'selected' : ''}`}
          onClick={() => setSelected('no')}
        >
          <input
            type="radio"
            className="radio-input"
            checked={selected === 'no'}
            onChange={() => setSelected('no')}
          />
          <label className="radio-label">No</label>
        </div>
      </div>

      <div className="button-group">
        <button className="secondary-button" onClick={onBack}>
          Previous
        </button>
        <button className="primary-button" onClick={handleNext}>
          ✓ Done
        </button>
      </div>
    </div>
  );
};

export default MailOrder; 