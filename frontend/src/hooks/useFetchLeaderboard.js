import { useState, useEffect } from 'react';
import { getLeaderboard } from '../services/leaderboardService';

const useFetchLeaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getLeaderboard();
            setLeaderboard(data);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to fetch leaderboard');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { leaderboard, loading, error, refetch: fetchData };
};

export default useFetchLeaderboard;
