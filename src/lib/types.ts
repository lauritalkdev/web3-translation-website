// lib/types.ts

// User data interface for dashboard
export interface UserData {
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
}

// Rank data interface
export interface RankData {
  rank: string;
  min_volume: number;
  bonus: number;
  color: string;
}

// Auth user interface
export interface AuthUser {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
  };
}

// Profile interface
export interface Profile {
  id: string;
  full_name?: string;
  referral_code?: string;
  created_at?: string;
  updated_at?: string;
}

// Bonus transaction interface
export interface BonusTransaction {
  id: string;
  user_id: string;
  amount: number;
  type: 'direct' | 'rank' | 'infinity';
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string;
  description?: string;
}

// Sales volume interface
export interface SalesVolume {
  id: string;
  user_id: string;
  volume_amount: number;
  period_start: string;
  period_end: string;
  created_at: string;
}