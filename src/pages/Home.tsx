import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000000', 
      color: '#ffffff',
      width: '100%',
      overflowX: 'hidden'
    }}>
      {/* Navigation */}
      <nav style={{ 
        backgroundColor: '#000000', 
        borderBottom: '1px solid #D4AF37', 
        padding: '1rem 0',
        width: '100%'
      }}>
        <div style={{ 
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
        }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#D4AF37' }}>Web3 Translate</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              onClick={() => navigate('/login')}
              style={{ color: '#D4AF37', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/register')}
              style={{ backgroundColor: '#228B22', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.375rem', border: 'none', cursor: 'pointer' }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '5rem 1rem', 
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
          fontWeight: 'bold', 
          marginBottom: '1.5rem',
        }}>
          <span style={{ color: '#D4AF37' }}>AI-Powered</span>{' '}
          <span style={{ color: '#ffffff' }}>Web3</span>{' '}
          <span style={{ color: '#228B22' }}>Translation</span>
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#9CA3AF', 
          marginBottom: '2rem', 
          maxWidth: '600px',
          margin: '0 auto 2rem'
        }}>
          Break language barriers with our inclusive AI translator. Supporting multiple payment methods including crypto.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={() => navigate('/register')}
            style={{ backgroundColor: '#D4AF37', color: '#000000', padding: '0.75rem 2rem', borderRadius: '0.5rem', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Get Started
          </button>
          <button 
            onClick={() => navigate('/billing')}
            style={{ border: '1px solid #D4AF37', color: '#D4AF37', padding: '0.75rem 2rem', borderRadius: '0.5rem', background: 'none', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Upgrade to Pro
          </button>
        </div>
      </div>
    </div>
  );
}