import React, { useState } from 'react';
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
        <section id="badge-lookup" className="py-16 px-4 bg-secondary">
            <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                    🎖️ Badge Lookup
                </h2>
                <p className="text-gray-400 mb-8">
                    Enter your Citizen ID to view your badge and progress.
                </p>

                <form onSubmit={handleLookup} className="flex gap-4 mb-8 justify-center">
                    <input
                        type="text"
                        value={citizenId}
                        onChange={(e) => setCitizenId(e.target.value)}
                        placeholder="Enter Citizen ID..."
                        className="px-4 py-3 rounded-lg bg-primary border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-highlight w-64"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-3 bg-highlight text-white rounded-lg font-semibold hover:bg-red-600 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Searching...' : 'Lookup'}
                    </button>
                </form>

                {error && <p className="text-red-400 mb-4">{error}</p>}
                {participant && <BadgeCard participant={participant} />}
            </div>
        </section>
    );
};

export default BadgeLookup;
