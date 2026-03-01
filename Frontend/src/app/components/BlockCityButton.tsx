import React from 'react';
import { motion } from 'motion/react';

interface BlockCityButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

export const BlockCityButton: React.FC<BlockCityButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  type = 'button'
}) => {
  const baseStyles = 'relative overflow-hidden transition-all duration-300 font-semibold tracking-wide border-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-[#7C3AED] border-[#7C3AED] text-white hover:shadow-[0_0_20px_rgba(124,58,237,0.7)] hover:scale-105',
    secondary: 'bg-transparent border-[#22D3EE] text-[#22D3EE] hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:bg-[#22D3EE]/10',
    danger: 'bg-[#EF4444] border-[#EF4444] text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.7)] hover:scale-105',
    success: 'bg-[#22C55E] border-[#22C55E] text-white hover:shadow-[0_0_20px_rgba(34,197,94,0.7)] hover:scale-105'
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-xs rounded-lg',
    md: 'px-6 py-3 text-sm rounded-xl',
    lg: 'px-8 py-4 text-base rounded-2xl'
  };
  
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      {children}
    </motion.button>
  );
};
