import React, { useState, useEffect } from 'react';

const BusinessCategory = ({ data, onNext, onBack, dailyGoal }) => {
  const [selectedCategory, setSelectedCategory] = useState(dailyGoal?.category || '');
  const [quotaReached, setQuotaReached] = useState(false);
  const [totalReached, setTotalReached] = useState(false);
  const [entriesNeeded, setEntriesNeeded] = useState(0);

  const categories = [
    { id: 'agriculture', name: 'Agriculture/Farming', icon: '🌾' },
    { id: 'automotive', name: 'Automotive/Cars', icon: '🚗' },
    { id: 'digital-media', name: 'Digital Media/YouTube', icon: '📹' },
    { id: 'ecommerce', name: 'E-Commerce', icon: '🛒' },
    { id: 'equipment-rental', name: 'Equipment Rental', icon: '🔧' },
    { id: 'event-decoration', name: 'Event & Decoration', icon: '🎉' },
    { id: 'furniture', name: 'Furniture & Interiors', icon: '🛋️' },
    { id: 'import-export', name: 'Import/Export Trade', icon: '📦' },
    { id: 'interior-design', name: 'Interior Design', icon: '🎨' },
    { id: 'job-market', name: 'Job Market/Employment', icon: '💼' },
    { id: 'medical-equipment', name: 'Medical Equipment & Lab', icon: '🏥' },
    { id: 'news-media', name: 'News & Media', icon: '📰' },
    { id: 'real-estate', name: 'Real Estate/Property', icon: '🏠' },
    { id: 'restaurant', name: 'Restaurant/Food', icon: '🍽️' },
    { id: 'retail', name: 'Shops/Retail', icon: '🏪' },
    { id: 'scholarships', name: 'Scholarships & Internships', icon: '🎓' },
    { id: 'sports-fitness', name: 'Sports & Fitness', icon: '⚽' },
    { id: 'stock-market', name: 'Stock Market/Investments', icon: '📈' },
    { id: 'tech-repair', name: 'Tech Repair', icon: '🔧' },
    { id: 'technology', name: 'Technology', icon: '💻' },
    { id: 'tender', name: 'Tender/Bidding', icon: '📋' },
    { id: 'tourism', name: 'Tourism', icon: '✈️' }
  ];

  useEffect(() => {
    // Check quota logic (simulate with localStorage for now)
    const entries = JSON.parse(localStorage.getItem('surveyEntries') || '[]');
    const cat = dailyGoal?.category?.en;
    const catCount = entries.filter(e => e.mainCategory === cat).length;
    setQuotaReached(catCount >= 50);
    setTotalReached(entries.length >= 1000);
    setEntriesNeeded(50 - catCount);
  }, [dailyGoal]);

  const handleNext = () => {
    if (!selectedCategory || quotaReached || totalReached) return;
    onNext({ mainCategory: selectedCategory });
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
          Section 2: Business Category
        </div>
      </div>

      <h1>What type of business is this?</h1>
      <p>Select the category that best describes this Facebook page.</p>

      {dailyGoal?.category ? (
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontWeight: 600 }}>Main Category:</span> {dailyGoal.category.en} <span style={{ color: '#888' }}>| {dailyGoal.category.am}</span>
        </div>
      ) : (
        <div className="category-grid">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-item ${selectedCategory === category.id ? 'selected' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </button>
          ))}
        </div>
      )}

      {dailyGoal?.category && !quotaReached && (
        <div style={{ color: '#4a7bff', marginBottom: 8 }}>
          {entriesNeeded} more needed for this section.
        </div>
      )}
      {quotaReached && (
        <div style={{ color: 'red', marginBottom: 8 }}>
          Quota reached for this category (50 entries). Please try another day or reset your goal.
        </div>
      )}
      {totalReached && (
        <div style={{ color: 'red', marginBottom: 8 }}>
          Total entry limit reached (1000 entries). Please try again later.
        </div>
      )}

      <div className="button-group">
        <button className="secondary-button" onClick={onBack}>
          Previous
        </button>
        <button 
          className="primary-button" 
          onClick={handleNext}
          disabled={!selectedCategory || quotaReached || totalReached}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BusinessCategory; 