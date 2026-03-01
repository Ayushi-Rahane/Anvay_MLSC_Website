import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { BlockCityButton } from '../components/BlockCityButton';
import { GlassCard } from '../components/GlassCard';
import { Scale, Coins, Shield, Users, Terminal, Calendar, DollarSign, Award, Github, Linkedin, Mail } from 'lucide-react';
import { rooms } from '../data/mockData';

const iconMap: Record<string, any> = {
  Scale,
  Coins,
  Shield,
  Users,
  Terminal
};

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7C3AED] rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#EC4899] rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#22D3EE] rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl md:text-9xl font-black gradient-text mb-6">
              ANVAY
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              The BlockCity Edition
            </h2>
            <p className="text-xl md:text-2xl text-white/80 mb-4">
              The Gamified Web3 Learning Experience
            </p>
            <p className="text-lg text-[#22D3EE] mb-12">
              Microsoft Learn Student Chapter CCEW
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BlockCityButton
                variant="primary"
                size="lg"
                onClick={() => navigate('/user-login')}
              >
                Enter BlockCity
              </BlockCityButton>
              <BlockCityButton
                variant="secondary"
                size="lg"
                onClick={() => navigate('/admin-login')}
              >
                Admin Login
              </BlockCityButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is BlockCity Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-center mb-6 gradient-text">
              What is BlockCity?
            </h2>
            <p className="text-xl text-center text-white/80 mb-16 max-w-3xl mx-auto">
              BlockCity is an immersive, gamified Web3 hackathon where you explore five specialized rooms, 
              earn points by completing challenges, and compete on the live leaderboard. Each room teaches 
              a unique aspect of blockchain technology in an engaging, hands-on way.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room, index) => {
                const IconComponent = iconMap[room.icon];
                return (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <GlassCard hover glow className="h-full">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-[#7C3AED]/20 rounded-xl">
                          <IconComponent className="w-8 h-8 text-[#7C3AED]" />
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          {room.name}
                        </h3>
                      </div>
                      <p className="text-white/70 mb-4">{room.description}</p>
                      <div className="flex items-center gap-2 text-[#FBBF24]">
                        <Award className="w-5 h-5" />
                        <span className="font-bold">{room.points} Points</span>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-[#1A1C35]/50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-center mb-16 gradient-text">
              How It Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Login with Citizen ID', desc: 'Use your unique credential to enter BlockCity' },
                { step: '02', title: 'Scan QR at Each Room', desc: 'Check in at rooms using your phone camera' },
                { step: '03', title: 'Earn Points', desc: 'Complete challenges and earn up to 100 points per room' },
                { step: '04', title: 'Win Leaderboard', desc: 'Climb the ranks and become the top citizen' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <GlassCard className="text-center h-full">
                    <div className="text-6xl font-black gradient-text mb-4 font-mono">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-white/70">
                      {item.desc}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Event Info Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-center mb-16 gradient-text">
              Event Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <GlassCard glow className="text-center">
                <Calendar className="w-12 h-12 text-[#7C3AED] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">7 March 2025</h3>
                <p className="text-white/70">Event Date</p>
              </GlassCard>

              <GlassCard glow className="text-center">
                <Users className="w-12 h-12 text-[#22D3EE] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Individual</h3>
                <p className="text-white/70">Participation</p>
              </GlassCard>

              <GlassCard glow className="text-center">
                <DollarSign className="w-12 h-12 text-[#FBBF24] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">₹50</h3>
                <p className="text-white/70">Registration Fee</p>
              </GlassCard>

              <GlassCard glow className="text-center">
                <Award className="w-12 h-12 text-[#22C55E] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Certificates</h3>
                <p className="text-white/70">For All Participants</p>
              </GlassCard>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[#7C3AED]/40">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold gradient-text mb-4">ANVAY</h3>
              <p className="text-white/70">
                Microsoft Learn Student Chapter<br />
                CCEW
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
              <div className="flex flex-col gap-2">
                <button onClick={() => navigate('/user-login')} className="text-[#22D3EE] hover:text-[#7C3AED] transition-colors text-left">
                  Participant Login
                </button>
                <button onClick={() => navigate('/admin-login')} className="text-[#22D3EE] hover:text-[#7C3AED] transition-colors text-left">
                  Admin Panel
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold text-white mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-[#7C3AED]/20 transition-colors">
                  <Github className="w-6 h-6 text-white" />
                </a>
                <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-[#7C3AED]/20 transition-colors">
                  <Linkedin className="w-6 h-6 text-white" />
                </a>
                <a href="#" className="p-2 bg-white/5 rounded-lg hover:bg-[#7C3AED]/20 transition-colors">
                  <Mail className="w-6 h-6 text-white" />
                </a>
              </div>
            </div>
          </div>

          <div className="text-center text-white/50 text-sm">
            © 2025 ANVAY - BlockCity Edition. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
