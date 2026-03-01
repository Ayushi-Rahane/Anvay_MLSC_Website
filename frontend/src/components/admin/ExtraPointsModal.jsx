import React, { useState } from 'react';
import { X, Star, Save } from 'lucide-react';

const ExtraPointsModal = ({ participant, onSave, onClose }) => {
    const [extraPoints, setExtraPoints] = useState(0);
    const [reason, setReason] = useState('');

    const handleSave = () => {
        if (extraPoints <= 0) return;
        onSave(participant.id, extraPoints, reason);
        onClose();
    };

    const currentExtra = participant.extraPoints || 0;
    const newTotal = currentExtra + extraPoints;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-secondary border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2
                            className="text-xl font-bold flex items-center gap-2 uppercase tracking-wider"
                            style={{ fontFamily: "'Orbitron', sans-serif", color: '#F9A24D' }}
                        >
                            <Star size={18} className="text-[#F9A24D]" />
                            Add Extra Points
                        </h2>
                        <p
                            className="text-gray-300 text-sm mt-1 uppercase tracking-widest"
                            style={{ fontFamily: "'Rajdhani', sans-serif" }}
                        >
                            For: <span className="text-white font-medium">{participant.name}</span>
                            <span className="text-gray-500 ml-2">({participant.citizenId})</span>
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Current Score Summary */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-primary rounded-lg p-3 text-center">
                        <p className="text-gray-500 text-xs">Base</p>
                        <p className="text-white font-bold">{participant.basePoints}</p>
                    </div>
                    <div className="bg-primary rounded-lg p-3 text-center">
                        <p className="text-gray-500 text-xs">Extra</p>
                        <p className="text-yellow-400 font-bold">{currentExtra} + {extraPoints}</p>
                    </div>
                    <div className="bg-primary rounded-lg p-3 text-center border border-highlight/30">
                        <p className="text-gray-500 text-xs">Final</p>
                        <p className="text-highlight font-bold">{participant.basePoints + newTotal}</p>
                    </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">Extra Points</label>
                        <input
                            type="number"
                            value={extraPoints}
                            onChange={(e) => setExtraPoints(Math.max(0, parseInt(e.target.value) || 0))}
                            min="0"
                            max="50"
                            className="w-full px-4 py-3 rounded-lg bg-primary border border-gray-600 text-white focus:outline-none focus:border-highlight focus:ring-1 focus:ring-highlight transition-colors text-lg font-bold text-center"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">
                            Reason <span className="text-yellow-400">*</span>
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="e.g. Bonus challenge completed, creative solution, helped teammates..."
                            rows={3}
                            className="w-full px-4 py-3 rounded-lg bg-primary border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-highlight focus:ring-1 focus:ring-highlight transition-colors resize-none text-sm"
                        />
                    </div>
                </div>

                {/* Existing History Preview */}
                {participant.extraHistory && participant.extraHistory.length > 0 && (
                    <div className="mt-4 p-3 bg-primary/60 border border-gray-700/30 rounded-lg">
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Previous Awards</p>
                        <div className="space-y-1.5 max-h-24 overflow-y-auto">
                            {participant.extraHistory.map((entry, i) => (
                                <div key={i} className="flex items-center justify-between text-xs">
                                    <span className="text-gray-300">{entry.reason || 'No reason'}</span>
                                    <span className="text-yellow-400 font-bold ml-2">+{entry.points}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 rounded-lg border border-gray-600 text-gray-300 font-semibold hover:bg-gray-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={extraPoints <= 0}
                        className="flex-1 py-3 text-[#0a0a1a] font-bold rounded-lg text-sm tracking-widest uppercase transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        style={{
                            background: 'linear-gradient(135deg, #F9A24D, #ff6b35)',
                            boxShadow: '0 0 15px rgba(249,162,77,0.3)',
                        }}
                        onMouseEnter={(e) => {
                            if (extraPoints > 0) e.target.style.boxShadow = '0 0 25px rgba(249,162,77,0.5)';
                        }}
                        onMouseLeave={(e) => {
                            if (extraPoints > 0) e.target.style.boxShadow = '0 0 15px rgba(249,162,77,0.3)';
                        }}
                    >
                        <Save size={16} />
                        Save Points
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExtraPointsModal;
