import React from 'react';
import { RefreshCw } from 'lucide-react';

const getTierInfo = (rank) => {
    if (rank <= 3) return { label: 'Top 3', color: '#F9A24D', borderColor: 'rgba(249,162,77,0.3)', bgColor: 'rgba(249,162,77,0.1)' };
    if (rank <= 10) return { label: 'Architect', color: '#ef4444', borderColor: 'rgba(239,68,68,0.3)', bgColor: 'rgba(239,68,68,0.1)' };
    if (rank <= 25) return { label: 'Builder', color: '#eab308', borderColor: 'rgba(234,179,8,0.3)', bgColor: 'rgba(234,179,8,0.1)' };
    return { label: 'Explorer', color: '#22c55e', borderColor: 'rgba(34,197,94,0.3)', bgColor: 'rgba(34,197,94,0.1)' };
};

const Leaderboard = () => {
    // Hardcoded leaderboard data
    const leaderboard = [
        { _id: "0x7A2F", citizenId: "BC-0x7A2F", name: "Alex Chen", totalScore: 8950 },
        { _id: "0x9B4E", citizenId: "BC-0x9B4E", name: "Sarah Kumar", totalScore: 8720 },
        { _id: "0x3C8D", citizenId: "BC-0x3C8D", name: "Marcus Johnson", totalScore: 8450 },
        { _id: "0x5F1A", citizenId: "BC-0x5F1A", name: "Emily Rodriguez", totalScore: 7890 },
        { _id: "0x2D9C", citizenId: "BC-0x2D9C", name: "James Park", totalScore: 7650 },
        { _id: "0x8E3B", citizenId: "BC-0x8E3B", name: "Yuki Tanaka", totalScore: 6950 },
        { _id: "0x1A4F", citizenId: "BC-0x1A4F", name: "Priya Patel", totalScore: 6820 },
        { _id: "0x4C7D", citizenId: "BC-0x4C7D", name: "David Kim", totalScore: 6450 },
    ];

    const displayEntries = leaderboard.slice(0, 10);

    return (
        <section id="leaderboard" className="py-20 px-4 bg-[#0a0a1a]">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-14">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <h2
                            className="text-4xl md:text-5xl font-bold uppercase tracking-wider"
                            style={{
                                fontFamily: "'Orbitron', sans-serif",
                                color: '#F9A24D',
                                textShadow: '0 0 30px rgba(249,162,77,0.3)',
                            }}
                        >
                            LIVE LEADERBOARD
                        </h2>
                        <RefreshCw
                            size={24}
                            className="text-[#F9A24D] animate-spin"
                            style={{ animationDuration: '3s' }}
                        />
                    </div>
                    <p className="text-gray-400">
                        Top citizens competing for BlockCity dominance
                    </p>
                </div>

                {/* Table */}
                <div
                    className="rounded-2xl border overflow-hidden"
                    style={{
                        backgroundColor: 'rgba(15, 18, 35, 0.8)',
                        borderColor: 'rgba(255,255,255,0.06)',
                        boxShadow: '0 0 60px rgba(0,0,0,0.5)',
                    }}
                >
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5">
                        <span className="col-span-2 text-xs font-semibold text-gray-500 uppercase tracking-widest">Rank</span>
                        <span className="col-span-3 text-xs font-semibold text-gray-500 uppercase tracking-widest">Citizen ID</span>
                        <span className="col-span-3 text-xs font-semibold text-gray-500 uppercase tracking-widest">Name</span>
                        <span className="col-span-2 text-xs font-semibold text-gray-500 uppercase tracking-widest">Points</span>
                        <span className="col-span-2 text-xs font-semibold text-gray-500 uppercase tracking-widest text-right">Tier</span>
                    </div>

                    {/* Rows */}
                    <div className="max-h-[500px] overflow-y-auto">
                        {displayEntries.map((entry, index) => {
                            const rank = index + 1;
                            const tier = getTierInfo(rank);
                            const isTopThree = rank <= 3;

                            return (
                                <div
                                    key={entry._id || index}
                                    className="grid grid-cols-12 gap-4 items-center px-6 py-4 border-b transition-colors hover:bg-white/[0.03]"
                                    style={{
                                        borderColor: isTopThree ? 'rgba(249,162,77,0.15)' : 'rgba(255,255,255,0.03)',
                                        backgroundColor: isTopThree ? 'rgba(249,162,77,0.03)' : 'transparent',
                                    }}
                                >
                                    {/* Rank */}
                                    <div className="col-span-2">
                                        <span
                                            className="text-lg font-bold"
                                            style={{
                                                fontFamily: "'Orbitron', sans-serif",
                                                color: isTopThree ? '#F9A24D' : '#6b7280',
                                                textShadow: isTopThree ? '0 0 15px rgba(249,162,77,0.3)' : 'none',
                                            }}
                                        >
                                            #{rank}
                                        </span>
                                    </div>

                                    {/* Citizen ID */}
                                    <div className="col-span-3">
                                        <span className="text-sm font-mono text-gray-400">
                                            {entry.citizenId || `BC-${entry._id?.slice(-4).toUpperCase() || '0000'}`}
                                        </span>
                                    </div>

                                    {/* Name */}
                                    <div className="col-span-3">
                                        <span className={`font-semibold ${isTopThree ? 'text-white' : 'text-gray-300'}`}>
                                            {entry.name}
                                        </span>
                                    </div>

                                    {/* Points */}
                                    <div className="col-span-2">
                                        <span
                                            className="font-bold"
                                            style={{
                                                fontFamily: "'Orbitron', sans-serif",
                                                color: '#F9A24D',
                                                fontSize: '0.9rem',
                                            }}
                                        >
                                            {(entry.totalScore || 0).toLocaleString()}
                                        </span>
                                        <span className="text-gray-500 text-xs ml-1">pts</span>
                                    </div>

                                    {/* Tier Badge */}
                                    <div className="col-span-2 text-right">
                                        <span
                                            className="px-3 py-1 rounded-full text-xs font-bold border"
                                            style={{
                                                color: tier.color,
                                                borderColor: tier.borderColor,
                                                backgroundColor: tier.bgColor,
                                            }}
                                        >
                                            {tier.label}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {leaderboard.length === 0 && (
                    <div className="text-center py-16 text-gray-500">
                        <p className="text-lg" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                            No entries yet
                        </p>
                        <p className="text-sm mt-2">The competition hasn't started!</p>
                    </div>
                )}

                {/* View Full Leaderboard */}
                {leaderboard.length > 0 && (
                    <div className="mt-10 flex justify-center">
                        <button
                            className="px-8 py-3 rounded-xl text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105"
                            style={{
                                border: '2px solid rgba(249,162,77,0.4)',
                                color: '#F9A24D',
                                boxShadow: '0 0 20px rgba(249,162,77,0.1)',
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.borderColor = '#F9A24D';
                                e.target.style.boxShadow = '0 0 35px rgba(249,162,77,0.25)';
                                e.target.style.backgroundColor = 'rgba(249,162,77,0.08)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.borderColor = 'rgba(249,162,77,0.4)';
                                e.target.style.boxShadow = '0 0 20px rgba(249,162,77,0.1)';
                                e.target.style.backgroundColor = 'transparent';
                            }}
                        >
                            VIEW FULL LEADERBOARD
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Leaderboard;
