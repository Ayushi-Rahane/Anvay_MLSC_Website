import React from 'react';

const LeaderboardRow = ({ entry, rank }) => {
    return (
        <div className="grid grid-cols-4 gap-4 p-4 items-center border-b border-gray-700/50 hover:bg-accent/20 transition-colors">
            <span className="text-gray-300 font-medium">#{rank}</span>
            <span className="text-white font-semibold">{entry.name || 'Unknown'}</span>
            <span className="text-highlight font-bold">{entry.totalPoints || 0}</span>
            <span className="text-gray-300">{entry.tier || 'Bronze'}</span>
        </div>
    );
};

export default LeaderboardRow;
