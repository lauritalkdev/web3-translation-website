import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from "qrcode.react";

interface PaymentDisplayProps {
  paymentData: {
    pay_address: string;
    pay_amount: number;
    pay_currency: string;
    payment_id: string;
    expiration_estimate_date: string;
  };
  onClose: () => void;
}

const PaymentDisplay: React.FC<PaymentDisplayProps> = ({ paymentData, onClose }) => {
  const [timeLeft, setTimeLeft] = useState<number>(45 * 60); // 45 minutes in seconds
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Set timer to 45 minutes regardless of API response
    const expiryTime = new Date().getTime() + (45 * 60 * 1000);
    
    const updateTimer = () => {
      const now = new Date().getTime();
      const remaining = Math.max(0, expiryTime - now);
      setTimeLeft(Math.floor(remaining / 1000));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Create payment URI for QR code
  const getPaymentURI = () => {
    const currency = paymentData.pay_currency.toLowerCase();
    const amount = paymentData.pay_amount;
    const address = paymentData.pay_address;

    if (currency === 'btc') {
      return `bitcoin:${address}?amount=${amount}`;
    } else if (currency === 'eth') {
      return `ethereum:${address}?value=${amount * 1e18}`;
    } else if (currency.includes('usdt')) {
      return `ethereum:${address}?value=0&contract=0xdac17f958d2ee523a2206206994597c13d831ec7`;
    }
    return address; // Fallback to just the address
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(paymentData.pay_address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

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
      zIndex: 1000,
      overflow: 'auto',
      padding: '20px 0'
    }}>
      <div style={{
        backgroundColor: '#1a1a1a',
        padding: '2rem',
        borderRadius: '12px',
        border: '2px solid #D4AF37',
        maxWidth: '450px',
        width: '90%',
        maxHeight: '90vh',
        overflowY: 'auto',
        textAlign: 'center',
        color: 'white',
        margin: 'auto'
      }}>
        <h3 style={{ color: '#ffd700', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
          Complete Your Payment
        </h3>
        
        {/* QR Code */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
          <div style={{ 
            padding: '1rem', 
            backgroundColor: 'white', 
            borderRadius: '8px',
            display: 'inline-block'
          }}>
            <QRCodeSVG 
              value={getPaymentURI()} 
              size={200}
              level="M"
              includeMargin={false}
            />
          </div>
        </div>

        {/* Payment Amount */}
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ color: '#ccc', marginBottom: '0.5rem', fontSize: '1rem' }}>Send exactly:</p>
          <p style={{ color: '#ffd700', fontSize: '1.8rem', fontWeight: 'bold' }}>
            {paymentData.pay_amount.toFixed(8)} {paymentData.pay_currency.toUpperCase()}
          </p>
        </div>

        {/* Payment Address with Copy Button */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ color: '#ccc', marginBottom: '0.5rem', fontSize: '1rem' }}>To address:</p>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            backgroundColor: '#2a2a2a',
            padding: '0.75rem',
            borderRadius: '6px',
            border: '1px solid #333',
          }}>
            <p style={{ 
              color: '#228B22', 
              fontSize: '0.8rem', 
              wordBreak: 'break-all',
              fontFamily: 'monospace',
              margin: 0,
              flex: 1
            }}>
              {paymentData.pay_address}
            </p>
            <button 
              onClick={copyToClipboard}
              style={{
                backgroundColor: copied ? '#228B22' : '#333',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '0.5rem',
                cursor: 'pointer',
                minWidth: '60px'
              }}
            >
              {copied ? '✓' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Timer */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ color: '#ccc', marginBottom: '0.5rem' }}>Time remaining:</p>
          <p style={{ 
            color: timeLeft < 300 ? '#ff4444' : '#ffd700', 
            fontSize: '1.5rem', 
            fontWeight: 'bold',
            fontFamily: 'monospace'
          }}>
            {formatTime(timeLeft)}
          </p>
          <p style={{ color: '#999', fontSize: '0.8rem', marginTop: '0.25rem' }}>
            45 minutes to complete payment
          </p>
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: '#333',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem'
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PaymentDisplay;