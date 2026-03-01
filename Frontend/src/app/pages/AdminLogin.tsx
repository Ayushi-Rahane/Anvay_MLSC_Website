import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { BlockCityButton } from '../components/BlockCityButton';
import { BlockCityInput } from '../components/BlockCityInput';
import { GlassCard } from '../components/GlassCard';
import { ArrowLeft, Loader2, Shield, AlertTriangle } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError('');
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Demo credentials: admin / admin123
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('adminAuth', 'true');
        navigate('/admin');
      } else {
        setError('Invalid credentials. Access denied.');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background - More serious/red tone */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#EF4444] rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7C3AED] rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-[#EF4444] hover:text-[#7C3AED] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="border-2 border-[#EF4444]/40">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#EF4444]/20 flex items-center justify-center border-2 border-[#EF4444]/60">
                <Shield className="w-10 h-10 text-[#EF4444]" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Control Center
              </h1>
              <div className="flex items-center justify-center gap-2 text-[#EF4444]">
                <AlertTriangle className="w-4 h-4" />
                <p className="text-sm font-bold uppercase tracking-wider">
                  Authorized Personnel Only
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <BlockCityInput
                label="Admin Username"
                placeholder="Enter username"
                value={username}
                onChange={setUsername}
              />

              <BlockCityInput
                label="Password"
                placeholder="Enter password"
                value={password}
                onChange={setPassword}
                type="password"
                error={error}
              />

              <BlockCityButton
                variant="danger"
                size="lg"
                onClick={handleLogin}
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Authenticating...
                  </span>
                ) : (
                  'Access Admin Panel'
                )}
              </BlockCityButton>

              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-white/50 text-center">
                  Demo: admin / admin123
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};
