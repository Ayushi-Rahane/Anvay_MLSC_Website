import React, { useState } from 'react';
import { X } from 'lucide-react';

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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-secondary/90 border border-gray-700/50 rounded-2xl p-8 w-full max-w-md shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                    <h2
                        className="text-2xl font-bold text-white uppercase tracking-wider"
                        style={{ fontFamily: "'Orbitron', sans-serif", color: '#F9A24D' }}
                    >
                        Add Score
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    // TODO: API call to submit score
                    console.log('Submitting score:', formData);
                    onClose();
                }} className="space-y-5">
                    <div>
                        <label
                            className="block text-[#F9A24D] text-xs font-bold mb-2 uppercase tracking-widest"
                            style={{ fontFamily: "'Orbitron', sans-serif" }}
                        >
                            Citizen ID
                        </label>
                        <input
                            type="text"
                            name="citizenId"
                            value={formData.citizenId}
                            onChange={handleChange}
                            required
                            placeholder="Enter Citizen ID"
                            className="w-full px-4 py-3.5 rounded-xl bg-[#0a0a1a]/50 text-white placeholder-gray-500 font-mono focus:outline-none transition-all duration-300"
                            style={{
                                border: '1px solid rgba(249,162,77,0.3)',
                                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#F9A24D';
                                e.target.style.boxShadow = '0 0 20px rgba(249,162,77,0.2), inset 0 0 20px rgba(0,0,0,0.5)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'rgba(249,162,77,0.3)';
                                e.target.style.boxShadow = 'inset 0 0 20px rgba(0,0,0,0.5)';
                            }}
                        />
                    </div>

                    <div>
                        <label
                            className="block text-[#F9A24D] text-xs font-bold mb-2 uppercase tracking-widest"
                            style={{ fontFamily: "'Orbitron', sans-serif" }}
                        >
                            Room
                        </label>
                        <select
                            name="roomId"
                            value={formData.roomId}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3.5 rounded-xl bg-[#0a0a1a]/50 text-white focus:outline-none transition-all duration-300 appearance-none"
                            style={{
                                border: '1px solid rgba(249,162,77,0.3)',
                                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23F9A24D'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 16px center',
                                backgroundSize: '16px',
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#F9A24D';
                                e.target.style.boxShadow = '0 0 20px rgba(249,162,77,0.2), inset 0 0 20px rgba(0,0,0,0.5)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'rgba(249,162,77,0.3)';
                                e.target.style.boxShadow = 'inset 0 0 20px rgba(0,0,0,0.5)';
                            }}
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
                        <label
                            className="block text-[#F9A24D] text-xs font-bold mb-2 uppercase tracking-widest"
                            style={{ fontFamily: "'Orbitron', sans-serif" }}
                        >
                            Score
                        </label>
                        <input
                            type="number"
                            name="score"
                            value={formData.score}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            required
                            placeholder="Enter score (0-100)"
                            className="w-full px-4 py-3.5 rounded-xl bg-[#0a0a1a]/50 text-white placeholder-gray-500 font-mono focus:outline-none transition-all duration-300"
                            style={{
                                border: '1px solid rgba(249,162,77,0.3)',
                                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#F9A24D';
                                e.target.style.boxShadow = '0 0 20px rgba(249,162,77,0.2), inset 0 0 20px rgba(0,0,0,0.5)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'rgba(249,162,77,0.3)';
                                e.target.style.boxShadow = 'inset 0 0 20px rgba(0,0,0,0.5)';
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 mt-6 text-[#0a0a1a] font-bold rounded-xl text-sm tracking-widest uppercase transition-all duration-300"
                        style={{
                            background: 'linear-gradient(135deg, #F9A24D, #ff6b35)',
                            boxShadow: '0 0 20px rgba(249,162,77,0.3)',
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 0 40px rgba(249,162,77,0.5)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 0 20px rgba(249,162,77,0.3)'}
                    >
                        Submit Score
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddScoreModal;
