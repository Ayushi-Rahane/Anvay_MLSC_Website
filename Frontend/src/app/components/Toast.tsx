import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  isOpen,
  onClose,
  duration = 3000
}) => {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-6 h-6 text-[#22C55E]" />,
    error: <AlertTriangle className="w-6 h-6 text-[#EF4444]" />,
    info: <Info className="w-6 h-6 text-[#22D3EE]" />
  };

  const colors = {
    success: 'border-[#22C55E]/60 bg-[#22C55E]/10',
    error: 'border-[#EF4444]/60 bg-[#EF4444]/10',
    info: 'border-[#22D3EE]/60 bg-[#22D3EE]/10'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -50, x: '-50%' }}
          className={`fixed top-6 left-1/2 z-50 max-w-md w-full mx-4 p-4 backdrop-blur-lg border-2 rounded-xl ${colors[type]} shadow-2xl`}
        >
          <div className="flex items-center gap-3">
            {icons[type]}
            <p className="flex-1 text-white font-semibold">{message}</p>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
