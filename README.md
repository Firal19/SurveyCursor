# Facebook Page Survey App - Mobile-First Survey Application

A modern, mobile-first web application where users earn money by finding and documenting Facebook business pages. Built with React and Vite, this app provides a smooth, user-friendly experience for surveyors to submit page information and track their earnings.

## Overview

This app allows surveyors to:
- Find qualifying Facebook business pages (5,000+ followers)
- Fill out detailed information about the pages
- Earn money for each approved submission
- Track their earnings and submission status

## Earnings Structure

- **Regular Page (5K-49K followers)**: 10 ETB per approved submission
- **Big Page (50K+ followers)**: 20 ETB per approved submission  
- **Pre-filled Page**: 5 ETB per completed submission

## Survey Process

### 1. Basic Information
- Facebook page URL
- Page name
- Number of followers (minimum 5,000)
- Last active date
- About section content
- Primary language

### 2. Business Category
Select from 20+ categories including:
- Agriculture/Farming
- Automotive/Cars
- Restaurant/Food
- Shops/Retail
- Real Estate
- Technology
- Tourism
- And more...

### 3. Specific Services
Choose detailed services based on the selected category (e.g., for restaurants: fast food, traditional food, coffee shop, etc.)

### 4. Page Quality Check
- Overall quality rating
- Content focus description
- Last post date and URL
- Main products/services
- Post frequency
- Engagement level
- Content types

### 5. Confirmation
Review all information and submit for approval

## Features

### Mobile-First Design
- Responsive layout optimized for mobile devices
- Touch-friendly interface with 48px minimum touch targets
- Smooth animations and transitions
- Works great on all screen sizes

### User Dashboard
- View total earnings
- Track submitted, approved, rejected, and pending surveys
- Access pre-filled pages for quick completion
- Monitor submission history

### Smart Validation
- Real-time form validation
- Prevents submission of pages under 5,000 followers
- Ensures all required fields are completed
- Validates Facebook URLs

### User Experience
- Progress indicators during loading
- Clear section navigation
- Helpful tips and guidelines
- Confirmation before submission

## Technical Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **CSS**: Custom mobile-first responsive styles
- **No external UI libraries**: Lightweight, custom components

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd facebook-page-survey-app

# Install dependencies
npm install
```

### Development
```bash
# Start the development server
npm run dev

# The app will be available at http://localhost:5173
```

### Build for Production
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Tips for Surveyors

1. **Check Requirements First**
   - Ensure the page has at least 5,000 followers
   - Verify it's a business page, not personal profile
   - Check that they've posted in the last 12 months

2. **Be Accurate**
   - Copy information exactly as shown on Facebook
   - Double-check URLs and follower counts
   - Take time to properly categorize the business

3. **Quality Matters**
   - Accurate submissions get approved faster
   - Poor quality submissions may be rejected
   - Consistent quality improves your approval rate

4. **Maximize Earnings**
   - Look for pages with 50K+ followers for double earnings
   - Complete pre-filled pages for quick money
   - Submit multiple surveys daily

## Language Support

The app supports both English and Amharic languages, with easy switching between them.

## Support

For help or questions, contact: support@fbsurvey.com

## License

MIT 