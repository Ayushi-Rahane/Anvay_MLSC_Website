import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Copy, CheckCircle, User, Shield, Star, Clock, Pickaxe, Search, Coins, Landmark, Handshake, Home, Award, Zap, Trophy } from 'lucide-react';
import { useParticipant } from '../../context/ParticipantContext';

const TIER_COLORS = {
    Explorer: '#34d399',
    Builder: '#F9A24D',
    Architect: '#ef4444',
    '—': '#6b7280',
};

const ROLE_CONFIG = {
    Miner: { icon: Pickaxe, color: '#f59e0b', power: 'Submit any transaction first in a room', bonus: '+5 per first tx (max 3)' },
    Auditor: { icon: Search, color: '#06b6d4', power: 'Find bugs in other teams\' contracts', bonus: '+5 per verified bug found' },
    Investor: { icon: Coins, color: '#10b981', power: 'Stake points on another team', bonus: '+10 if that team wins Best Integration' },
    Governor: { icon: Landmark, color: '#8b5cf6', power: 'Create first Room 4 proposal + cast deciding vote', bonus: '+8 first proposal, +5 deciding vote' },
    Ambassador: { icon: Handshake, color: '#f472b6', power: 'Help stuck teammates complete rooms', bonus: '+5 per teammate helped (mentor verified)' },
};
const BADGE_ICONS = { '⚡': Zap, '🤝': Handshake, 'zap': Zap, 'handshake': Handshake };

const Section = ({ title, children }) => (
    <div>
        <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#F9A24D' }}>
            {title}
        </h2>
        {children}
    </div>
);

const ParticipantProfile = () => {
    const navigate = useNavigate();
    const {
        participant, citizenId, name, team, role,
        totalScore, roomsCompleted, currentTier, currentRoom,
        badges, rooms,
    } = useParticipant();

    const [copied, setCopied] = useState(false);


    useEffect(() => {
        if (!participant) navigate('/participant');
    }, [participant, navigate]);

    if (!participant) return null;

    const tierColor = TIER_COLORS[currentTier] || '#6b7280';
    const roleConfig = ROLE_CONFIG[role] || { icon: Pickaxe, color: '#6b7280', power: '—', bonus: '—' };
    const RoleIcon = roleConfig.icon;

    // DNA Badge metadata



    const copyId = () => {
        navigator.clipboard.writeText(citizenId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };



    // Points breakdown from rooms
    const roomPoints = rooms
        .filter(r => r.completed || r.inProgress)
        .map(r => ({
            name: r.name,
            tier: r.tier || (r.completed ? 'Explorer' : '—'),
            pts: r.earnedPoints ?? (r.completed ? 10 : 0),
            color: r.completed ? '#34d399' : '#F9A24D',
        }));

    return (
        <div className="min-h-screen pb-16" style={{ background: '#0a0a1a' }}>
            {/* Header */}
            <div
                className="px-4 pt-6 pb-10 relative overflow-hidden"
                style={{
                    background: 'linear-gradient(180deg, rgba(249,162,77,0.07) 0%, transparent 100%)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
            >
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(249,162,77,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(249,162,77,0.8) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                    }}
                />
                <div className="max-w-3xl mx-auto relative z-10">
                    <button
                        onClick={() => navigate('/participant/dashboard')}
                        className="flex items-center gap-1.5 text-sm mb-5 transition-colors hover:text-white"
                        style={{ color: '#6b7280' }}
                    >
                        <ChevronLeft size={16} /> Back to Dashboard
                    </button>

                    <div className="flex items-start gap-5 flex-wrap">
                        {/* Avatar */}
                        <div
                            className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                            style={{
                                background: `linear-gradient(135deg, ${roleConfig.color}20, rgba(10,10,26,0.8))`,
                                border: `2px solid ${roleConfig.color}40`,
                                boxShadow: `0 0 30px ${roleConfig.color}20`,
                            }}
                        >
                            <RoleIcon size={36} style={{ color: roleConfig.color }} />
                        </div>

                        <div className="flex-1">
                            <h1 className="text-3xl font-heading font-bold text-white">{name || citizenId}</h1>
                            {team && <p className="text-gray-500 text-sm mt-1 flex items-center gap-1.5"><Home size={14} /> {team}</p>}

                            {/* Citizen ID row */}
                            <div className="flex items-center gap-3 mt-2 flex-wrap">
                                <button
                                    onClick={copyId}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all hover:scale-105"
                                    style={{
                                        background: 'rgba(6,182,212,0.08)',
                                        border: '1px solid rgba(6,182,212,0.25)',
                                        color: '#06b6d4',
                                    }}
                                >
                                    {citizenId}
                                    {copied
                                        ? <CheckCircle size={10} className="text-green-400" />
                                        : <Copy size={10} />
                                    }
                                </button>
                                <span
                                    className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                                    style={{ background: `${roleConfig.color}18`, color: roleConfig.color, border: `1px solid ${roleConfig.color}35` }}
                                >
                                    {role}
                                </span>
                                <span
                                    className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                                    style={{ background: `${tierColor}18`, color: tierColor, border: `1px solid ${tierColor}35` }}
                                >
                                    {currentTier}
                                </span>
                            </div>
                        </div>

                        {/* Score pill */}
                        <div
                            className="rounded-2xl px-6 py-4 text-center flex-shrink-0"
                            style={{
                                background: 'linear-gradient(135deg, rgba(249,162,77,0.12), rgba(255,107,53,0.08))',
                                border: '1px solid rgba(249,162,77,0.25)',
                            }}
                        >
                            <p className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">Total Score</p>
                            <p className="text-4xl font-heading font-bold" style={{ color: '#F9A24D' }}>{totalScore}</p>
                            <p className="text-[9px] text-gray-600 mt-0.5">/ 140 pts max</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 mt-8 space-y-10">

                {/* Role Card */}
                <Section title="Role Card">
                    <div
                        className="rounded-2xl p-5 relative overflow-hidden"
                        style={{
                            background: `linear-gradient(135deg, rgba(10,10,26,0.95), ${roleConfig.color}12)`,
                            border: `1px solid ${roleConfig.color}35`,
                            boxShadow: `0 0 30px ${roleConfig.color}12`,
                        }}
                    >
                        <div
                            className="absolute inset-0 rounded-2xl pointer-events-none opacity-[0.04]"
                            style={{
                                background: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${roleConfig.color}60 3px, ${roleConfig.color}60 4px)`,
                            }}
                        />
                        <div className="relative z-10 flex items-start gap-4">
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                                style={{ background: `${roleConfig.color}15`, border: `1.5px solid ${roleConfig.color}40` }}
                            >
                                <RoleIcon size={24} style={{ color: roleConfig.color }} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-xl font-heading font-bold" style={{ color: roleConfig.color }}>{role}</h3>
                                    <span className="text-[9px] font-bold tracking-[0.2em] uppercase px-2 py-0.5 rounded-full" style={{ color: roleConfig.color, border: `1px solid ${roleConfig.color}30`, background: `${roleConfig.color}10` }}>
                                        ROLE CARD
                                    </span>
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed mb-3">{roleConfig.power}</p>
                                <div
                                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
                                    style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)' }}
                                >
                                    <Star size={11} style={{ color: roleConfig.color }} />
                                    <span className="text-gray-300">{roleConfig.bonus}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Points Breakdown */}
                <Section title="Points Breakdown">
                    <div
                        className="rounded-2xl overflow-hidden"
                        style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                        {roomPoints.length === 0 ? (
                            <div className="px-5 py-8 text-center">
                                <p className="text-gray-600 text-sm">No points yet — complete rooms to earn points</p>
                            </div>
                        ) : (
                            <table className="w-full">
                                <thead>
                                    <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                        <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-500">Room</th>
                                        <th className="text-left px-5 py-3 text-[10px] uppercase tracking-widest text-gray-500">Tier</th>
                                        <th className="text-right px-5 py-3 text-[10px] uppercase tracking-widest text-gray-500">Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roomPoints.map((row, i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                            <td className="px-5 py-3 text-gray-300 text-sm">{row.name}</td>
                                            <td className="px-5 py-3">
                                                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full"
                                                    style={{ color: row.color, background: `${row.color}15`, border: `1px solid ${row.color}30` }}>
                                                    {row.tier}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 text-right font-heading font-bold" style={{ color: row.color }}>+{row.pts}</td>
                                        </tr>
                                    ))}
                                    <tr style={{ background: 'rgba(249,162,77,0.04)', borderTop: '1px solid rgba(249,162,77,0.15)' }}>
                                        <td className="px-5 py-3 text-white font-bold" colSpan={2}>Total</td>
                                        <td className="px-5 py-3 text-right font-heading font-bold text-2xl" style={{ color: '#F9A24D' }}>{totalScore}</td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </div>
                </Section>

                {/* Badges */}
                {badges.length > 0 && (
                    <Section title="Badges Earned">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {badges.map((badge, i) => (
                                <div
                                    key={i}
                                    className="rounded-2xl p-4 flex flex-col items-center gap-2 text-center"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(249,162,77,0.08), rgba(15,52,96,0.4))',
                                        border: '1px solid rgba(249,162,77,0.15)',
                                    }}
                                >
                                    <span className="text-3xl flex items-center justify-center">{React.createElement(BADGE_ICONS[badge.icon] || Award, { size: 32, className: 'text-white' })}</span>
                                    <p className="text-sm font-heading font-bold text-white">{badge.name}</p>
                                    {badge.description && <p className="text-[10px] text-gray-500">{badge.description}</p>}
                                </div>
                            ))}
                        </div>
                    </Section>
                )}



            </div>
        </div>
    );
};

export default ParticipantProfile;