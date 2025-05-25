import React, { useState } from 'react';

const Medications = ({ medications: initialMedications, onNext }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [medications, setMedications] = useState(initialMedications || [
    { id: 1, name: 'Humalog', icon: '💊' },
    { id: 2, name: 'Cevimeline', icon: '💊' }
  ]);
  const [showResults, setShowResults] = useState(false);

  const availableMedications = [
    { name: 'Humira', icon: '💊' },
    { name: 'Humulin', icon: '💊' },
    { name: 'Humalog', icon: '💊' }
  ];

  const filteredMedications = availableMedications.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMedication = (med) => {
    const newMed = {
      id: medications.length + 1,
      name: med.name,
      icon: med.icon
    };
    setMedications([...medications, newMed]);
    setSearchTerm('');
    setShowResults(false);
  };

  const handleNext = () => {
    onNext({ medications, showDetails: true });
  };

  return (
    <>
      <div className="card">
        <div className="progress-indicator">
          <div className="progress-circle" style={{
            width: window.innerWidth < 480 ? 50 : 60,
            height: window.innerWidth < 480 ? 50 : 60,
            borderRadius: '50%',
            border: '3px solid #4a7bff',
            borderTopColor: 'transparent',
            margin: '0 auto'
          }}></div>
        </div>

        <p style={{ textAlign: 'center', color: '#666' }}>You're doing great!</p>
        <h1 style={{ textAlign: 'center' }}>Let's add your medications.</h1>
      </div>

      <div className="card">
        <h2>Search to add a medication.</h2>
        
        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="Search medications"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowResults(e.target.value.length > 0);
            }}
            onFocus={() => {
              if (searchTerm.length > 0) setShowResults(true);
            }}
          />
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </div>

        {showResults && searchTerm && (
          <div className="search-results">
            {filteredMedications.map((med, index) => (
              <div 
                key={index} 
                className="search-result-item"
                onClick={() => handleAddMedication(med)}
              >
                {med.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card card-wide">
        <h2>What medications are you currently taking?</h2>
        <p>Add all of your medications below.</p>

        <h3>My Medications ({medications.length})</h3>

        {medications.map((med) => (
          <div key={med.id} className="medication-item">
            <div className="medication-icon">{med.icon}</div>
            <div className="medication-name">{med.name}</div>
            <button style={{ 
              background: 'none', 
              padding: 8, 
              fontSize: 12,
              minWidth: 32,
              minHeight: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>▼</button>
          </div>
        ))}

        <button className="add-button" onClick={() => {}}>
          Add another medication
        </button>

        <button className="primary-button" onClick={handleNext}>
          Continue
        </button>
      </div>
    </>
  );
};

export default Medications; 