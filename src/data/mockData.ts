import { DashboardData } from '../types';

export const mockDashboardData: DashboardData = {
  user: {
    id: 1,
    username: "alex_johnson",
    email: "alex.johnson@example.com",
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
    level: 8,
    currentXP: 2450,
    nextLevelXP: 3000,
    totalSpend: 45280,
    cashbackEarned: 2264,
    transactions: 156,
    streak: 42,
    isPremium: true,
    createdAt: "2025-06-28T17:24:36.226Z"
  },
  benefits: [
    {
      id: 1,
      userId: 1,
      title: "Fuel Discount",
      description: "Get up to ₹500 cashback on fuel transactions this month",
      icon: "⛽",
      value: "₹500",
      category: "fuel",
      status: "active",
      buttonText: "Claim Now",
      color: "green",
      createdAt: "2025-06-28T17:24:36.226Z"
    },
    {
      id: 2,
      userId: 1,
      title: "Shopping Voucher",
      description: "Exclusive 20% off on partner stores and online shopping",
      icon: "🛍️",
      value: "20% OFF",
      category: "shopping",
      status: "new",
      buttonText: "View Details",
      color: "purple",
      createdAt: "2025-06-28T17:24:36.226Z"
    },
    {
      id: 3,
      userId: 1,
      title: "Food Delivery",
      description: "Free delivery on orders above ₹300 from premium restaurants",
      icon: "🍽️",
      value: "FREE",
      category: "food",
      status: "limited",
      buttonText: "Order Now",
      color: "orange",
      createdAt: "2025-06-28T17:24:36.226Z"
    },
    {
      id: 4,
      userId: 1,
      title: "Entertainment",
      description: "Complimentary movie tickets and streaming service access",
      icon: "🎬",
      value: "2 Tickets",
      category: "entertainment",
      status: "premium",
      buttonText: "Book Now",
      color: "blue",
      createdAt: "2025-06-28T17:24:36.226Z"
    },
    {
      id: 5,
      userId: 1,
      title: "Travel Benefits",
      description: "Priority boarding and lounge access with partner airlines",
      icon: "✈️",
      value: "VIP",
      category: "travel",
      status: "exclusive",
      buttonText: "Explore",
      color: "teal",
      createdAt: "2025-06-28T17:24:36.226Z"
    },
    {
      id: 6,
      userId: 1,
      title: "Insurance Coverage",
      description: "Comprehensive coverage for travel and purchase protection",
      icon: "🛡️",
      value: "₹5L",
      category: "insurance",
      status: "protected",
      buttonText: "Learn More",
      color: "emerald",
      createdAt: "2025-06-28T17:24:36.226Z"
    }
  ],
  rewardProgress: {
    id: 1,
    userId: 1,
    currentPoints: 12450,
    totalEarned: 15680,
    creditCardSpend: 8200,
    bonusActivities: 2850,
    referralBonus: 1400,
    monthlyGoal: 18000,
    completionPercentage: 70
  }
};