import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, ArrowRight } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store';
import { fetchBenefits, setFilterStatus } from '../../store/slices/benefitsSlice';
import BenefitCard from './BenefitCard';
import { LoadingSkeleton } from '../UI/LoadingSkeleton';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

const BenefitsSection = () => {
  const dispatch = useAppDispatch();
  const { benefits, isLoading, error, filterStatus } = useAppSelector((state) => state.benefits);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    dispatch(fetchBenefits());
  }, [dispatch]);

  const filteredBenefits = benefits.filter(benefit => 
    filterStatus === 'all' || benefit.status === filterStatus
  );

  const displayedBenefits = showAll ? filteredBenefits : filteredBenefits.slice(0, 6);

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Gift className="mr-3 text-primary" />
            Your Benefits
          </h2>
        </div>
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">Error loading benefits: {error}</p>
          <Button onClick={() => dispatch(fetchBenefits())}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <motion.h2 
          className="text-2xl font-bold text-gray-900 dark:text-white flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Gift className="mr-3 text-primary" />
          Your Benefits
        </motion.h2>
        
        <div className="flex items-center space-x-4">
          <Select 
            value={filterStatus} 
            onValueChange={(value) => dispatch(setFilterStatus(value))}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="limited">Limited</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="health">Health</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="ghost"
            className="text-primary hover:text-primary/80 font-medium text-sm flex items-center space-x-1"
            onClick={() => setShowAll(!showAll)}
          >
            <span>{showAll ? 'Show Less' : 'View All'}</span>
            <motion.div
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoadingSkeleton count={6} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {displayedBenefits.map((benefit, index) => (
              <BenefitCard
                key={benefit.id}
                benefit={benefit}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && filteredBenefits.length === 0 && (
        <motion.div 
          className="text-center py-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Gift className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            No benefits found for the selected filter.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default BenefitsSection;
