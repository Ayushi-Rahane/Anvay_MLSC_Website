import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { StatusBadge } from '../components/StatusBadge';
import { BlockCityInput } from '../components/BlockCityInput';
import { Trophy, Medal, Award, Search, Filter } from 'lucide-react';
import { mockParticipants, rooms } from '../data/mockData';

export const LeaderboardPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTier, setFilterTier] = useState('All');
  const [animatedScores, setAnimatedScores] = useState<{[key: string]: number}>({});

  const sortedParticipants = [...mockParticipants]
    .sort((a, b) => b.totalScore - a.totalScore);

  const filteredParticipants = sortedParticipants.filter(p => {
    const matchesSearch = p.citizenId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = filterTier === 'All' || p.tier === filterTier;
    return matchesSearch && matchesTier;
  });

  useEffect(() => {
    // Animate scores counting up
    const initialScores: {[key: string]: number} = {};
    filteredParticipants.forEach(p => {
      initialScores[p.citizenId] = 0;
    });
    setAnimatedScores(initialScores);

    const timer = setTimeout(() => {
      const finalScores: {[key: string]: number} = {};
      filteredParticipants.forEach(p => {
        finalScores[p.citizenId] = p.totalScore;
      });
      setAnimatedScores(finalScores);
    }, 100);

    return () => clearTimeout(timer);
  }, [filterTier, searchQuery]);

  const topThree = filteredParticipants.slice(0, 3);
  const restOfParticipants = filteredParticipants.slice(3);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-[#FBBF24]" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />;
    if (rank === 3) return <Award className="w-6 h-6 text-[#CD7F32]" />;
    return null;
  };

  const getPodiumHeight = (rank: number) => {
    if (rank === 1) return 'h-48';
    if (rank === 2) return 'h-40';
    if (rank === 3) return 'h-32';
    return 'h-24';
  };

  return (
    <div className="p-6 space-y-6 pb-24 md:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">BlockCity Leaderboard</h1>
          <div className="flex items-center gap-2 text-[#22C55E]">
            <span className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold">Live Updates</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Citizen ID or Name..."
            className="w-full pl-12 pr-4 py-3 bg-white/5 border-2 border-[#7C3AED]/40 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#7C3AED] focus:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all duration-300"
          />
        </div>

        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-white/60" />
          <select
            value={filterTier}
            onChange={(e) => setFilterTier(e.target.value)}
            className="flex-1 px-4 py-3 bg-white/5 border-2 border-[#7C3AED]/40 rounded-xl text-white focus:outline-none focus:border-[#7C3AED] focus:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all duration-300"
          >
            <option value="All">All Tiers</option>
            <option value="Architect">Architect</option>
            <option value="Builder">Builder</option>
            <option value="Explorer">Explorer</option>
          </select>
        </div>
      </div>

      {/* Top 3 Podium */}
      <GlassCard glow>
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Top Performers</h2>
        <div className="flex items-end justify-center gap-4 mb-8">
          {topThree.length >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1 max-w-[200px]"
            >
              <GlassCard className={`${getPodiumHeight(2)} flex flex-col items-center justify-end p-4 bg-gradient-to-t from-gray-300/20 to-transparent`}>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(192,192,192,0.5)]">
                  <span className="text-2xl font-black text-gray-900">2</span>
                </div>
                <p className="font-mono font-bold text-white text-center mb-1">{topThree[1].citizenId}</p>
                <p className="text-sm text-white/60 mb-2">{topThree[1].name}</p>
                <StatusBadge status={topThree[1].tier} type="tier" className="mb-2" />
                <p className="text-2xl font-black text-[#FBBF24]">{topThree[1].totalScore}</p>
              </GlassCard>
            </motion.div>
          )}

          {topThree.length >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex-1 max-w-[200px]"
            >
              <GlassCard className={`${getPodiumHeight(1)} flex flex-col items-center justify-end p-4 bg-gradient-to-t from-[#FBBF24]/20 to-transparent border-2 border-[#FBBF24]/60`}>
                <Trophy className="w-12 h-12 text-[#FBBF24] mb-3 animate-pulse" />
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FBBF24] to-[#F59E0B] flex items-center justify-center mb-3 shadow-[0_0_30px_rgba(251,191,36,0.7)]">
                  <span className="text-3xl font-black text-black">1</span>
                </div>
                <p className="font-mono font-bold text-white text-center mb-1">{topThree[0].citizenId}</p>
                <p className="text-sm text-white/60 mb-2">{topThree[0].name}</p>
                <StatusBadge status={topThree[0].tier} type="tier" className="mb-2" />
                <p className="text-3xl font-black text-[#FBBF24]">{topThree[0].totalScore}</p>
              </GlassCard>
            </motion.div>
          )}

          {topThree.length >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1 max-w-[200px]"
            >
              <GlassCard className={`${getPodiumHeight(3)} flex flex-col items-center justify-end p-4 bg-gradient-to-t from-[#CD7F32]/20 to-transparent`}>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#CD7F32] to-[#8B4513] flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(205,127,50,0.5)]">
                  <span className="text-2xl font-black text-white">3</span>
                </div>
                <p className="font-mono font-bold text-white text-center mb-1">{topThree[2].citizenId}</p>
                <p className="text-sm text-white/60 mb-2">{topThree[2].name}</p>
                <StatusBadge status={topThree[2].tier} type="tier" className="mb-2" />
                <p className="text-2xl font-black text-[#FBBF24]">{topThree[2].totalScore}</p>
              </GlassCard>
            </motion.div>
          )}
        </div>
      </GlassCard>

      {/* Full Leaderboard Table */}
      <GlassCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-4 text-white/60 font-bold uppercase text-sm">Rank</th>
                <th className="text-left py-4 px-4 text-white/60 font-bold uppercase text-sm">Citizen ID</th>
                <th className="text-left py-4 px-4 text-white/60 font-bold uppercase text-sm">Name</th>
                <th className="text-left py-4 px-4 text-white/60 font-bold uppercase text-sm">Total Points</th>
                <th className="text-left py-4 px-4 text-white/60 font-bold uppercase text-sm">Tier</th>
                <th className="text-left py-4 px-4 text-white/60 font-bold uppercase text-sm">Current Room</th>
                <th className="text-left py-4 px-4 text-white/60 font-bold uppercase text-sm">Badges</th>
              </tr>
            </thead>
            <tbody>
              {filteredParticipants.map((participant, index) => {
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
                      <div className="flex items-center gap-2">
                        {getRankIcon(index + 1)}
                        <span className="font-mono font-bold text-xl text-white">{index + 1}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-mono font-bold text-[#22D3EE]">{participant.citizenId}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-white font-semibold">{participant.name}</p>
                      <p className="text-sm text-white/60">{participant.role}</p>
                    </td>
                    <td className="py-4 px-4">
                      <motion.p
                        className="text-2xl font-bold text-[#FBBF24] font-mono"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {animatedScores[participant.citizenId] || participant.totalScore}
                      </motion.p>
                    </td>
                    <td className="py-4 px-4">
                      <StatusBadge status={participant.tier} type="tier" />
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-white/70">{currentRoom}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-1">
                        {participant.badges.slice(0, 3).map((badge, i) => (
                          <Award key={i} className="w-5 h-5 text-[#FBBF24]" />
                        ))}
                        {participant.badges.length > 3 && (
                          <span className="text-xs text-white/60">+{participant.badges.length - 3}</span>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};