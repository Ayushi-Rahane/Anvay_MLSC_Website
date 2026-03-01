import React from 'react';
import { ArrowLeft, Radio } from 'lucide-react';

const RoomSummaryBar = ({ room, onToggleStatus, onBack }) => {
    const isOpen = room.status === 'open';

    return (
        <div className="sticky top-16 z-40 bg-secondary/95 backdrop-blur-xl border-b border-gray-700/50 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
                {/* Left: Back + Room Info */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${room.color}20`, border: `1px solid ${room.color}40` }}
                        >
                            <Radio size={18} style={{ color: room.color }} />
                        </div>
                        <div>
                            <h2
                                className="text-xl font-bold uppercase tracking-wider"
                                style={{ fontFamily: "'Orbitron', sans-serif", color: room.color }}
                            >
                                {room.name}
                            </h2>
                            <p
                                className="text-gray-400 text-sm uppercase tracking-widest"
                                style={{ fontFamily: "'Rajdhani', sans-serif" }}
                            >
                                Mission Control
                            </p>
                        </div>
                    </div>
                </div>

                {/* Center: Quick Stats */}
                <div className="flex items-center gap-6">
                    <div className="text-center">
                        <p className="text-gray-500 text-xs uppercase tracking-wider">Participants</p>
                        <p className="text-white font-bold text-xl">{room.totalParticipants || 0}/{room.capacity || 0}</p>
                    </div>
                    <div className="w-px h-8 bg-gray-700" />
                    <div className="text-center">
                        <p className="text-gray-500 text-xs uppercase tracking-wider">Completed</p>
                        <p className="text-white font-bold text-xl">{room.completedCount}</p>
                    </div>
                    <div className="w-px h-8 bg-gray-700" />
                    <div className="text-center">
                        <p className="text-gray-500 text-xs uppercase tracking-wider">Points Awarded</p>
                        <p className="text-highlight font-bold text-xl">{room.totalPoints || 0}</p>
                    </div>
                    <div className="w-px h-8 bg-gray-700" />
                    <div className="text-center">
                        <p className="text-gray-500 text-xs uppercase tracking-wider">Pending</p>
                        <p className="text-yellow-400 font-bold text-xl">{room.pendingCount || 0}</p>
                    </div>
                </div>

                {/* Right: Status Toggle */}
                <div className="flex items-center gap-3">
                    <span className={`text-sm font-medium ${isOpen ? 'text-green-400' : 'text-red-400'}`}>
                        {isOpen ? 'Room Open' : 'Room Closed'}
                    </span>
                    <button
                        onClick={onToggleStatus}
                        className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${isOpen ? 'bg-green-500/30 border border-green-500/50' : 'bg-red-500/30 border border-red-500/50'
                            }`}
                    >
                        <div
                            className={`absolute top-0.5 w-6 h-6 rounded-full transition-all duration-300 shadow-lg ${isOpen ? 'left-7 bg-green-400' : 'left-0.5 bg-red-400'
                                }`}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoomSummaryBar;
