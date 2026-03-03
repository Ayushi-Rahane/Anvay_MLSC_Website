import React, { createContext, useContext, useState, useEffect } from 'react';
import { getParticipantByCitizenId } from '../services/participantService';
import { createSubmission } from '../services/api';
import { ROOMS_META } from '../data/roomsData'; // Assuming this exists or is needed for metadata


const ParticipantContext = createContext(null);

export const useParticipant = () => {
    const ctx = useContext(ParticipantContext);
    if (!ctx) throw new Error('useParticipant must be used within ParticipantProvider');
    return ctx;
};

// Mock data removed — enforcing real backend data.
export const ParticipantProvider = ({ children }) => {
    const [participant, setParticipant] = useState(null);
    const [citizenId, setCitizenId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Restore session on refresh
    useEffect(() => {
        const saved = localStorage.getItem('bc_citizen_id');
        if (saved) {
            loginByCitizenId(saved);
        }
    }, []);

    // Login using Backend API
    const loginByCitizenId = async (id) => {
        setLoading(true);
        setError('');

        try {
            const data = await getParticipantByCitizenId(id);

            setParticipant(data);
            setCitizenId(data.citizenId || id);
            localStorage.setItem('bc_citizen_id', data.citizenId || id);

        } catch (err) {
            console.error(`Backend connection failed for ${id}:`, err);
            setError(err.response?.data?.message || err.message || 'Citizen not found. Check your ID and try again.');
            setParticipant(null);
            setCitizenId(null);
            localStorage.removeItem('bc_citizen_id');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setParticipant(null);
        setCitizenId(null);
        localStorage.removeItem('bc_citizen_id');
    };

    // Derived values (safe defaults)
    const totalScore = participant?.totalScore ?? 0;
    const roomsCompleted = participant?.rooms?.filter(r => r.completed)?.length ?? 0;
    const currentTier = participant?.currentTier ?? '—';
    const currentRoom = participant?.currentRoom ?? '—';
    const role = participant?.role ?? '—';
    const badges = participant?.badges ?? [];
    const rooms = participant?.rooms ?? [];
    const name = participant?.name ?? '';
    const team = participant?.team ?? '';

    // Complete room and update score
    const completeRoom = async (roomId, secretCode) => {
        if (!citizenId) return;

        try {
            await createSubmission({
                uce: citizenId,
                roomId,
                name: participant?.name || 'Unknown',
                tier: 'Explorer', // Default tier
                secretCode
            });

            // Re-fetch participant data to update UI
            await loginByCitizenId(citizenId);
        } catch (err) {
            console.error('Failed to complete room:', err);
            throw err;
        }
    };

    // Map room array to progress object for UI
    const roomProgress = rooms.reduce((acc, r) => {
        acc[r.id || r.roomId] = r.completed ? r.tier : null;
        return acc;
    }, {});

    return (
        <ParticipantContext.Provider value={{
            participant,
            citizenId,
            loading,
            error,
            loginByCitizenId,
            logout,
            completeRoom,
            ROOMS_META,
            roomProgress,
            totalScore,
            roomsCompleted,
            currentTier,
            currentRoom,
            role,
            badges,
            rooms,
            name,
            team,
        }}>
            {children}
        </ParticipantContext.Provider>
    );
};