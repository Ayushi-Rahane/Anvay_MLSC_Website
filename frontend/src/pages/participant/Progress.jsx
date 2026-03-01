import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useParticipant } from '../../context/ParticipantContext';
import StampCard from '../../components/participant/StampCard';
import DNABadgePreview from '../../components/participant/DNABadgePreview';
import RoleCard from '../../components/participant/RoleCard';

const POINT_BREAKDOWN = [
    { label: 'Explorer (×rooms)', perRoom: 10, tier: 'explorer', color: '#34d399' },
    { label: 'Builder (×rooms)', perRoom: 15, tier: 'builder', color: '#F9A24D' },
    { label: 'Architect (×rooms)', perRoom: 20, tier: 'architect', color: '#ef4444' },
    { label: 'Final Integration', flat: 20, color: '#c084fc' },
];

const Progress = () => {
    const navigate = useNavigate();
    const {
        participantName, teamName, role, walletAddress,
        roomProgress, totalPoints, roomsCompleted, highestTier,
        integrationComplete, bonusPoints, firstRoomEntered,
        ROOMS_META,
    } = useParticipant();

    const shortAddress = walletAddress
        ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
        : '—';

    // Build points breakdown
    const roomPointsBreakdown = ROOMS_META.map(room => {
        const tier = roomProgress[room.id];
        if (!tier) return null;
        const pts = tier === 'explorer' ? 10 : tier === 'builder' ? 15 : 20;
        return { room: room.name, tier, pts, color: room.color };
    }).filter(Boolean);

    const maxPoints = 140;
    const progressPercent = Math.min((totalPoints / maxPoints) * 100, 100);

    return (
        <div className="min-h-screen bg-primary pb-16">
            {/* Header */}
            <div
                className="px-4 pt-6 pb-8 border-b"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
            >
                <div className="max-w-3xl mx-auto">
                    <button
                        onClick={() => navigate('/participant/dashboard')}
                        className="flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors text-sm mb-4"
                    >
                        <ChevronLeft size={16} />
                        Back to Dashboard
                    </button>
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Journey Progress</p>
                            <h1 className="text-3xl font-heading font-bold text-white">{participantName || 'Citizen'}</h1>
                            <p className="text-gray-500 text-sm mt-1">🏘️ {teamName || 'Solo'} · {shortAddress}</p>
                        </div>
                        <div
                            className="rounded-2xl px-5 py-4 text-center"
                            style={{
                                background: 'linear-gradient(135deg, rgba(249,162,77,0.12), rgba(255,107,53,0.08))',
                                border: '1px solid rgba(249,162,77,0.25)',
                            }}
                        >
                            <p className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">Total Score</p>
                            <p className="text-3xl font-heading font-bold" style={{ color: '#F9A24D' }}>{totalPoints}</p>
                            <p className="text-[9px] text-gray-600">/ {maxPoints} pts max</p>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-5">
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] text-gray-500">Score progress</span>
                            <span className="text-[10px] font-bold" style={{ color: '#F9A24D' }}>{progressPercent.toFixed(0)}%</span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                            <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{
                                    width: `${progressPercent}%`,
                                    background: 'linear-gradient(90deg, #F9A24D, #ff6b35)',
                                    boxShadow: '0 0 8px rgba(249,162,77,0.4)',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 mt-8 space-y-8">
                {/* Room Stamps */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">
                            Room Stamps ({roomsCompleted}/5)
                        </h2>
                        <span className="text-xs" style={{ color: highestTier === 'Architect' ? '#ef4444' : highestTier === 'Builder' ? '#F9A24D' : '#34d399' }}>
                            Highest: {highestTier || 'None'}
                        </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {ROOMS_META.map(room => (
                            <Link
                                key={room.id}
                                to={`/participant/room/${room.id}`}
                                className="block group"
                            >
                                <div className="relative">
                                    <StampCard
                                        room={room}
                                        tier={roomProgress[room.id]}
                                        roomNumber={room.number}
                                    />
                                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ChevronRight size={12} className="text-gray-500" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Points breakdown */}
                <section>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Points Breakdown</h2>
                    <div
                        className="rounded-xl border overflow-hidden"
                        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                    >
                        {roomPointsBreakdown.length === 0 && !integrationComplete && bonusPoints === 0 ? (
                            <div className="px-5 py-8 text-center">
                                <p className="text-gray-600 text-sm">No points yet — complete rooms to earn points</p>
                            </div>
                        ) : (
                            <table className="w-full text-sm">
                                <thead>
                                    <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                        <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-gray-500">Source</th>
                                        <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-gray-500">Tier</th>
                                        <th className="text-right px-4 py-3 text-[10px] uppercase tracking-widest text-gray-500">Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roomPointsBreakdown.map((row, i) => (
                                        <tr
                                            key={i}
                                            style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                                        >
                                            <td className="px-4 py-3 text-gray-300 text-xs">{row.room}</td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full"
                                                    style={{ color: row.color, background: `${row.color}15`, border: `1px solid ${row.color}30` }}
                                                >
                                                    {row.tier}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right font-heading font-bold" style={{ color: row.color }}>+{row.pts}</td>
                                        </tr>
                                    ))}
                                    {integrationComplete && (
                                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                            <td className="px-4 py-3 text-gray-300 text-xs">Final Integration</td>
                                            <td className="px-4 py-3">
                                                <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full text-purple-400" style={{ background: 'rgba(192,132,252,0.1)', border: '1px solid rgba(192,132,252,0.2)' }}>
                                                    complete
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right font-heading font-bold text-purple-400">+20</td>
                                        </tr>
                                    )}
                                    {bonusPoints > 0 && (
                                        <tr>
                                            <td className="px-4 py-3 text-gray-300 text-xs">Bonus Points</td>
                                            <td className="px-4 py-3" />
                                            <td className="px-4 py-3 text-right font-heading font-bold text-yellow-400">+{bonusPoints}</td>
                                        </tr>
                                    )}
                                    <tr style={{ background: 'rgba(249,162,77,0.04)', borderTop: '1px solid rgba(249,162,77,0.15)' }}>
                                        <td className="px-4 py-3 text-white font-bold text-sm" colSpan={2}>Total</td>
                                        <td className="px-4 py-3 text-right font-heading font-bold text-xl" style={{ color: '#F9A24D' }}>{totalPoints}</td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </div>
                </section>

                {/* Role Card */}
                <section>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Your Role Card</h2>
                    <div className="max-w-sm">
                        <RoleCard role={role} readonly />
                    </div>
                </section>

                {/* DNA Badge */}
                <section>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Your DNA Badge (NFT Metadata)</h2>
                    <DNABadgePreview
                        participantName={participantName}
                        role={role}
                        roomProgress={roomProgress}
                        highestTier={highestTier}
                        teamName={teamName}
                        roomsCompleted={roomsCompleted}
                        firstRoomEntered={firstRoomEntered}
                        ROOMS_META={ROOMS_META}
                    />
                </section>
            </div>
        </div>
    );
};

export default Progress;