// @ts-nocheck

import { UserProfile, BenefitWithStatus } from '@shared/schema';
import { APIResponse } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const mockUserProfile: UserProfile = {
  id: 1,
  name: 'Alex Johnson',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150',
  level: 7,
  xp: 2450,
  progressPercent: 73,
  xpToNext: 550,
  totalPoints: 12450,
  redeemedPoints: 8200,
  monthlyPoints: 1250,
};

const mockBenefits: BenefitWithStatus[] = [
  {
    id: 1,
    title: '20% Cashback',
    description: 'Get 20% cashback on all online purchases up to ₹500',
    icon: 'fas fa-percentage',
    status: 'active',
    ctaText: 'Claim Now',
    category: 'cashback',
    value: '20%',
    isActive: true,
    createdAt: new Date().toISOString(),
    isClaimed: false,
  },
  {
    id: 2,
    title: 'Travel Discounts',
    description: 'Exclusive 15% off on flight bookings and hotel stays',
    icon: 'fas fa-plane',
    status: 'premium',
    ctaText: 'View Offers',
    category: 'travel',
    value: '15%',
    isActive: true,
    createdAt: new Date().toISOString(),
    isClaimed: false,
  },
  {
    id: 3,
    title: 'Food Vouchers',
    description: '₹200 vouchers for Zomato, Swiggy, and other food apps',
    icon: 'fas fa-utensils',
    status: 'limited',
    ctaText: 'Redeem',
    category: 'food',
    value: '₹200',
    isActive: true,
    createdAt: new Date().toISOString(),
    isClaimed: false,
  },
  {
    id: 4,
    title: 'Shopping Rewards',
    description: 'Earn 2X points on all e-commerce purchases this month',
    icon: 'fas fa-shopping-bag',
    status: 'active',
    ctaText: 'Activate',
    category: 'shopping',
    value: '2X',
    isActive: true,
    createdAt: new Date().toISOString(),
    isClaimed: false,
  },
  {
    id: 5,
    title: 'Entertainment',
    description: 'Free Netflix and Spotify subscriptions for 3 months',
    icon: 'fas fa-film',
    status: 'new',
    ctaText: 'Get Access',
    category: 'entertainment',
    value: '3 months',
    isActive: true,
    createdAt: new Date().toISOString(),
    isClaimed: false,
  },
  {
    id: 6,
    title: 'Health Benefits',
    description: '50% discount on health checkups and gym memberships',
    icon: 'fas fa-heart',
    status: 'health',
    ctaText: 'Book Now',
    category: 'health',
    value: '50%',
    isActive: true,
    createdAt: new Date().toISOString(),
    isClaimed: false,
  },
];

const mockRewardsData = {
  totalPoints: 12450,
  availablePoints: 4250,
  redeemedPoints: 8200,
  monthlyPoints: 1250,
  progressPercent: 70,
  recentTransactions: [
    {
      id: 1,
      type: 'earned' as const,
      amount: 500,
      description: 'Cashback from online purchase',
      date: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 2,
      type: 'redeemed' as const,
      amount: 1000,
      description: 'Redeemed for food voucher',
      date: new Date(Date.now() - 172800000).toISOString(),
    },
  ],
};

class APIService {
  async getUserProfile(): Promise<APIResponse<UserProfile>> {
    await delay(800);
    return {
      data: mockUserProfile,
      success: true,
      message: 'Profile fetched successfully',
    };
  }

  async updateUserXP(xpGained: number): Promise<APIResponse<Partial<UserProfile>>> {
    await delay(500);
    const newXP = mockUserProfile.xp + xpGained;
    const newLevel = Math.floor(newXP / 500) + 1;
    const progressPercent = ((newXP % 500) / 500) * 100;
    
    const updates = {
      xp: newXP,
      level: newLevel,
      progressPercent: Math.round(progressPercent),
      xpToNext: 500 - (newXP % 500),
    };
    
    Object.assign(mockUserProfile, updates);
    
    return {
      data: updates,
      success: true,
      message: 'XP updated successfully',
    };
  }

  async getBenefits(): Promise<APIResponse<BenefitWithStatus[]>> {
    await delay(1200);
    return {
      data: JSON.parse(JSON.stringify(mockBenefits)), 
      success: true,
      message: 'Benefits fetched successfully',
    };
  }

  async claimBenefit(benefitId: number): Promise<APIResponse<BenefitWithStatus>> {
    await delay(800);
    const benefit = mockBenefits.find(b => b.id === benefitId);
    if (!benefit) {
      throw new Error('Benefit not found');
    }
    
    const claimedBenefit = {
      ...benefit,
      isClaimed: true,
      claimedAt: new Date().toISOString(),
    };
    
    // Update the original array
    const benefitIndex = mockBenefits.findIndex(b => b.id === benefitId);
    if (benefitIndex !== -1) {
      mockBenefits[benefitIndex] = claimedBenefit;
    }
    
    return {
      data: claimedBenefit,
      success: true,
      message: 'Benefit claimed successfully',
    };
  }

  async getUserBenefits(): Promise<APIResponse<BenefitWithStatus[]>> {
    await delay(600);
    const claimedBenefits = mockBenefits.filter(b => b.isClaimed);
    return {
      data: claimedBenefits,
      success: true,
      message: 'User benefits fetched successfully',
    };
  }

  async getRewardsData(): Promise<APIResponse<typeof mockRewardsData>> {
    await delay(900);
    return {
      data: mockRewardsData,
      success: true,
      message: 'Rewards data fetched successfully',
    };
  }

  async redeemPoints(amount: number): Promise<APIResponse<{ amount: number }>> {
    await delay(1000);
    if (amount > mockRewardsData.availablePoints) {
      throw new Error('Insufficient points');
    }
    
    return {
      data: { amount },
      success: true,
      message: `Successfully redeemed ${amount} points`,
    };
  }
}

export const apiService = new APIService();
