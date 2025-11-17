import { useNavigate } from 'react-router-dom';

export default function About() {
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
              onClick={() => navigate('/')}
              style={{ color: '#ffffff', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Home
            </button>
          </div>
        </div>
      </nav>

      <div style={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '3rem 1rem'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          color: '#D4AF37', 
          textAlign: 'center', 
          marginBottom: '2rem' 
        }}>
          About Us
        </h1>

        <div style={{ 
          backgroundColor: '#1a1a1a', 
          padding: '2rem', 
          borderRadius: '0.5rem',
          border: '1px solid #333333',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#D4AF37', marginBottom: '1rem' }}>
            Our Mission
          </h2>
          <p style={{ color: '#9CA3AF', lineHeight: '1.6', marginBottom: '1rem' }}>
            Web3 Translate is revolutionizing language translation by combining cutting-edge AI technology 
            with Web3 payment infrastructure. We believe in breaking down language barriers while embracing 
            the future of digital payments.
          </p>
        </div>

        <div style={{ 
          backgroundColor: '#1a1a1a', 
          padding: '2rem', 
          borderRadius: '0.5rem',
          border: '1px solid #333333',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#228B22', marginBottom: '1rem' }}>
            Features
          </h2>
          <ul style={{ color: '#9CA3AF', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
            <li>AI-powered accurate translations</li>
            <li>Support for 100+ languages</li>
            <li>Crypto payments via NowPayments</li>
            <li>Traditional card payments</li>
            <li>Mobile Money integration</li>
            <li>Real-time translation</li>
          </ul>
        </div>

        <div style={{ 
          backgroundColor: '#1a1a1a', 
          padding: '2rem', 
          borderRadius: '0.5rem',
          border: '1px solid #333333'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#D4AF37', marginBottom: '1rem' }}>
            Contact
          </h2>
          <p style={{ color: '#9CA3AF', lineHeight: '1.6' }}>
            Email: support@web3translate.com<br />
            Twitter: @Web3Translate<br />
            Telegram: t.me/web3translate
          </p>
        </div>
      </div>
    </div>
  );
}