import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const RoomCard = ({ room }) => {
    const navigate = useNavigate();

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
            className={`rounded-xl border-2 p-6 transition-all hover:scale-105 flex flex-col justify-between h-full ${statusColors[room.status] || statusColors.locked
                }`}
        >
            <div>
                <h3 className="text-xl font-heading font-semibold text-white mb-2">
                    {room.name}
                </h3>
                <p className="text-gray-400 mb-4">{room.description}</p>
                <span className="text-sm font-medium block mb-4">
                    {statusLabels[room.status] || 'Unknown'}
                </span>
            </div>

            {room.status === 'open' || room.status === 'completed' ? (
                <button
                    onClick={() => navigate(`/participant/room/${room.id}`)}
                    className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-green-500/15 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/25 transition-colors font-medium text-sm"
                >
                    <LogIn size={16} />
                    Access Room
                </button>
            ) : null}
        </div>
    );
};

export default RoomCard;
