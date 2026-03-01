import React, { useState } from 'react';
import { Search, IdCard } from 'lucide-react';
import BadgeCard from './BadgeCard';
import { getParticipantByCitizenId } from '../../services/participantService';

const BadgeLookup = () => {
    const [citizenId, setCitizenId] = useState('');
    const [participant, setParticipant] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLookup = async (e) => {
        e.preventDefault();
        if (!citizenId.trim()) return;

        setLoading(true);
        setError('');
        setParticipant(null);

        try {
            const data = await getParticipantByCitizenId(citizenId.trim());
            setParticipant(data);
        } catch (err) {
            setError('Citizen not found. Check your ID and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="badge-lookup" className="py-20 px-4 bg-[#0a0a1a] relative z-20">
            <div className="max-w-2xl mx-auto text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <IdCard size={32} className="text-[#F9A24D]" />
                    <h2
                        className="text-4xl md:text-5xl font-bold uppercase tracking-wider"
                        style={{
                            fontFamily: "'Orbitron', sans-serif",
                            color: '#F9A24D',
                            textShadow: '0 0 30px rgba(249,162,77,0.3)',
                        }}
                    >
                        Badge Lookup
                    </h2>
                </div>
                <p
                    className="text-gray-300 text-lg mb-10 max-w-xl mx-auto uppercase tracking-widest"
                    style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                    Enter your Citizen ID to view your badge and progress.
                </p>

                <form onSubmit={handleLookup} className="flex gap-4 mb-10 justify-center max-w-lg mx-auto">
                    <div className="relative flex-1 group">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F9A24D]/60 group-focus-within:text-[#F9A24D] transition-colors" />
                        <input
                            type="text"
                            value={citizenId}
                            onChange={(e) => setCitizenId(e.target.value)}
                            placeholder="Enter Citizen ID..."
                            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#0a0a1a]/50 text-white placeholder-gray-500 font-mono focus:outline-none transition-all duration-300"
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
                        disabled={loading}
                        className="px-8 py-3.5 font-bold rounded-xl text-sm md:text-base tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                            background: 'linear-gradient(135deg, #F9A24D, #ff6b35)',
                            color: '#0a0a1a',
                            boxShadow: '0 0 20px rgba(249,162,77,0.3)',
                        }}
                        onMouseEnter={(e) => {
                            if (!loading) e.target.style.boxShadow = '0 0 40px rgba(249,162,77,0.5)';
                        }}
                        onMouseLeave={(e) => {
                            if (!loading) e.target.style.boxShadow = '0 0 20px rgba(249,162,77,0.3)';
                        }}
                    >
                        {loading ? 'Searching...' : 'Lookup'}
                    </button>
                </form>

                {error && (
                    <p className="text-red-400 mb-4 bg-red-500/10 border border-red-500/30 rounded-lg p-3 inline-block">
                        {error}
                    </p>
                )}
                {participant && <BadgeCard participant={participant} />}
            </div>
        </section>
    );
};

export default BadgeLookup;
