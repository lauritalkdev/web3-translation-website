import React from 'react';

interface PaymentSuccessProps {
  onClose: () => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#1a1a1a',
        padding: '3rem',
        borderRadius: '12px',
        border: '2px solid #228B22',
        maxWidth: '500px',
        width: '90%',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
        <h2 style={{ color: '#228B22', marginBottom: '1rem' }}>Payment Successful!</h2>
        <p style={{ color: '#ccc', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
          Welcome to Web3 Translate Pro! Your account has been upgraded to premium status.
        </p>
        <div style={{ 
          backgroundColor: '#2a2a2a', 
          padding: '1rem', 
          borderRadius: '8px',
          marginBottom: '1.5rem'
        }}>
          <p style={{ color: '#ffd700', fontWeight: 'bold', margin: 0 }}>
            ✅ Pro Account Activated
          </p>
        </div>
        <button 
          onClick={onClose}
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: '#228B22',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem'
          }}
        >
          Continue to App
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;