import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Payout {
  id: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  method: 'USDT BEP-20' | 'USDT TRC-20';
  transactionHash?: string;
  walletAddress: string;
}

interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'direct_referral' | 'rank_achievement' | 'infinity' | 'withdrawal';
  description: string;
}

type CryptoMethod = 'USDT BEP-20' | 'USDT TRC-20';

export default function UserPayouts() {
  const navigate = useNavigate();
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<CryptoMethod>('USDT BEP-20');
  const [walletAddress, setWalletAddress] = useState('');
  
  // Real data states
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEarnings: 0,
    availableBalance: 0,
    totalPayouts: 0
  });
  
  // Subscription status
  const [subscriptionStatus, setSubscriptionStatus] = useState<'premium' | 'freemium'>('freemium');
  const [subscriptionExpiresAt, setSubscriptionExpiresAt] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'withdraw' | 'history'>('withdraw');

  const MIN_WITHDRAWAL = 50;

  // Check if user can withdraw (must be active premium)
  const canWithdraw = useCallback(() => {
    if (subscriptionStatus !== 'premium') return false;
    if (!subscriptionExpiresAt) return false;
    
    const now = new Date();
    const expiry = new Date(subscriptionExpiresAt);
    return expiry > now;
  }, [subscriptionStatus, subscriptionExpiresAt]);

  // Memoized fetch function
  const fetchPayouts = useCallback(async () => {
    try {
      setLoading(true);
      
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) {
        navigate('/login');
        return;
      }
      
      // Fetch subscription status
      const { data: subscription, error: subError } = await supabase
        .from('subscriptions')
        .select('status, current_period_end')
        .eq('user_id', user.id)
        .order('current_period_end', { ascending: false })
        .limit(1)
        .single();
      
      if (!subError && subscription) {
        const isActive = subscription.status === 'active' && 
          new Date(subscription.current_period_end) > new Date();
        setSubscriptionStatus(isActive ? 'premium' : 'freemium');
        setSubscriptionExpiresAt(subscription.current_period_end);
      } else {
        // Check profiles.account_tier as fallback
        const { data: profile } = await supabase
          .from('profiles')
          .select('account_tier')
          .eq('id', user.id)
          .single();
        
        setSubscriptionStatus(profile?.account_tier === 'premium' ? 'premium' : 'freemium');
      }
      
      // Fetch payouts for this user
      const { data, error } = await supabase
        .from('payouts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Transform Supabase data to match your interface
      const formattedPayouts: Payout[] = data.map(payout => ({
        id: payout.id,
        date: new Date(payout.created_at).toISOString().split('T')[0],
        amount: parseFloat(payout.amount),
        status: payout.status as 'completed' | 'pending' | 'failed',
        method: payout.method as 'USDT BEP-20' | 'USDT TRC-20',
        transactionHash: payout.transaction_hash || undefined,
        walletAddress: payout.wallet_address
      }));
      
      setPayouts(formattedPayouts);
      
      // Fetch bonus transactions
      const { data: bonusData, error: bonusError } = await supabase
        .from('bonus_transactions')
        .select('*')
        .eq('payee_id', user.id)
        .order('created_at', { ascending: false });
      
      if (!bonusError && bonusData) {
        const formattedTransactions: Transaction[] = bonusData.map(tx => ({
          id: tx.id,
          date: new Date(tx.created_at).toISOString().split('T')[0],
          amount: parseFloat(tx.amount),
          type: tx.bonus_type as Transaction['type'],
          description: getTransactionDescription(tx.bonus_type, tx.metadata)
        }));
        
        // Add withdrawal transactions from payouts
        const withdrawalTransactions: Transaction[] = formattedPayouts.map(p => ({
          id: `withdrawal-${p.id}`,
          date: p.date,
          amount: -p.amount, // Negative for withdrawals
          type: 'withdrawal' as const,
          description: `Withdrawal via ${p.method} - ${p.status}`
        }));
        
        // Combine and sort by date
        const allTransactions = [...formattedTransactions, ...withdrawalTransactions]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        setTransactions(allTransactions);
      }
      
      // Calculate stats from payouts
      const completedPayouts = formattedPayouts.filter(p => p.status === 'completed');
      const totalPayouts = completedPayouts.reduce((sum, p) => sum + p.amount, 0);
      
      // Fetch user wallet balance
      const { data: wallet, error: walletError } = await supabase
        .from('user_wallets')
        .select('balance_usd')
        .eq('user_id', user.id)
        .single();
      
      if (walletError && walletError.code !== 'PGRST116') throw walletError;
      
      const availableBalance = wallet ? parseFloat(wallet.balance_usd) : 0;
      const totalEarnings = availableBalance + totalPayouts;
      
      setStats({
        totalEarnings,
        availableBalance,
        totalPayouts
      });
      
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to load payout data');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Helper to get transaction description
  const getTransactionDescription = (type: string, metadata: Record<string, unknown> | null): string => {
    switch (type) {
      case 'direct_referral':
        return `10% Referral Commission${metadata?.payment_amount ? ` ($${metadata.payment_amount} payment)` : ''}`;
      case 'rank_achievement':
        return `Rank Bonus - ${metadata?.rank || 'New Rank'}`;
      case 'infinity':
        return `Infinity Bonus (Gen ${metadata?.generation || '?'}) - ${metadata?.percent || '?'}%`;
      default:
        return 'Bonus';
    }
  };

  // Initial data fetch and real-time subscription
  useEffect(() => {
    fetchPayouts();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('payouts-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'payouts'
        },
        () => {
          fetchPayouts();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchPayouts]);

  // Updated handleWithdraw function
  const handleWithdraw = async () => {
    // Check if user can withdraw
    if (!canWithdraw()) {
      alert('You must have an active premium subscription to withdraw funds.');
      return;
    }
    
    const amount = parseFloat(withdrawAmount);
    
    if (amount < MIN_WITHDRAWAL) {
      alert(`Minimum withdrawal amount is $${MIN_WITHDRAWAL}`);
      return;
    }
    
    if (amount > stats.availableBalance) {
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

    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) {
        alert('Please login to withdraw');
        navigate('/login');
        return;
      }

      // 1. Create payout record
      const { data: payout, error: payoutError } = await supabase
        .from('payouts')
        .insert({
          user_id: user.id,
          amount: amount,
          method: selectedMethod,
          wallet_address: walletAddress,
          status: 'pending'
        })
        .select()
        .single();
      
      if (payoutError) throw payoutError;
      
      // 2. Update user wallet balance
      const { error: walletError } = await supabase
        .from('user_wallets')
        .upsert({
          user_id: user.id,
          balance_usd: stats.availableBalance - amount,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });
      
      if (walletError) throw walletError;
      
      // 3. Update local state
      const newPayout: Payout = {
        id: payout.id,
        date: new Date().toISOString().split('T')[0],
        amount,
        status: 'pending',
        method: selectedMethod,
        walletAddress,
      };
      
      setPayouts([newPayout, ...payouts]);
      setWithdrawAmount('');
      setWalletAddress('');
      
      // 4. Add to transactions
      const newTransaction: Transaction = {
        id: `withdrawal-${payout.id}`,
        date: new Date().toISOString().split('T')[0],
        amount: -amount,
        type: 'withdrawal',
        description: `Withdrawal via ${selectedMethod} - pending`
      };
      setTransactions([newTransaction, ...transactions]);
      
      // 5. Update local stats
      setStats(prev => ({
        ...prev,
        availableBalance: prev.availableBalance - amount,
        totalPayouts: prev.totalPayouts + amount
      }));
      
      alert(`Withdrawal request for $${amount.toFixed(2)} submitted successfully! It will be processed within 3 business days.`);
      
    } catch (error) {
      console.error('Withdrawal error:', error);
      alert('Failed to submit withdrawal request. Please try again.');
    }
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

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'direct_referral': return '👥';
      case 'rank_achievement': return '🏆';
      case 'infinity': return '∞';
      case 'withdrawal': return '💸';
      default: return '💰';
    }
  };

  const getTransactionColor = (type: string, amount: number) => {
    if (amount < 0) return '#EF4444'; // Withdrawals in red
    switch (type) {
      case 'direct_referral': return '#228B22';
      case 'rank_achievement': return '#D4AF37';
      case 'infinity': return '#8B5CF6';
      default: return '#10B981';
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


  // Loading state
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #0f0f23 50%, #1a1a2e 100%)',
        color: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
          <div>Loading payout data...</div>
        </div>
      </div>
    );
  }

  const { totalEarnings, availableBalance, totalPayouts } = stats;
  const isWithdrawAllowed = canWithdraw();

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
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

        {/* Subscription Status Warning */}
        {!isWithdrawAllowed && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid #EF4444',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <p style={{ color: '#EF4444', fontSize: '1.1rem', fontWeight: 'bold', margin: 0 }}>
              ⚠️ Withdrawals Disabled
            </p>
            <p style={{ color: '#FCA5A5', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>
              {subscriptionStatus === 'freemium' 
                ? 'You must upgrade to a premium subscription to withdraw your earnings.'
                : 'Your subscription has expired. Please renew to withdraw your earnings.'}
            </p>
            <button
              onClick={() => navigate('/billing')}
              style={{
                marginTop: '1rem',
                background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                border: 'none',
                color: '#000',
                padding: '0.75rem 2rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}
            >
              {subscriptionStatus === 'freemium' ? 'Upgrade to Premium' : 'Renew Subscription'}
            </button>
          </div>
        )}

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

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          borderBottom: '1px solid #374151',
          paddingBottom: '1rem'
        }}>
          <button
            onClick={() => setActiveTab('withdraw')}
            style={{
              background: activeTab === 'withdraw' ? 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' : 'transparent',
              border: activeTab === 'withdraw' ? 'none' : '1px solid #4B5563',
              color: '#ffffff',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: activeTab === 'withdraw' ? 'bold' : 'normal',
              fontSize: '1rem'
            }}
          >
            💸 Request Withdrawal
          </button>
          <button
            onClick={() => setActiveTab('history')}
            style={{
              background: activeTab === 'history' ? 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)' : 'transparent',
              border: activeTab === 'history' ? 'none' : '1px solid #4B5563',
              color: activeTab === 'history' ? '#000' : '#ffffff',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: activeTab === 'history' ? 'bold' : 'normal',
              fontSize: '1rem'
            }}
          >
            📋 Transaction History
          </button>
        </div>

        {activeTab === 'withdraw' && (
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
              opacity: isWithdrawAllowed ? 1 : 0.6,
              pointerEvents: isWithdrawAllowed ? 'auto' : 'none'
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
                    disabled={!isWithdrawAllowed}
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
                      disabled={!isWithdrawAllowed}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        background: selectedMethod === method ? '#3B82F6' : 'rgba(0, 0, 0, 0.5)',
                        border: `1px solid ${selectedMethod === method ? '#3B82F6' : '#4B5563'}`,
                        borderRadius: '0.5rem',
                        color: selectedMethod === method ? '#ffffff' : '#E5E7EB',
                        cursor: isWithdrawAllowed ? 'pointer' : 'not-allowed',
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
                  disabled={!isWithdrawAllowed}
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
                disabled={!isWithdrawAllowed || !withdrawAmount || !walletAddress || parseFloat(withdrawAmount) < MIN_WITHDRAWAL || parseFloat(withdrawAmount) > availableBalance}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #228B22 0%, #3B82F6 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  cursor: isWithdrawAllowed ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  transition: 'all 0.3s ease',
                  opacity: (!isWithdrawAllowed || !withdrawAmount || !walletAddress || parseFloat(withdrawAmount) < MIN_WITHDRAWAL || parseFloat(withdrawAmount) > availableBalance) ? 0.5 : 1,
                }}
                onMouseOver={(e) => {
                  if (isWithdrawAllowed && withdrawAmount && walletAddress && parseFloat(withdrawAmount) >= MIN_WITHDRAWAL && parseFloat(withdrawAmount) <= availableBalance) {
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
                  No payout history yet. Start earning to make withdrawals!
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #374151' }}>
                        <th style={{ padding: '1rem', textAlign: 'left', color: '#9CA3AF', fontWeight: 'normal' }}>Date</th>
                        <th style={{ padding: '1rem', textAlign: 'left', color: '#9CA3AF', fontWeight: 'normal' }}>Method</th>
                        <th style={{ padding: '1rem', textAlign: 'left', color: '#9CA3AF', fontWeight: 'normal' }}>Amount</th>
                        <th style={{ padding: '1rem', textAlign: 'left', color: '#9CA3AF', fontWeight: 'normal' }}>Wallet</th>
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
                          <td style={{ padding: '1rem', color: '#E5E7EB', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                            <div 
                              style={{ cursor: 'pointer', color: '#3B82F6' }}
                              onClick={() => copyToClipboard(payout.walletAddress)}
                              title="Click to copy"
                            >
                              {formatWalletAddress(payout.walletAddress)}
                            </div>
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
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div style={{
            background: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '1rem',
            padding: '2rem',
            border: '2px solid #D4AF37',
          }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#D4AF37' }}>
              📊 All Transactions
            </h2>
            
            {transactions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#9CA3AF' }}>
                No transaction history yet. Start referring to earn commissions!
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #374151' }}>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#9CA3AF', fontWeight: 'normal' }}>Date</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#9CA3AF', fontWeight: 'normal' }}>Type</th>
                      <th style={{ padding: '1rem', textAlign: 'left', color: '#9CA3AF', fontWeight: 'normal' }}>Description</th>
                      <th style={{ padding: '1rem', textAlign: 'right', color: '#9CA3AF', fontWeight: 'normal' }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr key={tx.id} style={{ borderBottom: '1px solid #374151' }}>
                        <td style={{ padding: '1rem', color: '#E5E7EB' }}>{tx.date}</td>
                        <td style={{ padding: '1rem', color: '#E5E7EB' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '1.25rem' }}>{getTransactionIcon(tx.type)}</span>
                            <span style={{ 
                              padding: '0.2rem 0.5rem', 
                              borderRadius: '0.25rem', 
                              background: getTransactionColor(tx.type, tx.amount) + '20',
                              color: getTransactionColor(tx.type, tx.amount),
                              fontSize: '0.8rem'
                            }}>
                              {tx.type.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                        </td>
                        <td style={{ padding: '1rem', color: '#9CA3AF', fontSize: '0.9rem' }}>
                          {tx.description}
                        </td>
                        <td style={{ 
                          padding: '1rem', 
                          textAlign: 'right',
                          color: tx.amount >= 0 ? '#10B981' : '#EF4444', 
                          fontWeight: 'bold',
                          fontSize: '1rem'
                        }}>
                          {tx.amount >= 0 ? '+' : ''}{tx.amount.toFixed(2)} USD
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Transaction Legend */}
            <div style={{
              marginTop: '2rem',
              padding: '1.5rem',
              background: 'rgba(26, 26, 46, 0.8)',
              borderRadius: '0.5rem',
              border: '1px solid #374151',
            }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#9CA3AF' }}>
                Transaction Types:
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>👥</span>
                  <span style={{ color: '#228B22' }}>Direct Referral</span>
                  <span style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>- 10% commission</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>🏆</span>
                  <span style={{ color: '#D4AF37' }}>Rank Achievement</span>
                  <span style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>- Rank bonus</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>∞</span>
                  <span style={{ color: '#8B5CF6' }}>Infinity Bonus</span>
                  <span style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>- Deputy Ambassador+</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>💸</span>
                  <span style={{ color: '#EF4444' }}>Withdrawal</span>
                  <span style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>- Payout request</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payout Information */}
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
            <li><strong>Withdrawal requirement:</strong> Active premium subscription required</li>
            <li><strong>Withdrawal methods:</strong> USDT BEP-20 & USDT TRC-20 only</li>
            <li><strong>Processing time:</strong> 1-3 business days maximum</li>
            <li><strong>Network fees:</strong> Covered by the platform</li>
            <li><strong>Wallet verification:</strong> Double-check your address before submitting</li>
            <li><strong>Support:</strong> Contact support if you don't receive your payout within 3 business days</li>
          </ul>
        </div>
      </div>
    </div>
  );
}