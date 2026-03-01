import React from 'react';
import { motion } from 'motion/react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hover = false,
  glow = false
}) => {
  return (
    <motion.div
      className={`glass-card p-6 ${glow ? 'neon-glow' : ''} ${className}`}
      whileHover={hover ? { scale: 1.02, boxShadow: '0 0 30px rgba(124, 58, 237, 0.6)' } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};
