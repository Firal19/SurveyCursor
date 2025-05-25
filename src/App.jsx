import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import WalletDashboard from './components/WalletDashboard';
import Welcome from './components/Welcome';
import BasicInfo from './components/BasicInfo';
import BusinessCategory from './components/BusinessCategory';
import SpecificServices from './components/SpecificServices';
import PageQuality from './components/PageQuality';
import Confirmation from './components/Confirmation';
import SurveyComplete from './components/SurveyComplete';
import ProgressBar from './components/ProgressBar';
import Toast from './components/Toast';
import SuccessAnimation from './components/SuccessAnimation';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentStep, setCurrentStep] = useState('dashboard');
  const [toast, setToast] = useState(null);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [submissionAmount, setSubmissionAmount] = useState(0);
  
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

  // Check for saved auth
  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedUser = localStorage.getItem('currentUser');
    if (savedAuth === 'true' && savedUser) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Auto-save survey draft
  useEffect(() => {
    if (currentStep !== 'dashboard' && currentStep !== 'complete' && isAuthenticated) {
      localStorage.setItem('surveyDraft', JSON.stringify(surveyData));
    }
  }, [surveyData, currentStep, isAuthenticated]);

  const handleLogin = (credentials) => {
    setIsAuthenticated(true);
    setCurrentUser({ name: credentials.email.split('@')[0], email: credentials.email });
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('currentUser', JSON.stringify({ name: credentials.email.split('@')[0], email: credentials.email }));
    showToast('Welcome back!', 'success');
  };

  const handleRegister = (userData) => {
    setIsAuthenticated(true);
    setCurrentUser({ name: userData.name, email: userData.email });
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('currentUser', JSON.stringify({ name: userData.name, email: userData.email }));
    showToast('Account created successfully!', 'success');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('surveyDraft');
    setCurrentStep('dashboard');
    showToast('Logged out successfully', 'info');
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
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

  const handleStepComplete = (step, data) => {
    setSurveyData(prev => ({
      ...prev,
      [step]: data
    }));

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
        // Calculate earnings
        const followers = parseInt(surveyData.basicInfo.followers);
        const amount = followers >= 50000 ? 20 : 10;
        setSubmissionAmount(amount);
        
        // Show success animation
        setShowSuccessAnimation(true);
        
        // Clear draft
        localStorage.removeItem('surveyDraft');
        
        // Update stats with automatic approval (90% of the time)
        const isAutoApproved = Math.random() < 0.9;
        setUserStats(prev => ({
          ...prev,
          submitted: prev.submitted + 1,
          approved: isAutoApproved ? prev.approved + 1 : prev.approved,
          pending: isAutoApproved ? prev.pending : prev.pending + 1,
          earnings: isAutoApproved ? prev.earnings + amount : prev.earnings
        }));
        
        if (isAutoApproved) {
          showToast(`Survey approved! +${amount} ETB added to your wallet`, 'success');
        }
        break;
      default:
        break;
    }
  };

  const handleSuccessAnimationComplete = () => {
    setShowSuccessAnimation(false);
    setCurrentStep('complete');
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
    setCurrentStep('welcome');
  };

  // Show login/register if not authenticated
  if (!isAuthenticated) {
    if (showRegister) {
      return (
        <>
          <Register 
            onRegister={handleRegister} 
            onLogin={() => setShowRegister(false)} 
          />
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
    return (
      <>
        <Login 
          onLogin={handleLogin} 
          onRegister={() => setShowRegister(true)} 
        />
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

  // Show dashboard
  if (currentStep === 'dashboard') {
    return (
      <>
        <WalletDashboard 
          stats={userStats}
          userName={currentUser?.name || 'User'}
          onNewSurvey={startNewSurvey}
          onLogout={handleLogout}
        />
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

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <Welcome 
            onNext={() => handleStepComplete('welcome')} 
            onDashboard={() => setCurrentStep('dashboard')}
          />
        );
      case 'basicInfo':
        return (
          <BasicInfo 
            data={surveyData.basicInfo} 
            onNext={(data) => handleStepComplete('basicInfo', data)}
            onBack={handleBack}
          />
        );
      case 'businessCategory':
        return (
          <BusinessCategory 
            selected={surveyData.businessCategory}
            onNext={(data) => handleStepComplete('businessCategory', data)}
            onBack={handleBack}
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
            onDashboard={() => setCurrentStep('dashboard')}
          />
        );
      default:
        return null;
    }
  };

  const showProgress = currentStep !== 'welcome' && currentStep !== 'complete' && currentStep !== 'dashboard';

  return (
    <>
      {showProgress && (
        <ProgressBar currentStep={getStepNumber()} totalSteps={5} />
      )}
      <div className={showProgress ? "pt-16" : ""}>
        {renderStep()}
      </div>
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
      {showSuccessAnimation && (
        <SuccessAnimation 
          amount={submissionAmount} 
          onComplete={handleSuccessAnimationComplete} 
        />
      )}
    </>
  );
}

export default App; 