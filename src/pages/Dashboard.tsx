// pages/Dashboard.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { supabase } from '../lib/supabase';

// Define proper interfaces
interface UserData {
  full_name: string;
  email: string;
  referral_code: string;
  wallet_balance_usd: number;
  current_rank: string;
  next_rank: string;
  progress_percentage: number;
  sales_volume: number;
  required_volume_for_next_rank: number;
  free_referrals: number;
  premium_referrals: number;
  total_referrals: number;
  referrer_name: string;
  referrer_email: string;
  distance_to_deputy_ambassador: number;
  infinity_bonus_eligible: boolean;
  infinity_bonus_percentage: number;
  next_rank_bonus: number;
}

interface RankData {
  rank: string;
  min_volume: number;
  bonus: number;
  color: string;
  infinity_bonus?: number;
}

// Define the response type for the RPC call
type CompensationSummaryResponse = {
  full_name: string | null;
  email: string | null;
  referral_code: string | null;
  wallet_balance_usd: number | null;
  current_rank: string | null;
  next_rank: string | null;
  progress_percentage: number | null;
  sales_volume: number | null;
  required_volume_for_next_rank: number | null;
  free_referrals: number | null;
  premium_referrals: number | null;
  total_referrals: number | null;
  referrer_name: string | null;
  referrer_email: string | null;
  distance_to_deputy_ambassador: number | null;
  infinity_bonus_eligible: boolean | null;
  infinity_bonus_percentage: number | null;
  next_rank_bonus: number | null;
};

export default function Dashboard(): React.ReactElement {
  const navigate = useNavigate();
  const { user, signOut } = useAuth(); // Added signOut from useAuth
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [showAllRanks, setShowAllRanks] = useState<boolean>(false);
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false); // Added profile menu state

  const generateReferralCode = useCallback((): string => {
    return 'REF' + Math.random().toString(36).substring(2, 11).toUpperCase();
  }, []);

  const setFallbackData = useCallback((): void => {
    // Fallback ranks data
    const fallbackRanksData: RankData[] = [
      { rank: 'Beginner', min_volume: 0, bonus: 0, color: '#6B7280', infinity_bonus: 0 },
      { rank: 'Recruiter', min_volume: 2000, bonus: 50, color: '#CD7F32', infinity_bonus: 0 },
      { rank: 'Connector', min_volume: 5000, bonus: 75, color: '#C0C0C0', infinity_bonus: 0 },
      { rank: 'Communicator', min_volume: 12000, bonus: 175, color: '#93C5FD', infinity_bonus: 0 },
      { rank: 'Influencer', min_volume: 30000, bonus: 450, color: '#60A5FA', infinity_bonus: 0 },
      { rank: 'Impact Leader', min_volume: 80000, bonus: 1250, color: '#3B82F6', infinity_bonus: 0 },
      { rank: 'Deputy Ambassador', min_volume: 200000, bonus: 3000, color: '#8B5CF6', infinity_bonus: 4 },
      { rank: 'Ambassador', min_volume: 600000, bonus: 10000, color: '#D946EF', infinity_bonus: 5 },
      { rank: 'Top Ambassador', min_volume: 1500000, bonus: 22500, color: '#EC4899', infinity_bonus: 6 },
      { rank: 'Global Ambassador', min_volume: 3500000, bonus: 50000, color: '#F59E0B', infinity_bonus: 7 },
      { rank: 'Emperor', min_volume: 8000000, bonus: 112500, color: '#EF4444', infinity_bonus: 8 },
      { rank: 'Lauritalker', min_volume: 20000000, bonus: 3000000, color: '#10B981', infinity_bonus: 9 }
    ];

    const currentVolume = 1250;
    const currentRankIndex = fallbackRanksData.findIndex(rank => currentVolume >= rank.min_volume);
    const currentRank = fallbackRanksData[currentRankIndex] || fallbackRanksData[0];
    const nextRank = fallbackRanksData[currentRankIndex + 1] || fallbackRanksData[1];
    
    setUserData({
      full_name: user?.email?.split('@')[0] || 'User',
      email: user?.email || '',
      referral_code: generateReferralCode(),
      wallet_balance_usd: 0,
      current_rank: currentRank.rank,
      next_rank: nextRank.rank,
      progress_percentage: Math.min(100, Math.round((currentVolume / nextRank.min_volume) * 100)),
      sales_volume: currentVolume,
      required_volume_for_next_rank: nextRank.min_volume,
      free_referrals: 0,
      premium_referrals: 0,
      total_referrals: 0,
      referrer_name: 'None',
      referrer_email: '',
      distance_to_deputy_ambassador: Math.max(0, 6 - currentRankIndex),
      infinity_bonus_eligible: currentRankIndex >= 6,
      infinity_bonus_percentage: currentRank.infinity_bonus || 0,
      next_rank_bonus: nextRank.bonus
    });
  }, [user, generateReferralCode]);

  const fetchUserData = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError('');
      
      if (!user?.id) {
        throw new Error('User ID not available');
      }

      // Try to fetch real data from backend
      const { data, error: apiError } = await supabase
        .rpc('get_user_compensation_summary', {
          user_id_param: user.id
        });

      if (apiError) {
        console.error('API Error:', apiError);
        throw new Error(`Backend error: ${apiError.message}`);
      }

      if (data && data.length > 0) {
        const userData = data[0] as CompensationSummaryResponse;
        
        // Process and validate the data
        const processedData: UserData = {
          full_name: userData.full_name || user.email?.split('@')[0] || 'User',
          email: userData.email || user.email || '',
          referral_code: userData.referral_code || generateReferralCode(),
          wallet_balance_usd: userData.wallet_balance_usd ?? 0,
          current_rank: userData.current_rank || 'Beginner',
          next_rank: userData.next_rank || 'Recruiter',
          progress_percentage: userData.progress_percentage ?? 0,
          sales_volume: userData.sales_volume ?? 0,
          required_volume_for_next_rank: userData.required_volume_for_next_rank ?? 2000,
          free_referrals: userData.free_referrals ?? 0,
          premium_referrals: userData.premium_referrals ?? 0,
          total_referrals: userData.total_referrals ?? 0,
          referrer_name: userData.referrer_name || 'None',
          referrer_email: userData.referrer_email || '',
          distance_to_deputy_ambassador: userData.distance_to_deputy_ambassador ?? 6,
          infinity_bonus_eligible: userData.infinity_bonus_eligible ?? false,
          infinity_bonus_percentage: userData.infinity_bonus_percentage ?? 0,
          next_rank_bonus: userData.next_rank_bonus ?? 0
        };
        
        setUserData(processedData);
      } else {
        console.log('No data returned from function');
        // Use fallback data if no real data is available
        setFallbackData();
      }
    } catch (err: unknown) {
      console.error('Error fetching user data:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load dashboard data. Please try again.';
      setError(errorMessage);
      setFallbackData();
    } finally {
      setLoading(false);
    }
  }, [user, generateReferralCode, setFallbackData]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchUserData();
  }, [user, navigate, fetchUserData]);

  const copyReferralLink = (): void => {
    if (!userData?.referral_code) return;
    const referralLink = `${window.location.origin}/register?ref=${userData.referral_code}`;
    navigator.clipboard.writeText(referralLink)
      .then(() => {
        alert('Referral link copied to clipboard!');
      })
      .catch(() => {
        alert('Failed to copy referral link');
      });
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Added profile menu toggle function
  const toggleProfileMenu = (): void => {
    setShowProfileMenu(!showProfileMenu);
  };

  // Added logout handler
  const handleLogout = (): void => {
    signOut();
    navigate('/');
    setShowProfileMenu(false);
  };

  const ranksData: RankData[] = [
    { rank: 'Beginner', min_volume: 0, bonus: 0, color: '#6B7280', infinity_bonus: 0 },
    { rank: 'Recruiter', min_volume: 2000, bonus: 50, color: '#CD7F32', infinity_bonus: 0 },
    { rank: 'Connector', min_volume: 5000, bonus: 75, color: '#C0C0C0', infinity_bonus: 0 },
    { rank: 'Communicator', min_volume: 12000, bonus: 175, color: '#93C5FD', infinity_bonus: 0 },
    { rank: 'Influencer', min_volume: 30000, bonus: 450, color: '#60A5FA', infinity_bonus: 0 },
    { rank: 'Impact Leader', min_volume: 80000, bonus: 1250, color: '#3B82F6', infinity_bonus: 0 },
    { rank: 'Deputy Ambassador', min_volume: 200000, bonus: 3000, color: '#8B5CF6', infinity_bonus: 4 },
    { rank: 'Ambassador', min_volume: 600000, bonus: 10000, color: '#D946EF', infinity_bonus: 5 },
    { rank: 'Top Ambassador', min_volume: 1500000, bonus: 22500, color: '#EC4899', infinity_bonus: 6 },
    { rank: 'Global Ambassador', min_volume: 3500000, bonus: 50000, color: '#F59E0B', infinity_bonus: 7 },
    { rank: 'Emperor', min_volume: 8000000, bonus: 112500, color: '#EF4444', infinity_bonus: 8 },
    { rank: 'Lauritalker', min_volume: 20000000, bonus: 3000000, color: '#10B981', infinity_bonus: 9 }
  ];

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#0f0f23',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          color: '#D4AF37',
          fontSize: '1.5rem',
          textAlign: 'center'
        }}>
          Loading Dashboard...
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#0f0f23',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          color: '#EF4444',
          fontSize: '1.2rem',
          textAlign: 'center',
          padding: '2rem'
        }}>
          Failed to load dashboard data. Please try refreshing the page.
          <br />
          <button
            onClick={() => fetchUserData()}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#3B82F6',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Calculate the current rank index
  const currentRankIndex = ranksData.findIndex(rank => rank.rank === userData.current_rank);
  const currentRank = ranksData[currentRankIndex] || ranksData[0];
  const isDeputyAmbassadorOrHigher = currentRankIndex >= 6;

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0f0f23',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Navigation */}
      <nav style={{ 
        backgroundColor: 'rgba(15, 15, 35, 0.95)', 
        borderBottom: '2px solid #D4AF37',
        padding: '1rem 0',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ 
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 1rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            <div style={{
              width: '12px',
              height: '12px',
              backgroundColor: '#D4AF37',
              borderRadius: '50%',
              boxShadow: '0 0 10px #D4AF37'
            }}></div>
            <h1 style={{ 
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', 
              fontWeight: 'bold', 
              color: '#D4AF37',
              whiteSpace: 'nowrap'
            }}>
              Lauritalk Dashboard
            </h1>
          </div>
          
          {/* User Profile Menu Button - Replaced "Back to Home" button */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            position: 'relative',
            flexShrink: 0
          }}>
            {/* User Profile Button */}
            <button
              onClick={toggleProfileMenu}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                background: 'transparent',
                border: '1px solid #D4AF37',
                borderRadius: '2rem',
                padding: '0.3rem 0.6rem',
                cursor: 'pointer',
                color: '#D4AF37',
                fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                maxWidth: '150px',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
                e.currentTarget.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: 'clamp(20px, 4vw, 24px)',
                height: 'clamp(20px, 4vw, 24px)',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #D4AF37 0%, #228B22 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000',
                fontWeight: 'bold',
                fontSize: 'clamp(0.6rem, 2vw, 0.8rem)',
                flexShrink: 0
              }}>
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span style={{ 
                maxWidth: '70px', 
                overflow: 'hidden', 
                textOverflow: 'ellipsis', 
                whiteSpace: 'nowrap',
                flexShrink: 1
              }}>
                {user?.email?.split('@')[0] || 'User'}
              </span>
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="profile-menu" style={{
                position: 'absolute',
                top: 'calc(100% + 5px)',
                right: '0',
                zIndex: 1000,
                background: 'rgba(0, 0, 0, 0.95)',
                border: '1px solid #D4AF37',
                borderRadius: '0.5rem',
                minWidth: '220px',
                maxWidth: 'min(90vw, 300px)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
              }}>
                <div className="profile-menu-content" style={{ padding: '0.5rem' }}>
                  {/* User Info */}
                  <div style={{ 
                    padding: '0.75rem', 
                    borderBottom: '1px solid #374151',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #D4AF37 0%, #228B22 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#000',
                      fontWeight: 'bold',
                      fontSize: '1.2rem',
                      margin: '0 auto 0.5rem'
                    }}>
                      {user?.email?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <p style={{ 
                      color: '#D4AF37', 
                      margin: '0 0 0.25rem', 
                      fontSize: '0.9rem', 
                      fontWeight: '500',
                      wordBreak: 'break-word'
                    }}>
                      {user?.email?.split('@')[0] || 'User'}
                    </p>
                    <p style={{ 
                      color: '#9CA3AF', 
                      fontSize: '0.8rem', 
                      margin: 0,
                      wordBreak: 'break-word'
                    }}>
                      {user?.email}
                    </p>
                  </div>

                  {/* Menu Options */}
                  <div style={{ padding: '0.25rem' }}>
                    <button
                      onClick={() => {
                        navigate('/dashboard');
                        setShowProfileMenu(false);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.75rem 1rem',
                        background: 'transparent',
                        border: 'none',
                        color: '#E5E7EB',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        borderRadius: '0.25rem',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                        e.currentTarget.style.color = '#3B82F6';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#E5E7EB';
                      }}
                    >
                      <span>📊</span> Dashboard
                    </button>

                    <button
                      onClick={() => {
                        navigate('/profile');
                        setShowProfileMenu(false);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.75rem 1rem',
                        background: 'transparent',
                        border: 'none',
                        color: '#E5E7EB',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        borderRadius: '0.25rem',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
                        e.currentTarget.style.color = '#D4AF37';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#E5E7EB';
                      }}
                    >
                      <span>👤</span> Profile
                    </button>

                    <button
                      onClick={() => {
                        navigate('/payouts');
                        setShowProfileMenu(false);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.75rem 1rem',
                        background: 'transparent',
                        border: 'none',
                        color: '#E5E7EB',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        borderRadius: '0.25rem',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(34, 139, 34, 0.1)';
                        e.currentTarget.style.color = '#228B22';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#E5E7EB';
                      }}
                    >
                      <span>💰</span> Payouts
                    </button>

                    <button
                      onClick={() => {
                        navigate('/support');
                        setShowProfileMenu(false);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.75rem 1rem',
                        background: 'transparent',
                        border: 'none',
                        color: '#E5E7EB',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        borderRadius: '0.25rem',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)';
                        e.currentTarget.style.color = '#3B82F6';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#E5E7EB';
                      }}
                    >
                      <span>💬</span> Support
                    </button>

                    {/* Upgrade to Pro Button - Added new button */}
                    <button
                      onClick={() => {
                        navigate('/billing');
                        setShowProfileMenu(false);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.75rem 1rem',
                        background: 'rgba(212, 175, 55, 0.2)',
                        border: '1px solid #D4AF37',
                        color: '#D4AF37',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        borderRadius: '0.25rem',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontWeight: 'bold',
                        marginTop: '0.5rem'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.3)';
                        e.currentTarget.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.3)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <span>🚀</span> Upgrade to Pro
                    </button>

                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.75rem 1rem',
                        background: 'transparent',
                        border: 'none',
                        color: '#EF4444',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        borderRadius: '0.25rem',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginTop: '0.25rem',
                        borderTop: '1px solid #374151'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <span>🚪</span> Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <div style={{ 
        maxWidth: '1400px',
        margin: '0 auto',
        padding: 'clamp(1rem, 3vw, 2rem) clamp(0.5rem, 2vw, 1rem)',
        overflowX: 'hidden'
      }}>
        {/* Error Message (if any) */}
        {error && (
          <div style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '0.5rem',
            padding: 'clamp(0.75rem, 2vw, 1rem)',
            marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
            color: '#EF4444',
            fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'
          }}>
            <p style={{ margin: 0, fontWeight: 'bold', fontSize: 'clamp(0.9rem, 2.5vw, 1rem)' }}>⚠️ Backend Connection Issue</p>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: 'clamp(0.75rem, 2vw, 0.85rem)' }}>
              {error}
              <br />
              <small style={{ fontSize: 'clamp(0.7rem, 2vw, 0.8rem)' }}>
                Make sure the <code>get_user_compensation_summary</code> function exists in your Supabase database.
              </small>
            </p>
          </div>
        )}

        {/* Welcome Section */}
        <div style={{
          backgroundColor: 'rgba(26, 26, 46, 0.7)',
          borderRadius: '1rem',
          padding: 'clamp(1.25rem, 4vw, 2rem)',
          marginBottom: 'clamp(1.5rem, 4vw, 2rem)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
          wordBreak: 'break-word'
        }}>
          <h1 style={{ 
            fontSize: 'clamp(1.5rem, 5vw, 2rem)', 
            fontWeight: 'bold', 
            color: '#D4AF37',
            marginBottom: '0.5rem',
            lineHeight: '1.2',
            wordBreak: 'break-word'
          }}>
            Welcome, {userData.full_name}! 🎉
          </h1>
          <p style={{ 
            color: '#E5E7EB', 
            fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
            lineHeight: '1.4'
          }}>
            Track your progress, earnings, and climb the ranks to unlock Infinity Bonuses!
          </p>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            marginTop: '1rem',
            flexWrap: 'wrap'
          }}>
            <span style={{ 
              color: '#9CA3AF', 
              fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
              whiteSpace: 'nowrap'
            }}>
              Status:
            </span>
            <span style={{ 
              color: '#22C55E', 
              fontSize: 'clamp(0.75rem, 2.5vw, 0.9rem)',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              fontWeight: '500',
              whiteSpace: 'nowrap'
            }}>
              {error ? 'Using Fallback Data' : 'Connected to Real Data'}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
          gap: 'clamp(1rem, 3vw, 1.5rem)',
          marginBottom: 'clamp(1.5rem, 4vw, 2rem)'
        }}>
          {/* Wallet Balance Card */}
          <div style={{
            backgroundColor: 'rgba(26, 26, 46, 0.7)',
            borderRadius: '1rem',
            padding: 'clamp(1rem, 3vw, 1.5rem)',
            border: '1px solid rgba(34, 139, 34, 0.3)',
            boxShadow: '0 5px 20px rgba(34, 139, 34, 0.2)',
            position: 'relative'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'clamp(0.75rem, 2vw, 1rem)', 
              marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
              flexWrap: 'wrap'
            }}>
              <div style={{
                width: 'clamp(40px, 8vw, 50px)',
                height: 'clamp(40px, 8vw, 50px)',
                borderRadius: '50%',
                backgroundColor: 'rgba(34, 139, 34, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
                flexShrink: 0
              }}>
                💰
              </div>
              <div style={{ flex: 1, minWidth: '150px' }}>
                <h3 style={{ 
                  fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)', 
                  color: '#9CA3AF', 
                  marginBottom: '0.25rem' 
                }}>
                  Wallet Balance
                </h3>
                <p style={{ 
                  fontSize: 'clamp(1.5rem, 5vw, 1.8rem)', 
                  fontWeight: 'bold', 
                  color: '#228B22',
                  wordBreak: 'break-word'
                }}>
                  {formatCurrency(userData.wallet_balance_usd)}
                </p>
              </div>
            </div>
            <div style={{ 
              backgroundColor: 'rgba(34, 139, 34, 0.1)', 
              padding: 'clamp(0.5rem, 2vw, 0.75rem)', 
              borderRadius: '0.5rem',
              marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
              fontSize: 'clamp(0.75rem, 2.5vw, 0.85rem)'
            }}>
              <p style={{ color: '#86EFAC', margin: 0, lineHeight: '1.4' }}>
                <strong>Direct Referral Bonus:</strong> 10% of every premium subscription
              </p>
            </div>
            <button
              onClick={() => navigate('/payouts')}
              style={{
                width: '100%',
                background: 'rgba(34, 139, 34, 0.2)',
                border: '1px solid #228B22',
                color: '#228B22',
                padding: 'clamp(0.5rem, 2vw, 0.75rem)',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                fontSize: 'clamp(0.85rem, 2.5vw, 1rem)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(34, 139, 34, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(34, 139, 34, 0.2)';
              }}
            >
              Request Payout
            </button>
          </div>

          {/* Current Rank Card */}
          <div style={{
            backgroundColor: 'rgba(26, 26, 46, 0.7)',
            borderRadius: '1rem',
            padding: 'clamp(1rem, 3vw, 1.5rem)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxShadow: '0 5px 20px rgba(212, 175, 55, 0.2)',
            position: 'relative'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'clamp(0.75rem, 2vw, 1rem)', 
              marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
              flexWrap: 'wrap'
            }}>
              <div style={{
                width: 'clamp(40px, 8vw, 50px)',
                height: 'clamp(40px, 8vw, 50px)',
                borderRadius: '50%',
                backgroundColor: 'rgba(212, 175, 55, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
                flexShrink: 0
              }}>
                🏆
              </div>
              <div style={{ flex: 1, minWidth: '150px' }}>
                <h3 style={{ 
                  fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)', 
                  color: '#9CA3AF', 
                  marginBottom: '0.25rem' 
                }}>
                  Current Rank
                </h3>
                <p style={{ 
                  fontSize: 'clamp(1.5rem, 5vw, 1.8rem)', 
                  fontWeight: 'bold', 
                  color: '#D4AF37',
                  wordBreak: 'break-word'
                }}>
                  {userData.current_rank}
                </p>
              </div>
            </div>
            {currentRank.infinity_bonus && currentRank.infinity_bonus > 0 && (
              <div style={{ 
                backgroundColor: 'rgba(255, 0, 0, 0.1)', 
                padding: 'clamp(0.5rem, 2vw, 0.75rem)', 
                borderRadius: '0.5rem',
                marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
                fontSize: 'clamp(0.75rem, 2.5vw, 0.85rem)'
              }}>
                <p style={{ color: '#FF6B6B', margin: 0, lineHeight: '1.4' }}>
                  <strong>Infinity Bonus Active:</strong> {currentRank.infinity_bonus}%
                </p>
              </div>
            )}
            <button
              onClick={() => setShowAllRanks(true)}
              style={{
                width: '100%',
                background: 'rgba(212, 175, 55, 0.2)',
                border: '1px solid #D4AF37',
                color: '#D4AF37',
                padding: 'clamp(0.5rem, 2vw, 0.75rem)',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                fontSize: 'clamp(0.85rem, 2.5vw, 1rem)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
              }}
            >
              View All Ranks & Bonuses
            </button>
          </div>

          {/* Sales Volume Card */}
          <div style={{
            backgroundColor: 'rgba(26, 26, 46, 0.7)',
            borderRadius: '1rem',
            padding: 'clamp(1rem, 3vw, 1.5rem)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            boxShadow: '0 5px 20px rgba(59, 130, 246, 0.2)',
            position: 'relative'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'clamp(0.75rem, 2vw, 1rem)', 
              marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
              flexWrap: 'wrap'
            }}>
              <div style={{
                width: 'clamp(40px, 8vw, 50px)',
                height: 'clamp(40px, 8vw, 50px)',
                borderRadius: '50%',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
                flexShrink: 0
              }}>
                📊
              </div>
              <div style={{ flex: 1, minWidth: '150px' }}>
                <h3 style={{ 
                  fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)', 
                  color: '#9CA3AF', 
                  marginBottom: '0.25rem' 
                }}>
                  Sales Volume
                </h3>
                <p style={{ 
                  fontSize: 'clamp(1.5rem, 5vw, 1.8rem)', 
                  fontWeight: 'bold', 
                  color: '#3B82F6',
                  wordBreak: 'break-word'
                }}>
                  {formatCurrency(userData.sales_volume)}
                </p>
              </div>
            </div>
            <div style={{ 
              fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)', 
              color: '#9CA3AF',
              lineHeight: '1.4'
            }}>
              Next Rank: {userData.next_rank} ({formatCurrency(userData.required_volume_for_next_rank)})
            </div>
            {userData.next_rank_bonus > 0 && (
              <div style={{ 
                backgroundColor: 'rgba(34, 197, 94, 0.1)', 
                padding: 'clamp(0.375rem, 1.5vw, 0.5rem)', 
                borderRadius: '0.375rem',
                marginTop: '0.5rem',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                fontSize: 'clamp(0.7rem, 2.5vw, 0.8rem)'
              }}>
                <p style={{ color: '#86EFAC', margin: 0, lineHeight: '1.4' }}>
                  <strong>Next Rank Bonus:</strong> {formatCurrency(userData.next_rank_bonus)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar Section */}
        <div style={{
          backgroundColor: 'rgba(26, 26, 46, 0.7)',
          borderRadius: '1rem',
          padding: 'clamp(1.25rem, 4vw, 2rem)',
          marginBottom: 'clamp(1.5rem, 4vw, 2rem)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <h2 style={{ 
              fontSize: 'clamp(1.25rem, 4vw, 1.5rem)', 
              fontWeight: 'bold', 
              color: '#D4AF37',
              lineHeight: '1.2'
            }}>
              Progress to {userData.next_rank} Rank
            </h2>
            <span style={{ 
              fontSize: 'clamp(1rem, 3.5vw, 1.2rem)', 
              fontWeight: 'bold', 
              color: '#3B82F6',
              whiteSpace: 'nowrap'
            }}>
              {userData.progress_percentage.toFixed(1)}%
            </span>
          </div>
          
          <div style={{
            width: '100%',
            height: 'clamp(15px, 4vw, 20px)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            overflow: 'hidden',
            marginBottom: '0.5rem'
          }}>
            <div 
              style={{
                width: `${Math.min(100, userData.progress_percentage)}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #D4AF37 0%, #FFD700 100%)',
                borderRadius: '10px',
                transition: 'width 1s ease-in-out'
              }}
            />
          </div>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)', 
            color: '#9CA3AF',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <span>Current: {formatCurrency(userData.sales_volume)}</span>
            <span>Target: {formatCurrency(userData.required_volume_for_next_rank)}</span>
          </div>
        </div>

        {/* Referral Stats Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))',
          gap: 'clamp(1rem, 3vw, 1.5rem)',
          marginBottom: 'clamp(1.5rem, 4vw, 2rem)'
        }}>
          {/* Total Referrals */}
          <div style={{
            backgroundColor: 'rgba(26, 26, 46, 0.7)',
            borderRadius: '1rem',
            padding: 'clamp(1rem, 3vw, 1.5rem)',
            border: '1px solid rgba(34, 139, 34, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ 
              fontSize: 'clamp(2rem, 8vw, 2.5rem)', 
              color: '#228B22', 
              marginBottom: '0.5rem' 
            }}>
              👥
            </div>
            <h3 style={{ 
              fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)', 
              color: '#9CA3AF', 
              marginBottom: '0.5rem' 
            }}>
              Total Referrals
            </h3>
            <p style={{ 
              fontSize: 'clamp(1.5rem, 6vw, 2rem)', 
              fontWeight: 'bold', 
              color: '#ffffff' 
            }}>
              {userData.total_referrals}
            </p>
          </div>

          {/* Premium Referrals */}
          <div style={{
            backgroundColor: 'rgba(26, 26, 46, 0.7)',
            borderRadius: '1rem',
            padding: 'clamp(1rem, 3vw, 1.5rem)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ 
              fontSize: 'clamp(2rem, 8vw, 2.5rem)', 
              color: '#D4AF37', 
              marginBottom: '0.5rem' 
            }}>
              ⭐
            </div>
            <h3 style={{ 
              fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)', 
              color: '#9CA3AF', 
              marginBottom: '0.5rem' 
            }}>
              Premium Referrals
            </h3>
            <p style={{ 
              fontSize: 'clamp(1.5rem, 6vw, 2rem)', 
              fontWeight: 'bold', 
              color: '#ffffff' 
            }}>
              {userData.premium_referrals}
            </p>
            <p style={{ 
              color: '#86EFAC', 
              fontSize: 'clamp(0.7rem, 2.5vw, 0.8rem)', 
              marginTop: '0.25rem',
              lineHeight: '1.3'
            }}>
              Earns 10% commission on each
            </p>
          </div>

          {/* Free Referrals */}
          <div style={{
            backgroundColor: 'rgba(26, 26, 46, 0.7)',
            borderRadius: '1rem',
            padding: 'clamp(1rem, 3vw, 1.5rem)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ 
              fontSize: 'clamp(2rem, 8vw, 2.5rem)', 
              color: '#3B82F6', 
              marginBottom: '0.5rem' 
            }}>
              🌱
            </div>
            <h3 style={{ 
              fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)', 
              color: '#9CA3AF', 
              marginBottom: '0.5rem' 
            }}>
              Free Referrals
            </h3>
            <p style={{ 
              fontSize: 'clamp(1.5rem, 6vw, 2rem)', 
              fontWeight: 'bold', 
              color: '#ffffff' 
            }}>
              {userData.free_referrals}
            </p>
            <p style={{ 
              color: '#93C5FD', 
              fontSize: 'clamp(0.7rem, 2.5vw, 0.8rem)', 
              marginTop: '0.25rem',
              lineHeight: '1.3'
            }}>
              Potential future premium users
            </p>
          </div>

          {/* Your Referrer */}
          <div style={{
            backgroundColor: 'rgba(26, 26, 46, 0.7)',
            borderRadius: '1rem',
            padding: 'clamp(1rem, 3vw, 1.5rem)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ 
              fontSize: 'clamp(2rem, 8vw, 2.5rem)', 
              color: '#A855F7', 
              marginBottom: '0.5rem' 
            }}>
              🔗
            </div>
            <h3 style={{ 
              fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)', 
              color: '#9CA3AF', 
              marginBottom: '0.5rem' 
            }}>
              Your Referrer
            </h3>
            <p style={{ 
              fontSize: 'clamp(1rem, 4vw, 1.1rem)', 
              fontWeight: 'bold', 
              color: '#ffffff',
              wordBreak: 'break-word'
            }}>
              {userData.referrer_name}
            </p>
            {userData.referrer_email && (
              <p style={{ 
                fontSize: 'clamp(0.7rem, 2.5vw, 0.8rem)', 
                color: '#9CA3AF', 
                marginTop: '0.25rem',
                wordBreak: 'break-word'
              }}>
                {userData.referrer_email}
              </p>
            )}
          </div>
        </div>

        {/* Referral Link Section */}
        <div style={{
          backgroundColor: 'rgba(26, 26, 46, 0.7)',
          borderRadius: '1rem',
          padding: 'clamp(1.25rem, 4vw, 2rem)',
          marginBottom: 'clamp(1.5rem, 4vw, 2rem)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
        }}>
          <h2 style={{ 
            fontSize: 'clamp(1.25rem, 4vw, 1.5rem)', 
            fontWeight: 'bold', 
            color: '#3B82F6', 
            marginBottom: 'clamp(0.75rem, 2vw, 1rem)' 
          }}>
            Your Referral Link
          </h2>
          <div style={{
            display: 'flex',
            gap: 'clamp(0.75rem, 2vw, 1rem)',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{
              flex: '1',
              minWidth: '200px',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '0.5rem',
              padding: 'clamp(0.75rem, 2vw, 1rem)',
              fontFamily: 'monospace',
              wordBreak: 'break-all',
              color: '#E5E7EB',
              fontSize: 'clamp(0.75rem, 2.5vw, 0.9rem)'
            }}>
              {window.location.origin}/register?ref={userData.referral_code}
            </div>
            <button
              onClick={copyReferralLink}
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                border: 'none',
                color: '#ffffff',
                padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1rem, 3vw, 2rem)',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Copy Referral Link
            </button>
          </div>
          <div style={{ 
            backgroundColor: 'rgba(34, 139, 34, 0.1)', 
            padding: 'clamp(0.75rem, 2vw, 1rem)', 
            borderRadius: '0.5rem',
            marginTop: 'clamp(0.75rem, 2vw, 1rem)',
            border: '1px solid rgba(34, 139, 34, 0.2)',
            fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)'
          }}>
            <p style={{ color: '#86EFAC', margin: 0, lineHeight: '1.4' }}>
              <strong>💰 Earn 10% Commission:</strong> For every $60 premium subscription, you earn $6 instantly!
              For every $7 monthly subscription, you earn $0.70!
            </p>
          </div>
        </div>

        {/* Infinity Bonus Progress Section */}
        <div style={{
          backgroundColor: 'rgba(26, 26, 46, 0.7)',
          borderRadius: '1rem',
          padding: 'clamp(1.25rem, 4vw, 2rem)',
          border: isDeputyAmbassadorOrHigher ? '2px solid rgba(0, 255, 0, 0.3)' : '1px solid rgba(255, 0, 0, 0.3)',
          boxShadow: isDeputyAmbassadorOrHigher ? '0 10px 30px rgba(0, 255, 0, 0.1)' : '0 10px 30px rgba(255, 0, 0, 0.1)',
          background: isDeputyAmbassadorOrHigher 
            ? 'linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(0, 75, 0, 0.1) 100%)'
            : 'linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(75, 0, 0, 0.1) 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-50%',
            width: '200%',
            height: '200%',
            background: isDeputyAmbassadorOrHigher 
              ? 'radial-gradient(circle, rgba(0, 255, 0, 0.1) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(255, 0, 0, 0.1) 0%, transparent 70%)',
            zIndex: 0
          }}></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'clamp(0.75rem, 2vw, 1rem)', 
              marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
              flexWrap: 'wrap'
            }}>
              <div style={{
                width: 'clamp(40px, 10vw, 60px)',
                height: 'clamp(40px, 10vw, 60px)',
                borderRadius: '50%',
                backgroundColor: isDeputyAmbassadorOrHigher ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(1.5rem, 5vw, 2rem)',
                border: isDeputyAmbassadorOrHigher ? '2px solid rgba(0, 255, 0, 0.5)' : '2px solid rgba(255, 0, 0, 0.5)',
                flexShrink: 0
              }}>
                ∞
              </div>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <h2 style={{ 
                  fontSize: 'clamp(1.25rem, 4.5vw, 1.8rem)', 
                  fontWeight: 'bold', 
                  color: isDeputyAmbassadorOrHigher ? '#00FF00' : '#FF0000',
                  lineHeight: '1.2'
                }}>
                  {isDeputyAmbassadorOrHigher ? '🎉 Infinity Bonus ACTIVE!' : 'Infinity Bonus Progress'}
                </h2>
                <p style={{ 
                  color: '#E5E7EB', 
                  fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
                  lineHeight: '1.4'
                }}>
                  {isDeputyAmbassadorOrHigher 
                    ? `You're earning ${currentRank.infinity_bonus}% from qualified team members!`
                    : 'Unlock lifetime earnings from your network!'}
                </p>
              </div>
            </div>

            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '1rem',
              padding: 'clamp(1rem, 3vw, 1.5rem)',
              marginBottom: 'clamp(1rem, 3vw, 1.5rem)'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: 'clamp(0.75rem, 2vw, 1rem)',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}>
                <span style={{ 
                  color: '#9CA3AF', 
                  fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
                  wordBreak: 'break-word'
                }}>
                  Current Rank: {userData.current_rank}
                </span>
                <span style={{ 
                  color: isDeputyAmbassadorOrHigher ? '#00FF00' : '#FF0000', 
                  fontWeight: 'bold',
                  fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
                  whiteSpace: 'nowrap'
                }}>
                  {isDeputyAmbassadorOrHigher ? '✅ Infinity Bonus Active' : 'Deputy Ambassador Required'}
                </span>
              </div>
              
              {/* Rank Progress */}
              <div style={{ marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginBottom: '0.5rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <span style={{ 
                    color: '#E5E7EB', 
                    fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
                    wordBreak: 'break-word'
                  }}>
                    Progress to Infinity Eligibility
                  </span>
                  <span style={{ 
                    color: '#3B82F6', 
                    fontWeight: 'bold',
                    fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
                    whiteSpace: 'nowrap'
                  }}>
                    {isDeputyAmbassadorOrHigher ? 'ACHIEVED!' : `${userData.distance_to_deputy_ambassador} ranks to go`}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(0.25rem, 1vw, 0.5rem)',
                  marginBottom: '1rem',
                  overflowX: 'auto',
                  padding: '0.5rem 0',
                  WebkitOverflowScrolling: 'touch'
                }}>
                  {ranksData.map((rank, index) => (
                    <div key={rank.rank} style={{ 
                      flex: '0 0 auto', 
                      textAlign: 'center', 
                      minWidth: 'clamp(50px, 12vw, 70px)'
                    }}>
                      <div style={{
                        height: 'clamp(20px, 5vw, 30px)',
                        backgroundColor: userData.current_rank === rank.rank ? rank.color : 
                                       index < currentRankIndex ? rank.color : 'rgba(255, 255, 255, 0.1)',
                        border: userData.current_rank === rank.rank ? `2px solid ${rank.color}` : 'none',
                        borderRadius: '0.25rem',
                        marginBottom: '0.25rem',
                        opacity: userData.current_rank === rank.rank ? 1 : 
                                index < currentRankIndex ? 0.7 : 0.3
                      }}></div>
                      <div style={{
                        fontSize: 'clamp(0.55rem, 2vw, 0.65rem)',
                        color: userData.current_rank === rank.rank ? rank.color : '#9CA3AF',
                        fontWeight: userData.current_rank === rank.rank ? 'bold' : 'normal',
                        wordBreak: 'break-word'
                      }}>
                        {rank.rank.split(' ')[0]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Infinity Benefits */}
              <div style={{
                backgroundColor: isDeputyAmbassadorOrHigher ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)',
                borderRadius: '0.75rem',
                padding: 'clamp(1rem, 3vw, 1.5rem)',
                border: isDeputyAmbassadorOrHigher ? '1px solid rgba(0, 255, 0, 0.3)' : '1px solid rgba(255, 0, 0, 0.3)'
              }}>
                <h3 style={{ 
                  color: isDeputyAmbassadorOrHigher ? '#00FF00' : '#FFD700', 
                  marginBottom: 'clamp(0.75rem, 2vw, 1rem)', 
                  fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                  lineHeight: '1.2'
                }}>
                  {isDeputyAmbassadorOrHigher ? '🚀 Your Active Infinity Bonuses:' : '🚀 Infinity Bonus Benefits (Deputy Ambassador+):'}
                </h3>
                <ul style={{ 
                  color: '#E5E7EB', 
                  paddingLeft: 'clamp(1rem, 3vw, 1.5rem)', 
                  lineHeight: '1.6',
                  fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)'
                }}>
                  <li>Earn <strong style={{color: isDeputyAmbassadorOrHigher ? '#00FF00' : '#FF0000'}}>
                    {isDeputyAmbassadorOrHigher ? (currentRank.infinity_bonus || 0) + '%' : '4-9%'} infinity bonus
                  </strong> from 1st generation qualified downlines</li>
                  <li>Earn <strong style={{color: isDeputyAmbassadorOrHigher ? '#00FF00' : '#FF0000'}}>
                    {isDeputyAmbassadorOrHigher ? Math.max(0, (currentRank.infinity_bonus || 0) - 3) + '%' : '1-6%'} infinity bonus
                  </strong> from 2nd generation qualified downlines</li>
                  <li><strong>Adjustment Rule:</strong> If a downline qualifies for Infinity Bonus, you earn the difference between your percentage and theirs</li>
                  <li><strong>Example:</strong> As Ambassador (5%) with Deputy Ambassador (4%) in team, you earn 1% (5% - 4%)</li>
                  <li>Lifetime earnings from your qualified network members</li>
                  {isDeputyAmbassadorOrHigher && (
                    <li><strong style={{color: '#00FF00'}}>🎯 Your Current Rate:</strong> {currentRank.infinity_bonus}% from 1st gen, {Math.max(0, (currentRank.infinity_bonus || 0) - 3)}% from 2nd gen</li>
                  )}
                </ul>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => navigate('/billing')}
                style={{
                  background: isDeputyAmbassadorOrHigher 
                    ? 'linear-gradient(135deg, #00FF00 0%, #00CC00 100%)' 
                    : 'linear-gradient(135deg, #FF0000 0%, #FF6B6B 100%)',
                  border: 'none',
                  color: '#000000',
                  padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 5vw, 3rem)',
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
                  transition: 'all 0.3s ease',
                  boxShadow: isDeputyAmbassadorOrHigher 
                    ? '0 5px 20px rgba(0, 255, 0, 0.3)' 
                    : '0 5px 20px rgba(255, 0, 0, 0.3)',
                  width: '100%',
                  maxWidth: '400px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = isDeputyAmbassadorOrHigher 
                    ? '0 10px 30px rgba(0, 255, 0, 0.5)' 
                    : '0 10px 30px rgba(255, 0, 0, 0.5)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = isDeputyAmbassadorOrHigher 
                    ? '0 5px 20px rgba(0, 255, 0, 0.3)' 
                    : '0 5px 20px rgba(255, 0, 0, 0.3)';
                }}
              >
                {isDeputyAmbassadorOrHigher ? 'Upgrade to Increase Your Bonus Rate!' : 'Upgrade to Unlock Infinity Bonuses!'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* All Ranks Modal - MOBILE RESPONSIVE */}
      {showAllRanks && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          zIndex: 1000,
          padding: 'clamp(0.5rem, 2vw, 1rem)',
          backdropFilter: 'blur(5px)',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}>
          <div style={{
            backgroundColor: '#0f0f23',
            borderRadius: '1rem',
            padding: 'clamp(1rem, 3vw, 2rem)',
            width: '100%',
            maxWidth: '1000px',
            maxHeight: '90vh',
            overflowY: 'auto',
            border: '2px solid #D4AF37',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
            margin: 'auto 0'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: 'clamp(1rem, 3vw, 2rem)',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              <h2 style={{ 
                fontSize: 'clamp(1.5rem, 5vw, 2rem)', 
                fontWeight: 'bold', 
                color: '#D4AF37',
                lineHeight: '1.2'
              }}>
                All Ranks & Bonuses
              </h2>
              <button
                onClick={() => setShowAllRanks(false)}
                style={{
                  background: 'transparent',
                  border: '1px solid #EF4444',
                  color: '#EF4444',
                  padding: 'clamp(0.4rem, 1.5vw, 0.5rem) clamp(0.75rem, 2vw, 1rem)',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                ✕ Close
              </button>
            </div>

            <div style={{ 
              marginBottom: 'clamp(1rem, 3vw, 2rem)',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, minmax(120px, 1fr))',
                gap: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                minWidth: '600px'
              }}>
                <div style={{
                  padding: 'clamp(0.75rem, 2vw, 1rem)',
                  backgroundColor: 'rgba(212, 175, 55, 0.2)',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#D4AF37',
                  fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'
                }}>
                  Rank
                </div>
                <div style={{
                  padding: 'clamp(0.75rem, 2vw, 1rem)',
                  backgroundColor: 'rgba(212, 175, 55, 0.2)',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#D4AF37',
                  fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'
                }}>
                  Min Volume
                </div>
                <div style={{
                  padding: 'clamp(0.75rem, 2vw, 1rem)',
                  backgroundColor: 'rgba(212, 175, 55, 0.2)',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#D4AF37',
                  fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'
                }}>
                  Rank Bonus
                </div>
                <div style={{
                  padding: 'clamp(0.75rem, 2vw, 1rem)',
                  backgroundColor: 'rgba(212, 175, 55, 0.2)',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#D4AF37',
                  fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'
                }}>
                  Infinity %
                </div>
                <div style={{
                  padding: 'clamp(0.75rem, 2vw, 1rem)',
                  backgroundColor: 'rgba(212, 175, 55, 0.2)',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#D4AF37',
                  fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'
                }}>
                  Status
                </div>

                {ranksData.map((rank, index) => {
                  // Calculate the correct status for each rank
                  let status = 'PENDING';
                  let statusColor = '#EF4444';
                  
                  if (userData.current_rank === rank.rank) {
                    status = 'CURRENT';
                    statusColor = '#D4AF37';
                  } else if (index < currentRankIndex) {
                    // Rank is below current rank (already achieved)
                    status = 'ACHIEVED';
                    statusColor = '#22C55E';
                  }
                  // else remains "PENDING" with red color
                  
                  return (
                    <React.Fragment key={rank.rank}>
                      <div style={{
                        padding: 'clamp(0.75rem, 2vw, 1rem)',
                        backgroundColor: 'rgba(26, 26, 46, 0.7)',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: rank.color,
                        fontSize: 'clamp(0.75rem, 2vw, 0.85rem)',
                        wordBreak: 'break-word'
                      }}>
                        {rank.rank}
                      </div>
                      <div style={{
                        padding: 'clamp(0.75rem, 2vw, 1rem)',
                        backgroundColor: 'rgba(26, 26, 46, 0.7)',
                        textAlign: 'center',
                        color: '#E5E7EB',
                        fontSize: 'clamp(0.75rem, 2vw, 0.85rem)'
                      }}>
                        {formatCurrency(rank.min_volume)}
                      </div>
                      <div style={{
                        padding: 'clamp(0.75rem, 2vw, 1rem)',
                        backgroundColor: 'rgba(26, 26, 46, 0.7)',
                        textAlign: 'center',
                        color: '#22C55E',
                        fontSize: 'clamp(0.75rem, 2vw, 0.85rem)'
                      }}>
                        {formatCurrency(rank.bonus)}
                      </div>
                      <div style={{
                        padding: 'clamp(0.75rem, 2vw, 1rem)',
                        backgroundColor: 'rgba(26, 26, 46, 0.7)',
                        textAlign: 'center',
                        color: rank.infinity_bonus && rank.infinity_bonus > 0 ? '#00FF00' : '#9CA3AF',
                        fontSize: 'clamp(0.75rem, 2vw, 0.85rem)'
                      }}>
                        {rank.infinity_bonus && rank.infinity_bonus > 0 ? `${rank.infinity_bonus}%` : '-'}
                      </div>
                      <div style={{
                        padding: 'clamp(0.75rem, 2vw, 1rem)',
                        backgroundColor: 'rgba(26, 26, 46, 0.7)',
                        textAlign: 'center',
                        fontSize: 'clamp(0.75rem, 2vw, 0.85rem)'
                      }}>
                        <span style={{
                          color: statusColor,
                          fontWeight: 'bold'
                        }}>
                          {status}
                        </span>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            <div style={{
              backgroundColor: 'rgba(212, 175, 55, 0.1)',
              borderRadius: '0.75rem',
              padding: 'clamp(1rem, 3vw, 1.5rem)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              marginBottom: 'clamp(1rem, 3vw, 1.5rem)'
            }}>
              <h3 style={{ 
                color: '#D4AF37', 
                marginBottom: 'clamp(0.75rem, 2vw, 1rem)', 
                fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                lineHeight: '1.2'
              }}>
                💰 How to Earn:
              </h3>
              <ul style={{ 
                color: '#E5E7EB', 
                lineHeight: '1.6',
                paddingLeft: 'clamp(1rem, 3vw, 1.5rem)',
                fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)'
              }}>
                <li><strong>Direct Referral Bonus:</strong> 10% of every premium subscription your referrals make</li>
                <li><strong>Sales Volume:</strong> Each referral's subscription amount adds to your volume</li>
                <li><strong>Rank Bonus:</strong> One-time bonus awarded when you reach each rank</li>
                <li><strong>Infinity Bonus:</strong> Lifetime percentage earnings from qualified team members</li>
              </ul>
            </div>

            <div style={{
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
              borderRadius: '0.75rem',
              padding: 'clamp(1rem, 3vw, 1.5rem)',
              border: '1px solid rgba(255, 0, 0, 0.3)'
            }}>
              <h3 style={{ 
                color: '#FF6B6B', 
                marginBottom: 'clamp(0.75rem, 2vw, 1rem)', 
                fontSize: 'clamp(1rem, 3vw, 1.2rem)',
                lineHeight: '1.2'
              }}>
                🎯 Infinity Bonus Adjustment Rule:
              </h3>
              <ul style={{ 
                color: '#E5E7EB', 
                lineHeight: '1.6',
                paddingLeft: 'clamp(1rem, 3vw, 1.5rem)',
                fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)'
              }}>
                <li>If you're Ambassador (5%) and have Deputy Ambassador (4%) in your team, you earn 1% (5% - 4%)</li>
                <li>If you're Global Ambassador (7%) and have Ambassador (5%) in your team, you earn 2% (7% - 5%)</li>
                <li>You only earn from 1st and 2nd generation qualified team members</li>
                <li>The qualified downline takes their full percentage first, you get the difference</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        backgroundColor: 'rgba(15, 15, 35, 0.95)',
        borderTop: '2px solid #D4AF37',
        padding: 'clamp(1rem, 3vw, 2rem) clamp(0.5rem, 2vw, 1rem)',
        marginTop: 'clamp(1.5rem, 4vw, 3rem)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(1rem, 3vw, 1.5rem)',
          textAlign: 'center'
        }}>
          <p style={{ 
            color: '#9CA3AF', 
            fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
            maxWidth: '600px',
            lineHeight: '1.5'
          }}>
            Every referral brings you closer to Infinity Bonuses and lifetime earnings! 🚀
          </p>
          <p style={{ 
            color: '#6B7280', 
            fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
            borderTop: '1px solid #374151',
            paddingTop: 'clamp(0.75rem, 2vw, 1rem)',
            width: '100%',
            maxWidth: '400px',
            lineHeight: '1.5'
          }}>
            © {new Date().getFullYear()} Lauritalk Compensation System. Your journey to financial freedom starts here.
          </p>
        </div>
      </footer>
    </div>
  );
}