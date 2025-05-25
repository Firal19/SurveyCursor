import React, { useState } from 'react';

const MedicationDetails = ({ medication, onDone }) => {
  const [dosage, setDosage] = useState('100 unit/ml solution');
  const [packageType, setPackageType] = useState('10ml vial');
  const [quantity, setQuantity] = useState('1');
  const [frequency, setFrequency] = useState('Every month');

  return (
    <div className="card card-wide">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <div className="medication-icon" style={{ marginRight: 16 }}>💊</div>
        <h1 style={{ margin: 0 }}>Humalog</h1>
      </div>

      <p>Tell us about this medication.</p>

      <div className="form-group">
        <label className="form-label">Dosage</label>
        <div className="dropdown">
          <button className="dropdown-toggle" type="button">
            {dosage}
          </button>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Package</label>
        <div className="dropdown">
          <button className="dropdown-toggle" type="button">
            {packageType}
          </button>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Quantity</label>
          <input
            type="text"
            className="form-input"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Frequency</label>
          <div className="dropdown">
            <button className="dropdown-toggle" type="button">
              {frequency}
            </button>
          </div>
        </div>
      </div>

      <div className="button-group">
        <button className="primary-button" onClick={onDone}>
          Done
        </button>
        <button className="secondary-button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MedicationDetails; 