import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { useState, useEffect } from 'react';
import GlobalAIImage from '../assets/images/global-ai-network.jpg';
import InclusiveImage from '../assets/images/inclusive-communication.jpg';

export default function Home() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Redirect to dashboard if user is logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    signOut();
    navigate('/');
    setShowProfileMenu(false);
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const openLinkedIn = () => {
    window.open('https://www.linkedin.com/company/luminixspace/', '_blank');
  };

  const openFacebook = () => {
    window.open('https://www.facebook.com/luminixspace', '_blank');
  };

  // Since we redirect logged-in users to dashboard, we don't need to render anything for them
  // But we still keep the full component structure for when user is not logged in

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

            /* Profile menu adjustments for mobile */
            .profile-menu {
              position: absolute;
              top: 60px;
              right: 10px;
              zIndex: 1000;
            }
            
            .profile-menu-content {
              min-width: 180px;
              font-size: 0.9rem;
            }
            
            .profile-menu-content button {
              padding: 0.5rem 0.75rem;
              font-size: 0.85rem;
            }

            /* About section mobile adjustments */
            .about-section .breathing-box {
              padding: 1.5rem !important;
              margin-bottom: 1.5rem !important;
            }
            
            .about-section h2 {
              font-size: 1.5rem !important;
            }
            
            .about-section p, .about-section li {
              font-size: 1rem !important;
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

            .profile-menu {
              right: 5px;
              top: 55px;
            }
            
            .profile-menu-content {
              min-width: 160px;
            }
          }

          /* Breathing box animation for About section */
          .breathing-box {
            animation: breathing 3s ease-in-out infinite;
            box-shadow: 0 0 5px #3B82F6, 0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4), inset 0 0 10px rgba(59, 130, 246, 0.2);
          }
          
          @keyframes breathing {
            0% {
              box-shadow: 0 0 5px #3B82F6, 0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4), inset 0 0 10px rgba(59, 130, 246, 0.2);
            }
            50% {
              box-shadow: 0 0 15px #3B82F6, 0 0 30px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.6), inset 0 0 15px rgba(59, 130, 246, 0.3);
            }
            100% {
              box-shadow: 0 0 5px #3B82F6, 0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4), inset 0 0 10px rgba(59, 130, 246, 0.2);
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
                {/* User Profile Button */}
                <button
                  onClick={toggleProfileMenu}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'transparent',
                    border: '1px solid #D4AF37',
                    borderRadius: '2rem',
                    padding: '0.4rem 0.8rem',
                    cursor: 'pointer',
                    color: '#D4AF37',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
                    e.currentTarget.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #D4AF37 0%, #228B22 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: '0.8rem'
                  }}>
                    {user.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.email?.split('@')[0] || 'User'}
                  </span>
                </button>

                {/* Profile Dropdown Menu */}
                {showProfileMenu && (
                  <div className="profile-menu" style={{
                    position: 'absolute',
                    top: '50px',
                    right: '0',
                    zIndex: 1000,
                    background: 'rgba(0, 0, 0, 0.95)',
                    border: '1px solid #D4AF37',
                    borderRadius: '0.5rem',
                    minWidth: '220px',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
                  }}>
                    <div className="profile-menu-content" style={{ padding: '0.5rem' }}>
                      {/* User Info */}
                      <div style={{ 
                        padding: '0.75rem', 
                        borderBottom: '1px solid #374151',
                        textAlign: 'center'
                      }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #D4AF37 0%, #228B22 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#000',
                          fontWeight: 'bold',
                          fontSize: '1.2rem',
                          margin: '0 auto 0.5rem'
                        }}>
                          {user.email?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <p style={{ color: '#D4AF37', margin: '0 0 0.25rem', fontSize: '0.9rem', fontWeight: '500' }}>
                          {user.email?.split('@')[0] || 'User'}
                        </p>
                        <p style={{ color: '#9CA3AF', fontSize: '0.8rem', margin: 0 }}>
                          {user.email}
                        </p>
                      </div>

                      {/* Menu Options */}
                      <div style={{ padding: '0.25rem' }}>
                        <button
                          onClick={() => {
                            navigate('/dashboard');
                            setShowProfileMenu(false);
                          }}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '0.75rem 1rem',
                            background: 'transparent',
                            border: 'none',
                            color: '#E5E7EB',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            borderRadius: '0.25rem',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                            e.currentTarget.style.color = '#3B82F6';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#E5E7EB';
                          }}
                        >
                          <span>📊</span> Dashboard
                        </button>

                        <button
                          onClick={() => {
                            navigate('/profile');
                            setShowProfileMenu(false);
                          }}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '0.75rem 1rem',
                            background: 'transparent',
                            border: 'none',
                            color: '#E5E7EB',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            borderRadius: '0.25rem',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
                            e.currentTarget.style.color = '#D4AF37';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#E5E7EB';
                          }}
                        >
                          <span>👤</span> Profile
                        </button>

                        <button
                          onClick={() => {
                            navigate('/payouts');
                            setShowProfileMenu(false);
                          }}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '0.75rem 1rem',
                            background: 'transparent',
                            border: 'none',
                            color: '#E5E7EB',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            borderRadius: '0.25rem',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(34, 139, 34, 0.1)';
                            e.currentTarget.style.color = '#228B22';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#E5E7EB';
                          }}
                        >
                          <span>💰</span> Payouts
                        </button>

                        <button
                          onClick={() => {
                            navigate('/support');
                            setShowProfileMenu(false);
                          }}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '0.75rem 1rem',
                            background: 'transparent',
                            border: 'none',
                            color: '#E5E7EB',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            borderRadius: '0.25rem',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                            e.currentTarget.style.color = '#3B82F6';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#E5E7EB';
                          }}
                        >
                          <span>💬</span> Support
                        </button>

                        <button
                          onClick={() => {
                            navigate('/about');
                            setShowProfileMenu(false);
                          }}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '0.75rem 1rem',
                            background: 'transparent',
                            border: 'none',
                            color: '#E5E7EB',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            borderRadius: '0.25rem',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(34, 139, 34, 0.1)';
                            e.currentTarget.style.color = '#228B22';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#E5E7EB';
                          }}
                        >
                          <span>ℹ️</span> About
                        </button>

                        <button
                          onClick={handleLogout}
                          style={{
                            width: '100%',
                            textAlign: 'left',
                            padding: '0.75rem 1rem',
                            background: 'transparent',
                            border: 'none',
                            color: '#EF4444',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            borderRadius: '0.25rem',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginTop: '0.25rem',
                            borderTop: '1px solid #374151'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          <span>🚪</span> Logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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

        {/* Embedded About Section - Only shown when user is logged out */}
        {!user && (
          <div className="about-section" style={{ 
            marginTop: '4rem', 
            paddingTop: '3rem', 
            borderTop: '2px solid rgba(212, 175, 55, 0.3)',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              color: '#D4AF37', 
              textAlign: 'center', 
              marginBottom: '3rem',
              textShadow: '0 0 10px #D4AF37, 0 0 20px #D4AF37'
            }}>
              About Lauritalk 🌍
            </h1>

            {/* Lauritalk App with Professional Image Layout */}
            <div className="breathing-box" style={{ 
              backgroundColor: '#1a1a1a', 
              padding: '2.5rem', 
              borderRadius: '1rem',
              border: '2px solid #3B82F6',
              marginBottom: '2.5rem',
              transform: 'perspective(1000px) rotateX(1deg)',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#D4AF37', textAlign: 'center', textShadow: '0 0 8px #D4AF37' }}>
                  🚀 What is Lauritalk?
                </h2>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1', minWidth: '300px', width: '100%' }}>
                    <img 
                      src={GlobalAIImage} 
                      alt="Global AI Translation Network"
                      style={{
                        width: '100%',
                        borderRadius: '0.5rem',
                        border: '2px solid #3B82F6',
                        boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
                        maxWidth: '100%',
                        height: 'auto'
                      }}
                    />
                  </div>
                  <div style={{ flex: '1', minWidth: '300px', width: '100%' }}>
                    <p style={{ color: '#E5E7EB', lineHeight: '1.8', fontSize: '1.1rem' }}>
                      Lauritalk is an AI-powered, Web3 inclusive language translation platform designed to break communication barriers worldwide. 
                      Built with cutting-edge AI and inclusive communication technologies, we empower users to translate text, voice, gesture, 
                      and sign language seamlessly across <strong style={{color: '#228B22', textShadow: '0 0 5px #228B22'}}>120+ global and local languages</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Who We Are */}
            <div className="breathing-box" style={{ 
              backgroundColor: '#1a1a1a', 
              padding: '2.5rem', 
              borderRadius: '1rem',
              border: '2px solid #3B82F6',
              marginBottom: '2.5rem',
              textAlign: 'center',
              animationDelay: '0.5s',
              transform: 'perspective(1000px) rotateX(-1deg)',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#228B22', marginBottom: '1.5rem', textShadow: '0 0 8px #228B22' }}>
                🏢 Who We Are
              </h2>
              <p style={{ color: '#E5E7EB', lineHeight: '1.8', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto' }}>
                Lauritalk is a flagship product of <strong style={{color: '#D4AF37'}}>Luminix</strong>, a forward-thinking tech company focused on building 
                AI and Web3 solutions that address real-world challenges. Where innovation meets purpose! 🎯
              </p>
            </div>

            {/* Leadership */}
            <div className="breathing-box" style={{ 
              backgroundColor: '#1a1a1a', 
              padding: '2.5rem', 
              borderRadius: '1rem',
              border: '2px solid #3B82F6',
              marginBottom: '2.5rem',
              textAlign: 'center',
              animationDelay: '1s',
              transform: 'perspective(1000px) rotateX(1deg)',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#D4AF37', marginBottom: '1.5rem', textShadow: '0 0 8px #D4AF37' }}>
                👨‍💻 Our Leadership
              </h2>
              <p style={{ color: '#E5E7EB', lineHeight: '1.8', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto' }}>
                Led by <strong style={{color: '#228B22'}}>Ebong Eric E.</strong>, Lead Developer at Luminix, whose vision is to build technology that gives everyone a voice. 
                Merging AI, blockchain, and human-centered design to create breakthrough systems. 💡
              </p>
            </div>

            {/* What We Do with Professional Image Layout */}
            <div className="breathing-box" style={{ 
              backgroundColor: '#1a1a1a', 
              padding: '2.5rem', 
              borderRadius: '1rem',
              border: '2px solid #3B82F6',
              marginBottom: '2.5rem',
              animationDelay: '1.5s',
              transform: 'perspective(1000px) rotateX(-1deg)',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#228B22', textAlign: 'center', textShadow: '0 0 8px #228B22' }}>
                  🌟 What Lauritalk Does
                </h2>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap-reverse' }}>
                  <div style={{ flex: '1', minWidth: '300px', width: '100%' }}>
                    <p style={{ color: '#E5E7EB', lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                      More than just translation—it's a complete communication ecosystem! 🎯
                    </p>
                    <ul style={{ color: '#E5E7EB', lineHeight: '1.8', fontSize: '1.1rem', paddingLeft: '1.5rem' }}>
                      <li>🌐 Translation of 120+ international languages</li>
                      <li>🔄 Local dialect ↔ International language translation</li>
                      <li>👋 Gesture-to-Voice/Text translation</li>
                      <li>🤟 Sign-Language-to-Voice/Text translation</li>
                      <li>🎯 Enhanced accessibility for impaired communities</li>
                    </ul>
                  </div>
                  <div style={{ flex: '1', minWidth: '300px', width: '100%' }}>
                    <img 
                      src={InclusiveImage} 
                      alt="Inclusive Communication & Accessibility Scene"
                      style={{
                        width: '100%',
                        borderRadius: '0.5rem',
                        border: '2px solid #228B22',
                        boxShadow: '0 0 20px rgba(34, 139, 34, 0.5)',
                        maxWidth: '100%',
                        height: 'auto'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Who We Serve */}
            <div className="breathing-box" style={{ 
              backgroundColor: '#1a1a1a', 
              padding: '2.5rem', 
              borderRadius: '1rem',
              border: '2px solid #3B82F6',
              marginBottom: '2.5rem',
              textAlign: 'center',
              animationDelay: '2s',
              transform: 'perspective(1000px) rotateX(1deg)',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#D4AF37', marginBottom: '1.5rem', textShadow: '0 0 8px #D4AF37' }}>
                👥 Who We Serve
              </h2>
              <p style={{ color: '#E5E7EB', lineHeight: '1.8', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 1.5rem' }}>
                Designed for <strong style={{color: '#228B22'}}>everyone</strong>, especially:
              </p>
              <div style={{ display: 'inline-block', textAlign: 'left', maxWidth: '600px', width: '100%' }}>
                <ul style={{ color: '#E5E7EB', lineHeight: '1.8', fontSize: '1.1rem' }}>
                  <li>✈️ International travelers & migrants</li>
                  <li>🎓 International students</li>
                  <li>👁️ Visually impaired individuals</li>
                  <li>🗣️ Speech & hearing-impaired persons</li>
                  <li>🏢 Businesses communicating across languages</li>
                </ul>
              </div>
              <p style={{ color: '#E5E7EB', lineHeight: '1.8', fontSize: '1.1rem', maxWidth: '800px', margin: '1.5rem auto 0' }}>
                Ensuring <strong style={{color: '#228B22', textShadow: '0 0 5px #228B22'}}>no one is left behind</strong>! 🌍
              </p>
            </div>

            {/* Web3 Integration */}
            <div className="breathing-box" style={{ 
              backgroundColor: '#1a1a1a', 
              padding: '2.5rem', 
              borderRadius: '1rem',
              border: '2px solid #3B82F6',
              marginBottom: '2.5rem',
              textAlign: 'center',
              animationDelay: '2.5s',
              transform: 'perspective(1000px) rotateX(-1deg)',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#228B22', marginBottom: '1.5rem', textShadow: '0 0 8px #228B22' }}>
                ⛓️ Web3 Power
              </h2>
              <p style={{ color: '#E5E7EB', lineHeight: '1.8', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto' }}>
                Lauritalk integrates Web3 for: <strong style={{color: '#D4AF37'}}>secure data interactions</strong>, 
                <strong style={{color: '#D4AF37'}}> privacy-driven communication</strong>, and <strong style={{color: '#D4AF37'}}>transparent AI systems</strong>. 
                Giving users more control and trust! 🔒
              </p>
            </div>

            {/* Vision & Contact */}
            <div className="breathing-box" style={{ 
              backgroundColor: '#1a1a1a', 
              padding: '2.5rem', 
              borderRadius: '1rem',
              border: '2px solid #3B82F6',
              textAlign: 'center',
              animationDelay: '3s',
              transform: 'perspective(1000px) rotateX(1deg)',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#D4AF37', marginBottom: '1.5rem', textShadow: '0 0 8px #D4AF37' }}>
                🎯 Our Vision & Contact
              </h2>
              <p style={{ color: '#E5E7EB', lineHeight: '1.8', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 1.5rem' }}>
                To become the world's most <strong style={{color: '#228B22'}}>inclusive, intelligent, and human-centered communication platform</strong>— 
                empowering every person, everywhere, to connect without barriers. 🌈
              </p>
              <p style={{ color: '#E5E7EB', lineHeight: '1.8', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto' }}>
                <strong style={{color: '#D4AF37'}}>Join us</strong> as we redefine global communication and make the world more inclusive—one translation at a time! 🚀
              </p>
            </div>

            {/* Learn More Button */}
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
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
                Learn More About Lauritalk
              </button>
            </div>
          </div>
        )}
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