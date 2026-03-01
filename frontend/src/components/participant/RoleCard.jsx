import React, { useState } from 'react';

const RoleCard = ({ role, onAssignRandom, readonly = false }) => {
    const [flipped, setFlipped] = useState(false);

    if (!role) {
        return (
            <div
                className="rounded-2xl border-2 border-dashed border-white/20 p-8 text-center cursor-pointer hover:border-[#F9A24D]/40 transition-all duration-300 group"
                onClick={onAssignRandom}
                style={{ background: 'rgba(255,255,255,0.02)' }}
            >
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">🎴</div>
                <p className="text-gray-400 text-sm font-body">Draw your Role Card</p>
                <p className="text-gray-600 text-xs mt-1">Click to reveal your destiny</p>
            </div>
        );
    }

    return (
        <div
            className="relative cursor-pointer select-none"
            style={{ perspective: '1000px' }}
            onClick={() => !readonly && setFlipped(f => !f)}
        >
            <div
                className="relative w-full transition-all duration-700"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    minHeight: '180px',
                }}
            >
                {/* Front */}
                <div
                    className="absolute inset-0 rounded-2xl p-5 border"
                    style={{
                        backfaceVisibility: 'hidden',
                        background: `linear-gradient(135deg, rgba(10,10,26,0.95), ${role.color}15)`,
                        borderColor: `${role.color}50`,
                        boxShadow: `0 0 30px ${role.color}20, inset 0 0 40px ${role.color}05`,
                    }}
                >
                    {/* Scan-line effect */}
                    <div
                        className="absolute inset-0 rounded-2xl pointer-events-none opacity-5"
                        style={{
                            background: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${role.color}30 3px, ${role.color}30 4px)`,
                        }}
                    />
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-3xl">{role.emoji}</span>
                            <span
                                className="text-[10px] font-bold tracking-[0.2em] uppercase px-2 py-1 rounded-full"
                                style={{ color: role.color, border: `1px solid ${role.color}40`, background: `${role.color}10` }}
                            >
                                ROLE CARD
                            </span>
                        </div>
                        <h3
                            className="text-xl font-heading font-bold mb-1"
                            style={{ color: role.color }}
                        >
                            {role.label}
                        </h3>
                        <p className="text-gray-400 text-xs leading-relaxed">{role.power}</p>
                        {!readonly && (
                            <p className="text-gray-600 text-[10px] mt-3">Tap to see bonus →</p>
                        )}
                    </div>
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 rounded-2xl p-5 border flex flex-col justify-center items-center text-center"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        background: `linear-gradient(135deg, ${role.color}20, rgba(10,10,26,0.95))`,
                        borderColor: `${role.color}50`,
                        boxShadow: `0 0 30px ${role.color}30`,
                    }}
                >
                    <span className="text-4xl mb-2">⚡</span>
                    <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-1">Bonus Points</p>
                    <p className="text-white text-sm font-medium leading-relaxed">{role.bonus}</p>
                </div>
            </div>
        </div>
    );
};

export default RoleCard;