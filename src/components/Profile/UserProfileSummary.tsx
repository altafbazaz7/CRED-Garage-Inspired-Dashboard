import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store';
import { fetchUserProfile } from '../../store/slices/userSlice';
import { ProfileSkeleton } from '../UI/LoadingSkeleton';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';
import { Progress } from '../../components/ui/progress';

const UserProfileSummary = () => {
  const dispatch = useAppDispatch();
  const { profile, isLoading, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error) {
    return (
      <div className="gradient-border">
        <div className="gradient-border-inner p-6">
          <div className="text-center text-red-500">
            <p>Error loading profile: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <motion.div 
      className="gradient-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="gradient-border-inner p-6">
        <div className="flex items-center space-x-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Avatar className="w-16 h-16 border-4 border-primary shadow-lg">
              <AvatarImage 
                src={profile.avatar} 
                alt={profile.name}
                className="object-cover"
              />
              <AvatarFallback className="bg-primary text-primary-foreground font-bold text-lg">
                {profile.name.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          
          <div>
            <motion.h2 
              className="text-xl font-bold text-gray-900 dark:text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {profile.name}
            </motion.h2>
            
            <motion.p 
              className="text-primary font-semibold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Level {profile.level} Member
            </motion.p>
            
            <motion.div 
              className="flex items-center space-x-2 mt-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {profile.xp.toLocaleString()} XP
              </span>
            </motion.div>
          </div>
        </div>
        
        {/* Gamification Progress */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Progress to Level {profile.level + 1}
            </span>
            <span className="text-sm text-primary font-semibold">
              {profile.progressPercent}%
            </span>
          </div>
          
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
            className="origin-left"
          >
            <Progress 
              value={profile.progressPercent} 
              className="h-3 bg-gray-200 dark:bg-slate-700"
            />
          </motion.div>
          
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {profile.xpToNext.toLocaleString()} XP needed for next level
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserProfileSummary;
