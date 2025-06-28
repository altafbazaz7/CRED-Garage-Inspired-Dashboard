import { motion } from 'framer-motion';
import { ThemeToggle } from '../UI/ThemeToggle';
import { Zap } from 'lucide-react';

const Header = () => {
  return (
    <motion.header 
      className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-slate-900/80 border-b border-gray-200 dark:border-slate-700"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-500 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              CRED Dashboard
            </h1>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <motion.div 
              className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
