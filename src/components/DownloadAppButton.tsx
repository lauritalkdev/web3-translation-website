// components/DownloadAppButton.tsx
import React, { useState, useEffect } from 'react';

interface DownloadAppButtonProps {
  style?: React.CSSProperties;
  className?: string;
}

const DownloadAppButton: React.FC<DownloadAppButtonProps> = ({ style, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // APK file URL - GitHub Release direct download link
  const apkUrl = 'https://github.com/lauritalkdev/web3-translation-website/releases/download/v25.0.0/Lauritalk-App.apk';

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      setDownloadProgress(0);

      // Create a link element
      const link = document.createElement('a');
      link.href = apkUrl;
      link.download = 'Lauritalk-App.apk';
      link.setAttribute('download', 'Lauritalk-App.apk');
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      
      // Simulate download progress
      const progressInterval = setInterval(() => {
        setDownloadProgress((prev) => {
          if (prev === null) return 10;
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Complete the progress
      setTimeout(() => {
        clearInterval(progressInterval);
        setDownloadProgress(100);
        
        // Reset after 2 seconds
        setTimeout(() => {
          setDownloadProgress(null);
          setIsDownloading(false);
        }, 2000);
      }, 1000);

    } catch (error) {
      console.error('Download failed:', error);
      setIsDownloading(false);
      setDownloadProgress(null);
      alert('Failed to download the app. Please try again.');
    }
  };

  // Check if user is on mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div 
      className={className}
      style={{
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        ...style
      }}
    >
      {/* Download Card */}
      <div style={{
        backgroundColor: 'rgba(26, 26, 46, 0.7)',
        borderRadius: '1rem',
        padding: 'clamp(1.25rem, 4vw, 2rem)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background glow effect */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          zIndex: 0
        }}></div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Icon */}
          <div style={{
            width: 'clamp(60px, 12vw, 80px)',
            height: 'clamp(60px, 12vw, 80px)',
            borderRadius: '50%',
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto clamp(1rem, 3vw, 1.5rem)',
            fontSize: 'clamp(2rem, 6vw, 2.5rem)',
            border: '2px solid rgba(59, 130, 246, 0.5)',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
          }}>
            📱
          </div>

          {/* Title */}
          <h3 style={{ 
            fontSize: 'clamp(1.25rem, 4vw, 1.5rem)', 
            fontWeight: 'bold', 
            color: '#3B82F6',
            marginBottom: 'clamp(0.5rem, 2vw, 0.75rem)',
            lineHeight: '1.3'
          }}>
            Download Mobile App
          </h3>

          {/* Description */}
          <p style={{ 
            color: '#E5E7EB', 
            fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
            marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
            lineHeight: '1.5'
          }}>
            Get the full Lauritalk experience on your mobile device with text/voice translation, dialect translations, and push notifications.
          </p>

          {/* Mobile-specific instructions */}
          {isMobile && (
            <div style={{
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '0.75rem',
              padding: 'clamp(0.75rem, 2vw, 1rem)',
              marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
              fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
              textAlign: 'left'
            }}>
              <p style={{ 
                color: '#86EFAC', 
                margin: '0 0 0.5rem 0',
                fontWeight: 'bold',
                fontSize: 'clamp(0.85rem, 2.5vw, 0.95rem)'
              }}>
                📱 Mobile Instructions:
              </p>
              <ul style={{ 
                color: '#E5E7EB', 
                paddingLeft: '1.5rem',
                margin: 0,
                lineHeight: '1.5'
              }}>
                <li>Allow "Install from Unknown Sources" in settings</li>
                <li>Open downloaded file to install</li>
                <li>Sign in with your existing account</li>
              </ul>
            </div>
          )}

          {/* Features */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '0.75rem',
            marginBottom: 'clamp(1rem, 3vw, 1.5rem)'
          }}>
            {[
              { icon: '🎤', label: 'Text/Voice Translation' },
              { icon: '🌐', label: 'Offline Mode' },
              { icon: '🗣️', label: 'Dialects Translation' },
              { icon: '⚡', label: 'Fast & Smooth' }
            ].map((feature, index) => (
              <div key={index} style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '0.5rem',
                padding: '0.75rem',
                textAlign: 'center'
              }}>
                <div style={{ 
                  fontSize: '1.5rem', 
                  marginBottom: '0.25rem' 
                }}>
                  {feature.icon}
                </div>
                <div style={{ 
                  fontSize: 'clamp(0.7rem, 2vw, 0.8rem)', 
                  color: '#9CA3AF' 
                }}>
                  {feature.label}
                </div>
              </div>
            ))}
          </div>

          {/* Download Progress Bar */}
          {downloadProgress !== null && (
            <div style={{
              marginBottom: 'clamp(1rem, 3vw, 1.5rem)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem'
              }}>
                <span style={{ 
                  fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)', 
                  color: '#9CA3AF' 
                }}>
                  Downloading...
                </span>
                <span style={{ 
                  fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)', 
                  color: '#3B82F6',
                  fontWeight: 'bold'
                }}>
                  {downloadProgress}%
                </span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${downloadProgress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #3B82F6 0%, #60A5FA 100%)',
                  borderRadius: '4px',
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
              {downloadProgress === 100 && (
                <p style={{ 
                  color: '#22C55E', 
                  fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
                  marginTop: '0.5rem',
                  fontWeight: 'bold'
                }}>
                  ✅ Download complete! Check your downloads folder.
                </p>
              )}
            </div>
          )}

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              width: '100%',
              background: isDownloading
                ? 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)'
                : isHovered
                ? 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)'
                : 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
              border: 'none',
              color: '#ffffff',
              padding: 'clamp(0.75rem, 2vw, 1rem)',
              borderRadius: '0.75rem',
              cursor: isDownloading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              boxShadow: isHovered && !isDownloading 
                ? '0 10px 30px rgba(59, 130, 246, 0.4)' 
                : '0 5px 20px rgba(59, 130, 246, 0.3)',
              opacity: isDownloading ? 0.8 : 1
            }}
          >
            {isDownloading ? (
              <>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid #ffffff',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Downloading...
              </>
            ) : (
              <>
                <span style={{ fontSize: '1.2rem' }}>⬇️</span>
                Download Lauritalk APK ({isMobile ? 'Mobile' : 'Desktop'})
              </>
            )}
          </button>

          {/* File info */}
          <div style={{ 
            marginTop: '1rem',
            fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
            color: '#6B7280'
          }}>
            <p style={{ margin: '0.25rem 0' }}>
              Version 1.0.0 • Size: ~25 MB
            </p>
            <p style={{ margin: '0.25rem 0' }}>
              Compatible with Android 8.0+
            </p>
          </div>

          {/* Troubleshooting */}
          <details style={{
            marginTop: '1rem',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '0.5rem',
            overflow: 'hidden'
          }}>
            <summary style={{
              padding: '0.75rem',
              cursor: 'pointer',
              color: '#9CA3AF',
              fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span>Need help installing?</span>
              <span>▼</span>
            </summary>
            <div style={{
              padding: '1rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: 'clamp(0.75rem, 2vw, 0.85rem)'
            }}>
              <p style={{ 
                color: '#E5E7EB', 
                marginBottom: '0.5rem',
                fontWeight: 'bold'
              }}>
                Installation Steps:
              </p>
              <ol style={{ 
                color: '#9CA3AF', 
                paddingLeft: '1.5rem',
                margin: 0,
                lineHeight: '1.5'
              }}>
                <li>Download the APK file</li>
                <li>Enable "Install from Unknown Sources" in Android settings</li>
                <li>Open the downloaded file</li>
                <li>Tap "Install" and accept permissions</li>
                <li>Open the app and sign in</li>
              </ol>
              <p style={{ 
                color: '#EF4444', 
                marginTop: '0.75rem',
                fontSize: 'clamp(0.7rem, 2vw, 0.8rem)'
              }}>
                ⚠️ Only download from official sources
              </p>
            </div>
          </details>
        </div>
      </div>

      {/* Add CSS animation for spinner */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default DownloadAppButton;