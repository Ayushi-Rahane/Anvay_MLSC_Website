import React from 'react';

const TopThreeCard = ({ entry, rank }) => {
    const rankStyles = {
        1: 'border-gold bg-yellow-500/10 text-gold',
        2: 'border-silver bg-gray-400/10 text-silver',
        3: 'border-bronze bg-orange-500/10 text-bronze',
    };

    const rankEmojis = { 1: '🥇', 2: '🥈', 3: '🥉' };

    return (
        <div
            className={`rounded-xl border-2 p-6 text-center transition-all hover:scale-105 ${rankStyles[rank] || ''
                }`}
        >
            <div className="text-4xl mb-2">{rankEmojis[rank]}</div>
            <h3 className="text-xl font-heading font-bold text-white mb-1">
                {entry.name || 'Unknown'}
            </h3>
            <p className="text-2xl font-bold text-highlight mb-2">
                {entry.totalPoints || 0} pts
            </p>
            <p className="text-sm text-gray-400">{entry.tier || 'Bronze'}</p>
        </div>
    );
};

export default TopThreeCard;
