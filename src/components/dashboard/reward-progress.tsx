import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatCurrency, formatNumber } from "../../lib/utils";
import { RewardProgress } from "../../types";

interface RewardProgressProps {
  rewardProgress: RewardProgress;
}

export function RewardProgressSection({ rewardProgress }: RewardProgressProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reward Progress</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RadialProgress rewardProgress={rewardProgress} />
        <PointsBreakdown rewardProgress={rewardProgress} />
      </div>
      
      <MilestoneRewards />
    </motion.div>
  );
}

function RadialProgress({ rewardProgress }: { rewardProgress: RewardProgress }) {
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (rewardProgress.completionPercentage / 100) * circumference;

  return (
    <Card className="p-6">
      <CardHeader className="pb-4">
        <CardTitle>Monthly Goal Progress</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <div className="relative">
          <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 256 256">
            <circle
              cx="128"
              cy="128"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200 dark:text-gray-700"
            />
            <motion.circle
              cx="128"
              cy="128"
              r={radius}
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {rewardProgress.completionPercentage}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {formatNumber(rewardProgress.currentPoints)} / {formatNumber(rewardProgress.monthlyGoal)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PointsBreakdown({ rewardProgress }: { rewardProgress: RewardProgress }) {
  const breakdownData = [
    {
      label: "Credit Card Spend",
      amount: rewardProgress.creditCardSpend,
      color: "bg-blue-500",
      percentage: (rewardProgress.creditCardSpend / rewardProgress.currentPoints) * 100
    },
    {
      label: "Bonus Activities",
      amount: rewardProgress.bonusActivities,
      color: "bg-purple-500",
      percentage: (rewardProgress.bonusActivities / rewardProgress.currentPoints) * 100
    },
    {
      label: "Referral Bonus",
      amount: rewardProgress.referralBonus,
      color: "bg-green-500",
      percentage: (rewardProgress.referralBonus / rewardProgress.currentPoints) * 100
    }
  ];

  return (
    <Card className="p-6">
      <CardHeader className="pb-4">
        <CardTitle>Points Breakdown</CardTitle>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          {formatNumber(rewardProgress.currentPoints)} Points
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {breakdownData.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.label}
              </span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {formatNumber(item.amount)}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full ${item.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{ duration: 1, delay: 0.2 * index }}
              />
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}

function MilestoneRewards() {
  const milestones = [
    { points: 5000, reward: "₹100 Cashback", achieved: true },
    { points: 10000, reward: "Free Movie Ticket", achieved: true },
    { points: 15000, reward: "₹500 Shopping Voucher", achieved: false },
    { points: 20000, reward: "Premium Subscription", achieved: false }
  ];

  return (
    <Card className="p-6">
      <CardHeader className="pb-4">
        <CardTitle>Milestone Rewards</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.points}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className={`p-4 rounded-lg border-2 ${
                milestone.achieved
                  ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800'
                  : 'bg-gray-50 border-gray-200 dark:bg-gray-900 dark:border-gray-700'
              }`}
            >
              <div className="text-center space-y-2">
                <div className={`text-lg font-bold ${
                  milestone.achieved ? 'text-green-700 dark:text-green-300' : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {formatNumber(milestone.points)} pts
                </div>
                <div className={`text-sm ${
                  milestone.achieved ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {milestone.reward}
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  milestone.achieved
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                }`}>
                  {milestone.achieved ? 'Achieved' : 'Locked'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}