import React from 'react';
import { Scale, Landmark, Fingerprint, Building2, Shield } from 'lucide-react';

const ROOMS = [
    {
        id: 'room_1',
        name: '1. Law Foundry',
        Icon: Scale,
        description: 'Legal challenges and constitutional puzzles',
        completedCount: 12,
        status: 'open',
        color: '#8b5cf6',
    },
    {
        id: 'room_2',
        name: '2. Treasury Mint',
        Icon: Landmark,
        description: 'Financial strategy and resource management',
        completedCount: 8,
        status: 'open',
        color: '#f59e0b',
    },
    {
        id: 'room_3',
        name: '3. Identity Bureau',
        Icon: Fingerprint,
        description: 'Citizen verification and identity challenges',
        completedCount: 5,
        status: 'open',
        color: '#06b6d4',
    },
    {
        id: 'room_4',
        name: '4. Council Chamber',
        Icon: Building2,
        description: 'Governance decisions and policy debates',
        completedCount: 3,
        status: 'closed',
        color: '#ec4899',
    },
    {
        id: 'room_5',
        name: '5. Control Center',
        Icon: Shield,
        description: 'Cybersecurity and system defense missions',
        completedCount: 0,
        status: 'closed',
        color: '#22c55e',
    },
];

const RoomSelection = ({ onSelectRoom }) => {
    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            {/* Header */}
            <div className="text-center mb-12">
                <h1
                    className="text-4xl md:text-5xl font-bold uppercase tracking-wider mb-3"
                    style={{
                        fontFamily: "'Orbitron', sans-serif",
                        color: '#F9A24D',
                        textShadow: '0 0 30px rgba(249,162,77,0.3)',
                    }}
                >
                    Select Room You Are Managing
                </h1>
                <p
                    className="text-gray-300 text-lg uppercase tracking-widest"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                    Choose your assigned room to access its mission control dashboard
                </p>
            </div>

            {/* Room Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ROOMS.map((room) => {
                    const { Icon, ...roomData } = room;
                    return (
                        <button
                            key={room.id}
                            onClick={() => onSelectRoom({ ...roomData, icon: room.name })}
                            className="group text-left bg-secondary/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 
                hover:border-opacity-100 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = room.color;
                                e.currentTarget.style.boxShadow = `0 0 30px ${room.color}30, inset 0 0 30px ${room.color}08`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '';
                                e.currentTarget.style.boxShadow = '';
                            }}
                        >
                            {/* Icon & Status */}
                            <div className="flex items-start justify-between mb-4">
                                <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                                    style={{ backgroundColor: `${room.color}20`, border: `1px solid ${room.color}40` }}
                                >
                                    <Icon size={24} style={{ color: room.color }} />
                                </div>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${room.status === 'open'
                                        ? 'bg-green-500/15 text-green-400 border border-green-500/30'
                                        : 'bg-red-500/15 text-red-400 border border-red-500/30'
                                        }`}
                                >
                                    {room.status === 'open' ? '● Open' : '● Closed'}
                                </span>
                            </div>

                            {/* Room Name */}
                            <h3
                                className="text-xl font-bold text-white mb-1 uppercase tracking-wider"
                                style={{ fontFamily: "'Orbitron', sans-serif" }}
                            >
                                {room.name}
                            </h3>
                            <p
                                className="text-gray-300 text-sm mb-5 tracking-widest uppercase"
                                style={{ fontFamily: "'Rajdhani', sans-serif" }}
                            >
                                {room.description}
                            </p>

                            {/* Stats */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                                <div>
                                    <p className="text-gray-500 text-xs uppercase tracking-wider">Completed</p>
                                    <p className="text-white font-bold text-lg">{room.completedCount}</p>
                                </div>
                                <div
                                    className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1"
                                    style={{ backgroundColor: `${room.color}15`, color: room.color }}
                                >
                                    Enter Room →
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default RoomSelection;
