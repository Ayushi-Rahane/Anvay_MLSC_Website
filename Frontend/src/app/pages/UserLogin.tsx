import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { BlockCityButton } from '../components/BlockCityButton';
import { BlockCityInput } from '../components/BlockCityInput';
import { GlassCard } from '../components/GlassCard';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { mockParticipants } from '../data/mockData';

export const UserLogin: React.FC = () => {
  const navigate = useNavigate();
  const [citizenId, setCitizenId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = () => {
    setError('');
    
    if (!citizenId.trim()) {
      setError('Please enter your Citizen ID');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const participant = mockParticipants.find(
        p => p.citizenId.toLowerCase() === citizenId.toLowerCase()
      );

      if (participant) {
        setSuccess(true);
        setTimeout(() => {
          localStorage.setItem('currentUser', JSON.stringify(participant));
          navigate('/dashboard');
        }, 1500);
      } else {
        setError('Invalid Citizen ID. Please check and try again.');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7C3AED] rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#EC4899] rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-[#22D3EE] hover:text-[#7C3AED] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard glow>
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#22C55E]/20 flex items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#22C55E] flex items-center justify-center">
                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </motion.div>
                <h2 className="text-3xl font-bold text-[#22C55E] mb-2">City Gates Opening!</h2>
                <p className="text-white/70">Welcome to BlockCity...</p>
              </motion.div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold gradient-text mb-2">
                    Welcome to BlockCity
                  </h1>
                  <p className="text-white/70">
                    Enter your Citizen ID to begin your journey
                  </p>
                </div>

                <div className="space-y-6">
                  <BlockCityInput
                    label="Citizen ID"
                    placeholder="BC2025001"
                    value={citizenId}
                    onChange={setCitizenId}
                    error={error}
                  />

                  <BlockCityButton
                    variant="primary"
                    size="lg"
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Verifying...
                      </span>
                    ) : (
                      'Enter City'
                    )}
                  </BlockCityButton>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-white/50 text-center">
                      Demo IDs: BC2025001, BC2025002, BC2025003
                    </p>
                  </div>
                </div>
              </>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};
