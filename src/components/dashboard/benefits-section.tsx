import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { formatNumber, getColorClasses } from "../../lib/utils";
import { Benefit } from "../../types";

interface BenefitsSectionProps {
  benefits: Benefit[];
}

export function BenefitsSection({ benefits }: BenefitsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Benefits</h2>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {benefits.length} available
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <BenefitCard key={benefit.id} benefit={benefit} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

interface BenefitCardProps {
  benefit: Benefit;
  index: number;
}

function BenefitCard({ benefit, index }: BenefitCardProps) {
  const [claimed, setClaimed] = useState(false);
  const colorClasses = getColorClasses(benefit.color);

  const handleClaim = () => {
    setClaimed(true);
    // Show toast notification
    setTimeout(() => setClaimed(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Card className={`h-full transition-all duration-200 hover:shadow-lg ${colorClasses.border} ${colorClasses.bg}`}>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{benefit.icon}</div>
              <div>
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
                <div className={`text-lg font-bold ${colorClasses.text}`}>
                  {benefit.value}
                </div>
              </div>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              benefit.status === 'new' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
              benefit.status === 'limited' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
              benefit.status === 'premium' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
              'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
            }`}>
              {benefit.status}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <CardDescription className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {benefit.description}
          </CardDescription>
          
          <Button
            className={`w-full transition-all duration-200 ${
              claimed 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : `bg-gradient-to-r from-${benefit.color}-500 to-${benefit.color}-600 hover:from-${benefit.color}-600 hover:to-${benefit.color}-700 text-white`
            }`}
            onClick={handleClaim}
            disabled={claimed}
          >
            {claimed ? 'Claimed!' : benefit.buttonText}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}