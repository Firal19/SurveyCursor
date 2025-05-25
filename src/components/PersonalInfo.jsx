import React, { useState } from 'react';

const PersonalInfo = ({ data, onNext, onBack }) => {
  const [address, setAddress] = useState(data.address);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSubmit = () => {
    onNext({ address });
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
          ≡ Personal Info
        </div>
        <button className="help-button" style={{ marginBottom: 0 }}>
          Help
        </button>
      </div>

      <h1>Confirm your address.</h1>
      <p>This info lets us find the best providers and plans in your area.</p>

      <div className="form-group">
        <label className="form-label" style={{ fontWeight: 600, fontSize: window.innerWidth < 480 ? 15 : 16 }}>
          Home address
        </label>
        
        <div className="form-group">
          <label className="form-label">Street Address</label>
          <input
            type="text"
            className="form-input"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-input"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">State</label>
            <input
              type="text"
              className="form-input"
              value={address.state}
              onChange={(e) => setAddress({ ...address, state: e.target.value })}
              maxLength="2"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Zip Code</label>
            <input
              type="text"
              className="form-input"
              value={address.zip}
              onChange={(e) => setAddress({ ...address, zip: e.target.value })}
              maxLength="5"
              inputMode="numeric"
            />
          </div>
        </div>

        <button className="add-button">
          Add a shipping address
        </button>
      </div>

      <div className="form-group">
        <label className="form-label">County</label>
        <div className="dropdown">
          <button
            className="dropdown-toggle"
            onClick={() => setShowDropdown(!showDropdown)}
            type="button"
          >
            {address.county}
          </button>
          {showDropdown && (
            <div className="dropdown-menu">
              <div 
                className="dropdown-item"
                onClick={() => {
                  setAddress({ ...address, county: 'Los Angeles' });
                  setShowDropdown(false);
                }}
              >
                Los Angeles
              </div>
              <div 
                className="dropdown-item"
                onClick={() => {
                  setAddress({ ...address, county: 'Orange' });
                  setShowDropdown(false);
                }}
              >
                Orange
              </div>
              <div 
                className="dropdown-item"
                onClick={() => {
                  setAddress({ ...address, county: 'San Bernardino' });
                  setShowDropdown(false);
                }}
              >
                San Bernardino
              </div>
              <div 
                className="dropdown-item"
                onClick={() => {
                  setAddress({ ...address, county: 'Riverside' });
                  setShowDropdown(false);
                }}
              >
                Riverside
              </div>
            </div>
          )}
        </div>
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

export default PersonalInfo; 