import API from './api';

// Citizen ID login — used by login screen and context
export const getParticipantByCitizenId = async (citizenId) => {
    const response = await API.get(`/participants/${citizenId}`);
    return response.data;
};

export const fetchLeaderboard = async () => {
    const response = await API.get('/leaderboard');
    return response.data;
};

export const lookupParticipant = async (walletAddress) => {
    const response = await API.get(`/participants/${walletAddress}`);
    return response.data;
};

export const registerParticipant = async (data) => {
    const response = await API.post('/participants/register', data);
    return response.data;
};

export const submitRoomStamp = async (data) => {
    const response = await API.post('/participants/stamp', data);
    return response.data;
};

export const lookupBadge = async (walletAddress) => {
    const response = await API.get(`/badges/${walletAddress}`);
    return response.data;
};

export const fetchParticipantProgress = async (walletAddress) => {
    const response = await API.get(`/participants/${walletAddress}/progress`);
    return response.data;
};

export const fetchActiveSpeedRound = async () => {
    const response = await API.get('/speed-rounds/active');
    return response.data;
};

export const fetchActiveProposal = async () => {
    const response = await API.get('/governance/active');
    return response.data;
};