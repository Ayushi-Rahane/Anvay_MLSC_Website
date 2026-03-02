import React, { useState } from 'react';
import RoomSummaryBar from './RoomSummaryBar';
import SubmissionQueue from './SubmissionQueue';
import RoomMetrics from './RoomMetrics';
import MiniLeaderboard from './MiniLeaderboard';

const RoomControlDashboard = ({ room, roomConfig, onBack }) => {
    const [roomData, setRoomData] = useState({
        ...room,
        totalPoints: 450,
        pendingCount: 3,
        totalParticipants: roomConfig?.totalParticipants || 0,
        capacity: roomConfig?.capacity || 0,
    });

    const handleToggleStatus = () => {
        setRoomData((prev) => ({
            ...prev,
            status: prev.status === 'open' ? 'closed' : 'open',
        }));
    };

    return (
        <div className="min-h-screen bg-primary">
            {/* Sticky Summary Bar */}
            <RoomSummaryBar
                room={roomData}
                onToggleStatus={handleToggleStatus}
                onBack={onBack}
            />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left: Submission Queue (Main) */}
                    <div className="flex-1 min-w-0">
                        <SubmissionQueue room={roomData} />
                    </div>

                    {/* Right: Side Panel */}
                    <div className="w-full lg:w-80 space-y-6 flex-shrink-0">
                        <RoomMetrics room={roomData} />
                        <MiniLeaderboard roomColor={room.color} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomControlDashboard;
