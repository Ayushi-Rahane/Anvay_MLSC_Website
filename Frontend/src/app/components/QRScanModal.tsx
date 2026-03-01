import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, QrCode, Loader2, CheckCircle } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { BlockCityButton } from './BlockCityButton';

interface QRScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: any;
}

export const QRScanModal: React.FC<QRScanModalProps> = ({ isOpen, onClose, room }) => {
  const [scanning, setScanning] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setScanning(false);
      setSuccess(false);
    }
  }, [isOpen]);

  const handleScan = () => {
    setScanning(true);
    
    // Simulate QR scan
    setTimeout(() => {
      setScanning(false);
      setSuccess(true);
      
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 2000);
  };

  if (!room) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative z-10 w-full max-w-md"
          >
            <GlassCard glow>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Scan QR Code</h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#22C55E]/20 flex items-center justify-center"
                  >
                    <CheckCircle className="w-16 h-16 text-[#22C55E]" />
                  </motion.div>
                  <h4 className="text-2xl font-bold text-[#22C55E] mb-2">Entry Confirmed!</h4>
                  <p className="text-lg text-white mb-1">You have entered:</p>
                  <p className="text-xl font-bold gradient-text">{room.name}</p>
                  <div className="mt-6 p-4 bg-[#FBBF24]/20 rounded-xl border border-[#FBBF24]/40">
                    <p className="text-sm text-white/70">Points Pending Approval</p>
                    <p className="text-2xl font-bold text-[#FBBF24]">{room.points} Points</p>
                  </div>
                </motion.div>
              ) : scanning ? (
                <div className="text-center py-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-24 h-24 mx-auto mb-6 rounded-full border-4 border-[#7C3AED] border-t-transparent"
                  />
                  <p className="text-lg text-white mb-2">Scanning QR Code...</p>
                  <p className="text-sm text-white/60">Please wait</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="relative w-full aspect-square bg-white/5 rounded-2xl border-2 border-dashed border-[#7C3AED]/60 flex items-center justify-center overflow-hidden">
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 border-2 border-[#7C3AED] rounded-2xl"
                      />
                      <div className="relative z-10 text-center">
                        <QrCode className="w-16 h-16 text-[#7C3AED] mx-auto mb-4" />
                        <p className="text-white font-semibold">Align QR Code inside frame</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-[#7C3AED]/10 rounded-xl border border-[#7C3AED]/40">
                    <h4 className="font-bold text-white mb-1">{room.name}</h4>
                    <p className="text-sm text-white/70">{room.description}</p>
                  </div>

                  <BlockCityButton
                    variant="primary"
                    size="lg"
                    onClick={handleScan}
                    className="w-full"
                  >
                    <QrCode className="w-5 h-5 inline mr-2" />
                    Start Scanning
                  </BlockCityButton>
                </>
              )}
            </GlassCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
