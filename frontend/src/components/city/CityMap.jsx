import React from 'react';
import RoomCard from './RoomCard';

const CityMap = () => {
    // Placeholder rooms — will be fetched from API
    const rooms = [
        { id: 'room_1', name: 'Room 1', status: 'open', description: 'Challenge Room 1' },
        { id: 'room_2', name: 'Room 2', status: 'locked', description: 'Challenge Room 2' },
        { id: 'room_3', name: 'Room 3', status: 'locked', description: 'Challenge Room 3' },
        { id: 'room_4', name: 'Room 4', status: 'locked', description: 'Challenge Room 4' },
        { id: 'room_5', name: 'Room 5', status: 'locked', description: 'Challenge Room 5' },
    ];

    return (
        <section id="city-map" className="py-16 px-4 bg-secondary">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-white mb-12">
                    🏙️ BlockCity Map
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rooms.map((room) => (
                        <RoomCard key={room.id} room={room} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CityMap;
