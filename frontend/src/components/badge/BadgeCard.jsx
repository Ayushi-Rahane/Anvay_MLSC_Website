import React from 'react';
import TierBadge from '../common/TierBadge';

const BadgeCard = ({ participant }) => {
    return (
        <div className="bg-primary border border-gray-700 rounded-xl p-8 text-center">
            <TierBadge tier={participant.tier || 'Bronze'} />
            <h3 className="text-2xl font-heading font-bold text-white mt-4 mb-2">
                {participant.name}
            </h3>
            <p className="text-gray-400 text-sm mb-4">
                Citizen ID: <span className="text-highlight">{participant.citizenId}</span>
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-secondary rounded-lg p-4">
                    <p className="text-gray-400 text-sm">Total Points</p>
                    <p className="text-2xl font-bold text-highlight">{participant.totalPoints || 0}</p>
                </div>
                <div className="bg-secondary rounded-lg p-4">
                    <p className="text-gray-400 text-sm">Rooms Completed</p>
                    <p className="text-2xl font-bold text-white">{participant.roomsCompleted || 0}</p>
                </div>
            </div>
        </div>
    );
};

export default BadgeCard;
