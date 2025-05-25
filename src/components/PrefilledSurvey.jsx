import React, { useState } from 'react';

const PrefilledSurvey = ({ pageData, onComplete, onCancel }) => {
  const [verificationData, setVerificationData] = useState({
    stillActive: true,
    followerCountCorrect: true,
    categoryCorrect: true,
    additionalNotes: ''
  });

  const handleSubmit = () => {
    if (verificationData.stillActive && verificationData.followerCountCorrect && verificationData.categoryCorrect) {
      onComplete(verificationData);
    }
  };

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
          borderBottom: '1px solid #e0e0e0'
        }}>
          <h2 style={{ margin: 0 }}>Verify Pre-filled Survey</h2>
          <p style={{ margin: '8px 0 0', fontSize: 14, color: '#666' }}>
            Please verify the following information is still accurate
          </p>
        </div>

        <div style={{ padding: 20 }}>
          {/* Page Info */}
          <div style={{
            background: '#f8f8f8',
            padding: 16,
            borderRadius: 12,
            marginBottom: 20
          }}>
            <h3 style={{ margin: '0 0 12px', fontSize: 16 }}>
              {pageData.name}
            </h3>
            <div style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>
              <div><strong>Category:</strong> {pageData.category}</div>
              <div><strong>Followers:</strong> {pageData.followers}</div>
              <div><strong>URL:</strong> <a href={pageData.url} target="_blank" rel="noopener noreferrer" style={{ color: '#4a7bff' }}>
                View Page
              </a></div>
            </div>
          </div>

          {/* Verification Checklist */}
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ marginBottom: 12, fontSize: 16 }}>Please Verify:</h3>
            
            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: 16,
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={verificationData.stillActive}
                onChange={(e) => setVerificationData({
                  ...verificationData,
                  stillActive: e.target.checked
                })}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 10,
                  marginTop: 2,
                  flexShrink: 0
                }}
              />
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>
                  Page is still active
                </div>
                <div style={{ fontSize: 13, color: '#666' }}>
                  The page has posted within the last 12 months
                </div>
              </div>
            </label>

            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: 16,
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={verificationData.followerCountCorrect}
                onChange={(e) => setVerificationData({
                  ...verificationData,
                  followerCountCorrect: e.target.checked
                })}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 10,
                  marginTop: 2,
                  flexShrink: 0
                }}
              />
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>
                  Follower count is accurate
                </div>
                <div style={{ fontSize: 13, color: '#666' }}>
                  The page still has {pageData.followers} followers or more
                </div>
              </div>
            </label>

            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: 16,
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={verificationData.categoryCorrect}
                onChange={(e) => setVerificationData({
                  ...verificationData,
                  categoryCorrect: e.target.checked
                })}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 10,
                  marginTop: 2,
                  flexShrink: 0
                }}
              />
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>
                  Business category is correct
                </div>
                <div style={{ fontSize: 13, color: '#666' }}>
                  The page is still in the {pageData.category} category
                </div>
              </div>
            </label>
          </div>

          {/* Additional Notes */}
          <div style={{ marginBottom: 20 }}>
            <label style={{
              display: 'block',
              marginBottom: 8,
              fontSize: 14,
              fontWeight: 600
            }}>
              Additional Notes (Optional)
            </label>
            <textarea
              value={verificationData.additionalNotes}
              onChange={(e) => setVerificationData({
                ...verificationData,
                additionalNotes: e.target.value
              })}
              placeholder="Any changes or updates you noticed..."
              style={{
                width: '100%',
                padding: 12,
                border: '1px solid #e0e0e0',
                borderRadius: 8,
                fontSize: 14,
                resize: 'vertical',
                minHeight: 80
              }}
            />
          </div>

          {/* Earnings Info */}
          <div style={{
            background: '#d4edda',
            padding: 16,
            borderRadius: 12,
            marginBottom: 20,
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 14, color: '#155724', marginBottom: 4 }}>
              Earnings for this verification:
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#155724' }}>
              5 ETB
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: 12
          }}>
            <button
              onClick={onCancel}
              style={{
                flex: 1,
                padding: '12px 24px',
                background: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!verificationData.stillActive || !verificationData.followerCountCorrect || !verificationData.categoryCorrect}
              style={{
                flex: 1,
                padding: '12px 24px',
                background: verificationData.stillActive && verificationData.followerCountCorrect && verificationData.categoryCorrect ? '#28a745' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 600,
                cursor: verificationData.stillActive && verificationData.followerCountCorrect && verificationData.categoryCorrect ? 'pointer' : 'not-allowed'
              }}
            >
              Submit Verification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrefilledSurvey; 