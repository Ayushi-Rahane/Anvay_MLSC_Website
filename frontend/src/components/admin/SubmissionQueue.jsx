import React, { useState, useEffect } from 'react';
import { Search, Check, X, Plus, Clock, ChevronDown, ChevronUp, FileText, Trash2 } from 'lucide-react';
import ExtraPointsModal from './ExtraPointsModal';
import { getSubmissionsByRoom, updateSubmissionStatus, deleteSubmission, removeExtraPoints } from '../../services/api';


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

const SubmissionQueue = ({ room }) => {
    const roomColor = room.color || '#F9A24D';
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [extraPointsTarget, setExtraPointsTarget] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const [expandedHistory, setExpandedHistory] = useState(null);

    const fetchSubmissions = async () => {
        try {
            const data = await getSubmissionsByRoom(room.id);
            const safeData = data.map(sub => ({
                ...sub,
                basePoints: sub.basePoints || 100,
                extraPoints: sub.extraPoints || 0,
                extraHistory: sub.extraHistory || []
            }));
            setSubmissions(safeData);
        } catch (err) {
            console.error('Failed to fetch submissions', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
        const interval = setInterval(fetchSubmissions, 10000); // Polling every 10s
        return () => clearInterval(interval);
    }, [room.id]);

    const handleExtraPointsSave = async (id, points, reason) => {

        try {
            await updateSubmissionStatus(id, { extraPoints: points, reason });
            fetchSubmissions();
        } catch (err) {
            console.error('Failed to add extra points', err);
        }
    };

    const handleRemoveExtraPoints = async (id, index) => {
        if (!window.confirm('Are you sure you want to remove these bonus points?')) return;
        try {
            await removeExtraPoints(id, index);
            fetchSubmissions();
        } catch (err) {
            console.error('Failed to remove extra points', err);
        }
    };

    const toggleHistory = (id) => {

        setExpandedHistory(expandedHistory === id ? null : id);
    };

    // Filter by Tab and Search
    const displayedSubmissions = submissions.filter((s) => {
        // We only care about completed (approved) submissions in new flow
        if (s.status !== 'approved') return false;

        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        return (
            s.citizenId.toLowerCase().includes(query) ||
            s.name.toLowerCase().includes(query)
        );
    });

    const completedCount = submissions.filter((s) => s.status === 'approved').length;


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
                            Room Activity
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Manage points for participants who have completed the room
                        </p>

                    </div>
                </div>

                {/* Search Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 px-2">
                        <span className="px-4 py-2 rounded-md text-sm font-bold tracking-wider bg-gray-700/80 text-white shadow-lg border border-gray-600/50">
                            COMPLETED ({completedCount})
                        </span>
                    </div>

                    <div className="relative w-full md:w-64">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search ID or Name..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-primary border border-gray-600 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 transition-colors"
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
            </div>

            {/* Table */}
            <div className="overflow-x-auto min-h-[300px]">
                <table className="w-full">
                    <thead>
                        <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-700/30">
                            <th className="text-left px-6 py-3">#</th>
                            <th className="text-left px-4 py-3">Citizen ID</th>
                            <th className="text-left px-4 py-3">Name</th>
                            <th className="text-center px-4 py-3">Status</th>
                            <th className="text-center px-4 py-3">Base</th>
                            <th className="text-center px-4 py-3">Extra</th>
                            <th className="text-center px-4 py-3">Total</th>
                            <th className="text-center px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedSubmissions.map((sub, index) => {
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
                                        <td className="px-4 py-4 text-white font-medium">
                                            {sub.name}
                                            <div className="mt-1">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${tierColors[sub.tier] || 'text-gray-400'}`}>
                                                    {sub.tier}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-4 py-4 text-center">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${status.bg} ${status.text} ${status.border}`}>
                                                {status.label}
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
                                                    >
                                                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-center font-bold" style={{ color: roomColor }}>
                                            {finalPoints}
                                        </td>

                                        <td className="px-4 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleExtraPointsSave(sub.id, sub.extraPoints + 3, 'Bonus +3')}
                                                    className="px-2 py-1 rounded bg-yellow-500/15 text-yellow-400 text-xs font-bold hover:bg-yellow-500/25 transition-colors border border-yellow-500/30 font-mono"
                                                >
                                                    +3
                                                </button>
                                                <button
                                                    onClick={() => handleExtraPointsSave(sub.id, sub.extraPoints + 4, 'Bonus +4')}
                                                    className="px-2 py-1 rounded bg-orange-500/15 text-orange-400 text-xs font-bold hover:bg-orange-500/25 transition-colors border border-orange-500/30 font-mono"
                                                >
                                                    +4
                                                </button>
                                                <button
                                                    onClick={() => handleExtraPointsSave(sub.id, sub.extraPoints + 5, 'Bonus +5')}
                                                    className="px-2 py-1 rounded bg-red-500/15 text-red-500 text-xs font-bold hover:bg-red-500/25 transition-colors border border-red-500/30 font-mono"
                                                >
                                                    +5
                                                </button>
                                            </div>
                                        </td>
                                    </tr>

                                    {/* Extra Points History (expandable) */}
                                    {isExpanded && hasHistory && (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-0">
                                                <div className="bg-primary/60 border border-gray-700/30 rounded-lg mb-3 mt-1 overflow-hidden">
                                                    <div className="px-4 py-2 border-b border-gray-700/30 flex items-center gap-2">
                                                        <Clock size={13} className="text-yellow-400" />
                                                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Extra Points History</span>
                                                    </div>
                                                    <div className="divide-y divide-gray-700/20">
                                                        {sub.extraHistory.map((entry, i) => (
                                                            <div key={i} className="px-4 py-2.5 flex items-center justify-between group hover:bg-white/5 transition-colors">
                                                                <div className="flex items-center gap-3">
                                                                    <span className="text-yellow-400 font-bold text-sm">+{entry.points}</span>
                                                                    <span className="text-gray-300 text-sm">{entry.reason || 'No reason provided'}</span>
                                                                </div>
                                                                <div className="flex items-center gap-3">
                                                                    <span className="text-gray-500 text-xs">{new Date(entry.addedAt).toLocaleString()}</span>
                                                                    <button
                                                                        onClick={() => handleRemoveExtraPoints(sub.id, i)}
                                                                        className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 opacity-0 group-hover:opacity-100 transition-all"
                                                                        title="Remove bonus points"
                                                                    >
                                                                        <Trash2 size={13} />
                                                                    </button>
                                                                </div>
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

                {displayedSubmissions.length === 0 && !loading && (
                    <div className="text-center py-12 text-gray-500 h-full flex flex-col items-center justify-center">
                        <FileText size={32} className="mb-3 text-gray-600" />
                        <p>{searchQuery ? `No results for "${searchQuery}"` : 'No completed submissions yet'}</p>

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
