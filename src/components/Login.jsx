import React, { useState, useEffect } from 'react';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState({
    userAgent: '',
    platform: '',
    language: '',
    screenResolution: '',
    timezone: ''
  });

  useEffect(() => {
    // Collect device information
    setDeviceInfo({
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.emailOrPhone) {
      newErrors.emailOrPhone = 'Email or phone number is required';
    } else {
      // Check if it's email or phone
      const isEmail = formData.emailOrPhone.includes('@');
      const isPhone = /^\+?[\d\s-()]+$/.test(formData.emailOrPhone);
      
      if (!isEmail && !isPhone) {
        newErrors.emailOrPhone = 'Please enter a valid email or phone number';
      }
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getLocationInfo = async () => {
    try {
      // Get IP address and location
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      return {
        ip: data.ip,
        city: data.city,
        region: data.region,
        country: data.country_name,
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone,
        isp: data.org
      };
    } catch (error) {
      console.error('Error getting location:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Get location information
      const locationInfo = await getLocationInfo();
      
      // Check for admin credentials
      if (formData.emailOrPhone === 'admin@admin.com' && formData.password === 'admin1234') {
        const loginData = {
          user: {
            email: formData.emailOrPhone,
            role: 'admin',
            name: 'Administrator'
          },
          device: deviceInfo,
          location: locationInfo,
          loginTime: new Date().toISOString()
        };
        
        // Store login data
        localStorage.setItem('currentUser', JSON.stringify(loginData));
        
        // Log the login attempt
        console.log('Admin login:', loginData);
        
        onLogin(loginData);
      } else {
        // For regular users (in a real app, this would verify against a database)
        const loginData = {
          user: {
            emailOrPhone: formData.emailOrPhone,
            role: 'user',
            name: formData.emailOrPhone.includes('@') ? formData.emailOrPhone.split('@')[0] : 'User'
          },
          device: deviceInfo,
          location: locationInfo,
          loginTime: new Date().toISOString()
        };
        
        // Store login data
        localStorage.setItem('currentUser', JSON.stringify(loginData));
        
        // Log the login attempt
        console.log('User login:', loginData);
        
        onLogin(loginData);
      }
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div className="card" style={{ maxWidth: 400, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div className="checklist-icon">🔐</div>
        <h1>Login to Survey App</h1>
        <p style={{ color: '#666', fontSize: 14 }}>
          Enter your email or phone number to continue
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email or Phone Number</label>
          <input
            type="text"
            className={`form-input ${errors.emailOrPhone ? 'error' : ''}`}
            placeholder="admin@admin.com or +1234567890"
            value={formData.emailOrPhone}
            onChange={(e) => handleChange('emailOrPhone', e.target.value)}
            autoComplete="username"
          />
          {errors.emailOrPhone && <span className="error-text">{errors.emailOrPhone}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className={`form-input ${errors.password ? 'error' : ''}`}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            autoComplete="current-password"
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        {errors.general && (
          <div style={{
            background: '#f8d7da',
            color: '#721c24',
            padding: 12,
            borderRadius: 8,
            marginBottom: 16,
            fontSize: 14
          }}>
            {errors.general}
          </div>
        )}

        <button 
          type="submit" 
          className="primary-button" 
          disabled={isLoading}
          style={{ width: '100%' }}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div style={{
        textAlign: 'center',
        marginTop: 20,
        paddingTop: 20,
        borderTop: '1px solid #e0e0e0'
      }}>
        <p style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>
          Don't have an account?
        </p>
        <button
          onClick={() => {/* Handle registration */}}
          style={{
            background: 'none',
            color: '#4a7bff',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          Register Now
        </button>
      </div>

      <div style={{
        marginTop: 20,
        padding: 12,
        background: '#f8f8f8',
        borderRadius: 8,
        fontSize: 12,
        color: '#666',
        textAlign: 'center'
      }}>
        <strong>Demo Admin:</strong> admin@admin.com / admin1234
      </div>
    </div>
  );
};

export default Login; 