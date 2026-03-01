import React, { useState } from 'react';

const ExtraPointsModal = ({ participant, onSave, onClose }) => {
    const [extraPoints, setExtraPoints] = useState(participant.extraPoints || 0);
    const [reason, setReason] = useState('');

    const handleSave = () => {
        onSave(participant.id, extraPoints, reason);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-secondary border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-heading font-semibold text-white">
                            Add Extra Points
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">
                            For: <span className="text-white font-medium">{participant.name}</span>
                            <span className="text-gray-500 ml-2">({participant.citizenId})</span>
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                        ✕
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
                        <p className="text-yellow-400 font-bold">{extraPoints}</p>
                    </div>
                    <div className="bg-primary rounded-lg p-3 text-center border border-highlight/30">
                        <p className="text-gray-500 text-xs">Final</p>
                        <p className="text-highlight font-bold">{participant.basePoints + extraPoints}</p>
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
                        <label className="block text-gray-400 text-sm font-medium mb-2">Reason (optional)</label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="e.g. Bonus challenge completed, creative solution..."
                            rows={3}
                            className="w-full px-4 py-3 rounded-lg bg-primary border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-highlight focus:ring-1 focus:ring-highlight transition-colors resize-none text-sm"
                        />
                    </div>
                </div>

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
                        className="flex-1 py-3 rounded-lg bg-highlight text-white font-semibold hover:bg-red-600 transition-colors"
                    >
                        Save Points
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExtraPointsModal;
