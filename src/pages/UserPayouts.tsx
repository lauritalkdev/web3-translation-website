import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Payout {
  id: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  method: 'USDT BEP-20' | 'USDT TRC-20';
  transactionHash?: string;
  walletAddress: string;
}

type CryptoMethod = 'USDT BEP-20' | 'USDT TRC-20';

export default function UserPayouts() {
  const navigate = useNavigate();
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<CryptoMethod>('USDT BEP-20');
  const [walletAddress, setWalletAddress] = useState('');

  // Mock data - replace with actual data from your backend
  const [payouts, setPayouts] = useState<Payout[]>([
    {
      id: '1',
      date: '2024-01-15',
      amount: 150.50,
      status: 'completed',
      method: 'USDT BEP-20',
      transactionHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e0F3B1F1d1E',
    },
    {
      id: '2',
      date: '2024-01-10',
      amount: 200.00,
      status: 'completed',
      method: 'USDT TRC-20',
      transactionHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      walletAddress: 'TAbCdEfGhIjKlMnOpQrStUvWxYz0123456789',
    },
    {
      id: '3',
      date: '2024-01-05',
      amount: 75.25,
      status: 'pending',
      method: 'USDT BEP-20',
      walletAddress: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b',
    },
    {
      id: '4',
      date: '2023-12-28',
      amount: 125.00,
      status: 'failed',
      method: 'USDT TRC-20',
      walletAddress: 'TC1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0',
    },
  ]);

  const totalEarnings = 850.75;
  const availableBalance = 350.25;
  const totalPayouts = 500.50;
  const MIN_WITHDRAWAL = 50;

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    
    if (amount < MIN_WITHDRAWAL) {
      alert(`Minimum withdrawal amount is $${MIN_WITHDRAWAL}`);
      return;
    }
    
    if (amount > availableBalance) {
      alert('Insufficient balance');
      return;
    }
    
    if (!walletAddress.trim()) {
      alert('Please enter your wallet address');
      return;
    }

    // Validate wallet address format based on selected method
    if (selectedMethod === 'USDT BEP-20' && !walletAddress.startsWith('0x')) {
      alert('Please enter a valid BEP-20 wallet address (should start with 0x)');
      return;
    }
    
    if (selectedMethod === 'USDT TRC-20' && !walletAddress.startsWith('T')) {
      alert('Please enter a valid TRC-20 wallet address (should start with T)');
      return;
    }

    // Here you would typically call your backend API
    console.log('Withdrawing:', { 
      amount, 
      method: selectedMethod, 
      walletAddress 
    });
    
    // Add new payout to list
    const newPayout: Payout = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      amount,
      status: 'pending',
      method: selectedMethod,
      walletAddress,
    };
    
    setPayouts([newPayout, ...payouts]);
    setWithdrawAmount('');
    setWalletAddress('');
    
    alert(`Withdrawal request for $${amount.toFixed(2)} submitted successfully! It will be processed within 3 business days.`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'failed': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'USDT BEP-20': return '🔗';
      case 'USDT TRC-20': return '⚡';
      default: return '💰';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const formatWalletAddress = (address: string) => {
    if (address.length <= 16) return address;
    return `${address.substring(0, 8)}...${address.substring(address.length - 8)}`;
  };

  const formatTransactionHash = (hash?: string) => {
    if (!hash) return 'Pending';
    if (hash.length <= 16) return hash;
    return `${hash.substring(0, 10)}...${hash.substring(hash.length - 8)}`;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #0f0f23 50%, #1a1a2e 100%)',
      color: '#ffffff',
      padding: '2rem 1rem',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: '#D4AF37',
            textShadow: '0 0 10px #D4AF37'
          }}>
            💰 Payouts & Withdrawals
          </h1>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              background: 'transparent',
              border: '1px solid #228B22',
              color: '#228B22',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#228B22';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#228B22';
            }}
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(34, 139, 34, 0.2) 100%)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid #D4AF37',
          }}>
            <div style={{ fontSize: '0.9rem', color: '#9CA3AF', marginBottom: '0.5rem' }}>
              Total Earnings
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#D4AF37' }}>
              ${totalEarnings.toFixed(2)}
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(34, 139, 34, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid #228B22',
          }}>
            <div style={{ fontSize: '0.9rem', color: '#9CA3AF', marginBottom: '0.5rem' }}>
              Available Balance
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#228B22' }}>
              ${availableBalance.toFixed(2)}
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid #3B82F6',
          }}>
            <div style={{ fontSize: '0.9rem', color: '#9CA3AF', marginBottom: '0.5rem' }}>
              Total Payouts
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3B82F6' }}>
              ${totalPayouts.toFixed(2)}
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
        }}>
          {/* Withdrawal Form */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '1rem',
            padding: '2rem',
            border: '2px solid #3B82F6',
          }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#3B82F6' }}>
              Request Withdrawal
            </h2>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#E5E7EB' }}>
                Amount to Withdraw (Min: ${MIN_WITHDRAWAL})
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#D4AF37', fontSize: '1.25rem' }}>$</span>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder="0.00"
                  min={MIN_WITHDRAWAL}
                  max={availableBalance}
                  step="0.01"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid #D4AF37',
                    borderRadius: '0.5rem',
                    color: '#ffffff',
                    fontSize: '1rem',
                  }}
                />
              </div>
              <div style={{ fontSize: '0.85rem', color: '#9CA3AF', marginTop: '0.5rem' }}>
                Available: ${availableBalance.toFixed(2)}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#E5E7EB' }}>
                Withdrawal Method
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {(['USDT BEP-20', 'USDT TRC-20'] as CryptoMethod[]).map((method) => (
                  <button
                    key={method}
                    onClick={() => setSelectedMethod(method)}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: selectedMethod === method ? '#3B82F6' : 'rgba(0, 0, 0, 0.5)',
                      border: `1px solid ${selectedMethod === method ? '#3B82F6' : '#4B5563'}`,
                      borderRadius: '0.5rem',
                      color: selectedMethod === method ? '#ffffff' : '#E5E7EB',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      minWidth: '140px',
                    }}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#E5E7EB' }}>
                Wallet Address ({selectedMethod})
              </label>
              <input
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder={
                  selectedMethod === 'USDT BEP-20' 
                    ? '0x... (BSC Network)' 
                    : 'T... (TRON Network)'
                }
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  background: 'rgba(0, 0, 0, 0.5)',
                  border: '1px solid #228B22',
                  borderRadius: '0.5rem',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontFamily: 'monospace',
                }}
              />
              <div style={{ fontSize: '0.8rem', color: '#9CA3AF', marginTop: '0.25rem' }}>
                {selectedMethod === 'USDT BEP-20' 
                  ? 'Enter your BSC wallet address starting with 0x'
                  : 'Enter your TRON wallet address starting with T'
                }
              </div>
            </div>

            <button
              onClick={handleWithdraw}
              disabled={!withdrawAmount || !walletAddress || parseFloat(withdrawAmount) < MIN_WITHDRAWAL || parseFloat(withdrawAmount) > availableBalance}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #228B22 0%, #3B82F6 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '1rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
                opacity: (!withdrawAmount || !walletAddress || parseFloat(withdrawAmount) < MIN_WITHDRAWAL || parseFloat(withdrawAmount) > availableBalance) ? 0.5 : 1,
              }}
              onMouseOver={(e) => {
                if (withdrawAmount && walletAddress && parseFloat(withdrawAmount) >= MIN_WITHDRAWAL && parseFloat(withdrawAmount) <= availableBalance) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(34, 139, 34, 0.3)';
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              💸 Request Withdrawal
            </button>

            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '0.5rem',
              fontSize: '0.85rem',
              color: '#9CA3AF',
              border: '1px solid #4B5563',
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#D4AF37' }}>
                ⏱️ Processing Information:
              </div>
              <div>• Minimum withdrawal: ${MIN_WITHDRAWAL}</div>
              <div>• Processing time: 1-3 business days maximum</div>
              <div>• Network fees: Covered by us</div>
              <div>• Available 24/7</div>
              <div style={{ marginTop: '0.5rem', color: '#EF4444', fontSize: '0.8rem' }}>
                ⚠️ Double-check your wallet address before submitting
              </div>
            </div>
          </div>

          {/* Payout History */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '1rem',
            padding: '2rem',
            border: '2px solid #D4AF37',
            overflowX: 'auto',
          }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#D4AF37' }}>
              📋 Payout History
            </h2>
            
            {payouts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#9CA3AF' }}>
                No payout history yet. Start translating to earn money!
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #374151' }}>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#9CA3AF', fontWeight: 'normal' }}>Date</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#9CA3AF', fontWeight: 'normal' }}>Method</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#9CA3AF', fontWeight: 'normal' }}>Amount</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#9CA3AF', fontWeight: 'normal' }}>Wallet Address</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#9CA3AF', fontWeight: 'normal' }}>Transaction Hash</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#9CA3AF', fontWeight: 'normal' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payouts.map((payout) => (
                      <tr key={payout.id} style={{ borderBottom: '1px solid #374151' }}>
                        <td style={{ padding: '1rem', color: '#E5E7EB' }}>{payout.date}</td>
                        <td style={{ padding: '1rem', color: '#E5E7EB' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '1.25rem' }}>{getMethodIcon(payout.method)}</span>
                            {payout.method}
                          </div>
                        </td>
                        <td style={{ padding: '1rem', color: '#D4AF37', fontWeight: 'bold' }}>
                          ${payout.amount.toFixed(2)}
                        </td>
                        <td style={{ padding: '1rem', color: '#E5E7EB', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                          <div 
                            style={{ 
                              cursor: 'pointer',
                              textDecoration: 'underline',
                              color: '#3B82F6'
                            }}
                            onClick={() => copyToClipboard(payout.walletAddress)}
                            title="Click to copy"
                          >
                            {formatWalletAddress(payout.walletAddress)}
                          </div>
                        </td>
                        <td style={{ padding: '1rem', color: '#E5E7EB', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                          {payout.transactionHash ? (
                            <div 
                              style={{ 
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                color: '#10B981'
                              }}
                              onClick={() => copyToClipboard(payout.transactionHash!)}
                              title="Click to copy transaction hash"
                            >
                              {formatTransactionHash(payout.transactionHash)}
                            </div>
                          ) : (
                            <span style={{ color: '#F59E0B' }}>Pending</span>
                          )}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '1rem',
                            background: getStatusColor(payout.status) + '20',
                            color: getStatusColor(payout.status),
                            fontSize: '0.85rem',
                            fontWeight: '500',
                          }}>
                            {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Payout Details */}
            <div style={{
              marginTop: '2rem',
              padding: '1.5rem',
              background: 'rgba(26, 26, 46, 0.8)',
              borderRadius: '0.5rem',
              border: '1px solid #228B22',
            }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#228B22' }}>
                ℹ️ Payout Information
              </h3>
              <ul style={{ color: '#9CA3AF', fontSize: '0.9rem', lineHeight: '1.6', paddingLeft: '1.5rem' }}>
                <li><strong>Minimum withdrawal amount:</strong> ${MIN_WITHDRAWAL}</li>
                <li><strong>Withdrawal methods:</strong> USDT BEP-20 & USDT TRC-20 only</li>
                <li><strong>Processing time:</strong> 1-3 business days maximum</li>
                <li><strong>Network fees:</strong> Covered by the platform</li>
                <li><strong>Wallet verification:</strong> Double-check your address before submitting</li>
                <li><strong>Transaction tracking:</strong> Use the transaction hash to track your payout on the blockchain explorer</li>
                <li><strong>Support:</strong> Contact support if you don't receive your payout within 3 business days</li>
              </ul>
              <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '0.25rem' }}>
                <div style={{ color: '#D4AF37', fontSize: '0.85rem', marginBottom: '0.25rem' }}>💡 Pro Tip:</div>
                <div style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>
                  Always verify you're sending to the correct network. BEP-20 addresses start with "0x" and TRC-20 addresses start with "T".
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}