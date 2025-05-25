import React, { useState } from 'react';

const PlanSatisfaction = ({ onNext }) => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const emojis = [
    { id: 1, emoji: '😢', label: '' },
    { id: 2, emoji: '😕', label: '' },
    { id: 3, emoji: '😐', label: '' },
    { id: 4, emoji: '😊', label: 'Fairly happy' },
    { id: 5, emoji: '😄', label: '' }
  ];

  const handleNext = () => {
    if (selectedEmoji) {
      onNext({ satisfaction: selectedEmoji });
    }
  };

  return (
    <div className="card">
      <button className="help-button" style={{ float: 'right', marginBottom: 0 }}>
        Help
      </button>

      <h1>How happy are you with Aurora Health Quartz Med Advantage Elite?</h1>
      <p>Select a face below.</p>

      <div className="emoji-selector">
        {emojis.map((item) => (
          <button
            key={item.id}
            className={`emoji-option ${selectedEmoji === item.id ? 'selected' : ''}`}
            onClick={() => setSelectedEmoji(item.id)}
          >
            {item.emoji}
            {item.label && <span className="emoji-label">{item.label}</span>}
          </button>
        ))}
      </div>

      <button 
        className="primary-button" 
        onClick={handleNext}
        disabled={!selectedEmoji}
      >
        Next
      </button>
    </div>
  );
};

export default PlanSatisfaction; 