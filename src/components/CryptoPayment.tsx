import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import PaymentDisplay from './PaymentDisplay';
import PaymentSuccess from './PaymentSuccess';
import './CryptoPayment.css';

const CryptoPayment: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | '6month' | 'annual'>('monthly');
  const [selectedCurrency, setSelectedCurrency] = useState('btc');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentDisplay, setShowPaymentDisplay] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentPaymentData, setCurrentPaymentData] = useState<{
    pay_address: string;
    pay_amount: number;
    pay_currency: string;
    payment_id: string;
    expiration_estimate_date: string;
  } | null>(null);

  const currencies = [
    { code: 'btc', name: 'Bitcoin (BTC)' },
    { code: 'eth', name: 'Ethereum (ETH)' },
    { code: 'usdttrc20', name: 'USDT (TRC20)' },
    { code: 'usdtbep20', name: 'USDT (BEP20)' },
    { code: 'bnb', name: 'BNB' },
    { code: 'xrp', name: 'XRP' },
    { code: 'ltc', name: 'Litecoin (LTC)' },
    { code: 'doge', name: 'Dogecoin (DOGE)' },
    { code: 'ada', name: 'Cardano (ADA)' },
    { code: 'sol', name: 'Solana (SOL)' }
  ];

  // Check payment status when payment display is shown
  useEffect(() => {
    if (!showPaymentDisplay || !currentPaymentData) return;

    const checkPaymentStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Check if user is now pro (payment webhook has updated their status)
        const { data: profile } = await supabase
          .from('profiles')
          .select('account_tier')
          .eq('id', user.id)
          .single();

        if (profile?.account_tier === 'premium') {
          setShowSuccess(true);
          setShowPaymentDisplay(false);
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
      }
    };

    // Check every 10 seconds
    const interval = setInterval(checkPaymentStatus, 10000);
    return () => clearInterval(interval);
  }, [showPaymentDisplay, currentPaymentData]);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No active session found');
      }

      // Test direct fetch to Edge Function
      const response = await fetch('https://cvdvqxxgbjvoplslnewj.supabase.co/functions/v1/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          plan_id: selectedPlan,
          user_id: session.user.id,
          payment_currency: selectedCurrency
        })
      });

      console.log('Direct fetch response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log('FULL RESPONSE:', JSON.stringify(result, null, 2));
      
      // Check what properties are actually available
      if (result.payment) {
        console.log('Payment object keys:', Object.keys(result.payment));
        
        if (result.payment.payment_id) {
          // Show our own payment display instead of NowPayments page
          setCurrentPaymentData(result.payment);
          setShowPaymentDisplay(true);
        } else {
          throw new Error('No payment ID received. Payment object: ' + JSON.stringify(result.payment));
        }
      } else {
        throw new Error('No payment object in response: ' + JSON.stringify(result));
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="crypto-payment">
      <h3>Pay with Crypto</h3>
      
      <div className="plan-selection">
        <label>
          <input
            type="radio"
            value="monthly"
            checked={selectedPlan === 'monthly'}
            onChange={(e) => setSelectedPlan(e.target.value as 'monthly' | '6month' | 'annual')}
          />
          Monthly - $7
        </label>
        <label>
          <input
            type="radio"
            value="6month"
            checked={selectedPlan === '6month'}
            onChange={(e) => setSelectedPlan(e.target.value as 'monthly' | '6month' | 'annual')}
          />
          6 Months - $40
        </label>
        <label>
          <input
            type="radio"
            value="annual"
            checked={selectedPlan === 'annual'}
            onChange={(e) => setSelectedPlan(e.target.value as 'monthly' | '6month' | 'annual')}
          />
          Annual - $60
        </label>
      </div>

      <div className="currency-selection">
        <label>Select Cryptocurrency:</label>
        <select 
          value={selectedCurrency} 
          onChange={(e) => setSelectedCurrency(e.target.value)}
        >
          {currencies.map(currency => (
            <option key={currency.code} value={currency.code}>
              {currency.name}
            </option>
          ))}
        </select>
      </div>

      <button 
        onClick={handlePayment} 
        disabled={isProcessing}
        className="pay-button"
      >
        {isProcessing ? 'Processing...' : `Pay with ${selectedCurrency.toUpperCase()}`}
      </button>

      {showPaymentDisplay && currentPaymentData && (
        <PaymentDisplay 
          paymentData={currentPaymentData}
          onClose={() => setShowPaymentDisplay(false)}
        />
      )}

      {showSuccess && (
        <PaymentSuccess 
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
};

export default CryptoPayment;