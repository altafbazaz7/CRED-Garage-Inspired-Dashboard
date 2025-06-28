import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAppDispatch } from '../../store';
import { claimBenefit } from '../../store/slices/benefitsSlice';
import { addPoints } from '../../store/slices/rewardsSlice';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';
import { useToast } from '../../hooks/use-toast';

interface BenefitCardProps {
  benefit: any;
  index: number;
}

const statusColors = {
  active: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
  premium: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
  limited: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
  new: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
  health: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
};

const gradients = [
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-pink-500',
  'from-orange-500 to-red-500',
  'from-green-500 to-teal-500',
  'from-indigo-500 to-blue-500',
  'from-pink-500 to-rose-500',
];

const BenefitCard = ({ benefit, index }: BenefitCardProps) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [isClaiming, setIsClaiming] = useState(false);

  const handleClaim = async () => {
    if (benefit.isClaimed) return;

    setIsClaiming(true);
    try {
      await dispatch(claimBenefit(benefit.id)).unwrap();
      
      dispatch(addPoints({
        amount: 100,
        description: `Claimed: ${benefit.title}`,
      }));

      toast({
        title: "Benefit Claimed!",
        description: `You've successfully claimed ${benefit.title} and earned 100 points!`,
      });
    } catch (error) {
      toast({
        title: "Claim Failed",
        description: error as string,
        variant: "destructive",
      });
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group"
    >
      <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-gray-100 dark:border-slate-600 hover:border-primary/20 dark:hover:border-primary/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <motion.div 
              className={`w-12 h-12 bg-gradient-to-r ${gradients[index % gradients.length]} rounded-xl flex items-center justify-center`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <i className={`${benefit.icon} text-white text-lg`} />
            </motion.div>
            
            <Badge className={statusColors[benefit.status as keyof typeof statusColors]}>
              {benefit.status.charAt(0).toUpperCase() + benefit.status.slice(1)}
            </Badge>
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {benefit.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {benefit.description}
          </p>
          
          <Button
            className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white font-semibold transition-all duration-200"
            onClick={handleClaim}
            disabled={isClaiming || benefit.isClaimed}
          >
            <motion.span
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center space-x-2"
            >
              {isClaiming ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Claiming...</span>
                </>
              ) : benefit.isClaimed ? (
                <span>Claimed ✓</span>
              ) : (
                <span>{benefit.ctaText}</span>
              )}
            </motion.span>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BenefitCard;
