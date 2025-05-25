import React from 'react';

const Analytics = ({ stats, onClose }) => {
  const monthlyData = [
    { month: 'Jan', submitted: 45, approved: 42, earnings: 420 },
    { month: 'Feb', submitted: 52, approved: 48, earnings: 480 },
    { month: 'Mar', submitted: 38, approved: 35, earnings: 350 },
    { month: 'Apr', submitted: 61, approved: 58, earnings: 580 },
    { month: 'May', submitted: 55, approved: 51, earnings: 510 },
    { month: 'Jun', submitted: 42, approved: 38, earnings: 380 }
  ];

  const categoryStats = [
    { category: 'Restaurant/Food', count: 28, percentage: 23 },
    { category: 'Retail/Shop', count: 22, percentage: 18 },
    { category: 'Technology', count: 18, percentage: 15 },
    { category: 'Real Estate', count: 15, percentage: 12 },
    { category: 'Others', count: 39, percentage: 32 }
  ];

  const approvalRate = Math.round((stats.approved / stats.submitted) * 100);
  const avgEarningsPerSurvey = Math.round(stats.earnings / stats.approved);

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
      zIndex: 1000,
      overflowY: 'auto'
    }}>
      <div style={{
        background: 'white',
        borderRadius: 16,
        maxWidth: 600,
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
          <h2 style={{ margin: 0 }}>Analytics Dashboard</h2>
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
          {/* Key Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 12,
            marginBottom: 24
          }}>
            <div style={{
              background: '#e8f0ff',
              padding: 16,
              borderRadius: 12,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#4a7bff' }}>
                {approvalRate}%
              </div>
              <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>
                Approval Rate
              </div>
            </div>
            <div style={{
              background: '#d4edda',
              padding: 16,
              borderRadius: 12,
              textAlign: 'center'
            }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#155724' }}>
                {avgEarningsPerSurvey} ETB
              </div>
              <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>
                Avg per Survey
              </div>
            </div>
          </div>

          {/* Monthly Trend */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ marginBottom: 16 }}>Monthly Performance</h3>
            <div style={{
              background: '#f8f8f8',
              padding: 16,
              borderRadius: 12
            }}>
              {monthlyData.map((month, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: index < monthlyData.length - 1 ? 12 : 0
                }}>
                  <div style={{ width: 40, fontSize: 13, color: '#666' }}>
                    {month.month}
                  </div>
                  <div style={{ flex: 1, marginRight: 12 }}>
                    <div style={{
                      height: 20,
                      background: '#e0e0e0',
                      borderRadius: 10,
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <div style={{
                        width: `${(month.approved / 60) * 100}%`,
                        height: '100%',
                        background: '#4a7bff',
                        borderRadius: 10,
                        transition: 'width 0.5s ease'
                      }} />
                      <span style={{
                        position: 'absolute',
                        left: 8,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: 11,
                        color: 'white',
                        fontWeight: 600
                      }}>
                        {month.approved}
                      </span>
                    </div>
                  </div>
                  <div style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#333',
                    minWidth: 60,
                    textAlign: 'right'
                  }}>
                    {month.earnings} ETB
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Distribution */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ marginBottom: 16 }}>Top Categories</h3>
            <div style={{
              background: '#f8f8f8',
              padding: 16,
              borderRadius: 12
            }}>
              {categoryStats.map((cat, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: index < categoryStats.length - 1 ? 12 : 0
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: 14,
                      fontWeight: 600,
                      marginBottom: 4
                    }}>
                      {cat.category}
                    </div>
                    <div style={{
                      height: 8,
                      background: '#e0e0e0',
                      borderRadius: 4,
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${cat.percentage}%`,
                        height: '100%',
                        background: '#28a745',
                        borderRadius: 4,
                        transition: 'width 0.5s ease'
                      }} />
                    </div>
                  </div>
                  <div style={{
                    marginLeft: 16,
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#333',
                    minWidth: 50,
                    textAlign: 'right'
                  }}>
                    {cat.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div style={{
            background: '#fff3cd',
            padding: 16,
            borderRadius: 12,
            marginTop: 24
          }}>
            <strong style={{ display: 'block', marginBottom: 8, color: '#856404' }}>
              💡 Performance Tip
            </strong>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: '#856404' }}>
              Your approval rate is {approvalRate > 90 ? 'excellent' : approvalRate > 80 ? 'good' : 'improving'}! 
              {approvalRate < 90 && ' Focus on double-checking follower counts and ensuring all information is accurate to improve your rate.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 