import { motion } from 'framer-motion';
import { CreditCard, ArrowLeftRight, TrendingUp, Gift } from 'lucide-react';
import { QuickAction } from '../../types';
import { Card, CardContent } from '../../components/ui/card';
import { useToast } from '../../hooks/use-toast';

const QuickActions = () => {
  const { toast } = useToast();

  const actions: QuickAction[] = [
    {
      id: 'pay-bills',
      title: 'Pay Bills',
      icon: 'credit-card',
      gradient: 'from-blue-500 to-cyan-500',
      action: () => toast({ title: 'Pay Bills', description: 'Redirecting to bill payment...' }),
    },
    {
      id: 'transfer',
      title: 'Transfer',
      icon: 'arrow-left-right',
      gradient: 'from-green-500 to-teal-500',
      action: () => toast({ title: 'Transfer', description: 'Opening transfer interface...' }),
    },
    {
      id: 'invest',
      title: 'Invest',
      icon: 'trending-up',
      gradient: 'from-purple-500 to-pink-500',
      action: () => toast({ title: 'Invest', description: 'Launching investment portal...' }),
    },
    {
      id: 'rewards',
      title: 'Rewards',
      icon: 'gift',
      gradient: 'from-orange-500 to-red-500',
      action: () => toast({ title: 'Rewards', description: 'Viewing rewards catalog...' }),
    },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'credit-card':
        return <CreditCard className="w-5 h-5 text-white" />;
      case 'arrow-left-right':
        return <ArrowLeftRight className="w-5 h-5 text-white" />;
      case 'trending-up':
        return <TrendingUp className="w-5 h-5 text-white" />;
      case 'gift':
        return <Gift className="w-5 h-5 text-white" />;
      default:
        return <CreditCard className="w-5 h-5 text-white" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="mt-12"
    >
      <Card className="shadow-xl border-gray-100 dark:border-slate-600">
        <CardContent className="p-6">
          <motion.h3 
            className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              ⚡
            </motion.div>
            <span className="ml-2">Quick Actions</span>
          </motion.h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {actions.map((action, index) => (
              <motion.button
                key={action.id}
                className="group flex flex-col items-center p-4 bg-gray-50 dark:bg-slate-700 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-600 transition-all duration-200"
                onClick={action.action}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className={`w-10 h-10 bg-gradient-to-r ${action.gradient} rounded-lg flex items-center justify-center mb-2`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {getIcon(action.icon)}
                </motion.div>
                
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {action.title}
                </span>
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuickActions;
