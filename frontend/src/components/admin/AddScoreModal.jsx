import React, { useState } from 'react';

const AddScoreModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        citizenId: '',
        roomId: '',
        score: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // TODO: API call to submit score
        console.log('Submitting score:', formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-secondary rounded-xl p-8 w-full max-w-md">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-heading font-semibold text-white">
                        Add Score
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white text-2xl"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Citizen ID</label>
                        <input
                            type="text"
                            name="citizenId"
                            value={formData.citizenId}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-primary border border-gray-600 text-white focus:outline-none focus:border-highlight"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Room</label>
                        <select
                            name="roomId"
                            value={formData.roomId}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-primary border border-gray-600 text-white focus:outline-none focus:border-highlight"
                        >
                            <option value="">Select Room</option>
                            <option value="room_1">Room 1</option>
                            <option value="room_2">Room 2</option>
                            <option value="room_3">Room 3</option>
                            <option value="room_4">Room 4</option>
                            <option value="room_5">Room 5</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-400 text-sm mb-1">Score</label>
                        <input
                            type="number"
                            name="score"
                            value={formData.score}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            required
                            className="w-full px-4 py-3 rounded-lg bg-primary border border-gray-600 text-white focus:outline-none focus:border-highlight"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-highlight text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Submit Score
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddScoreModal;
