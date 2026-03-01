import API from './api';

// Get full leaderboard (sorted by points)
export const getLeaderboard = async () => {
    const response = await API.get('/leaderboard');
    return response.data;
};

// Get leaderboard by room
export const getLeaderboardByRoom = async (roomId) => {
    const response = await API.get(`/leaderboard/room/${roomId}`);
    return response.data;
};

// Submit a score for a participant in a room
export const submitScore = async (scoreData) => {
    const response = await API.post('/leaderboard/submit', scoreData);
    return response.data;
};
