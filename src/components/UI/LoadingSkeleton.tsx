import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  count?: number;
  className?: string;
}

export const LoadingSkeleton = ({ count = 6, className }: LoadingSkeletonProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 h-12 w-12 rounded-xl mb-4"></div>
            <div className="bg-gray-200 dark:bg-gray-700 h-5 w-3/4 rounded mb-2"></div>
            <div className="bg-gray-200 dark:bg-gray-700 h-4 w-full rounded mb-1"></div>
            <div className="bg-gray-200 dark:bg-gray-700 h-4 w-2/3 rounded mb-4"></div>
            <div className="bg-gray-200 dark:bg-gray-700 h-10 w-full rounded-lg"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export const ProfileSkeleton = () => {
  return (
    <div className="gradient-border">
      <div className="gradient-border-inner p-6">
        <div className="animate-pulse">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="space-y-2">
              <div className="bg-gray-200 dark:bg-gray-700 h-6 w-32 rounded"></div>
              <div className="bg-gray-200 dark:bg-gray-700 h-4 w-24 rounded"></div>
              <div className="bg-gray-200 dark:bg-gray-700 h-3 w-20 rounded"></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-gray-200 dark:bg-gray-700 h-4 w-full rounded"></div>
            <div className="bg-gray-200 dark:bg-gray-700 h-3 w-full rounded-full"></div>
            <div className="bg-gray-200 dark:bg-gray-700 h-3 w-3/4 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RewardsSkeleton = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-slate-600">
      <div className="animate-pulse">
        <div className="bg-gray-200 dark:bg-gray-700 h-6 w-40 rounded mb-6"></div>
        <div className="flex items-center justify-center mb-6">
          <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
            <div className="bg-gray-200 dark:bg-gray-600 h-4 w-16 rounded mb-2"></div>
            <div className="bg-gray-200 dark:bg-gray-600 h-6 w-12 rounded"></div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
            <div className="bg-gray-200 dark:bg-gray-600 h-4 w-16 rounded mb-2"></div>
            <div className="bg-gray-200 dark:bg-gray-600 h-6 w-12 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
