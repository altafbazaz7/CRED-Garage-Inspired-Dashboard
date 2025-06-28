// @ts-nocheck

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gem } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store';
import { fetchRewardsData } from '../../store/slices/rewardsSlice';
import { RewardsSkeleton } from '../UI/LoadingSkeleton';
import { Card, CardContent } from '../../components/ui/card';

const RewardPointsProgress = () => {
  const dispatch = useAppDispatch();
  const { 
    totalPoints, 
    redeemedPoints, 
    monthlyPoints, 
    progressPercent, 
    isLoading, 
    error 
  } = useAppSelector((state) => state.rewards);

  useEffect(() => {
    dispatch(fetchRewardsData());
  }, [dispatch]);

  if (isLoading) {
    return <RewardsSkeleton />;
  }

  if (error) {
    return (
      <Card className="shadow-xl border-gray-100 dark:border-slate-600">
        <CardContent className="p-6">
          <div className="text-center text-red-500">
            <p>Error loading rewards: {error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate stroke dash offset for progress ring
  const circumference = 2 * Math.PI * 40; // radius = 40
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-gray-100 dark:border-slate-600">
        <CardContent className="p-6">
          <motion.h3 
            className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Gem className="text-purple-500 mr-2" />
            Reward Points
          </motion.h3>
          
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-32 h-32">
              <motion.svg 
                className="progress-ring w-32 h-32 transform -rotate-90" 
                viewBox="0 0 84 84"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {/* Background circle */}
                <circle
                  cx="42"
                  cy="42"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  className="text-gray-200 dark:text-slate-600"
                />
                
                {/* Progress circle */}
                <motion.circle
                  cx="42"
                  cy="42"
                  r="40"
                  stroke="url(#progressGradient)"
                  strokeWidth="4"
                  fill="transparent"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
                />
                
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#6366F1', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
              </motion.svg>
              
              <motion.div 
                className="absolute inset-0 flex items-center justify-center flex-col"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalPoints.toLocaleString()}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">points</span>
              </motion.div>
            </div>
          </div>
          
          <motion.div 
            className="grid grid-cols-2 gap-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
              <motion.p 
                className="text-lg font-bold text-green-500"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
              >
                +{monthlyPoints.toLocaleString()}
              </motion.p>
            </div>
            
            <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">Redeemed</p>
              <motion.p 
                className="text-lg font-bold text-primary"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.6, type: "spring", stiffness: 200 }}
              >
                {redeemedPoints.toLocaleString()}
              </motion.p>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RewardPointsProgress;
