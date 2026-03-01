import React from 'react';

const RoomCard = ({ room }) => {
    const statusColors = {
        open: 'border-green-500 bg-green-500/10',
        locked: 'border-gray-600 bg-gray-700/20',
        completed: 'border-gold bg-yellow-500/10',
    };

    const statusLabels = {
        open: '🟢 Open',
        locked: '🔒 Locked',
        completed: '✅ Completed',
    };

    return (
        <div
            className={`rounded-xl border-2 p-6 transition-all hover:scale-105 ${statusColors[room.status] || statusColors.locked
                }`}
        >
            <h3 className="text-xl font-heading font-semibold text-white mb-2">
                {room.name}
            </h3>
            <p className="text-gray-400 mb-4">{room.description}</p>
            <span className="text-sm font-medium">
                {statusLabels[room.status] || 'Unknown'}
            </span>
        </div>
    );
};

export default RoomCard;
