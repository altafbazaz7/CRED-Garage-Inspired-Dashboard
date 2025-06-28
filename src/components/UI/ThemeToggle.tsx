import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../../components/ui/button';

export const ThemeToggle = () => {
  const { mode, toggle } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggle}
      className="relative overflow-hidden bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 border-gray-200 dark:border-slate-600"
    >
      <motion.div
        initial={false}
        animate={{
          scale: mode === 'light' ? 1 : 0,
          rotate: mode === 'light' ? 0 : 180,
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun className="h-4 w-4 text-yellow-500" />
      </motion.div>
      
      <motion.div
        initial={false}
        animate={{
          scale: mode === 'dark' ? 1 : 0,
          rotate: mode === 'dark' ? 0 : -180,
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon className="h-4 w-4 text-blue-400" />
      </motion.div>
    </Button>
  );
};
