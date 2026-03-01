import React from 'react';
import LeaderboardRow from './LeaderboardRow';
import TopThreeCard from './TopThreeCard';
import useFetchLeaderboard from '../../hooks/useFetchLeaderboard';

const Leaderboard = () => {
    const { leaderboard, loading, error } = useFetchLeaderboard();

    if (loading) {
        return (
            <section id="leaderboard" className="py-16 px-4">
                <div className="text-center text-gray-400">Loading leaderboard...</div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="leaderboard" className="py-16 px-4">
                <div className="text-center text-red-400">Error loading leaderboard.</div>
            </section>
        );
    }

    const topThree = leaderboard.slice(0, 3);
    const rest = leaderboard.slice(3);

    return (
        <section id="leaderboard" className="py-16 px-4 bg-primary">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-white mb-12">
                    🏆 Leaderboard
                </h2>

                {/* Top 3 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {topThree.map((entry, index) => (
                        <TopThreeCard key={entry._id || index} entry={entry} rank={index + 1} />
                    ))}
                </div>

                {/* Rest of leaderboard */}
                <div className="bg-secondary rounded-xl overflow-hidden">
                    <div className="grid grid-cols-4 gap-4 p-4 text-gray-400 font-semibold text-sm border-b border-gray-700">
                        <span>Rank</span>
                        <span>Name</span>
                        <span>Points</span>
                        <span>Tier</span>
                    </div>
                    {rest.map((entry, index) => (
                        <LeaderboardRow key={entry._id || index} entry={entry} rank={index + 4} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Leaderboard;
