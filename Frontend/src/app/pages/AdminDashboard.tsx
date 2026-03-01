import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { GlassCard } from '../components/GlassCard';
import { BlockCityButton } from '../components/BlockCityButton';
import { StatusBadge } from '../components/StatusBadge';
import { Users, Activity, Building2, TrendingUp, Edit, Trash2, Trophy, Eye, CheckCircle } from 'lucide-react';
import { mockParticipants, adminStats, rooms } from '../data/mockData';
import { ManualScoreModal } from '../components/ManualScoreModal';

export const AdminDashboard: React.FC = () => {
  const [scoreModalOpen, setScoreModalOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<any>(null);

  const handleEditScore = (participant: any) => {
    setSelectedParticipant(participant);
    setScoreModalOpen(true);
  };

  const handleDeclareWinner = () => {
    // Trigger confetti animation
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#7C3AED', '#EC4899', '#22D3EE', '#FBBF24']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#7C3AED', '#EC4899', '#22D3EE', '#FBBF24']
      });
    }, 250);
  };

  const getRoomOccupancy = (roomId: string) => {
    return mockParticipants.filter(p => p.currentRoom === roomId).length;
  };

  const getRoomCompletions = (roomId: string) => {
    return mockParticipants.filter(p => p.roomsCompleted.includes(roomId)).length;
  };

  return (
    <div className="p-6 space-y-6 pb-24 md:pb-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="border-2 border-[#7C3AED]/40">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#7C3AED]/20 rounded-xl">
              <Users className="w-8 h-8 text-[#7C3AED]" />
            </div>
            <div>
              <p className="text-sm text-white/60">Total Participants</p>
              <p className="text-3xl font-bold text-white">{adminStats.totalParticipants}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="border-2 border-[#22C55E]/40">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#22C55E]/20 rounded-xl">
              <Activity className="w-8 h-8 text-[#22C55E] animate-pulse" />
            </div>
            <div>
              <p className="text-sm text-white/60">Active Now</p>
              <p className="text-3xl font-bold text-white">{adminStats.activeNow}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="border-2 border-[#22D3EE]/40">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#22D3EE]/20 rounded-xl">
              <Building2 className="w-8 h-8 text-[#22D3EE]" />
            </div>
            <div>
              <p className="text-sm text-white/60">Rooms Occupied</p>
              <p className="text-3xl font-bold text-white">{adminStats.roomsOccupied}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="border-2 border-[#FBBF24]/40">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#FBBF24]/20 rounded-xl">
              <TrendingUp className="w-8 h-8 text-[#FBBF24]" />
            </div>
            <div>
              <p className="text-sm text-white/60">Total Transactions</p>
              <p className="text-3xl font-bold text-white">{adminStats.totalTransactions}</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Room Monitoring */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Room Monitoring</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room, index) => {
            const occupancy = getRoomOccupancy(room.id);
            const completions = getRoomCompletions(room.id);
            const avgScore = completions > 0 ? Math.round((completions * room.points) / mockParticipants.length) : 0;

            return (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="border-2 border-[#7C3AED]/40">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">{room.name}</h3>
                    <div className="px-3 py-1 bg-[#22C55E]/20 rounded-full border border-[#22C55E]/40">
                      <span className="text-xs font-bold text-[#22C55E]">OPEN</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-sm text-white/70">Inside Now</span>
                      <span className="text-xl font-bold text-[#22D3EE]">{occupancy}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-sm text-white/70">Completed</span>
                      <span className="text-xl font-bold text-[#22C55E]">{completions}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <span className="text-sm text-white/70">Avg Score</span>
                      <span className="text-xl font-bold text-[#FBBF24]">{avgScore}</span>
                    </div>
                  </div>

                  <BlockCityButton
                    variant="danger"
                    size="sm"
                    className="w-full mt-4"
                  >
                    Close Room
                  </BlockCityButton>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Participants Table */}
      <GlassCard>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Participants Management</h2>
          <div className="flex items-center gap-2 text-[#22C55E]">
            <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold">Live</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-4 text-white/60 font-bold uppercase text-xs">Citizen ID</th>
                <th className="text-left py-4 px-4 text-white/60 font-bold uppercase text-xs">Name</th>
                <th className="text-left py-4 px-4 text-white/60 font-bold uppercase text-xs">Role</th>
                <th className="text-left py-4 px-4 text-white/60 font-bold uppercase text-xs">Score</th>
                <th className="text-left py-4 px-4 text-white/60 font-bold uppercase text-xs">Current Room</th>
                <th className="text-left py-4 px-4 text-white/60 font-bold uppercase text-xs">Tier</th>
                <th className="text-left py-4 px-4 text-white/60 font-bold uppercase text-xs">Status</th>
                <th className="text-left py-4 px-4 text-white/60 font-bold uppercase text-xs">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockParticipants.slice(0, 8).map((participant, index) => {
                const currentRoom = participant.currentRoom 
                  ? rooms.find(r => r.id === participant.currentRoom)?.name 
                  : 'None';

                return (
                  <motion.tr
                    key={participant.citizenId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <p className="font-mono font-bold text-[#22D3EE]">{participant.citizenId}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-white font-semibold">{participant.name}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-white/70">{participant.role}</span>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-xl font-bold text-[#FBBF24] font-mono">{participant.totalScore}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-white/70">{currentRoom}</p>
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge status={participant.tier} type="tier" />
                    </td>
                    <td className="py-4 px-4">
                      {participant.currentRoom ? (
                        <span className="flex items-center gap-1 text-[#22C55E] text-sm">
                          <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></span>
                          Active
                        </span>
                      ) : (
                        <span className="text-white/50 text-sm">Idle</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button
                          className="p-2 bg-[#7C3AED]/20 rounded-lg hover:bg-[#7C3AED]/40 transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4 text-[#7C3AED]" />
                        </button>
                        <button
                          onClick={() => handleEditScore(participant)}
                          className="p-2 bg-[#22D3EE]/20 rounded-lg hover:bg-[#22D3EE]/40 transition-colors"
                          title="Edit Score"
                        >
                          <Edit className="w-4 h-4 text-[#22D3EE]" />
                        </button>
                        <button
                          className="p-2 bg-[#EF4444]/20 rounded-lg hover:bg-[#EF4444]/40 transition-colors"
                          title="Disqualify"
                        >
                          <Trash2 className="w-4 h-4 text-[#EF4444]" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Winner Selection */}
      <GlassCard className="border-2 border-[#FBBF24]/60">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Winner Selection</h2>
            <p className="text-white/70">
              Current Leader: <span className="font-mono font-bold text-[#FBBF24]">{mockParticipants[0].citizenId}</span>
              {' '}with {mockParticipants[0].totalScore} points
            </p>
          </div>
          <BlockCityButton variant="success" size="lg" onClick={handleDeclareWinner}>
            <Trophy className="w-5 h-5 inline mr-2" />
            Declare Winner
          </BlockCityButton>
        </div>
      </GlassCard>

      <ManualScoreModal
        isOpen={scoreModalOpen}
        onClose={() => setScoreModalOpen(false)}
        participant={selectedParticipant}
      />
    </div>
  );
};