import React, { useState, useEffect } from 'react';
import { mainCategories } from '../data/categories';
import { FaLock, FaMoneyBillWave, FaFileAlt, FaChevronRight } from 'react-icons/fa';

const getTimeElapsed = (setTime) => {
  if (!setTime) return null;
  const now = Date.now();
  const diff = now - setTime;
  if (diff <= 0) return '0m';
  const hours = Math.floor(diff / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  return `${hours}h ${minutes}m`;
};

const CircularProgress = ({ percent, size = 90, stroke = 7, color = '#4a7bff', bg = '#eaf6ff' }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ display: 'block' }}>
      <circle cx={size/2} cy={size/2} r={r} stroke={bg} strokeWidth={stroke} fill="none" />
      <circle
        cx={size/2}
        cy={size/2}
        r={r}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={c}
        strokeDashoffset={c - (percent/100)*c}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.7s cubic-bezier(.4,2,.6,1)' }}
      />
      <text x="50%" y="54%" textAnchor="middle" fontSize={size/3.2} fontWeight="700" fill={color} dy=".3em">{percent}%</text>
    </svg>
  );
};

const DailyGoalSection = ({ onGoalSet, language = 'en', locked: lockedProp, isAdmin }) => {
  const [goalType, setGoalType] = useState('pages');
  const [goal, setGoal] = useState('');
  const [category, setCategory] = useState('');
  const [locked, setLocked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [canReset, setCanReset] = useState(false);
  const [categoryProgress, setCategoryProgress] = useState(0);
  const [categoryTotal, setCategoryTotal] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(null);

  useEffect(() => {
    // Load from localStorage if set
    const saved = JSON.parse(localStorage.getItem('dailyGoal') || '{}');
    if (saved.goal && saved.category) {
      setGoal(saved.goal);
      setCategory(saved.category);
      setGoalType(saved.goalType || 'pages');
      setLocked(true);
    }
    // Check reset eligibility
    const setTimeVal = parseInt(localStorage.getItem('dailyGoalSetTime'), 10);
    if (isAdmin) {
      setCanReset(true);
    } else if (setTimeVal) {
      const now = Date.now();
      setCanReset(now - setTimeVal >= 12 * 60 * 60 * 1000); // 12 hours
      setTimeElapsed(getTimeElapsed(setTimeVal));
    } else {
      setCanReset(false);
      setTimeElapsed(null);
    }
    // Calculate category progress
    const entries = JSON.parse(localStorage.getItem('surveyEntries') || '[]');
    if (category && category.en) {
      const catEntries = entries.filter(e => e.category && (e.category.en === category.en || e.category.am === category.am));
      setCategoryProgress(catEntries.length);
      setCategoryTotal(goalType === 'pages' ? parseInt(goal) : Math.ceil((parseInt(goal) || 0) / 10)); // Assume 10 birr per page
    } else {
      setCategoryProgress(0);
      setCategoryTotal(0);
    }
  }, [isAdmin, category, goal, goalType]);

  // Use locked prop if provided (from Dashboard)
  const isLocked = typeof lockedProp === 'boolean' ? lockedProp : locked;
  const progressValue = categoryTotal > 0 ? Math.min(100, Math.round((categoryProgress / categoryTotal) * 100)) : 0;

  const handleSetGoal = () => {
    if (!goal || !category) return;
    localStorage.setItem('dailyGoal', JSON.stringify({ goal, category, goalType }));
    localStorage.setItem('dailyGoalSetTime', Date.now().toString());
    setLocked(true);
    setShowDetails(false);
    setCanReset(false);
    if (onGoalSet) onGoalSet({ goal, category, goalType });
  };

  const handleReset = () => {
    localStorage.removeItem('dailyGoal');
    localStorage.removeItem('dailyGoalSetTime');
    setGoal('');
    setCategory('');
    setLocked(false);
    setShowDetails(false);
    setCanReset(false);
  };

  // --- SET GOAL STATE ---
  if (!isLocked) {
    return (
      <div style={{
        width: '100%',
        maxWidth: 340,
        background: '#fff',
        borderRadius: 22,
        boxShadow: '0 4px 24px rgba(80,120,200,0.10)',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
        margin: '0 auto',
        position: 'relative',
        fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
        minHeight: 180,
        justifyContent: 'center',
      }}>
        <div style={{ width: '100%', textAlign: 'center', margin: '28px 0 0 0' }}>
          <div style={{ display: 'inline-flex', background: '#f7faff', borderRadius: 16, boxShadow: '0 1px 4px #eaf6ff', overflow: 'hidden', marginBottom: 18 }}>
            <button
              className={goalType === 'pages' ? 'primary-button' : 'secondary-button'}
              style={{ fontSize: 15, padding: '10px 28px', fontWeight: 600, border: 'none', background: goalType === 'pages' ? '#4a7bff' : 'transparent', color: goalType === 'pages' ? '#fff' : '#4a7bff', borderRadius: 0, outline: 'none', transition: 'background 0.2s' }}
              onClick={() => setGoalType('pages')}
            >
              <FaFileAlt style={{ marginRight: 6, opacity: 0.7 }} /> {language === 'am' ? 'ገፆች' : 'Pages'}
            </button>
            <button
              className={goalType === 'birr' ? 'primary-button' : 'secondary-button'}
              style={{ fontSize: 15, padding: '10px 28px', fontWeight: 600, border: 'none', background: goalType === 'birr' ? '#4a7bff' : 'transparent', color: goalType === 'birr' ? '#fff' : '#4a7bff', borderRadius: 0, outline: 'none', transition: 'background 0.2s' }}
              onClick={() => setGoalType('birr')}
            >
              <FaMoneyBillWave style={{ marginRight: 6, opacity: 0.7 }} /> {language === 'am' ? 'ብር' : 'Birr'}
            </button>
          </div>
          <div style={{ margin: '0 auto', maxWidth: 220 }}>
            <input
              type="number"
              min={1}
              value={goal}
              onChange={e => setGoal(e.target.value)}
              style={{
                padding: 16,
                borderRadius: 16,
                border: '1.5px solid #eaf6ff',
                width: '100%',
                fontSize: 22,
                color: '#1a2340',
                background: '#fafdff',
                textAlign: 'center',
                fontWeight: 700,
                outline: 'none',
                marginBottom: 12,
                marginTop: 8,
                boxShadow: '0 1px 4px #eaf6ff',
                transition: 'border 0.2s',
              }}
              placeholder={goalType === 'pages' ? (language === 'am' ? 'ግብ (ገፆች)' : 'Goal (pages)') : (language === 'am' ? 'ግብ (ብር)' : 'Goal (birr)')}
            />
          </div>
          {goal && (
            <div style={{ fontSize: 13, color: '#8a97b3', marginBottom: 8, marginTop: -6, textAlign: 'center' }}>
              {goalType === 'pages'
                ? (language === 'am' ? '1 ገፅ = 1 ሙሉ የቢዝነስ ፎርም' : '1 page = 1 full business form')
                : (language === 'am' ? '10 ብር = 1 ገፅ' : '10 birr = 1 page')}
            </div>
          )}
          {goal && (
            <select
              value={category ? category[language] : ''}
              onChange={e => {
                const cat = mainCategories.find(c => c[language] === e.target.value);
                setCategory(cat);
              }}
              style={{
                padding: 13,
                borderRadius: 14,
                border: '1.5px solid #eaf6ff',
                minWidth: 180,
                marginBottom: 18,
                fontSize: 16,
                color: '#1a2340',
                background: '#fafdff',
                fontWeight: 600,
                boxShadow: '0 1px 4px #eaf6ff',
                outline: 'none',
                transition: 'border 0.2s',
                width: '100%',
              }}
            >
              <option value="">{language === 'am' ? 'ምድብ ይምረጡ...' : 'Select Category...'}</option>
              {mainCategories.map(cat => (
                <option key={cat[language]} value={cat[language]}>{cat[language]}</option>
              ))}
            </select>
          )}
          <button
            className="primary-button"
            onClick={handleSetGoal}
            style={{
              fontSize: 17,
              padding: '13px 0',
              borderRadius: 16,
              width: '100%',
              fontWeight: 700,
              marginBottom: 24,
              background: '#4a7bff',
              color: '#fff',
              boxShadow: '0 2px 8px rgba(74,123,255,0.10)',
              border: 'none',
              outline: 'none',
              transition: 'background 0.2s',
              opacity: goal && category ? 1 : 0.6,
              cursor: goal && category ? 'pointer' : 'not-allowed',
            }}
            disabled={!goal || !category}
          >
            {language === 'am' ? 'ግብ ያቀናብሩ' : 'Set Daily Goal'}
          </button>
        </div>
      </div>
    );
  }

  // --- PROGRESS STATE ---
  return (
    <div style={{
      width: '100%',
      maxWidth: 340,
      background: 'linear-gradient(135deg, #eaf6ff 60%, #fff 100%)',
      borderRadius: 22,
      boxShadow: '0 4px 24px rgba(80,120,200,0.12)',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 0,
      margin: '0 auto',
      position: 'relative',
      fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
      minHeight: 220,
      justifyContent: 'center',
    }}>
      {/* Lock icon and details button */}
      <div style={{ position: 'absolute', top: 18, right: 18, zIndex: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, outline: 'none' }}
          onClick={() => setShowDetails(true)}
          title={language === 'am' ? 'ዝርዝር ይመልከቱ' : 'View Details'}
        >
          <FaLock size={20} color="#4a7bff" />
        </button>
      </div>
      {/* Circular Progress */}
      <div style={{ margin: '38px 0 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <CircularProgress percent={progressValue} />
        <div style={{ fontSize: 18, fontWeight: 700, color: '#1a2340', marginTop: 10, marginBottom: 2, letterSpacing: 0.1 }}>
          {categoryProgress} / {categoryTotal} {goalType === 'pages' ? (language === 'am' ? 'ገፆች' : 'pages') : (language === 'am' ? 'ብር' : 'birr')}
        </div>
        <div style={{ fontSize: 13, color: '#4a7bff', fontWeight: 600, marginBottom: 2, letterSpacing: 0.1 }}>
          {language === 'am' ? 'የቀረው' : 'Remaining'}: <span style={{ color: '#1a2340', fontWeight: 700 }}>{Math.max(0, categoryTotal - categoryProgress)}</span>
        </div>
        <div style={{ fontSize: 13, color: '#8a97b3', fontWeight: 500, marginBottom: 2, letterSpacing: 0.1 }}>
          {language === 'am' ? 'የዕለቱ መጀመሪያ' : 'Time Elapsed'}: <span style={{ color: '#1a2340', fontWeight: 600 }}>{timeElapsed || (language === 'am' ? '0m' : '0m')}</span>
        </div>
        <button
          className="secondary-button"
          style={{ marginTop: 18, fontSize: 15, padding: '10px 0', borderRadius: 16, width: '80%', fontWeight: 700, background: '#eaf6ff', color: '#4a7bff', border: 'none', outline: 'none', transition: 'background 0.2s' }}
          onClick={() => setShowDetails(true)}
        >
          {language === 'am' ? 'ዝርዝር ይመልከቱ' : 'View Details'} <FaChevronRight style={{ marginLeft: 6, fontSize: 13, verticalAlign: 'middle' }} />
        </button>
      </div>
      {/* Details Modal */}
      {showDetails && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.18)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
          onClick={() => setShowDetails(false)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 22,
              boxShadow: '0 8px 32px 4px rgba(80,120,200,0.18)',
              minWidth: 260,
              maxWidth: 340,
              width: '90vw',
              padding: 32,
              position: 'relative',
              animation: 'fadeIn 0.3s',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ fontWeight: 700, fontSize: 20, color: '#4a7bff', marginBottom: 18 }}>{language === 'am' ? 'ዝርዝር' : 'Progress Details'}</div>
            <div style={{ fontSize: 16, color: '#1a2340', fontWeight: 700, marginBottom: 10 }}>{categoryProgress} / {categoryTotal} {goalType === 'pages' ? (language === 'am' ? 'ገፆች' : 'pages') : (language === 'am' ? 'ብር' : 'birr')}</div>
            <div style={{ fontSize: 14, color: '#4a7bff', fontWeight: 600, marginBottom: 8 }}>{language === 'am' ? 'የቀረው' : 'Remaining'}: <span style={{ color: '#1a2340', fontWeight: 700 }}>{Math.max(0, categoryTotal - categoryProgress)}</span></div>
            <div style={{ fontSize: 14, color: '#8a97b3', fontWeight: 500, marginBottom: 8 }}>{language === 'am' ? 'የዕለቱ መጀመሪያ' : 'Time Elapsed'}: <span style={{ color: '#1a2340', fontWeight: 600 }}>{timeElapsed || (language === 'am' ? '0m' : '0m')}</span></div>
            {(canReset || isAdmin) && (
              <button className="primary-button" onClick={handleReset} style={{ marginTop: 18, fontSize: 15, padding: '10px 0', borderRadius: 16, width: '100%', fontWeight: 700, background: '#4a7bff', color: '#fff', border: 'none', outline: 'none', transition: 'background 0.2s' }}>
                {language === 'am' ? 'ዳግም ይሞክሩ' : 'Reset Goal'}
              </button>
            )}
            <button
              className="secondary-button"
              style={{ marginTop: 18, fontSize: 15, padding: '10px 0', borderRadius: 16, width: '100%', fontWeight: 700, background: '#eaf6ff', color: '#4a7bff', border: 'none', outline: 'none', transition: 'background 0.2s' }}
              onClick={() => setShowDetails(false)}
            >
              {language === 'am' ? 'ዝጋ' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyGoalSection; 