// Types for the dashboard data
export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  avatar: string;
  level: number;
  currentXP: number;
  nextLevelXP: number;
  totalSpend: number;
  cashbackEarned: number;
  transactions: number;
  streak: number;
  isPremium: boolean;
  createdAt: string;
}

export interface Benefit {
  id: number;
  userId: number;
  title: string;
  description: string;
  icon: string;
  value: string;
  category: string;
  status: string;
  buttonText: string;
  color: string;
  createdAt: string;
}

export interface RewardProgress {
  id: number;
  userId: number;
  currentPoints: number;
  totalEarned: number;
  creditCardSpend: number;
  bonusActivities: number;
  referralBonus: number;
  monthlyGoal: number;
  completionPercentage: number;
}

export interface DashboardData {
  user: User;
  benefits: Benefit[];
  rewardProgress: RewardProgress;
}