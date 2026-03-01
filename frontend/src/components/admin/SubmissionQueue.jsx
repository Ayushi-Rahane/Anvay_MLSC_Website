import React, { useState } from 'react';
import ExtraPointsModal from './ExtraPointsModal';

// Mock submissions data
const MOCK_SUBMISSIONS = [
    {
        id: 's1', citizenId: 'BC-A7K2X', name: 'Arjun Patel', tier: 'Architect',
        basePoints: 40, extraPoints: 5, status: 'pending', submittedAt: '2 min ago',
    },
    {
        id: 's2', citizenId: 'BC-M3P9Q', name: 'Sneha Kulkarni', tier: 'Builder',
        basePoints: 30, extraPoints: 0, status: 'pending', submittedAt: '5 min ago',
    },
    {
        id: 's3', citizenId: 'BC-R8N1L', name: 'Rahul Deshmukh', tier: 'Explorer',
        basePoints: 20, extraPoints: 0, status: 'pending', submittedAt: '8 min ago',
    },
    {
        id: 's4', citizenId: 'BC-K5T3W', name: 'Priya Sharma', tier: 'Architect',
        basePoints: 40, extraPoints: 10, status: 'approved', submittedAt: '15 min ago',
    },
    {
        id: 's5', citizenId: 'BC-J2V8D', name: 'Vikram Singh', tier: 'Builder',
        basePoints: 30, extraPoints: 0, status: 'approved', submittedAt: '20 min ago',
    },
    {
        id: 's6', citizenId: 'BC-F6Y4H', name: 'Ananya Joshi', tier: 'Explorer',
        basePoints: 20, extraPoints: 0, status: 'rejected', submittedAt: '25 min ago',
    },
];

const tierColors = {
    Explorer: 'text-bronze bg-orange-500/10 border-bronze/30',
    Builder: 'text-silver bg-gray-400/10 border-silver/30',
    Architect: 'text-gold bg-yellow-500/10 border-gold/30',
};

const statusConfig = {
    pending: { label: 'Pending', bg: 'bg-yellow-500/15', text: 'text-yellow-400', border: 'border-yellow-500/30' },
    approved: { label: 'Approved', bg: 'bg-green-500/15', text: 'text-green-400', border: 'border-green-500/30' },
    rejected: { label: 'Rejected', bg: 'bg-red-500/15', text: 'text-red-400', border: 'border-red-500/30' },
    duplicate: { label: 'Duplicate', bg: 'bg-orange-500/15', text: 'text-orange-400', border: 'border-orange-500/30' },
};

const SubmissionQueue = ({ roomColor }) => {
    const [submissions, setSubmissions] = useState(MOCK_SUBMISSIONS);
    const [extraPointsTarget, setExtraPointsTarget] = useState(null);
    const [filter, setFilter] = useState('all');

    const handleApprove = (id) => {
        setSubmissions((prev) =>
            prev.map((s) => (s.id === id ? { ...s, status: 'approved' } : s))
        );
    };

    const handleReject = (id) => {
        setSubmissions((prev) =>
            prev.map((s) => (s.id === id ? { ...s, status: 'rejected' } : s))
        );
    };

    const handleExtraPointsSave = (id, points, reason) => {
        setSubmissions((prev) =>
            prev.map((s) => (s.id === id ? { ...s, extraPoints: points } : s))
        );
    };

    const filtered = filter === 'all' ? submissions : submissions.filter((s) => s.status === filter);
    const pendingCount = submissions.filter((s) => s.status === 'pending').length;

    return (
        <div className="bg-secondary/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-700/50 flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h3 className="text-lg font-heading font-bold text-white">Completion Queue</h3>
                    <p className="text-gray-400 text-sm">
                        {pendingCount > 0 ? (
                            <span><span className="text-yellow-400 font-semibold">{pendingCount}</span> pending approval</span>
                        ) : (
                            'No pending submissions'
                        )}
                    </p>
                </div>
                <div className="flex gap-2">
                    {['all', 'pending', 'approved', 'rejected'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${filter === f
                                    ? 'text-white'
                                    : 'text-gray-400 hover:text-white bg-gray-700/30 hover:bg-gray-700/50'
                                }`}
                            style={filter === f ? { backgroundColor: `${roomColor}30`, color: roomColor } : {}}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-700/30">
                            <th className="text-left px-6 py-3">#</th>
                            <th className="text-left px-4 py-3">Citizen ID</th>
                            <th className="text-left px-4 py-3">Name</th>
                            <th className="text-left px-4 py-3">Tier</th>
                            <th className="text-center px-4 py-3">Base</th>
                            <th className="text-center px-4 py-3">Extra</th>
                            <th className="text-center px-4 py-3">Final</th>
                            <th className="text-center px-4 py-3">Status</th>
                            <th className="text-center px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((sub, index) => {
                            const status = statusConfig[sub.status];
                            const finalPoints = sub.basePoints + sub.extraPoints;

                            return (
                                <tr
                                    key={sub.id}
                                    className="border-b border-gray-700/20 hover:bg-gray-700/20 transition-colors"
                                >
                                    <td className="px-6 py-4 text-gray-400 font-medium">{index + 1}</td>
                                    <td className="px-4 py-4">
                                        <code className="text-sm px-2 py-1 rounded bg-primary text-gray-300">{sub.citizenId}</code>
                                    </td>
                                    <td className="px-4 py-4 text-white font-medium">{sub.name}</td>
                                    <td className="px-4 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${tierColors[sub.tier] || 'text-gray-400'}`}>
                                            {sub.tier}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-center text-gray-300 font-medium">{sub.basePoints}</td>
                                    <td className="px-4 py-4 text-center text-yellow-400 font-medium">
                                        {sub.extraPoints > 0 ? `+${sub.extraPoints}` : '—'}
                                    </td>
                                    <td className="px-4 py-4 text-center font-bold" style={{ color: roomColor }}>
                                        {finalPoints}
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${status.bg} ${status.text} ${status.border}`}>
                                            {status.label}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            {sub.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleApprove(sub.id)}
                                                        className="px-3 py-1.5 rounded-lg bg-green-500/15 text-green-400 text-xs font-bold hover:bg-green-500/25 transition-colors border border-green-500/30"
                                                    >
                                                        ✓ Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(sub.id)}
                                                        className="px-3 py-1.5 rounded-lg bg-red-500/15 text-red-400 text-xs font-bold hover:bg-red-500/25 transition-colors border border-red-500/30"
                                                    >
                                                        ✕ Reject
                                                    </button>
                                                </>
                                            )}
                                            <button
                                                onClick={() => setExtraPointsTarget(sub)}
                                                className="px-3 py-1.5 rounded-lg bg-yellow-500/15 text-yellow-400 text-xs font-bold hover:bg-yellow-500/25 transition-colors border border-yellow-500/30"
                                            >
                                                +Extra
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {filtered.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <p className="text-3xl mb-2">📭</p>
                        <p>No {filter === 'all' ? '' : filter} submissions</p>
                    </div>
                )}
            </div>

            {/* Extra Points Modal */}
            {extraPointsTarget && (
                <ExtraPointsModal
                    participant={extraPointsTarget}
                    onSave={handleExtraPointsSave}
                    onClose={() => setExtraPointsTarget(null)}
                />
            )}
        </div>
    );
};

export default SubmissionQueue;
