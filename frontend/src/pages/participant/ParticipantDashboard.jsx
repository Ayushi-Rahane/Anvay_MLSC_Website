import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Trophy, Target, TrendingUp, MapPin, LogOut, QrCode, CheckCircle, Lock, User } from 'lucide-react';
import { useParticipant } from '../../context/ParticipantContext';

const TIER_ORDER = ['Explorer', 'Builder', 'Architect'];
const TIER_COLORS = { Explorer: '#34d399', Builder: '#F9A24D', Architect: '#ef4444', '—': '#6b7280' };
const ROLE_COLORS = { Auditor: '#06b6d4', Miner: '#f59e0b', Investor: '#10b981', Governor: '#8b5cf6', Ambassador: '#f472b6', '—': '#6b7280' };
const ROOM_ICONS = { 'Law Foundry': '⚖️', 'Treasury Mint': '💼', 'Identity Bureau': '🎨', 'Council Chamber': '🏛️', 'Control Center': '🔧' };

const getTierPercent = (tier) => {
    const idx = TIER_ORDER.indexOf(tier);
    return idx === -1 ? 0 : Math.round(((idx + 1) / TIER_ORDER.length) * 100);
};

const StatCard = ({ icon: Icon, label, value, iconColor, valueColor }) => (
    <div className="rounded-2xl p-5 flex flex-col gap-3" style={{ background: 'rgba(15,52,96,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-2">
            <Icon size={18} style={{ color: iconColor }} />
            <span className="text-xs text-gray-400 uppercase tracking-widest">{label}</span>
        </div>
        <p className="text-3xl font-heading font-bold" style={{ color: valueColor || '#fff' }}>{value}</p>
    </div>
);

const RoomCard = ({ room }) => {
    const status = room.completed ? 'completed' : room.inProgress ? 'inProgress' : 'locked';
    const cfg = {
        completed: { label: 'COMPLETED', color: '#34d399', bg: 'rgba(52,211,153,0.12)', border: 'rgba(52,211,153,0.3)' },
        inProgress: { label: 'IN PROGRESS', color: '#F9A24D', bg: 'rgba(249,162,77,0.1)', border: 'rgba(249,162,77,0.3)' },
        locked: { label: 'LOCKED', color: '#6b7280', bg: 'rgba(107,114,128,0.08)', border: 'rgba(107,114,128,0.15)' },
    }[status];
    const progress = room.progress ?? (room.completed ? 100 : 0);

    return (
        <div className="rounded-2xl p-5 transition-all" style={{ background: 'rgba(15,52,96,0.4)', border: `1px solid ${cfg.border}` }}>
            <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                    <span className="text-xl">{ROOM_ICONS[room.name] || '🏛️'}</span>
                    <div>
                        <h3 className="text-base font-heading font-bold text-white">{room.name}</h3>
                        <p className="text-xs text-gray-500">{room.points ?? 100} Points</p>
                    </div>
                </div>
                <span className="text-[9px] font-bold tracking-wider px-2 py-1 rounded-full flex-shrink-0"
                    style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
                    {cfg.label}
                </span>
            </div>
            <p className="text-gray-400 text-xs mb-3 leading-relaxed">{room.description}</p>
            <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-gray-500">Progress</span>
                <span className="text-[10px] font-bold text-white">{progress}/{room.maxProgress ?? 100}</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden mb-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="h-full rounded-full transition-all duration-700" style={{
                    width: `${Math.min(progress, 100)}%`,
                    background: status === 'completed' ? 'linear-gradient(90deg,#34d399,#06b6d4)' : status === 'inProgress' ? 'linear-gradient(90deg,#F9A24D,#ff6b35)' : 'rgba(107,114,128,0.3)',
                    boxShadow: status !== 'locked' ? `0 0 8px ${cfg.color}40` : 'none',
                }} />
            </div>
            {status === 'completed' && (
                <div className="flex items-center gap-1.5">
                    <CheckCircle size={12} style={{ color: '#34d399' }} />
                    <span className="text-xs font-bold" style={{ color: '#34d399' }}>Completed</span>
                </div>
            )}
            {status === 'inProgress' && (
                <button className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all hover:scale-[1.02]"
                    style={{ background: 'linear-gradient(135deg,#F9A24D,#ff6b35)', color: '#0a0a1a', boxShadow: '0 0 15px rgba(249,162,77,0.25)' }}>
                    <QrCode size={13} /> Scan QR
                </button>
            )}
            {status === 'locked' && (
                <div className="flex items-center gap-1.5">
                    <Lock size={12} className="text-gray-600" />
                    <span className="text-xs text-gray-600">Not started</span>
                </div>
            )}
        </div>
    );
};

const ParticipantDashboard = () => {
    const navigate = useNavigate();
    const { participant, citizenId, loading, logout, totalScore, roomsCompleted, currentTier, currentRoom, role, badges, rooms, name, team } = useParticipant();

    // ✅ navigate inside useEffect — not during render
    useEffect(() => {
        if (!loading && !participant) navigate('/participant');
    }, [participant, loading, navigate]);

    // Loading spinner
    if (loading || !participant) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a1a' }}>
                <div className="text-center">
                    <div className="w-8 h-8 rounded-full border-2 animate-spin mx-auto mb-3"
                        style={{ borderColor: '#F9A24D', borderTopColor: 'transparent' }} />
                    <p className="text-gray-500 text-sm">Loading your city pass...</p>
                </div>
            </div>
        );
    }

    const tierPercent = getTierPercent(currentTier);
    const tierColor = TIER_COLORS[currentTier] || '#6b7280';
    const roleColor = ROLE_COLORS[role] || '#6b7280';

    return (
        <div className="min-h-screen pb-16" style={{ background: '#0a0a1a' }}>
            {/* Top bar */}
            <div className="sticky top-0 z-40 px-4 py-3 flex items-center justify-between"
                style={{ background: 'rgba(10,10,26,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#F9A24D' }}>
                    ANVAY — BlockCity Edition
                </p>
                <div className="flex items-center gap-3">
                    <span className="text-xs font-mono hidden sm:block" style={{ color: '#06b6d4' }}>{citizenId}</span>
                    <div className="flex items-center gap-1.5">
                        <Trophy size={14} style={{ color: '#F9A24D' }} />
                        <span className="text-sm font-heading font-bold text-white">{totalScore}</span>
                    </div>
                    <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase"
                        style={{ background: `${roleColor}18`, color: roleColor, border: `1px solid ${roleColor}40` }}>
                        {role}
                    </span>
                    <Link to="/participant/profile" className="p-1.5 rounded-lg transition-colors hover:bg-white/5">
                        <User size={15} className="text-gray-500 hover:text-white" />
                    </Link>
                    <button onClick={() => { logout(); navigate('/participant'); }} className="p-1.5 rounded-lg transition-colors hover:bg-white/5">
                        <LogOut size={15} className="text-gray-500 hover:text-white" />
                    </button>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 mt-8 space-y-8">
                {/* Greeting */}
                <div>
                    <h1 className="text-2xl font-heading font-bold text-white">
                        Welcome back, <span style={{ color: '#F9A24D' }}>{name || citizenId}</span>
                    </h1>
                    {team && <p className="text-gray-500 text-sm mt-1">🏘️ {team}</p>}
                </div>

                {/* 4 stat cards */}
                <div className="grid grid-cols-2 gap-4">
                    <StatCard icon={Trophy} label="Total Score" value={totalScore} iconColor="#F9A24D" valueColor="#F9A24D" />
                    <StatCard icon={Target} label="Rooms Completed" value={`${roomsCompleted}/5`} iconColor="#34d399" />
                    <StatCard icon={TrendingUp} label="Current Tier" value={currentTier} iconColor="#c084fc" valueColor={tierColor} />
                    <StatCard icon={MapPin} label="Current Room" value={currentRoom} iconColor="#06b6d4" />
                </div>

                {/* Tier progress */}
                <div className="rounded-2xl p-5" style={{ background: 'rgba(15,52,96,0.4)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-xs text-gray-400 uppercase tracking-widest">Tier Progress</p>
                        <span className="text-xs font-bold" style={{ color: tierColor }}>{tierPercent}%</span>
                    </div>
                    <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full uppercase mb-3 inline-block"
                        style={{ background: `${tierColor}20`, color: tierColor, border: `1px solid ${tierColor}40` }}>
                        {currentTier}
                    </span>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <div className="h-full rounded-full transition-all duration-1000" style={{
                            width: `${tierPercent}%`,
                            background: `linear-gradient(90deg, ${tierColor}, ${tierColor}99)`,
                            boxShadow: `0 0 10px ${tierColor}50`,
                        }} />
                    </div>
                    <div className="flex justify-between mt-2">
                        {TIER_ORDER.map(t => (
                            <span key={t} className="text-[9px] uppercase tracking-widest font-bold"
                                style={{ color: TIER_ORDER.indexOf(t) <= TIER_ORDER.indexOf(currentTier) ? TIER_COLORS[t] : '#374151' }}>
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Badges */}
                {badges.length > 0 && (
                    <div>
                        <h2 className="text-lg font-heading font-bold text-white mb-4">Your Badges</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {badges.map((badge, i) => (
                                <div key={i} className="rounded-2xl p-5 flex flex-col items-center justify-center gap-3 text-center"
                                    style={{ background: 'linear-gradient(135deg,rgba(249,162,77,0.1),rgba(255,107,53,0.06))', border: '1px solid rgba(249,162,77,0.2)' }}>
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center"
                                        style={{ background: 'rgba(249,162,77,0.15)', border: '2px solid rgba(249,162,77,0.3)' }}>
                                        <span className="text-2xl">{badge.icon || '🏅'}</span>
                                    </div>
                                    <p className="text-sm font-heading font-bold text-white">{badge.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Room Tracker */}
                <div>
                    <h2 className="text-lg font-heading font-bold text-white mb-4">Room Tracker</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {rooms.map((room, i) => <RoomCard key={i} room={room} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParticipantDashboard;