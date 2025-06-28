import { motion } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";
import { formatCurrency, formatNumber } from "../../lib/utils";
import { User } from "../../types";

interface UserProfileProps {
  user: User;
}

export function UserProfile({ user }: UserProfileProps) {
  const xpProgress = (user.currentXP / user.nextLevelXP) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-950 dark:via-blue-950 dark:to-indigo-950 border-purple-200 dark:border-purple-800">
        <CardContent className="p-8">
          <div className="flex items-start gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="h-20 w-20 rounded-full overflow-hidden ring-4 ring-purple-200 dark:ring-purple-800">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              </div>
              {user.isPremium && (
                <div className="absolute -top-1 -right-1 h-6 w-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">★</span>
                </div>
              )}
            </motion.div>

            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">@{user.username}</p>
                {user.isPremium && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 dark:from-yellow-900 dark:to-orange-900 dark:text-yellow-200 mt-1">
                    Premium Member
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Level {user.level} Progress
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {formatNumber(user.currentXP)} / {formatNumber(user.nextLevelXP)} XP
                  </span>
                </div>
                <div className="relative">
                  <Progress value={xpProgress} className="h-3" />
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${xpProgress}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
              </div>
            </div>

            <div className="text-right space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Spend</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(user.totalSpend)}
              </div>
              <div className="text-sm text-green-600 dark:text-green-400">
                +{formatCurrency(user.cashbackEarned)} cashback
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}