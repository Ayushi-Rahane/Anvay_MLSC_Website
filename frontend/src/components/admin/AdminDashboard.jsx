import React, { useState } from 'react';
import RoomStatusBoard from './RoomStatusBoard';
import AddScoreModal from './AddScoreModal';

const AdminDashboard = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-heading font-bold text-white">
                    ⚙️ Admin Dashboard
                </h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-6 py-3 bg-highlight text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                >
                    + Add Score
                </button>
            </div>

            <RoomStatusBoard />

            {showModal && <AddScoreModal onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default AdminDashboard;
