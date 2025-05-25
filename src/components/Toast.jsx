import React, { useEffect } from 'react';

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#28a745';
      case 'error':
        return '#dc3545';
      case 'warning':
        return '#ffc107';
      default:
        return '#17a2b8';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '!';
      default:
        return 'ℹ';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      background: getBackgroundColor(),
      color: 'white',
      padding: '12px 24px',
      borderRadius: 30,
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      minWidth: 200,
      maxWidth: '90%',
      zIndex: 1000,
      animation: 'slideUp 0.3s ease'
    }}>
      <span style={{
        width: 24,
        height: 24,
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
      }}>
        {getIcon()}
      </span>
      <span style={{ fontSize: 14 }}>{message}</span>
    </div>
  );
};

export default Toast; 