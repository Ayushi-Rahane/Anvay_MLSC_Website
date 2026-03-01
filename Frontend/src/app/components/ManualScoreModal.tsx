import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { BlockCityButton } from './BlockCityButton';
import { BlockCityInput } from './BlockCityInput';
import { rooms } from '../data/mockData';

interface ManualScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  participant: any;
}

export const ManualScoreModal: React.FC<ManualScoreModalProps> = ({ isOpen, onClose, participant }) => {
  const [selectedRoom, setSelectedRoom] = useState('');
  const [points, setPoints] = useState('');
  const [reason, setReason] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedRoom('');
      setPoints('');
      setReason('');
      setSuccess(false);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!selectedRoom || !points || !reason) return;

    setSuccess(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (!participant) return null;

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
            <GlassCard className="border-2 border-[#EF4444]/40">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Manual Score Update</h3>
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
                  <h4 className="text-2xl font-bold text-[#22C55E] mb-2">Score Updated!</h4>
                  <p className="text-white/70">Changes have been saved successfully</p>
                </motion.div>
              ) : (
                <>
                  <div className="mb-6 p-4 bg-[#7C3AED]/10 rounded-xl border border-[#7C3AED]/40">
                    <p className="text-sm text-white/60 mb-1">Participant</p>
                    <p className="font-mono font-bold text-[#22D3EE] text-lg">{participant.citizenId}</p>
                    <p className="text-white">{participant.name}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block mb-2 text-sm font-semibold text-white/90 uppercase tracking-wide">
                        Select Room
                      </label>
                      <select
                        value={selectedRoom}
                        onChange={(e) => setSelectedRoom(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border-2 border-[#7C3AED]/40 rounded-xl text-white focus:outline-none focus:border-[#7C3AED] focus:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all duration-300"
                      >
                        <option value="">Choose a room...</option>
                        {rooms.map(room => (
                          <option key={room.id} value={room.id}>{room.name}</option>
                        ))}
                      </select>
                    </div>

                    <BlockCityInput
                      label="Points to Add"
                      placeholder="Enter points (e.g., 50)"
                      value={points}
                      onChange={setPoints}
                      type="number"
                    />

                    <div>
                      <label className="block mb-2 text-sm font-semibold text-white/90 uppercase tracking-wide">
                        Reason
                      </label>
                      <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Enter reason for manual update..."
                        rows={3}
                        className="w-full px-4 py-3 bg-white/5 border-2 border-[#7C3AED]/40 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#7C3AED] focus:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all duration-300 resize-none"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <BlockCityButton
                        variant="secondary"
                        size="md"
                        onClick={onClose}
                        className="flex-1"
                      >
                        Cancel
                      </BlockCityButton>
                      <BlockCityButton
                        variant="success"
                        size="md"
                        onClick={handleSubmit}
                        disabled={!selectedRoom || !points || !reason}
                        className="flex-1"
                      >
                        Confirm Update
                      </BlockCityButton>
                    </div>
                  </div>
                </>
              )}
            </GlassCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
