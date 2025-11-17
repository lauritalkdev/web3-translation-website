import { useNavigate } from 'react-router-dom';

export default function Billing() {
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
        padding: '2rem 1rem'
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
              $6<span style={{ fontSize: '1rem', color: '#9CA3AF' }}>/month</span>
            </div>
            <p style={{ color: '#9CA3AF', marginBottom: '1.5rem' }}>
              Perfect for short-term projects
            </p>
            <button style={{ 
              backgroundColor: '#D4AF37', 
              color: '#000000', 
              padding: '0.75rem 2rem', 
              borderRadius: '0.375rem', 
              border: 'none', 
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '100%'
            }}>
              Select Monthly
            </button>
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
              Save $12 - 2 months free
            </p>
            <button style={{ 
              backgroundColor: '#228B22', 
              color: '#ffffff', 
              padding: '0.75rem 2rem', 
              borderRadius: '0.375rem', 
              border: 'none', 
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '100%'
            }}>
              Select Annual
            </button>
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
            {/* Crypto Payment */}
            <div style={{ 
              backgroundColor: '#2d2d2d', 
              padding: '1.5rem', 
              borderRadius: '0.375rem', 
              border: '1px solid #333333'
            }}>
              <h4 style={{ fontWeight: 'bold', color: '#D4AF37', marginBottom: '0.5rem' }}>
                Pay with Crypto (NowPayments)
              </h4>
              <p style={{ color: '#9CA3AF', fontSize: '0.875rem', marginBottom: '1rem' }}>
                Bitcoin, Ethereum, USDT, and other major cryptocurrencies
              </p>
              <button style={{ 
                backgroundColor: '#D4AF37', 
                color: '#000000', 
                padding: '0.75rem 1.5rem', 
                borderRadius: '0.375rem', 
                border: 'none', 
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Pay with Crypto
              </button>
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
    </div>
  );
}