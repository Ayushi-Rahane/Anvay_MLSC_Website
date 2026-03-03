import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getParticipants = () => API.get('/participants').then(res => res.data);
export const getParticipantByUce = (uce) => API.get(`/participants/${uce}`).then(res => res.data);

// Submissions / Room Completion API
export const createSubmission = (data) => API.post('/submissions', data).then(res => res.data);
export const getSubmissionsByRoom = (roomId) => API.get(`/submissions/room/${roomId}`).then(res => res.data);
export const updateSubmissionStatus = (id, data) => API.put(`/submissions/${id}/status`, data).then(res => res.data);
export const deleteSubmission = (id) => API.delete(`/submissions/${id}`).then(res => res.data);
export const removeExtraPoints = (id, index) => API.delete(`/submissions/${id}/extra/${index}`).then(res => res.data);


// Request interceptor — attach auth token
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor — handle errors globally
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default API;
