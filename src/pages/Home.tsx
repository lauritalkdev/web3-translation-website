import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';

export default function Home() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    signOut();
    navigate('/');
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
      position: 'relative'
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
        `}
      </style>

      {/* Navigation */}
      <nav style={{ 
        background: 'rgba(0, 0, 0, 0.85)', 
        borderBottom: '2px solid #D4AF37',
        padding: '1.5rem 0',
        width: '100%',
        backdropFilter: 'blur(15px)',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ 
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '12px',
              height: '12px',
              backgroundColor: '#D4AF37',
              borderRadius: '50%',
              boxShadow: '0 0 10px #D4AF37'
            }}></div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#D4AF37', textShadow: '0 0 8px #D4AF37' }}>Web3 Translate</h1>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {!user ? (
              <>
                <button 
                  onClick={() => navigate('/login')}
                  style={{ 
                    color: '#D4AF37', 
                    background: 'none', 
                    border: '1px solid #D4AF37',
                    padding: '0.5rem 1.5rem',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
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
                    padding: '0.5rem 1.5rem', 
                    borderRadius: '0.375rem', 
                    border: 'none', 
                    cursor: 'pointer',
                    fontWeight: '500',
                    boxShadow: '0 0 10px #228B22',
                    transition: 'all 0.3s ease'
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
              <>
                <span style={{ color: '#D4AF37', fontSize: '0.9rem' }}>
                  Welcome, {user.email?.split('@')[0]}
                </span>
                <button 
                  onClick={() => navigate('/about')}
                  style={{ 
                    color: '#3B82F6', 
                    background: 'none', 
                    border: '1px solid #3B82F6',
                    padding: '0.5rem 1.5rem',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
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
                    padding: '0.5rem 1.5rem', 
                    borderRadius: '0.375rem', 
                    border: 'none', 
                    cursor: 'pointer',
                    fontWeight: '500',
                    boxShadow: '0 0 10px #D4AF37',
                    transition: 'all 0.3s ease'
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
                  Upgrade to Pro
                </button>
                <button 
                  onClick={handleLogout}
                  style={{ 
                    color: '#EF4444', 
                    background: 'none', 
                    border: '1px solid #EF4444',
                    padding: '0.5rem 1.5rem',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
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
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '6rem 1rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 5
      }}>
        {/* Main Title */}
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
          fontWeight: 'bold', 
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #D4AF37 0%, #FFFFFF 50%, #228B22 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          textShadow: '0 0 30px rgba(212, 175, 55, 0.5)',
          lineHeight: '1.2'
        }}>
          Break Language Barriers.<br />Connect With Anyone.
        </h1>

        {/* Subtitle */}
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#E5E7EB', 
          marginBottom: '3rem', 
          maxWidth: '600px',
          margin: '0 auto 3rem',
          lineHeight: '1.6',
          textShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
        }}>
          AI-powered, Web3-secure translation for 120+ languages, local dialects, gestures, and sign language—built for everyone.
        </p>

        {/* Key Features Grid */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem',
          maxWidth: '1000px',
          margin: '0 auto 4rem'
        }}>
          {[
            { icon: '⚡', text: 'Fast & accurate real-time translations' },
            { icon: '🌍', text: 'Inclusive: voice, text, gesture & sign language' },
            { icon: '👥', text: 'Accessible for travelers, students & impaired users' },
            { icon: '🔒', text: 'Private, secure, and decentralized' }
          ].map((feature, index) => (
            <div key={index} style={{
              backgroundColor: 'rgba(26, 26, 26, 0.7)',
              padding: '1.5rem',
              borderRadius: '1rem',
              border: `1px solid ${index % 2 === 0 ? '#D4AF37' : '#228B22'}`,
              textAlign: 'center',
              boxShadow: `0 0 20px rgba(${index % 2 === 0 ? '212, 175, 55' : '34, 139, 34'}, 0.3)`,
              transform: 'perspective(1000px) rotateX(5deg)',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
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
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{feature.icon}</div>
              <p style={{ color: '#E5E7EB', fontSize: '1rem', lineHeight: '1.4' }}>{feature.text}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {!user ? (
            <>
              <button 
                onClick={() => navigate('/register')}
                style={{ 
                  backgroundColor: '#228B22', 
                  color: '#ffffff', 
                  padding: '1rem 2.5rem', 
                  borderRadius: '0.75rem', 
                  border: 'none', 
                  fontWeight: 'bold', 
                  cursor: 'pointer',
                  fontSize: '1.1rem',
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
                style={{ 
                  backgroundColor: 'transparent', 
                  color: '#D4AF37', 
                  padding: '1rem 2.5rem', 
                  borderRadius: '0.75rem', 
                  border: '2px solid #D4AF37', 
                  fontWeight: 'bold', 
                  cursor: 'pointer',
                  fontSize: '1.1rem',
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
              style={{ 
                backgroundColor: '#D4AF37', 
                color: '#000000', 
                padding: '1rem 2.5rem', 
                borderRadius: '0.75rem', 
                border: 'none', 
                fontWeight: 'bold', 
                cursor: 'pointer',
                fontSize: '1.1rem',
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
              Upgrade to Pro Account
            </button>
          )}
        </div>

        {/* Footer Note */}
        <div style={{ 
          marginTop: '4rem',
          padding: '1.5rem',
          borderTop: '1px solid #3B82F6',
          maxWidth: '400px',
          margin: '4rem auto 0',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '1rem'
        }}>
          <p style={{ 
            color: '#9CA3AF', 
            fontSize: '0.9rem',
            textShadow: '0 0 5px #3B82F6'
          }}>
            Powered by <strong style={{color: '#D4AF37'}}>Luminix</strong> — AI/Web3 solutions for real-world impact.
          </p>
        </div>
      </div>
    </div>
  );
}