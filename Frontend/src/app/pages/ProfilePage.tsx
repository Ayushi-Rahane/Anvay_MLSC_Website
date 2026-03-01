import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { StatusBadge } from '../components/StatusBadge';
import { BlockCityButton } from '../components/BlockCityButton';
import { Trophy, Award, Clock, CheckCircle, Share2, Download } from 'lucide-react';
import { mockParticipants, rooms } from '../data/mockData';

export const ProfilePage: React.FC = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const participant = mockParticipants.find(p => p.citizenId === currentUser.citizenId) || mockParticipants[0];

  const leaderboardRank = [...mockParticipants]
    .sort((a, b) => b.totalScore - a.totalScore)
    .findIndex(p => p.citizenId === participant.citizenId) + 1;

  const getRoomTimeline = () => {
    return Object.entries(participant.roomProgress)
      .filter(([_, progress]) => progress.status !== 'not-started')
      .map(([roomId, progress]) => {
        const room = rooms.find(r => r.id === roomId);
        return { room, progress };
      })
      .sort((a, b) => {
        const timeA = a.progress.entryTime?.getTime() || 0;
        const timeB = b.progress.entryTime?.getTime() || 0;
        return timeA - timeB;
      });
  };

  const timeline = getRoomTimeline();

  return (
    <div className="p-6 space-y-6 pb-24 md:pb-6">
      {/* Profile Header */}
      <GlassCard glow>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center shadow-[0_0_40px_rgba(124,58,237,0.6)]">
            <span className="text-5xl font-black text-white">{participant.name.charAt(0)}</span>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold gradient-text mb-2">{participant.name}</h1>
            <p className="text-2xl font-mono text-[#22D3EE] mb-3">{participant.citizenId}</p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <div className="px-4 py-2 bg-[#7C3AED]/20 rounded-xl border border-[#7C3AED]/40">
                <span className="text-sm font-bold text-[#7C3AED] uppercase">{participant.role}</span>
              </div>
              <StatusBadge status={participant.tier} type="tier" />
              <div className="px-4 py-2 bg-[#FBBF24]/20 rounded-xl border border-[#FBBF24]/40">
                <span className="text-sm font-bold text-[#FBBF24]">Rank #{leaderboardRank}</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Trophy className="w-16 h-16 text-[#FBBF24] mx-auto mb-2" />
            <p className="text-sm text-white/60 mb-1">Total Score</p>
            <p className="text-4xl font-black text-[#FBBF24]">{participant.totalScore}</p>
          </div>
        </div>
      </GlassCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="text-center">
          <CheckCircle className="w-10 h-10 text-[#22C55E] mx-auto mb-3" />
          <p className="text-3xl font-bold text-white mb-1">{participant.roomsCompleted.length}</p>
          <p className="text-sm text-white/60">Rooms Completed</p>
        </GlassCard>

        <GlassCard className="text-center">
          <Trophy className="w-10 h-10 text-[#7C3AED] mx-auto mb-3" />
          <p className="text-3xl font-bold text-white mb-1">{participant.totalScore}</p>
          <p className="text-sm text-white/60">Total Points</p>
        </GlassCard>

        <GlassCard className="text-center">
          <Award className="w-10 h-10 text-[#FBBF24] mx-auto mb-3" />
          <p className="text-3xl font-bold text-white mb-1">{participant.badges.length}</p>
          <p className="text-sm text-white/60">Badges Earned</p>
        </GlassCard>

        <GlassCard className="text-center">
          <Clock className="w-10 h-10 text-[#22D3EE] mx-auto mb-3" />
          <p className="text-3xl font-bold text-white mb-1">{participant.tier}</p>
          <p className="text-sm text-white/60">Current Tier</p>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievement Badges */}
        <GlassCard>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Award className="w-7 h-7 text-[#FBBF24]" />
            Achievement Badges
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {participant.badges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gradient-to-br from-[#7C3AED]/20 to-[#EC4899]/20 rounded-xl border border-[#7C3AED]/40 text-center hover:scale-105 transition-transform cursor-pointer"
              >
                <Award className="w-12 h-12 text-[#FBBF24] mx-auto mb-3" />
                <p className="font-bold text-white">{badge}</p>
                <p className="text-xs text-white/60 mt-1">Unlocked</p>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* NFT Certificate Preview */}
        <GlassCard>
          <h2 className="text-2xl font-bold text-white mb-6">NFT Certificate</h2>
          <div className="relative aspect-[4/3] bg-gradient-to-br from-[#7C3AED]/20 to-[#EC4899]/20 rounded-xl border-2 border-[#7C3AED]/60 p-8 flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-[#7C3AED] rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#EC4899] rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10 text-center">
              <h3 className="text-3xl font-bold gradient-text mb-3">ANVAY</h3>
              <p className="text-lg text-white mb-2">BlockCity Edition</p>
              <p className="text-sm text-white/60 mb-4">Certificate of Participation</p>
              <div className="p-3 bg-black/30 rounded-lg mb-4">
                <p className="font-mono text-[#22D3EE]">{participant.citizenId}</p>
              </div>
              <p className="text-xs text-white/50">Microsoft Learn Student Chapter CCEW</p>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <BlockCityButton variant="primary" size="sm" className="flex-1">
              <Download className="w-4 h-4 inline mr-2" />
              Download
            </BlockCityButton>
            <BlockCityButton variant="secondary" size="sm" className="flex-1">
              <Share2 className="w-4 h-4 inline mr-2" />
              Share on LinkedIn
            </BlockCityButton>
          </div>
        </GlassCard>
      </div>

      {/* Activity Timeline */}
      <GlassCard>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Clock className="w-7 h-7 text-[#22D3EE]" />
          Activity Timeline
        </h2>
        <div className="space-y-4">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 relative"
            >
              {index < timeline.length - 1 && (
                <div className="absolute left-[23px] top-12 w-0.5 h-full bg-[#7C3AED]/30"></div>
              )}
              
              <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                item.progress.status === 'completed'
                  ? 'bg-[#22C55E]/20 border-2 border-[#22C55E]'
                  : 'bg-[#FBBF24]/20 border-2 border-[#FBBF24]'
              }`}>
                {item.progress.status === 'completed' ? (
                  <CheckCircle className="w-6 h-6 text-[#22C55E]" />
                ) : (
                  <Clock className="w-6 h-6 text-[#FBBF24]" />
                )}
              </div>

              <div className="flex-1 pb-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-lg font-bold text-white">{item.room?.name}</h4>
                    <StatusBadge status={item.progress.status} />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#FBBF24]">+{item.progress.pointsEarned}</p>
                    <p className="text-xs text-white/60">Points</p>
                  </div>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-white/70">
                    <span className="text-white/50">Entry:</span>{' '}
                    {item.progress.entryTime?.toLocaleString('en-IN', { 
                      dateStyle: 'medium', 
                      timeStyle: 'short' 
                    })}
                  </p>
                  {item.progress.completionTime && (
                    <p className="text-white/70">
                      <span className="text-white/50">Completed:</span>{' '}
                      {item.progress.completionTime.toLocaleString('en-IN', { 
                        dateStyle: 'medium', 
                        timeStyle: 'short' 
                      })}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};