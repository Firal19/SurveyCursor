import React, { useState, useEffect } from 'react';
import './App.css';
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

function App() {
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

  // Auto-save to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('surveyDraft');
    if (savedData && currentStep !== 'welcome' && currentStep !== 'complete') {
      const parsed = JSON.parse(savedData);
      setSurveyData(parsed);
      showToast('Draft restored from previous session', 'info');
    }
  }, []);

  useEffect(() => {
    if (currentStep !== 'welcome' && currentStep !== 'complete') {
      localStorage.setItem('surveyDraft', JSON.stringify(surveyData));
    }
  }, [surveyData, currentStep]);

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

  if (showDashboard) {
    return (
      <div className="container">
        <Dashboard 
          stats={userStats} 
          onNewSurvey={() => {
            setShowDashboard(false);
            setCurrentStep('welcome');
          }}
          onBack={() => setShowDashboard(false)}
        />
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
      <div className="container" style={{ paddingTop: showProgress ? 60 : 20 }}>
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