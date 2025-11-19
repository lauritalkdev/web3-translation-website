import { useNavigate } from 'react-router-dom';
import CryptoPayment from '../components/CryptoPayment';

export default function Billing() {
  const navigate = useNavigate();

  const openLinkedIn = () => {
    window.open('https://www.linkedin.com/company/luminixspace/', '_blank');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000000', 
      color: '#ffffff',
      width: '100%',
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column'
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

      {/* Main Content */}
      <div style={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1rem',
        flex: '1'
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          color: '#D4AF37', 
          textAlign: 'center', 
          marginBottom: '3rem' 
        }}>
          Upgrade to Pro
        </h1>
        
        {/* Pricing Plans */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem', 
          marginBottom: '3rem'
        }}>
          {/* Monthly Plan */}
          <div style={{ 
            backgroundColor: '#1a1a1a', 
            padding: '2rem', 
            borderRadius: '0.5rem',
            border: '1px solid #333333',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '1rem' }}>
              Monthly
            </h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#D4AF37', marginBottom: '1rem' }}>
              $7<span style={{ fontSize: '1rem', color: '#9CA3AF' }}>/month</span>
            </div>
            <p style={{ color: '#9CA3AF', marginBottom: '1.5rem' }}>
              Perfect for short-term projects
            </p>
          </div>

          {/* Annual Plan */}
          <div style={{ 
            backgroundColor: '#1a1a1a', 
            padding: '2rem', 
            borderRadius: '0.5rem',
            border: '2px solid #D4AF37',
            textAlign: 'center'
          }}>
            <div style={{ 
              backgroundColor: '#D4AF37', 
              color: '#000000', 
              padding: '0.5rem', 
              borderRadius: '0.25rem',
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}>
              BEST VALUE
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffffff', marginBottom: '1rem' }}>
              Annual
            </h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#D4AF37', marginBottom: '1rem' }}>
              $60<span style={{ fontSize: '1rem', color: '#9CA3AF' }}>/year</span>
            </div>
            <p style={{ color: '#9CA3AF', marginBottom: '1.5rem' }}>
              Save $24 - 2 months free
            </p>
          </div>
        </div>

        {/* Payment Methods */}
        <div style={{ 
          backgroundColor: '#1a1a1a', 
          padding: '2rem', 
          borderRadius: '0.5rem',
          border: '1px solid #D4AF37'
        }}>
          <h3 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            color: '#228B22', 
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            Choose Payment Method
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Crypto Payment - REPLACED WITH ACTUAL COMPONENT */}
            <div style={{ 
              backgroundColor: '#2d2d2d', 
              padding: '1.5rem', 
              borderRadius: '0.375rem', 
              border: '1px solid #333333'
            }}>
              <h4 style={{ fontWeight: 'bold', color: '#D4AF37', marginBottom: '1rem' }}>
                Pay with Crypto (NowPayments)
              </h4>
              <CryptoPayment />
            </div>

            {/* Card Payment */}
            <div style={{ 
              backgroundColor: '#2d2d2d', 
              padding: '1.5rem', 
              borderRadius: '0.375rem', 
              border: '1px solid #333333'
            }}>
              <h4 style={{ fontWeight: 'bold', color: '#228B22', marginBottom: '0.5rem' }}>
                Pay with Card
              </h4>
              <p style={{ color: '#9CA3AF', fontSize: '0.875rem', marginBottom: '1rem' }}>
                Secure payment via Stripe - Visa, MasterCard, American Express
              </p>
              <button style={{ 
                backgroundColor: '#228B22', 
                color: '#ffffff', 
                padding: '0.75rem 1.5rem', 
                borderRadius: '0.375rem', 
                border: 'none', 
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Pay with Card
              </button>
            </div>

            {/* MoMo Payment */}
            <div style={{ 
              backgroundColor: '#2d2d2d', 
              padding: '1.5rem', 
              borderRadius: '0.375rem', 
              border: '1px solid #333333'
            }}>
              <h4 style={{ fontWeight: 'bold', color: '#8A2BE2', marginBottom: '0.5rem' }}>
                Pay with MoMo
              </h4>
              <p style={{ color: '#9CA3AF', fontSize: '0.875rem', marginBottom: '1rem' }}>
                Mobile Money payment - MTN Mobile Money, Orange Money
              </p>
              <button style={{ 
                backgroundColor: '#8A2BE2', 
                color: '#ffffff', 
                padding: '0.75rem 1.5rem', 
                borderRadius: '0.375rem', 
                border: 'none', 
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Pay with MoMo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Footer */}
      <footer style={{
        backgroundColor: '#000000',
        borderTop: '2px solid #D4AF37',
        padding: '2rem 1rem',
        marginTop: 'auto',
        width: '100%'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem'
        }}>
          {/* Company Info */}
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ 
              color: '#D4AF37', 
              fontSize: '1.25rem', 
              fontWeight: 'bold',
              marginBottom: '0.5rem'
            }}>
              Web3 Translate by Luminix
            </h3>
            <p style={{ 
              color: '#9CA3AF', 
              fontSize: '0.9rem',
              maxWidth: '500px'
            }}>
              Breaking language barriers with AI-powered, Web3-secure translation technology for a more connected world.
            </p>
          </div>

          {/* Social Links - Professional LinkedIn Icon */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <p style={{ color: '#E5E7EB', fontSize: '0.9rem', margin: 0 }}>
              Connect with us:
            </p>
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
          <div style={{ textAlign: 'center' }}>
            <p style={{ 
              color: '#6B7280', 
              fontSize: '0.8rem',
              borderTop: '1px solid #374151',
              paddingTop: '1rem',
              width: '100%',
              margin: 0
            }}>
              © {new Date().getFullYear()} Luminix. All rights reserved. 
              Building the future of inclusive communication.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}