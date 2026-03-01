import API from './api';

// Get participant by citizen ID
export const getParticipantByCitizenId = async (citizenId) => {
    const response = await API.get(`/participants/citizen/${citizenId}`);
    return response.data;
};

// Get all participants
export const getAllParticipants = async () => {
    const response = await API.get('/participants');
    return response.data;
};

// Register a new participant
export const registerParticipant = async (participantData) => {
    const response = await API.post('/participants', participantData);
    return response.data;
};

// Update participant details
export const updateParticipant = async (id, updateData) => {
    const response = await API.put(`/participants/${id}`, updateData);
    return response.data;
};
