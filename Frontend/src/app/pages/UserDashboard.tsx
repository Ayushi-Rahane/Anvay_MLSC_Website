import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { BlockCityButton } from '../components/BlockCityButton';
import { StatusBadge } from '../components/StatusBadge';
import { Trophy, Target, TrendingUp, Scale, Coins, Shield, Users, Terminal, QrCode, Award, Check } from 'lucide-react';
import { rooms, mockParticipants } from '../data/mockData';
import { QRScanModal } from '../components/QRScanModal';

const iconMap: Record<string, any> = {
  Scale,
  Coins,
  Shield,
  Users,
  Terminal
};

export const UserDashboard: React.FC = () => {
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const participant = mockParticipants.find(p => p.citizenId === currentUser.citizenId) || mockParticipants[0];

  const topParticipants = [...mockParticipants]
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, 5);

  const handleScanQR = (room: any) => {
    setSelectedRoom(room);
    setQrModalOpen(true);
  };

  const getTierProgress = (tier: string) => {
    const tierLevels = { Explorer: 33, Builder: 66, Architect: 100 };
    return tierLevels[tier as keyof typeof tierLevels] || 0;
  };

  return (
    <div className="p-6 space-y-6 pb-24 md:pb-6">
      {/* Personal Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard glow>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#FBBF24]/20 rounded-xl">
              <Trophy className="w-8 h-8 text-[#FBBF24]" />
            </div>
            <div>
              <p className="text-sm text-white/60">Total Score</p>
              <p className="text-3xl font-bold text-white">{participant.totalScore}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard glow>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#22C55E]/20 rounded-xl">
              <Target className="w-8 h-8 text-[#22C55E]" />
            </div>
            <div>
              <p className="text-sm text-white/60">Rooms Completed</p>
              <p className="text-3xl font-bold text-white">{participant.roomsCompleted.length}/5</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard glow>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#7C3AED]/20 rounded-xl">
              <TrendingUp className="w-8 h-8 text-[#7C3AED]" />
            </div>
            <div>
              <p className="text-sm text-white/60">Current Tier</p>
              <p className="text-2xl font-bold text-white">{participant.tier}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard glow>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#22D3EE]/20 rounded-xl">
              <Award className="w-8 h-8 text-[#22D3EE]" />
            </div>
            <div>
              <p className="text-sm text-white/60">Current Room</p>
              <p className="text-lg font-bold text-white">
                {participant.currentRoom ? rooms.find(r => r.id === participant.currentRoom)?.name : 'None'}
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Tier Progress */}
      <GlassCard>
        <h3 className="text-xl font-bold text-white mb-4">Tier Progress</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-2">
            <StatusBadge status={participant.tier} type="tier" />
            <span className="text-sm text-white/60">{getTierProgress(participant.tier)}%</span>
          </div>
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899]"
              initial={{ width: 0 }}
              animate={{ width: `${getTierProgress(participant.tier)}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ boxShadow: '0 0 20px rgba(124, 58, 237, 0.7)' }}
            />
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Leaderboard Preview */}
        <GlassCard>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Live Leaderboard</h3>
            <span className="text-sm text-[#22C55E] flex items-center gap-1">
              <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></span>
              Live
            </span>
          </div>
          <div className="space-y-3">
            {topParticipants.map((p, index) => (
              <motion.div
                key={p.citizenId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-4 p-3 rounded-xl ${
                  p.citizenId === participant.citizenId ? 'bg-[#7C3AED]/20 border border-[#7C3AED]/40' : 'bg-white/5'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  index === 0 ? 'bg-[#FBBF24] text-black' :
                  index === 1 ? 'bg-gray-300 text-black' :
                  index === 2 ? 'bg-[#CD7F32] text-black' :
                  'bg-white/10 text-white'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-mono font-bold text-white">{p.citizenId}</p>
                  <p className="text-sm text-white/60">{p.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-[#FBBF24]">{p.totalScore}</p>
                  <StatusBadge status={p.tier} type="tier" className="text-xs" />
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Badges */}
        <GlassCard>
          <h3 className="text-2xl font-bold text-white mb-6">Your Badges</h3>
          <div className="grid grid-cols-2 gap-3">
            {participant.badges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gradient-to-br from-[#7C3AED]/20 to-[#EC4899]/20 rounded-xl border border-[#7C3AED]/40 text-center"
              >
                <Award className="w-8 h-8 text-[#FBBF24] mx-auto mb-2" />
                <p className="text-sm font-bold text-white">{badge}</p>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Room Tracker */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6">Room Tracker</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room, index) => {
            const IconComponent = iconMap[room.icon];
            const progress = participant.roomProgress[room.id];
            const progressPercent = progress ? (progress.pointsEarned / room.points) * 100 : 0;

            return (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard hover className="h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#7C3AED]/20 rounded-lg">
                        <IconComponent className="w-6 h-6 text-[#7C3AED]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{room.name}</h4>
                        <p className="text-xs text-white/60">{room.points} Points</p>
                      </div>
                    </div>
                    <StatusBadge status={progress?.status || 'not-started'} />
                  </div>

                  <p className="text-sm text-white/70 mb-4">{room.description}</p>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2 text-sm">
                        <span className="text-white/60">Progress</span>
                        <span className="text-white font-bold">{progress?.pointsEarned || 0}/{room.points}</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {progress?.status === 'completed' ? (
                      <div className="flex items-center gap-2 text-[#22C55E] text-sm font-bold">
                        <Check className="w-4 h-4" />
                        Completed
                      </div>
                    ) : (
                      <BlockCityButton
                        variant="primary"
                        size="sm"
                        onClick={() => handleScanQR(room)}
                        className="w-full"
                      >
                        <QrCode className="w-4 h-4 inline mr-2" />
                        Scan QR
                      </BlockCityButton>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      <QRScanModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        room={selectedRoom}
      />
    </div>
  );
};