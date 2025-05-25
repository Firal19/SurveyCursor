import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle,
  Search, Filter, ChevronRight, Plus, ArrowUpRight, ArrowDownLeft,
  Sparkles, Trophy, Target, Zap, Star, MessageSquare, Tag
} from 'lucide-react';
import Analytics from './Analytics';
import PrefilledSurvey from './PrefilledSurvey';

const WalletDashboard = ({ stats, onNewSurvey, onLogout, userName = "User" }) => {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedPrefilled, setSelectedPrefilled] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showKeywords, setShowKeywords] = useState(false);
  const [keywords, setKeywords] = useState(['Restaurant', 'Technology', 'Fashion', 'Real Estate']);
  const [newKeyword, setNewKeyword] = useState('');

  // Only show last 3 submissions
  const recentSubmissions = [
    { id: 1, name: 'Blue Nile Restaurant', status: 'approved', earnings: 10, date: '2 hours ago', category: 'Restaurant' },
    { id: 2, name: 'Addis Real Estate', status: 'pending', earnings: 20, date: '5 hours ago', category: 'Real Estate' },
    { id: 3, name: 'Tech Hub Ethiopia', status: 'approved', earnings: 10, date: 'Yesterday', category: 'Technology' }
  ];

  const preFilledPages = [
    { id: 1, name: 'Addis Tech Solutions', category: 'Technology', followers: '12.5K', url: 'https://facebook.com/addistech' },
    { id: 2, name: 'Ethiopian Coffee Export', category: 'Agriculture', followers: '8.2K', url: 'https://facebook.com/ethcoffee' },
    { id: 3, name: 'Habesha Fashion Store', category: 'Retail', followers: '25.3K', url: 'https://facebook.com/habeshafashion' }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredSubmissions = recentSubmissions.filter(submission => {
    if (selectedFilter !== 'all' && submission.status !== selectedFilter) return false;
    if (searchQuery && !submission.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleAddKeyword = () => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword]);
      setNewKeyword('');
    }
  };

  const handlePrefilledComplete = (verificationData) => {
    console.log('Prefilled survey completed:', verificationData);
    setSelectedPrefilled(null);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
        {/* Header */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-40"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Survey Wallet</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowKeywords(!showKeywords)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Tag className="w-5 h-5 text-gray-600" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAnalytics(true)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <TrendingUp className="w-5 h-5 text-gray-600" />
                </motion.button>
                <button
                  onClick={onLogout}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </motion.header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back, {userName}! 👋
            </h2>
            <p className="text-gray-600">Track your earnings and manage your surveys</p>
          </motion.div>

          {/* Wallet Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-600 via-purple-700 to-blue-700 rounded-3xl p-8 mb-8 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl -ml-24 -mb-24" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-purple-200 text-sm mb-1">Total Balance</p>
                  <motion.h3 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    className="text-4xl font-bold"
                  >
                    {stats.earnings} ETB
                  </motion.h3>
                </div>
                <Wallet className="w-12 h-12 text-purple-200" />
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                  <p className="text-purple-200 text-xs mb-1">Submitted</p>
                  <p className="text-xl font-semibold">{stats.submitted}</p>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                  <p className="text-purple-200 text-xs mb-1">Approved</p>
                  <p className="text-xl font-semibold">{stats.approved}</p>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                  <p className="text-purple-200 text-xs mb-1">Pending</p>
                  <p className="text-xl font-semibold">{stats.pending}</p>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                  <p className="text-purple-200 text-xs mb-1">Success Rate</p>
                  <p className="text-xl font-semibold">
                    {Math.round((stats.approved / stats.submitted) * 100)}%
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Keywords Section */}
          <AnimatePresence>
            {showKeywords && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Saved Keywords</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {keywords.map((keyword, index) => (
                    <motion.span
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                    >
                      {keyword}
                    </motion.span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
                    placeholder="Add new keyword..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddKeyword}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Add
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
            {['overview', 'recent', 'prefilled'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {/* Quick Actions */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={onNewSurvey}
                  className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl p-6 text-white cursor-pointer"
                >
                  <Plus className="w-8 h-8 mb-3" />
                  <h4 className="text-lg font-semibold mb-1">New Survey</h4>
                  <p className="text-purple-100 text-sm">Start earning now</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 cursor-pointer"
                >
                  <Trophy className="w-8 h-8 mb-3 text-yellow-500" />
                  <h4 className="text-lg font-semibold mb-1">Achievements</h4>
                  <p className="text-gray-600 text-sm">3 new badges</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 cursor-pointer"
                >
                  <Target className="w-8 h-8 mb-3 text-green-500" />
                  <h4 className="text-lg font-semibold mb-1">Daily Goal</h4>
                  <p className="text-gray-600 text-sm">3/5 surveys</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 cursor-pointer"
                >
                  <Zap className="w-8 h-8 mb-3 text-purple-500" />
                  <h4 className="text-lg font-semibold mb-1">Streak</h4>
                  <p className="text-gray-600 text-sm">7 days 🔥</p>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'recent' && (
              <motion.div
                key="recent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search submissions..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                {/* Recent Submissions */}
                <div className="space-y-4">
                  {filteredSubmissions.map((submission, index) => (
                    <motion.div
                      key={submission.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{submission.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{submission.date}</span>
                            <span>•</span>
                            <span>{submission.category}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {submission.earnings > 0 && (
                            <motion.span 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-lg font-semibold text-gray-900"
                            >
                              +{submission.earnings} ETB
                            </motion.span>
                          )}
                          <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(submission.status)}`}>
                            {getStatusIcon(submission.status)}
                            {submission.status}
                          </span>
                        </div>
                      </div>
                      {submission.status === 'rejected' && (
                        <div className="mt-3 p-3 bg-red-50 rounded-lg">
                          <p className="text-sm text-red-800">
                            <MessageSquare className="inline w-4 h-4 mr-1" />
                            Reason: Incorrect follower count
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'prefilled' && (
              <motion.div
                key="prefilled"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {preFilledPages.map((page, index) => (
                  <motion.div
                    key={page.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                    onClick={() => setSelectedPrefilled(page)}
                    className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{page.name}</h4>
                        <p className="text-sm text-gray-600">{page.category}</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Quick
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {page.followers} followers
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-green-600">+5 ETB</span>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Action Button */}
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onNewSurvey}
            className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full shadow-lg flex items-center justify-center text-white"
          >
            <Plus className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Modals */}
      {showAnalytics && (
        <Analytics 
          stats={stats} 
          onClose={() => setShowAnalytics(false)} 
        />
      )}

      {selectedPrefilled && (
        <PrefilledSurvey
          pageData={selectedPrefilled}
          onComplete={handlePrefilledComplete}
          onCancel={() => setSelectedPrefilled(null)}
        />
      )}
    </>
  );
};

export default WalletDashboard; 