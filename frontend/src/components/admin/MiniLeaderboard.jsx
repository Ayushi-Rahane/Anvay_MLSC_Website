import React from 'react';
import { Trophy, Medal, Hash } from 'lucide-react';

const MOCK_TOP_5 = [
    { rank: 1, name: 'Priya Sharma', citizenId: 'BC-K5T3W', totalPoints: 210, roomRank: 1 },
    { rank: 2, name: 'Arjun Patel', citizenId: 'BC-A7K2X', totalPoints: 185, roomRank: 2 },
    { rank: 3, name: 'Vikram Singh', citizenId: 'BC-J2V8D', totalPoints: 170, roomRank: 3 },
    { rank: 4, name: 'Sneha Kulkarni', citizenId: 'BC-M3P9Q', totalPoints: 145, roomRank: 5 },
    { rank: 5, name: 'Rahul Deshmukh', citizenId: 'BC-R8N1L', totalPoints: 130, roomRank: 4 },
];

const rankColors = {
    1: 'text-yellow-400',
    2: 'text-gray-300',
    3: 'text-orange-400',
};

const MiniLeaderboard = ({ roomColor }) => {
    return (
        <div className="bg-secondary/60 border border-gray-700/50 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-700/50">
                <h3
                    className="text-xl font-bold flex items-center gap-2 uppercase tracking-wider"
                    style={{ fontFamily: "'Orbitron', sans-serif", color: '#F9A24D' }}
                >
                    <Trophy size={18} className="text-[#F9A24D]" />
                    Live Leaderboard
                </h3>
                <p
                    className="text-gray-400 text-sm mt-1 uppercase tracking-widest"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                    Top 5 Participants — Global Ranking
                </p>
            </div>

            <div className="divide-y divide-gray-700/30">
                {MOCK_TOP_5.map((entry) => (
                    <div
                        key={entry.rank}
                        className="flex items-center justify-between px-5 py-3 hover:bg-gray-700/20 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            {/* Rank */}
                            <div className="w-8 text-center">
                                {entry.rank <= 3 ? (
                                    <Medal size={18} className={rankColors[entry.rank]} />
                                ) : (
                                    <span className="text-gray-500 font-bold text-sm flex items-center justify-center">
                                        <Hash size={12} />{entry.rank}
                                    </span>
                                )}
                            </div>

                            {/* Info */}
                            <div>
                                <p className="text-white font-semibold text-sm">{entry.name}</p>
                                <div className="flex items-center gap-2">
                                    <code className="text-xs text-gray-500">{entry.citizenId}</code>
                                    <span className="text-xs px-1.5 py-0.5 rounded bg-gray-700/50 text-gray-400">
                                        Room #{entry.roomRank}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Points */}
                        <div className="text-right">
                            <p className="font-bold text-sm" style={{ color: roomColor }}>{entry.totalPoints}</p>
                            <p className="text-gray-500 text-xs">pts</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MiniLeaderboard;
