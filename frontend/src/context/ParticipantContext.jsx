import React, { createContext, useContext, useState, useEffect } from 'react';
import { getParticipantByCitizenId } from '../services/participantService';

const ParticipantContext = createContext(null);

export const useParticipant = () => {
    const ctx = useContext(ParticipantContext);
    if (!ctx) throw new Error('useParticipant must be used within ParticipantProvider');
    return ctx;
};

// ─── Mock data — used when backend returns 500 during development ─────────────
// DELETE this function once your /api/participants/citizen/:id endpoint works
const getMockParticipant = (id) => ({
    name: id,
    team: 'Team Alpha',
    role: 'Auditor',
    totalScore: 475,
    currentTier: 'Architect',
    currentRoom: 'Control Center',
    rooms: [
        { name: 'Law Foundry', description: 'Learn about smart contracts and blockchain law', completed: true, inProgress: false, progress: 100, points: 100, maxProgress: 100, tier: 'Architect', earnedPoints: 100 },
        { name: 'Treasury Mint', description: 'Master DeFi and tokenomics', completed: true, inProgress: false, progress: 100, points: 100, maxProgress: 100, tier: 'Builder', earnedPoints: 100 },
        { name: 'Identity Bureau', description: 'Explore decentralized identity solutions', completed: true, inProgress: false, progress: 100, points: 100, maxProgress: 100, tier: 'Architect', earnedPoints: 100 },
        { name: 'Council Chamber', description: 'Understand DAO governance', completed: true, inProgress: false, progress: 100, points: 100, maxProgress: 100, tier: 'Builder', earnedPoints: 100 },
        { name: 'Control Center', description: 'Build Web3 applications', completed: false, inProgress: true, progress: 75, points: 100, maxProgress: 100, tier: null, earnedPoints: 0 },
    ],
    badges: [
        { name: 'Quick Learner', icon: '⚡' },
        { name: 'Team Player', icon: '🤝' },
    ],
});

export const ParticipantProvider = ({ children }) => {
    const [participant, setParticipant] = useState(null);
    const [citizenId, setCitizenId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Restore session on mount
    useEffect(() => {
        const saved = localStorage.getItem('bc_citizen_id');
        if (saved) loginByCitizenId(saved);
    }, []);

    const loginByCitizenId = async (id) => {
        setLoading(true);
        setError('');
        try {
            const data = await getParticipantByCitizenId(id);
            setParticipant(data);
            setCitizenId(id);
            localStorage.setItem('bc_citizen_id', id);
        } catch (err) {
            const status = err?.response?.status;
            if (status === 404) {
                setError('Citizen not found. Check your ID and try again.');
                localStorage.removeItem('bc_citizen_id');
            } else {
                // 500 or any other error — fall back to mock so frontend stays testable
                console.warn(`Backend returned ${status}, using mock data`);
                const mock = getMockParticipant(id);
                setParticipant(mock);
                setCitizenId(id);
                localStorage.setItem('bc_citizen_id', id);
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setParticipant(null);
        setCitizenId(null);
        localStorage.removeItem('bc_citizen_id');
    };

    const totalScore = participant?.totalScore ?? 0;
    const roomsCompleted = participant?.rooms?.filter(r => r.completed)?.length ?? 0;
    const currentTier = participant?.currentTier ?? '—';
    const currentRoom = participant?.currentRoom ?? '—';
    const role = participant?.role ?? '—';
    const badges = participant?.badges ?? [];
    const rooms = participant?.rooms ?? [];
    const name = participant?.name ?? '';
    const team = participant?.team ?? '';

    return (
        <ParticipantContext.Provider value={{
            participant, citizenId, loading, error,
            loginByCitizenId, logout,
            totalScore, roomsCompleted, currentTier, currentRoom,
            role, badges, rooms, name, team,
        }}>
            {children}
        </ParticipantContext.Provider>
    );
};