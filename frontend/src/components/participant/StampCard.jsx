import React from 'react';
import { CheckCircle, Lock, Circle } from 'lucide-react';

const TIER_CONFIG = {
    explorer: { label: 'Explorer', color: '#34d399', points: 10, emoji: '🌱' },
    builder: { label: 'Builder', color: '#F9A24D', points: 15, emoji: '🟡' },
    architect: { label: 'Architect', color: '#ef4444', points: 20, emoji: '🔴' },
};

const StampCard = ({ room, tier, roomNumber }) => {
    const isCompleted = !!tier;
    const tierConfig = tier ? TIER_CONFIG[tier] : null;

    return (
        <div
            className="relative rounded-xl border p-4 transition-all duration-300 overflow-hidden"
            style={{
                background: isCompleted
                    ? `linear-gradient(135deg, rgba(10,10,26,0.95), ${room.color}10)`
                    : 'rgba(255,255,255,0.02)',
                borderColor: isCompleted ? `${room.color}50` : 'rgba(255,255,255,0.08)',
                boxShadow: isCompleted ? `0 0 20px ${room.color}15` : 'none',
            }}
        >
            {/* Completed stamp overlay */}
            {isCompleted && (
                <div
                    className="absolute top-2 right-2 opacity-10 rotate-[-15deg] pointer-events-none"
                    style={{ fontSize: '64px', lineHeight: 1 }}
                >
                    ✓
                </div>
            )}

            <div className="relative z-10 flex items-start gap-3">
                {/* Room number badge */}
                <div
                    className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-lg font-heading font-bold"
                    style={{
                        background: isCompleted ? `${room.color}20` : 'rgba(255,255,255,0.05)',
                        border: `1.5px solid ${isCompleted ? room.color + '60' : 'rgba(255,255,255,0.1)'}`,
                        color: isCompleted ? room.color : '#4b5563',
                    }}
                >
                    {roomNumber}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                        <h4
                            className="text-sm font-heading font-bold truncate"
                            style={{ color: isCompleted ? '#fff' : '#6b7280' }}
                        >
                            {room.icon} {room.name}
                        </h4>
                        {isCompleted ? (
                            <CheckCircle size={16} style={{ color: room.color, flexShrink: 0 }} />
                        ) : (
                            <Circle size={16} className="text-gray-700 flex-shrink-0" />
                        )}
                    </div>

                    {isCompleted && tierConfig ? (
                        <div className="flex items-center gap-2 mt-1.5">
                            <span
                                className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full uppercase"
                                style={{
                                    color: tierConfig.color,
                                    background: `${tierConfig.color}15`,
                                    border: `1px solid ${tierConfig.color}30`,
                                }}
                            >
                                {tierConfig.emoji} {tierConfig.label}
                            </span>
                            <span className="text-[10px] text-gray-500">+{tierConfig.points} pts</span>
                        </div>
                    ) : (
                        <p className="text-[10px] text-gray-600 mt-1">Not completed</p>
                    )}

                    {/* Entry phrase hint */}
                    <p className="text-[10px] text-gray-600 mt-1 font-mono">
                        Say: <span style={{ color: isCompleted ? room.color + 'aa' : '#374151' }}>"{room.entryPhrase}"</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default StampCard;