import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Welcome from './components/Welcome';
import BasicInfo from './components/BasicInfo';
import BusinessCategory from './components/BusinessCategory';
import SpecificServices from './components/SpecificServices';
import PageQuality from './components/PageQuality';
import Confirmation from './components/Confirmation';
import SurveyComplete from './components/SurveyComplete';
import Dashboard from './components/Dashboard';
import ProgressBar from './components/ProgressBar';
import Toast from './components/Toast';
import { mainCategories } from './data/categories';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentStep, setCurrentStep] = useState('welcome');
  const [showDashboard, setShowDashboard] = useState(false);
  const [toast, setToast] = useState(null);
  const [surveyData, setSurveyData] = useState({
    basicInfo: {
      pageUrl: '',
      pageName: '',
      followers: '',
      lastActive: '',
      aboutSection: '',
      language: 'English'
    },
    businessCategory: null,
    specificServices: [],
    pageQuality: {
      overallQuality: null,
      contentFocus: '',
      lastPostDate: '',
      lastPostUrl: '',
      mainProducts: '',
      postFrequency: null,
      engagementLevel: null,
      contentType: []
    },
    confirmed: false
  });

  const [userStats, setUserStats] = useState({
    submitted: 42,
    approved: 38,
    rejected: 4,
    earnings: 380,
    pending: 3
  });

  const [resumeLocked, setResumeLocked] = useState(false);

  const [dailyGoal, setDailyGoal] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('dailyGoal') || '{}');
    return saved.category ? saved : null;
  });

  const [categoryQuota, setCategoryQuota] = useState({});
  const [totalEntries, setTotalEntries] = useState(0);
  const [duplicateUrl, setDuplicateUrl] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setCurrentUser(userData);
      setIsAuthenticated(true);
      showToast(`Welcome back, ${userData.user.name}!`, 'success');
    }
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('surveyDraft');
    if (savedData && currentStep !== 'welcome' && currentStep !== 'complete' && isAuthenticated) {
      const parsed = JSON.parse(savedData);
      setSurveyData(parsed);
      showToast('Draft restored from previous session', 'info');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (currentStep !== 'welcome' && currentStep !== 'complete' && isAuthenticated) {
      localStorage.setItem('surveyDraft', JSON.stringify(surveyData));
    }
  }, [surveyData, currentStep, isAuthenticated]);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const handleLogin = (loginData) => {
    setCurrentUser(loginData);
    setIsAuthenticated(true);
    showToast(`Welcome, ${loginData.user.name}!`, 'success');
    
    // Log login information
    console.log('Login successful:', {
      user: loginData.user,
      device: loginData.device,
      location: loginData.location,
      time: loginData.loginTime
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentStep('welcome');
    setShowDashboard(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('surveyDraft');
    showToast('Logged out successfully', 'info');
  };

  const getStepNumber = () => {
    const steps = {
      'basicInfo': 1,
      'businessCategory': 2,
      'specificServices': 3,
      'pageQuality': 4,
      'confirmation': 5
    };
    return steps[currentStep] || 0;
  };

  const handleStepComplete = (step, data, options) => {
    setSurveyData(prev => ({
      ...prev,
      [step]: data
    }));

    // Duplicate logic for BasicInfo
    if (step === 'basicInfo' && options && options.duplicate) {
      // Award 2 birr
      setUserStats(prev => ({ ...prev, earnings: prev.earnings + 2 }));
      showToast('Duplicate confirmed. You earned 2 birr!', 'success');
      // Update duplicate entry in localStorage
      const entries = JSON.parse(localStorage.getItem('surveyEntries') || '[]');
      const idx = entries.findIndex(e => e.basicInfo && e.basicInfo.pageUrl === data.pageUrl);
      if (idx !== -1) {
        entries[idx].basicInfo = data;
        localStorage.setItem('surveyEntries', JSON.stringify(entries));
      }
    }

    // Navigate to next step
    switch (step) {
      case 'welcome':
        setCurrentStep('basicInfo');
        break;
      case 'basicInfo':
        setCurrentStep('businessCategory');
        showToast('Basic information saved', 'success');
        break;
      case 'businessCategory':
        setCurrentStep('specificServices');
        showToast('Business category selected', 'success');
        break;
      case 'specificServices':
        setCurrentStep('pageQuality');
        showToast('Services saved', 'success');
        break;
      case 'pageQuality':
        setCurrentStep('confirmation');
        showToast('Quality assessment complete', 'success');
        break;
      case 'confirmation':
        setCurrentStep('complete');
        // Clear draft after submission
        localStorage.removeItem('surveyDraft');
        // Update user stats
        setUserStats(prev => ({
          ...prev,
          submitted: prev.submitted + 1,
          pending: prev.pending + 1
        }));
        showToast('Survey submitted successfully!', 'success');
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'basicInfo':
        setCurrentStep('welcome');
        break;
      case 'businessCategory':
        setCurrentStep('basicInfo');
        break;
      case 'specificServices':
        setCurrentStep('businessCategory');
        break;
      case 'pageQuality':
        setCurrentStep('specificServices');
        break;
      case 'confirmation':
        setCurrentStep('pageQuality');
        break;
      default:
        break;
    }
  };

  const startNewSurvey = () => {
    setSurveyData({
      basicInfo: {
        pageUrl: '',
        pageName: '',
        followers: '',
        lastActive: '',
        aboutSection: '',
        language: 'English'
      },
      businessCategory: null,
      specificServices: [],
      pageQuality: {
        overallQuality: null,
        contentFocus: '',
        lastPostDate: '',
        lastPostUrl: '',
        mainProducts: '',
        postFrequency: null,
        engagementLevel: null,
        contentType: []
      },
      confirmed: false
    });
    setCurrentStep('basicInfo');
    showToast('Starting new survey', 'info');
  };

  const handleResumeSurvey = (incompleteSurvey) => {
    setSurveyData({
      ...surveyData,
      basicInfo: {
        ...surveyData.basicInfo,
        pageUrl: incompleteSurvey.pageUrl,
        pageName: incompleteSurvey.pageName,
        followers: incompleteSurvey.followers || '',
        lastActive: incompleteSurvey.lastActive || '',
        aboutSection: incompleteSurvey.aboutSection || '',
        language: incompleteSurvey.language || 'English',
      },
      businessCategory: null,
      specificServices: [],
      pageQuality: {
        overallQuality: null,
        contentFocus: '',
        lastPostDate: '',
        lastPostUrl: '',
        mainProducts: '',
        postFrequency: null,
        engagementLevel: null,
        contentType: []
      },
      confirmed: false
    });
    setCurrentStep('businessCategory');
    setShowDashboard(false);
    setResumeLocked(true);
    showToast('Resuming incomplete survey', 'info');
  };

  const handleGoalSet = (goalObj) => {
    setDailyGoal(goalObj);
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="container">
        <Login onLogin={handleLogin} />
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </div>
    );
  }

  if (showDashboard) {
    return (
      <div className="container">
        {/* User info bar */}
        {currentUser && currentUser.user && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            background: 'white',
            borderBottom: '1px solid #e0e0e0',
            padding: '12px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 99
          }}>
            <div style={{ fontSize: 14 }}>
              <strong>{currentUser.user.name}</strong>
              {currentUser.user.role === 'admin' && (
                <span style={{
                  background: '#dc3545',
                  color: 'white',
                  padding: '2px 8px',
                  borderRadius: 12,
                  fontSize: 11,
                  marginLeft: 8
                }}>
                  ADMIN
                </span>
              )}
            </div>
            <button
              onClick={handleLogout}
              style={{
                background: '#6c757d',
                color: 'white',
                padding: '6px 16px',
                borderRadius: 20,
                fontSize: 13,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        )}
        
        <div style={{ paddingTop: 60 }}>
          <Dashboard 
            stats={userStats} 
            currentUser={currentUser}
            onNewSurvey={() => {
              setShowDashboard(false);
              setCurrentStep('welcome');
              setResumeLocked(false);
            }}
            onResumeSurvey={handleResumeSurvey}
            onBack={() => setShowDashboard(false)}
            onGoalSet={handleGoalSet}
          />
        </div>
        {toast && (
          <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={() => setToast(null)} 
          />
        )}
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <Welcome 
            onNext={() => handleStepComplete('welcome')} 
            onDashboard={() => setShowDashboard(true)}
          />
        );
      case 'basicInfo':
        return (
          <BasicInfo 
            data={surveyData.basicInfo} 
            onNext={(data) => handleStepComplete('basicInfo', data)}
            onBack={handleBack}
            locked={resumeLocked}
          />
        );
      case 'businessCategory':
        return (
          <BusinessCategory 
            selected={surveyData.businessCategory}
            onNext={(data) => handleStepComplete('businessCategory', data)}
            onBack={handleBack}
            dailyGoal={dailyGoal}
            onGoalSet={handleGoalSet}
          />
        );
      case 'specificServices':
        return (
          <SpecificServices 
            category={surveyData.businessCategory}
            selected={surveyData.specificServices}
            onNext={(data) => handleStepComplete('specificServices', data)}
            onBack={handleBack}
          />
        );
      case 'pageQuality':
        return (
          <PageQuality 
            data={surveyData.pageQuality}
            onNext={(data) => handleStepComplete('pageQuality', data)}
            onBack={handleBack}
          />
        );
      case 'confirmation':
        return (
          <Confirmation 
            data={surveyData}
            onNext={(data) => handleStepComplete('confirmation', data)}
            onBack={handleBack}
          />
        );
      case 'complete':
        return (
          <SurveyComplete 
            onNewSurvey={startNewSurvey}
            onDashboard={() => setShowDashboard(true)}
          />
        );
      default:
        return <Welcome onNext={() => handleStepComplete('welcome')} />;
    }
  };

  const showProgress = currentStep !== 'welcome' && currentStep !== 'complete' && !showDashboard;

  return (
    <>
      {showProgress && (
        <ProgressBar currentStep={getStepNumber()} totalSteps={5} />
      )}
      
      {/* User info bar */}
      {currentUser && currentUser.user && (
        <div style={{
          position: 'fixed',
          top: showProgress ? 50 : 0,
          left: 0,
          right: 0,
          background: 'white',
          borderBottom: '1px solid #e0e0e0',
          padding: '12px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 98
        }}>
          <div style={{ fontSize: 14 }}>
            <strong>{currentUser.user.name}</strong>
            {currentUser.user.role === 'admin' && (
              <span style={{
                background: '#dc3545',
                color: 'white',
                padding: '2px 8px',
                borderRadius: 12,
                fontSize: 11,
                marginLeft: 8
              }}>
                ADMIN
              </span>
            )}
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: '#6c757d',
              color: 'white',
              padding: '6px 16px',
              borderRadius: 20,
              fontSize: 13,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      )}
      
      <div className="container" style={{ paddingTop: showProgress ? 110 : 70 }}>
        {renderStep()}
      </div>
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </>
  );
}

export default App; 