import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';

export default function Home() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  const openLinkedIn = () => {
    window.open('https://www.linkedin.com/company/luminixspace/', '_blank');
  };

  const openFacebook = () => {
    window.open('https://www.facebook.com/luminixspace', '_blank');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      color: '#ffffff',
      width: '100%',
      overflowX: 'hidden',
      background: `
        radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(34, 139, 34, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
        linear-gradient(135deg, #000000 0%, #0f0f23 30%, #1a1a2e 60%, #000000 100%)
      `,
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Animated Background Elements - More Visible */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '5%',
        width: '120px',
        height: '120px',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite',
        filter: 'blur(15px)',
        zIndex: 1
      }}></div>
      <div style={{
        position: 'absolute',
        top: '65%',
        right: '10%',
        width: '180px',
        height: '180px',
        background: 'radial-gradient(circle, rgba(34, 139, 34, 0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite 1s',
        filter: 'blur(20px)',
        zIndex: 1
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '25%',
        left: '15%',
        width: '150px',
        height: '150px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 7s ease-in-out infinite 2s',
        filter: 'blur(18px)',
        zIndex: 1
      }}></div>
      <div style={{
        position: 'absolute',
        top: '40%',
        right: '25%',
        width: '100px',
        height: '100px',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 9s ease-in-out infinite 0.5s',
        filter: 'blur(12px)',
        zIndex: 1
      }}></div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
            50% { transform: translateY(-25px) rotate(180deg) scale(1.1); }
          }

          @media (max-width: 768px) {
            .mobile-nav {
              flex-direction: column;
              gap: 0.5rem;
              padding: 1rem;
            }
            
            .mobile-nav-buttons {
              flex-wrap: wrap;
              justify-content: center;
              gap: 0.5rem;
            }
            
            .mobile-user-info {
              text-align: center;
              margin-bottom: 0.5rem;
              font-size: 0.8rem;
            }
            
            .mobile-content {
              padding: 2rem 1rem;
            }
            
            .mobile-grid {
              grid-template-columns: 1fr;
              gap: 1rem;
              margin: 0 auto 2rem;
              max-width: 100%;
            }
            
            .mobile-feature {
              padding: 1rem;
              margin: 0 0.5rem;
            }
            
            .mobile-buttons {
              gap: 0.75rem;
              padding: 0 0.5rem;
            }
            
            .mobile-button {
              padding: 0.75rem 1.5rem;
              font-size: 0.9rem;
              width: '100%';
              max-width: 280px;
            }

            footer {
              padding: 1.5rem 0.5rem !important;
            }
            
            footer > div {
              padding: 0 0.5rem;
            }

            /* Mobile header fixes for logged-in users */
            .logged-in-mobile-header {
              flex-direction: column;
              gap: 0.75rem;
            }
            
            .logged-in-user-info {
              order: -1;
              width: 100%;
              text-align: center;
              margin-bottom: 0.5rem;
            }
            
            .logged-in-buttons {
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              gap: 0.5rem;
              width: '100%';
            }
            
            .logged-in-buttons button {
              flex: 1;
              min-width: 80px;
              max-width: 120px;
              font-size: 0.8rem;
              padding: 0.4rem 0.6rem;
            }
          }

          @media (max-width: 480px) {
            .mobile-user-info {
              font-size: 0.75rem;
            }
            
            .mobile-nav-buttons button {
              padding: 0.35rem 0.75rem;
              font-size: 0.8rem;
            }
            
            .mobile-content h1 {
              font-size: 1.8rem;
              marginBottom: 1rem;
            }
            
            .mobile-content p {
              font-size: 0.9rem;
              marginBottom: 2rem;
            }

            footer {
              padding: 1rem 0.25rem !important;
            }
            
            footer > div {
              padding: 0 0.25rem;
            }

            .logged-in-buttons button {
              font-size: 0.75rem;
              padding: 0.35rem 0.5rem;
              min-width: 70px;
            }
          }
        `}
      </style>

      {/* Navigation - Mobile Responsive */}
      <nav style={{ 
        background: 'rgba(0, 0, 0, 0.85)', 
        borderBottom: '2px solid #D4AF37',
        padding: '1rem 0',
        width: '100%',
        backdropFilter: 'blur(15px)',
        position: 'relative',
        zIndex: 10
      }}>
        <div className="mobile-nav" style={{ 
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <div style={{
              width: '12px',
              height: '12px',
              backgroundColor: '#D4AF37',
              borderRadius: '50%',
              boxShadow: '0 0 10px #D4AF37'
            }}></div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#D4AF37', textShadow: '0 0 8px #D4AF37' }}>Web3 Translate</h1>
          </div>
          
          <div className="mobile-nav-buttons" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {!user ? (
              <>
                <button 
                  onClick={() => navigate('/about')}
                  style={{ 
                    color: '#3B82F6', 
                    background: 'none', 
                    border: '1px solid #3B82F6',
                    padding: '0.4rem 1rem',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    fontSize: '0.9rem'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#3B82F6';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.boxShadow = '0 0 15px #3B82F6';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#3B82F6';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  About
                </button>
                <button 
                  onClick={() => navigate('/login')}
                  style={{ 
                    color: '#D4AF37', 
                    background: 'none', 
                    border: '1px solid #D4AF37',
                    padding: '0.4rem 1rem',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    fontSize: '0.9rem'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#D4AF37';
                    e.currentTarget.style.color = '#000000';
                    e.currentTarget.style.boxShadow = '0 0 15px #D4AF37';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#D4AF37';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Login
                </button>
                <button 
                  onClick={() => navigate('/register')}
                  style={{ 
                    backgroundColor: '#228B22', 
                    color: 'white', 
                    padding: '0.4rem 1rem', 
                    borderRadius: '0.375rem', 
                    border: 'none', 
                    cursor: 'pointer',
                    fontWeight: '500',
                    boxShadow: '0 0 10px #228B22',
                    transition: 'all 0.3s ease',
                    fontSize: '0.9rem'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px #228B22, 0 0 30px #228B22';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 10px #228B22';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <div className="logged-in-mobile-header" style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: '0.75rem',
                width: '100%'
              }}>
                <div className="logged-in-user-info" style={{ 
                  color: '#D4AF37', 
                  fontSize: '0.9rem', 
                  textAlign: 'center',
                  width: '100%'
                }}>
                  Welcome, {user.email?.split('@')[0]}
                </div>
                <div className="logged-in-buttons" style={{ 
                  display: 'flex', 
                  gap: '0.5rem', 
                  justifyContent: 'center',
                  width: '100%',
                  flexWrap: 'wrap'
                }}>
                  <button 
                    onClick={() => navigate('/about')}
                    style={{ 
                      color: '#3B82F6', 
                      background: 'none', 
                      border: '1px solid #3B82F6',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      fontWeight: '500',
                      transition: 'all 0.3s ease',
                      fontSize: '0.8rem',
                      flex: '1',
                      minWidth: '80px',
                      maxWidth: '100px'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#3B82F6';
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.boxShadow = '0 0 15px #3B82F6';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#3B82F6';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    About
                  </button>
                  <button 
                    onClick={() => navigate('/billing')}
                    style={{ 
                      backgroundColor: '#D4AF37', 
                      color: '#000000', 
                      padding: '0.4rem 0.8rem', 
                      borderRadius: '0.375rem', 
                      border: 'none', 
                      cursor: 'pointer',
                      fontWeight: '500',
                      boxShadow: '0 0 10px #D4AF37',
                      transition: 'all 0.3s ease',
                      fontSize: '0.8rem',
                      flex: '1',
                      minWidth: '80px',
                      maxWidth: '100px'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 20px #D4AF37, 0 0 30px #D4AF37';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 10px #D4AF37';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Upgrade
                  </button>
                  <button 
                    onClick={handleLogout}
                    style={{ 
                      color: '#EF4444', 
                      background: 'none', 
                      border: '1px solid #EF4444',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      fontWeight: '500',
                      transition: 'all 0.3s ease',
                      fontSize: '0.8rem',
                      flex: '1',
                      minWidth: '80px',
                      maxWidth: '100px'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#EF4444';
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.boxShadow = '0 0 15px #EF4444';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#EF4444';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section - Mobile Optimized */}
      <div className="mobile-content" style={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '3rem 1rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 5,
        flex: '1',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Main Title */}
        <h1 style={{ 
          fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', 
          fontWeight: 'bold', 
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #D4AF37 0%, #FFFFFF 50%, #228B22 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          textShadow: '0 0 30px rgba(212, 175, 55, 0.5)',
          lineHeight: '1.2',
          padding: '0 0.5rem'
        }}>
          Break Language Barriers.<br />Connect With Anyone.
        </h1>

        {/* Subtitle */}
        <p style={{ 
          fontSize: 'clamp(0.9rem, 3vw, 1.25rem)', 
          color: '#E5E7EB', 
          marginBottom: '2rem', 
          maxWidth: '600px',
          margin: '0 auto 2rem',
          lineHeight: '1.6',
          textShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          padding: '0 0.5rem'
        }}>
          AI-powered, Web3-secure Translation for 150+ Languages, Local Dialects, Gestures, and Sign Language—built for everyone.
        </p>

        {/* Key Features Grid - Mobile Optimized */}
        <div className="mobile-grid" style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
          maxWidth: '1000px',
          margin: '0 auto 2rem',
          padding: '0 0.5rem'
        }}>
          {[
            { icon: '⚡', text: 'Fast & Accurate Real-Time Translations' },
            { icon: '🌍', text: 'Inclusive: Voice, Text, Gesture & Sign Language' },
            { icon: '👥', text: 'Accessible for Travelers, Students & Impaired Users' },
            { icon: '🔒', text: 'Private, Secure, and Decentralized' },
            { icon: '💰', text: 'Get Rewarded for Every Translation you make' }
          ].map((feature, index) => (
            <div key={index} className="mobile-feature" style={{
              backgroundColor: 'rgba(26, 26, 26, 0.7)',
              padding: '1.25rem',
              borderRadius: '1rem',
              border: `1px solid ${index % 2 === 0 ? '#D4AF37' : '#228B22'}`,
              textAlign: 'center',
              boxShadow: `0 0 20px rgba(${index % 2 === 0 ? '212, 175, 55' : '34, 139, 34'}, 0.3)`,
              transform: 'perspective(1000px) rotateX(5deg)',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              minHeight: '140px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) translateY(-5px)';
              e.currentTarget.style.boxShadow = `0 10px 30px rgba(${index % 2 === 0 ? '212, 175, 55' : '34, 139, 34'}, 0.5)`;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(5deg)';
              e.currentTarget.style.boxShadow = `0 0 20px rgba(${index % 2 === 0 ? '212, 175, 55' : '34, 139, 34'}, 0.3)`;
            }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{feature.icon}</div>
              <p style={{ color: '#E5E7EB', fontSize: '0.9rem', lineHeight: '1.4', margin: 0 }}>{feature.text}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons - Mobile Optimized */}
        <div className="mobile-buttons" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem', padding: '0 0.5rem' }}>
          {!user ? (
            <>
              <button 
                onClick={() => navigate('/register')}
                className="mobile-button"
                style={{ 
                  backgroundColor: '#228B22', 
                  color: '#ffffff', 
                  padding: '0.875rem 2rem', 
                  borderRadius: '0.75rem', 
                  border: 'none', 
                  fontWeight: 'bold', 
                  cursor: 'pointer',
                  fontSize: '1rem',
                  boxShadow: '0 0 20px #228B22',
                  transition: 'all 0.3s ease',
                  transform: 'perspective(1000px) rotateX(5deg)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 30px #228B22, 0 0 40px #228B22';
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) translateY(-3px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 20px #228B22';
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(5deg)';
                }}
              >
                Create Account
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="mobile-button"
                style={{ 
                  backgroundColor: 'transparent', 
                  color: '#D4AF37', 
                  padding: '0.875rem 2rem', 
                  borderRadius: '0.75rem', 
                  border: '2px solid #D4AF37', 
                  fontWeight: 'bold', 
                  cursor: 'pointer',
                  fontSize: '1rem',
                  boxShadow: '0 0 15px #D4AF37',
                  transition: 'all 0.3s ease',
                  transform: 'perspective(1000px) rotateX(5deg)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#D4AF37';
                  e.currentTarget.style.color = '#000000';
                  e.currentTarget.style.boxShadow = '0 0 25px #D4AF37, 0 0 35px #D4AF37';
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) translateY(-3px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#D4AF37';
                  e.currentTarget.style.boxShadow = '0 0 15px #D4AF37';
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(5deg)';
                }}
              >
                Log In / Continue
              </button>
            </>
          ) : (
            <button 
              onClick={() => navigate('/billing')}
              className="mobile-button"
              style={{ 
                backgroundColor: '#D4AF37', 
                color: '#000000', 
                padding: '0.875rem 2rem', 
                borderRadius: '0.75rem', 
                border: 'none', 
                fontWeight: 'bold', 
                cursor: 'pointer',
                fontSize: '1rem',
                boxShadow: '0 0 20px #D4AF37',
                transition: 'all 0.3s ease',
                transform: 'perspective(1000px) rotateX(5deg)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px #D4AF37, 0 0 40px #D4AF37';
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) translateY(-3px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px #D4AF37';
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(5deg)';
              }}
            >
              Upgrade To Pro Account
            </button>
          )}
        </div>

        {/* More Button */}
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button 
            onClick={() => navigate('/about')}
            style={{ 
              color: '#3B82F6', 
              background: 'none', 
              border: '1px solid #3B82F6',
              padding: '0.75rem 2rem',
              borderRadius: '0.75rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              transform: 'perspective(1000px) rotateX(5deg)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#3B82F6';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.boxShadow = '0 0 20px #3B82F6';
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#3B82F6';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(5deg)';
            }}
          >
            More
          </button>
        </div>
      </div>

      {/* Professional Footer - Mobile Centered */}
      <footer style={{
        backgroundColor: '#000000',
        borderTop: '2px solid #D4AF37',
        padding: '2rem 1rem',
        marginTop: 'auto',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          textAlign: 'center'
        }}>
          {/* Company Info */}
          <div style={{ width: '100%' }}>
            <h3 style={{ 
              color: '#D4AF37', 
              fontSize: 'clamp(1.1rem, 4vw, 1.25rem)', 
              fontWeight: 'bold',
              marginBottom: '0.5rem'
            }}>
              Web3 Translate by Luminix
            </h3>
            <p style={{ 
              color: '#9CA3AF', 
              fontSize: 'clamp(0.8rem, 3vw, 0.9rem)',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: '1.5'
            }}>
              Breaking Language Barriers with AI-Powered, Web3-Secure Translation Technology for a more Connected World.
            </p>
          </div>

          {/* Social Links - Professional Social Media Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', width: '100%' }}>
            <p style={{ color: '#E5E7EB', fontSize: 'clamp(0.8rem, 3vw, 0.9rem)', margin: 0 }}>
              Connect with us:
            </p>
            
            {/* Facebook Icon */}
            <button 
              onClick={openFacebook}
              style={{
                background: 'transparent',
                border: '1px solid #1877F2',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '6px',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                color: '#1877F2'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#1877F2';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#1877F2';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {/* Facebook Icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>

            {/* LinkedIn Icon */}
            <button 
              onClick={openLinkedIn}
              style={{
                background: 'transparent',
                border: '1px solid #0A66C2',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '6px',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                color: '#0A66C2'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#0A66C2';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#0A66C2';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {/* LinkedIn Icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM18.5 18.5V13.2C18.5 12.3354 18.1565 11.5062 17.5452 10.8948C16.9338 10.2835 16.1046 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C14.6813 12.17 15.0374 12.3175 15.2999 12.5801C15.5625 12.8426 15.71 13.1987 15.71 13.57V18.5H18.5ZM6.88 8.56C7.32556 8.56 7.75288 8.383 8.06794 8.06794C8.383 7.75288 8.56 7.32556 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C6.43178 5.19 6.00193 5.36805 5.68499 5.68499C5.36805 6.00193 5.19 6.43178 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z" fill="currentColor"/>
              </svg>
            </button>
          </div>

          {/* Copyright */}
          <div style={{ width: '100%' }}>
            <p style={{ 
              color: '#6B7280', 
              fontSize: 'clamp(0.7rem, 2.5vw, 0.8rem)',
              borderTop: '1px solid #374151',
              paddingTop: '1rem',
              width: '100%',
              margin: '0 auto',
              maxWidth: '400px',
              lineHeight: '1.4'
            }}>
              © {new Date().getFullYear()} Powered by Luminix. All Rights Reserved. 
              Building the Future of inclusive communication.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}