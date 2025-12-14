import { useNavigate } from 'react-router-dom';
import CryptoPayment from '../components/CryptoPayment';

export default function Billing() {
  const navigate = useNavigate();

  const openLinkedIn = () => {
    window.open('https://www.linkedin.com/company/luminixspace/', '_blank');
  };

  const openFacebook = () => {
    window.open('https://www.facebook.com/luminixspace', '_blank');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000000', 
      color: '#ffffff',
      width: '100%',
      maxWidth: '100vw',
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      position: 'relative'
    }}>
      {/* Navigation */}
      <nav style={{ 
        backgroundColor: '#000000', 
        borderBottom: '1px solid #D4AF37', 
        padding: '1rem 0',
        width: '100%',
        maxWidth: '100vw',
        boxSizing: 'border-box',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ 
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          width: '100%',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}>
          <h1 style={{ 
            fontSize: 'clamp(1.1rem, 4vw, 1.5rem)', 
            fontWeight: 'bold', 
            color: '#D4AF37',
            wordBreak: 'break-word',
            maxWidth: '70%'
          }}>
            Web3 Translate
          </h1>
          <div style={{ display: 'flex', gap: '1rem', flexShrink: 0 }}>
            <button 
              onClick={() => navigate('/')}
              style={{ 
                color: '#ffffff', 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                fontSize: 'clamp(0.8rem, 3vw, 1rem)',
                padding: '0.25rem 0.5rem',
                whiteSpace: 'nowrap'
              }}
            >
              Home
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ 
        flex: '1',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
        boxSizing: 'border-box',
        padding: '0'
      }}>
        <div style={{ 
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(1rem, 4vw, 2rem) clamp(0.75rem, 3vw, 1rem)',
          width: '100%',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}>
          <h1 style={{ 
            fontSize: 'clamp(1.5rem, 6vw, 2.5rem)', 
            fontWeight: 'bold', 
            color: '#D4AF37', 
            textAlign: 'center', 
            marginBottom: 'clamp(1.5rem, 5vw, 3rem)',
            padding: '0 0.5rem',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
            hyphens: 'auto'
          }}>
            Upgrade to Pro
          </h1>
          
          {/* Pricing Plans */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: 'clamp(1rem, 4vw, 2rem)', 
            marginBottom: 'clamp(1.5rem, 5vw, 3rem)',
            padding: '0',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            {/* Monthly Plan */}
            <div style={{ 
              backgroundColor: '#1a1a1a', 
              padding: 'clamp(1.25rem, 4vw, 2rem)', 
              borderRadius: '0.5rem',
              border: '1px solid #333333',
              textAlign: 'center',
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box',
              overflow: 'hidden'
            }}>
              <h3 style={{ 
                fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)', 
                fontWeight: 'bold', 
                color: '#ffffff', 
                marginBottom: '0.75rem',
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}>
                Monthly
              </h3>
              <div style={{ 
                fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', 
                fontWeight: 'bold', 
                color: '#D4AF37', 
                marginBottom: '0.75rem',
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}>
                $7<span style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1rem)', color: '#9CA3AF' }}>/month</span>
              </div>
              <p style={{ 
                color: '#9CA3AF', 
                marginBottom: '1.25rem',
                fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
                lineHeight: '1.5',
                overflowWrap: 'break-word'
              }}>
                Perfect for short-term projects
              </p>
            </div>

            {/* 6-Month Plan */}
            <div style={{ 
              backgroundColor: '#1a1a1a', 
              padding: 'clamp(1.25rem, 4vw, 2rem)', 
              borderRadius: '0.5rem',
              border: '1px solid #333333',
              textAlign: 'center',
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box',
              overflow: 'hidden'
            }}>
              <div style={{ 
                backgroundColor: '#8A2BE2', 
                color: '#ffffff', 
                padding: 'clamp(0.3rem, 1.5vw, 0.5rem)', 
                borderRadius: '0.25rem',
                fontWeight: 'bold',
                marginBottom: '0.75rem',
                fontSize: 'clamp(0.7rem, 2vw, 0.875rem)',
                display: 'inline-block'
              }}>
                POPULAR
              </div>
              <h3 style={{ 
                fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)', 
                fontWeight: 'bold', 
                color: '#ffffff', 
                marginBottom: '0.75rem',
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}>
                6 Months
              </h3>
              <div style={{ 
                fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', 
                fontWeight: 'bold', 
                color: '#8A2BE2', 
                marginBottom: '0.75rem',
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}>
                $40<span style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1rem)', color: '#9CA3AF' }}>/6 months</span>
              </div>
              <div style={{ 
                fontSize: 'clamp(0.7rem, 2vw, 0.9rem)', 
                color: '#D4AF37', 
                marginBottom: '0.5rem',
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}>
                Save $2 - Only $6.67/month
              </div>
              <p style={{ 
                color: '#9CA3AF', 
                marginBottom: '1.25rem',
                fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
                lineHeight: '1.5',
                overflowWrap: 'break-word'
              }}>
                Great value for medium-term needs
              </p>
            </div>

            {/* Annual Plan */}
            <div style={{ 
              backgroundColor: '#1a1a1a', 
              padding: 'clamp(1.25rem, 4vw, 2rem)', 
              borderRadius: '0.5rem',
              border: '2px solid #D4AF37',
              textAlign: 'center',
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box',
              overflow: 'hidden'
            }}>
              <div style={{ 
                backgroundColor: '#D4AF37', 
                color: '#000000', 
                padding: 'clamp(0.3rem, 1.5vw, 0.5rem)', 
                borderRadius: '0.25rem',
                fontWeight: 'bold',
                marginBottom: '0.75rem',
                fontSize: 'clamp(0.7rem, 2vw, 0.875rem)',
                display: 'inline-block'
              }}>
                BEST VALUE
              </div>
              <h3 style={{ 
                fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)', 
                fontWeight: 'bold', 
                color: '#ffffff', 
                marginBottom: '0.75rem',
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}>
                Annual
              </h3>
              <div style={{ 
                fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', 
                fontWeight: 'bold', 
                color: '#D4AF37', 
                marginBottom: '0.75rem',
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}>
                $60<span style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1rem)', color: '#9CA3AF' }}>/year</span>
            </div>
            <div style={{ 
              fontSize: 'clamp(0.7rem, 2vw, 0.9rem)', 
              color: '#D4AF37', 
              marginBottom: '0.5rem',
              wordBreak: 'break-word',
              overflowWrap: 'break-word'
            }}>
              Save $24 - Only $5/month
            </div>
            <p style={{ 
              color: '#9CA3AF', 
              marginBottom: '1.25rem',
              fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
              lineHeight: '1.5',
              overflowWrap: 'break-word'
            }}>
              Best for long-term projects
            </p>
          </div>
        </div>

        {/* Payment Methods - Now Only Crypto Payment */}
        <div style={{ 
          backgroundColor: '#1a1a1a', 
          padding: 'clamp(1.25rem, 4vw, 2rem)', 
          borderRadius: '0.5rem',
          border: '1px solid #D4AF37',
          maxWidth: '800px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}>
          <h3 style={{ 
            fontSize: 'clamp(1.25rem, 4vw, 1.5rem)', 
            fontWeight: 'bold', 
            color: '#D4AF37', 
            textAlign: 'center',
            marginBottom: 'clamp(1rem, 4vw, 2rem)',
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}>
            Pay with Crypto
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
            {/* Crypto Payment - Only Payment Method */}
            <div style={{ 
              backgroundColor: '#2d2d2d', 
              padding: 'clamp(1rem, 3vw, 1.5rem)', 
              borderRadius: '0.375rem', 
              border: '1px solid #333333',
              width: '100%',
              boxSizing: 'border-box',
              overflow: 'hidden'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem', width: '100%' }}>
                <h4 style={{ 
                  fontWeight: 'bold', 
                  color: '#D4AF37', 
                  marginBottom: '0.5rem', 
                  fontSize: 'clamp(0.95rem, 3vw, 1.2rem)',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word'
                }}>
                  Secure Crypto Payment
                </h4>
                <p style={{ 
                  color: '#9CA3AF', 
                  fontSize: 'clamp(0.75rem, 2.5vw, 0.9rem)',
                  lineHeight: '1.5',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word'
                }}>
                  Pay with Bitcoin, Ethereum, USDT, and other cryptocurrencies
                </p>
              </div>
              <CryptoPayment />
            </div>
          </div>
        </div>
      </div>
    </main>

    {/* Professional Footer */}
    <footer style={{
      backgroundColor: '#000000',
      borderTop: '2px solid #D4AF37',
      padding: 'clamp(1rem, 4vw, 2rem) clamp(0.75rem, 3vw, 1rem)',
      marginTop: 'auto',
      width: '100%',
      maxWidth: '100vw',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(1rem, 3vw, 1.5rem)',
        textAlign: 'center',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
        {/* Company Info */}
        <div style={{ width: '100%', padding: '0 0.5rem' }}>
          <h3 style={{ 
            color: '#D4AF37', 
            fontSize: 'clamp(1rem, 3.5vw, 1.25rem)', 
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}>
            Web3 Translate by Luminix
          </h3>
          <p style={{ 
            color: '#9CA3AF', 
            fontSize: 'clamp(0.75rem, 2.5vw, 0.9rem)',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: '1.5',
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}>
            Breaking language barriers with AI-powered, Web3-secure translation technology for a more connected world.
          </p>
        </div>

        {/* Social Links */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 'clamp(0.75rem, 3vw, 1rem)', 
          justifyContent: 'center', 
          width: '100%',
          flexWrap: 'wrap',
          padding: '0 0.5rem'
        }}>
          <p style={{ 
            color: '#E5E7EB', 
            fontSize: 'clamp(0.75rem, 2.5vw, 0.9rem)', 
            margin: 0,
            wordBreak: 'break-word',
            whiteSpace: 'nowrap'
          }}>
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
              width: 'clamp(32px, 7vw, 40px)',
              height: 'clamp(32px, 7vw, 40px)',
              color: '#1877F2',
              flexShrink: 0
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
            <svg width="clamp(14px, 3.5vw, 20px)" height="clamp(14px, 3.5vw, 20px)" viewBox="0 0 24 24" fill="currentColor">
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
              width: 'clamp(32px, 7vw, 40px)',
              height: 'clamp(32px, 7vw, 40px)',
              color: '#0A66C2',
              flexShrink: 0
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
            <svg width="clamp(14px, 3.5vw, 20px)" height="clamp(14px, 3.5vw, 20px)" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM18.5 18.5V13.2C18.5 12.3354 18.1565 11.5062 17.5452 10.8948C16.9338 10.2835 16.1046 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C14.6813 12.17 15.0374 12.3175 15.2999 12.5801C15.5625 12.8426 15.71 13.1987 15.71 13.57V18.5H18.5ZM6.88 8.56C7.32556 8.56 7.75288 8.383 8.06794 8.06794C8.383 7.75288 8.56 7.32556 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C6.43178 5.19 6.00193 5.36805 5.68499 5.68499C5.36805 6.00193 5.19 6.43178 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z" fill="currentColor"/>
            </svg>
          </button>
        </div>

        {/* Copyright */}
        <div style={{ width: '100%', padding: '0 0.5rem' }}>
          <p style={{ 
            color: '#6B7280', 
            fontSize: 'clamp(0.65rem, 2vw, 0.8rem)',
            borderTop: '1px solid #374151',
            paddingTop: '1rem',
            width: '100%',
            margin: '0 auto',
            maxWidth: '400px',
            lineHeight: '1.4',
            wordBreak: 'break-word',
            overflowWrap: 'break-word'
          }}>
            © {new Date().getFullYear()} Powered by Luminix. All rights reserved. 
            Building the future of inclusive communication with AI/Web3.
          </p>
        </div>
      </div>
    </footer>
  </div>
);
}