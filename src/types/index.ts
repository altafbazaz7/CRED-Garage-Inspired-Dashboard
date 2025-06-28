export interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface ThemeState {
  mode: 'light' | 'dark';
}

export interface DashboardStats {
  totalUsers: number;
  activeBenefits: number;
  totalRewards: number;
  monthlyGrowth: number;
}

export type BenefitStatus = 'active' | 'premium' | 'limited' | 'new' | 'health';
export type BenefitCategory = 'cashback' | 'travel' | 'food' | 'shopping' | 'entertainment' | 'health';

export interface QuickAction {
  id: string;
  title: string;
  icon: string;
  gradient: string;
  action: () => void;
}
