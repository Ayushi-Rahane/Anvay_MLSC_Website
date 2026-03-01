import React from 'react';
import { motion } from 'motion/react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="w-20 h-20 mb-6 rounded-full bg-white/5 flex items-center justify-center border-2 border-white/10">
        {icon || <Inbox className="w-10 h-10 text-white/40" />}
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      {description && (
        <p className="text-white/60 mb-6 max-w-md">{description}</p>
      )}
      {action && <div>{action}</div>}
    </motion.div>
  );
};
