import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import RoomSelection from './RoomSelection';
import RoomSetupModal from './RoomSetupModal';
import RoomControlDashboard from './RoomControlDashboard';

const AdminDashboard = () => {
    const { logout, admin } = useAuth();
    const [selectedRoom, setSelectedRoom] = useState(() => {
        const saved = localStorage.getItem('bc_admin_room');
        return saved ? JSON.parse(saved) : null;
    });
    const [setupRoom, setSetupRoom] = useState(null); // room waiting for setup input
    const [roomConfig, setRoomConfig] = useState(() => {
        const saved = localStorage.getItem('bc_admin_config');
        return saved ? JSON.parse(saved) : null;
    });

    const handleRoomClick = (room) => {
        setSetupRoom(room); // show setup modal
    };

    const handleSetupConfirm = (config) => {
        setRoomConfig(config);
        setSelectedRoom(setupRoom);
        setSetupRoom(null);
        localStorage.setItem('bc_admin_room', JSON.stringify(setupRoom));
        localStorage.setItem('bc_admin_config', JSON.stringify(config));
    };

    const handleBack = () => {
        setSelectedRoom(null);
        setRoomConfig(null);
        localStorage.removeItem('bc_admin_room');
        localStorage.removeItem('bc_admin_config');
    };

    // Room selected + config set → show room control dashboard
    if (selectedRoom && roomConfig) {
        return (
            <RoomControlDashboard
                room={selectedRoom}
                roomConfig={roomConfig}
                onBack={handleBack}
            />
        );
    }

    // No room selected → show room selection + optional setup modal
    return (
        <div className="min-h-screen bg-primary">
            {/* Top Bar */}
            <div className="max-w-6xl mx-auto px-4 pt-6 flex items-center justify-between">
                <div>
                    <p className="text-gray-400 text-sm">
                        Welcome back, <span className="text-white font-medium">{admin?.name || 'Admin'}</span>
                    </p>
                </div>
                <button
                    onClick={logout}
                    className="px-5 py-2 border border-gray-600 text-gray-300 text-sm font-semibold rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
                >
                    Logout
                </button>
            </div>

            {/* Room Selection */}
            <RoomSelection onSelectRoom={handleRoomClick} />

            {/* Setup Modal */}
            {setupRoom && (
                <RoomSetupModal
                    room={setupRoom}
                    onConfirm={handleSetupConfirm}
                    onCancel={() => setSetupRoom(null)}
                />
            )}
        </div>
    );
};

export default AdminDashboard;
