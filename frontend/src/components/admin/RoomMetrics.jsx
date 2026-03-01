import React from 'react';
import { BarChart3, Users, Target, Award, Layers, DoorOpen } from 'lucide-react';

const RoomMetrics = ({ room }) => {
    const total = room.totalParticipants || 0;
    const capacity = room.capacity || 0;
    const completed = room.completedCount || 0;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    const metrics = {
        totalParticipants: total,
        capacity: capacity,
        completedThisRoom: completed,
        completionRate,
        topPerformer: { name: 'Priya Sharma', points: 50 },
        tierDistribution: {
            Explorer: 20,
            Builder: 15,
            Architect: 10,
        },
    };

    const totalTier = metrics.tierDistribution.Explorer + metrics.tierDistribution.Builder + metrics.tierDistribution.Architect;

    return (
        <div className="space-y-4">
            {/* Title */}
            <h3
                className="text-xl font-bold flex items-center gap-2 uppercase tracking-wider"
                style={{ fontFamily: "'Orbitron', sans-serif", color: room.color }}
            >
                <BarChart3 size={18} />
                Room Metrics
            </h3>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-secondary/60 border border-gray-700/50 rounded-xl p-4">
                    <p className="text-gray-500 text-xs uppercase tracking-wider flex items-center gap-1">
                        <Users size={12} /> Participants
                    </p>
                    <p className="text-white font-bold text-2xl mt-1">{metrics.totalParticipants}</p>
                </div>
                <div className="bg-secondary/60 border border-gray-700/50 rounded-xl p-4">
                    <p className="text-gray-500 text-xs uppercase tracking-wider flex items-center gap-1">
                        <DoorOpen size={12} /> Capacity
                    </p>
                    <p className="text-cyan-400 font-bold text-2xl mt-1">{metrics.capacity}</p>
                </div>
                <div className="bg-secondary/60 border border-gray-700/50 rounded-xl p-4">
                    <p className="text-gray-500 text-xs uppercase tracking-wider flex items-center gap-1">
                        <Target size={12} /> Completed
                    </p>
                    <p className="font-bold text-2xl mt-1" style={{ color: room.color }}>{metrics.completedThisRoom}</p>
                </div>
                <div className="bg-secondary/60 border border-gray-700/50 rounded-xl p-4">
                    <p className="text-gray-500 text-xs uppercase tracking-wider">Fill Rate</p>
                    <p className="text-white font-bold text-2xl mt-1">
                        {capacity > 0 ? Math.round((total / capacity) * 100) : 0}%
                    </p>
                </div>
            </div>

            {/* Completion Rate */}
            <div className="bg-secondary/60 border border-gray-700/50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-500 text-xs uppercase tracking-wider">Completion Rate</p>
                    <p className="text-white font-bold">{metrics.completionRate}%</p>
                </div>
                <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                            width: `${metrics.completionRate}%`,
                            background: `linear-gradient(90deg, ${room.color}80, ${room.color})`,
                        }}
                    />
                </div>
            </div>

            {/* Top Performer */}
            <div className="bg-secondary/60 border border-gray-700/50 rounded-xl p-4">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Award size={12} className="text-yellow-400" /> Top Performer
                </p>
                <div className="flex items-center justify-between">
                    <p className="text-white font-semibold">{metrics.topPerformer.name}</p>
                    <span className="text-highlight font-bold">{metrics.topPerformer.points} pts</span>
                </div>
            </div>

            {/* Tier Distribution */}
            <div className="bg-secondary/60 border border-gray-700/50 rounded-xl p-4">
                <p className="text-gray-500 text-xs uppercase tracking-wider mb-3 flex items-center gap-1">
                    <Layers size={12} /> Tier Distribution
                </p>
                <div className="space-y-3">
                    {Object.entries(metrics.tierDistribution).map(([tier, count]) => {
                        const percentage = Math.round((count / totalTier) * 100);
                        const colors = {
                            Explorer: { bar: '#cd7f32', text: 'text-orange-400' },
                            Builder: { bar: '#c0c0c0', text: 'text-gray-300' },
                            Architect: { bar: '#ffd700', text: 'text-yellow-400' },
                        };
                        const c = colors[tier] || { bar: '#666', text: 'text-gray-400' };

                        return (
                            <div key={tier}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className={`text-sm font-medium ${c.text}`}>{tier}</span>
                                    <span className="text-gray-400 text-xs">{count} ({percentage}%)</span>
                                </div>
                                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{ width: `${percentage}%`, backgroundColor: c.bar }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default RoomMetrics;
