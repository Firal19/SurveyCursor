import React from 'react';

const Guidelines = ({ onClose }) => {
  const guidelines = [
    {
      title: "Page Requirements",
      icon: "📋",
      items: [
        "Minimum 5,000 followers",
        "Must be a business page (not personal profile)",
        "Active within the last 12 months",
        "Clear business information in About section"
      ]
    },
    {
      title: "Quality Tips",
      icon: "⭐",
      items: [
        "Double-check follower count",
        "Copy information exactly as shown",
        "Include all relevant services",
        "Be honest about page quality"
      ]
    },
    {
      title: "Common Mistakes",
      icon: "⚠️",
      items: [
        "Submitting personal profiles",
        "Wrong follower count",
        "Incomplete information",
        "Duplicate submissions"
      ]
    },
    {
      title: "Earning More",
      icon: "💰",
      items: [
        "Focus on pages with 50K+ followers (2x earnings)",
        "Complete pre-filled surveys quickly",
        "Submit multiple surveys daily",
        "Maintain high approval rate"
      ]
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: 16,
        maxWidth: 500,
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative'
      }}>
        <div style={{
          position: 'sticky',
          top: 0,
          background: 'white',
          padding: '20px 20px 16px',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h2 style={{ margin: 0 }}>Survey Guidelines</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: 24,
              color: '#666',
              cursor: 'pointer',
              padding: 0,
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%'
            }}
          >
            ×
          </button>
        </div>

        <div style={{ padding: 20 }}>
          {guidelines.map((section, index) => (
            <div key={index} style={{ marginBottom: 24 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 12
              }}>
                <span style={{ fontSize: 24 }}>{section.icon}</span>
                <h3 style={{ margin: 0, fontSize: 18 }}>{section.title}</h3>
              </div>
              <ul style={{
                margin: 0,
                paddingLeft: 20,
                listStyle: 'none'
              }}>
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} style={{
                    position: 'relative',
                    paddingLeft: 20,
                    marginBottom: 8,
                    fontSize: 14,
                    color: '#333',
                    lineHeight: 1.5
                  }}>
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: '#4a7bff'
                    }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div style={{
            background: '#e8f0ff',
            padding: 16,
            borderRadius: 12,
            marginTop: 24
          }}>
            <strong style={{ display: 'block', marginBottom: 8 }}>
              Pro Tip: Save Time! 💡
            </strong>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5 }}>
              Use the browser's autofill feature to quickly fill common fields. 
              Keep a notepad with frequently used information like common business 
              categories and services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guidelines; 