import React, { useState } from 'react';

const SpecificServices = ({ category, selected, onNext, onBack }) => {
  const [selectedServices, setSelectedServices] = useState(selected || []);

  const servicesByCategory = {
    'agriculture': [
      'Crop farming', 'Livestock', 'Poultry', 'Dairy farming', 
      'Agricultural equipment', 'Seeds & fertilizers', 'Organic farming'
    ],
    'automotive': [
      'Car sales', 'Car rental', 'Auto parts', 'Car repair', 
      'Car wash', 'Driving school', 'Vehicle inspection'
    ],
    'restaurant': [
      'Fast food', 'Traditional food', 'Coffee shop', 'Bakery', 
      'Pizza', 'Fine dining', 'Food delivery', 'Catering'
    ],
    'retail': [
      'Clothing', 'Electronics', 'Books', 'Cosmetics', 
      'Jewelry', 'Shoes', 'Home goods', 'Toys'
    ],
    'real-estate': [
      'Property sales', 'Property rental', 'Real estate agency', 
      'Construction', 'Property management', 'Land sales'
    ],
    'technology': [
      'Software development', 'IT consulting', 'Web design', 
      'Mobile apps', 'Cloud services', 'Cybersecurity', 'Tech support'
    ],
    'tourism': [
      'Travel agency', 'Tour operator', 'Hotel', 'Guest house', 
      'Car rental', 'Tour guide', 'Travel insurance'
    ],
    'medical-equipment': [
      'Medical devices', 'Laboratory equipment', 'Hospital supplies', 
      'Diagnostic tools', 'Surgical instruments', 'Medical furniture'
    ],
    'ecommerce': [
      'Online marketplace', 'Dropshipping', 'Digital products', 
      'Subscription boxes', 'Online courses', 'Print on demand'
    ],
    'event-decoration': [
      'Wedding planning', 'Birthday parties', 'Corporate events', 
      'Floral arrangements', 'Stage decoration', 'Event rentals'
    ]
  };

  const services = servicesByCategory[category] || [
    'Service 1', 'Service 2', 'Service 3', 'Service 4'
  ];

  const toggleService = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleNext = () => {
    if (selectedServices.length > 0) {
      onNext(selectedServices);
    }
  };

  const getCategoryName = () => {
    const categoryNames = {
      'agriculture': 'Agriculture/Farming',
      'automotive': 'Automotive',
      'restaurant': 'Restaurant/Food',
      'retail': 'Retail/Shop',
      'real-estate': 'Real Estate',
      'technology': 'Technology',
      'tourism': 'Tourism',
      'medical-equipment': 'Medical Equipment',
      'ecommerce': 'E-Commerce',
      'event-decoration': 'Event & Decoration'
    };
    return categoryNames[category] || 'Business';
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
          Section 3: Specific Services
        </div>
      </div>

      <h1>What specific services do they offer?</h1>
      <p>Select all that apply for this {getCategoryName()} business.</p>

      <div className="service-grid">
        {services.map((service) => (
          <div
            key={service}
            className={`service-item ${selectedServices.includes(service) ? 'selected' : ''}`}
            onClick={() => toggleService(service)}
          >
            <input
              type="checkbox"
              className="service-checkbox"
              checked={selectedServices.includes(service)}
              onChange={() => toggleService(service)}
              onClick={(e) => e.stopPropagation()}
            />
            <label className="service-label">{service}</label>
          </div>
        ))}
      </div>

      <div style={{ 
        background: '#e8f0ff', 
        padding: 12, 
        borderRadius: 8, 
        marginTop: 16,
        fontSize: 14,
        color: '#1a5490'
      }}>
        <strong>📌 Note:</strong> Select at least one service that the business offers. Be specific based on their Facebook page content.
      </div>

      <div className="button-group">
        <button className="secondary-button" onClick={onBack}>
          Previous
        </button>
        <button 
          className="primary-button" 
          onClick={handleNext}
          disabled={selectedServices.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SpecificServices; 