import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import RoomSelection from './RoomSelection';
import RoomControlDashboard from './RoomControlDashboard';

const AdminDashboard = () => {
    const { logout, admin } = useAuth();
    const [selectedRoom, setSelectedRoom] = useState(null);

    // Room selected → show room control dashboard
    if (selectedRoom) {
        return (
            <RoomControlDashboard
                room={selectedRoom}
                onBack={() => setSelectedRoom(null)}
            />
        );
    }

    // No room selected → show room selection
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
            <RoomSelection onSelectRoom={setSelectedRoom} />
        </div>
    );
};

export default AdminDashboard;
