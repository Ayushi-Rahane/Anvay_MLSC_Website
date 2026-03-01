import React from 'react';

const RoomStatusBoard = () => {
    // Placeholder — will be fetched from API
    const rooms = [
        { id: 'room_1', name: 'Room 1', status: 'open', participantCount: 12 },
        { id: 'room_2', name: 'Room 2', status: 'locked', participantCount: 0 },
        { id: 'room_3', name: 'Room 3', status: 'locked', participantCount: 0 },
        { id: 'room_4', name: 'Room 4', status: 'locked', participantCount: 0 },
        { id: 'room_5', name: 'Room 5', status: 'completed', participantCount: 8 },
    ];

    const statusColors = {
        open: 'text-green-400',
        locked: 'text-gray-500',
        completed: 'text-gold',
    };

    return (
        <div className="bg-secondary rounded-xl p-6 mb-8">
            <h2 className="text-xl font-heading font-semibold text-white mb-6">
                Room Status
            </h2>
            <div className="space-y-4">
                {rooms.map((room) => (
                    <div
                        key={room.id}
                        className="flex items-center justify-between p-4 bg-primary rounded-lg"
                    >
                        <div>
                            <h3 className="text-white font-semibold">{room.name}</h3>
                            <p className="text-gray-400 text-sm">
                                {room.participantCount} participants
                            </p>
                        </div>
                        <span className={`font-semibold capitalize ${statusColors[room.status]}`}>
                            {room.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoomStatusBoard;
