import React, { useState } from 'react';
import { Search, Check, X, Plus, Clock, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import ExtraPointsModal from './ExtraPointsModal';

// Mock submissions data with extra points history
const INITIAL_SUBMISSIONS = [
    {
        id: 's1', citizenId: 'BC-A7K2X', name: 'Arjun Patel', tier: 'Architect',
        basePoints: 40, extraPoints: 5, status: 'pending', submittedAt: '2 min ago',
        extraHistory: [
            { points: 5, reason: 'Creative approach to solving the puzzle', addedAt: '5 min ago' },
        ],
    },
    {
        id: 's2', citizenId: 'BC-M3P9Q', name: 'Sneha Kulkarni', tier: 'Builder',
        basePoints: 30, extraPoints: 0, status: 'pending', submittedAt: '5 min ago',
        extraHistory: [],
    },
    {
        id: 's3', citizenId: 'BC-R8N1L', name: 'Rahul Deshmukh', tier: 'Explorer',
        basePoints: 20, extraPoints: 0, status: 'pending', submittedAt: '8 min ago',
        extraHistory: [],
    },
    {
        id: 's4', citizenId: 'BC-K5T3W', name: 'Priya Sharma', tier: 'Architect',
        basePoints: 40, extraPoints: 10, status: 'approved', submittedAt: '15 min ago',
        extraHistory: [
            { points: 5, reason: 'Helped teammates during mission', addedAt: '12 min ago' },
            { points: 5, reason: 'Fastest completion in this room', addedAt: '10 min ago' },
        ],
    },
    {
        id: 's5', citizenId: 'BC-J2V8D', name: 'Vikram Singh', tier: 'Builder',
        basePoints: 30, extraPoints: 0, status: 'approved', submittedAt: '20 min ago',
        extraHistory: [],
    },
    {
        id: 's6', citizenId: 'BC-F6Y4H', name: 'Ananya Joshi', tier: 'Explorer',
        basePoints: 20, extraPoints: 0, status: 'rejected', submittedAt: '25 min ago',
        extraHistory: [],
    },
];

const tierColors = {
    Explorer: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
    Builder: 'text-gray-300 bg-gray-400/10 border-gray-400/30',
    Architect: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
};

const statusConfig = {
    pending: { label: 'Pending', bg: 'bg-yellow-500/15', text: 'text-yellow-400', border: 'border-yellow-500/30' },
    approved: { label: 'Approved', bg: 'bg-green-500/15', text: 'text-green-400', border: 'border-green-500/30' },
    rejected: { label: 'Rejected', bg: 'bg-red-500/15', text: 'text-red-400', border: 'border-red-500/30' },
    duplicate: { label: 'Duplicate', bg: 'bg-orange-500/15', text: 'text-orange-400', border: 'border-orange-500/30' },
};

const SubmissionQueue = ({ roomColor }) => {
    const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);
    const [extraPointsTarget, setExtraPointsTarget] = useState(null);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedHistory, setExpandedHistory] = useState(null);

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
            prev.map((s) => {
                if (s.id === id) {
                    const newHistory = [
                        { points, reason, addedAt: 'Just now' },
                        ...s.extraHistory,
                    ];
                    const totalExtra = newHistory.reduce((sum, h) => sum + h.points, 0);
                    return { ...s, extraPoints: totalExtra, extraHistory: newHistory };
                }
                return s;
            })
        );
    };

    const toggleHistory = (id) => {
        setExpandedHistory(expandedHistory === id ? null : id);
    };

    // Filter + search
    const filtered = submissions
        .filter((s) => filter === 'all' || s.status === filter)
        .filter((s) => {
            if (!searchQuery.trim()) return true;
            const query = searchQuery.toLowerCase();
            return (
                s.citizenId.toLowerCase().includes(query) ||
                s.name.toLowerCase().includes(query)
            );
        });

    const pendingCount = submissions.filter((s) => s.status === 'pending').length;

    return (
        <div className="bg-secondary/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-700/50">
                <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                    <div>
                        <h3
                            className="text-xl font-bold flex items-center gap-2 uppercase tracking-wider"
                            style={{ fontFamily: "'Orbitron', sans-serif", color: roomColor }}
                        >
                            <FileText size={18} />
                            Completion Queue
                        </h3>
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

                {/* Search Bar */}
                <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by Citizen ID or Name..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-primary border border-gray-600 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 transition-colors"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                        >
                            <X size={14} />
                        </button>
                    )}
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
                            const hasHistory = sub.extraHistory.length > 0;
                            const isExpanded = expandedHistory === sub.id;

                            return (
                                <React.Fragment key={sub.id}>
                                    <tr className="border-b border-gray-700/20 hover:bg-gray-700/20 transition-colors">
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
                                        <td className="px-4 py-4 text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <span className="text-yellow-400 font-medium">
                                                    {sub.extraPoints > 0 ? `+${sub.extraPoints}` : '—'}
                                                </span>
                                                {hasHistory && (
                                                    <button
                                                        onClick={() => toggleHistory(sub.id)}
                                                        className="p-0.5 rounded text-gray-500 hover:text-yellow-400 transition-colors"
                                                        title="View extra points history"
                                                    >
                                                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                                    </button>
                                                )}
                                            </div>
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
                                                            className="px-3 py-1.5 rounded-lg bg-green-500/15 text-green-400 text-xs font-bold hover:bg-green-500/25 transition-colors border border-green-500/30 flex items-center gap-1"
                                                        >
                                                            <Check size={12} /> Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleReject(sub.id)}
                                                            className="px-3 py-1.5 rounded-lg bg-red-500/15 text-red-400 text-xs font-bold hover:bg-red-500/25 transition-colors border border-red-500/30 flex items-center gap-1"
                                                        >
                                                            <X size={12} /> Reject
                                                        </button>
                                                    </>
                                                )}
                                                <button
                                                    onClick={() => setExtraPointsTarget(sub)}
                                                    className="px-3 py-1.5 rounded-lg bg-yellow-500/15 text-yellow-400 text-xs font-bold hover:bg-yellow-500/25 transition-colors border border-yellow-500/30 flex items-center gap-1"
                                                >
                                                    <Plus size={12} /> Extra
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Extra Points History (expandable) */}
                                    {isExpanded && hasHistory && (
                                        <tr>
                                            <td colSpan={9} className="px-6 py-0">
                                                <div className="bg-primary/60 border border-gray-700/30 rounded-lg mb-3 mt-1 overflow-hidden">
                                                    <div className="px-4 py-2 border-b border-gray-700/30 flex items-center gap-2">
                                                        <Clock size={13} className="text-yellow-400" />
                                                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Extra Points History</span>
                                                    </div>
                                                    <div className="divide-y divide-gray-700/20">
                                                        {sub.extraHistory.map((entry, i) => (
                                                            <div key={i} className="px-4 py-2.5 flex items-center justify-between">
                                                                <div className="flex items-center gap-3">
                                                                    <span className="text-yellow-400 font-bold text-sm">+{entry.points}</span>
                                                                    <span className="text-gray-300 text-sm">{entry.reason || 'No reason provided'}</span>
                                                                </div>
                                                                <span className="text-gray-500 text-xs">{entry.addedAt}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>

                {filtered.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <Search size={32} className="mx-auto mb-3 text-gray-600" />
                        <p>{searchQuery ? `No results for "${searchQuery}"` : `No ${filter === 'all' ? '' : filter} submissions`}</p>
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
