import React from 'react';

const TierBadge = ({ tier }) => {
    const tierConfig = {
        Bronze: { color: 'text-bronze', bg: 'bg-orange-500/10', border: 'border-bronze', emoji: '🥉' },
        Silver: { color: 'text-silver', bg: 'bg-gray-400/10', border: 'border-silver', emoji: '🥈' },
        Gold: { color: 'text-gold', bg: 'bg-yellow-500/10', border: 'border-gold', emoji: '🥇' },
        Platinum: { color: 'text-platinum', bg: 'bg-gray-200/10', border: 'border-platinum', emoji: '💎' },
    };

    const config = tierConfig[tier] || tierConfig.Bronze;

    return (
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${config.border} ${config.bg}`}>
            <span className="text-xl">{config.emoji}</span>
            <span className={`font-heading font-bold ${config.color}`}>{tier}</span>
        </div>
    );
};

export default TierBadge;
