import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

// Participant Pages
import ParticipantLogin from './pages/participant/ParticipantLogin';
import ParticipantDashboard from './pages/participant/ParticipantDashboard';
import ParticipantProfile from './pages/participant/ParticipantProfile';
import RoomDetail from './pages/participant/RoomDetail';
import Onboarding from './pages/participant/Onboarding';
import Progress from './pages/participant/Progress';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />

            {/* Participant Routes */}
            <Route path="/participant" element={<ParticipantLogin />} />
            <Route path="/participant/dashboard" element={<ParticipantDashboard />} />
            <Route path="/participant/profile" element={<ParticipantProfile />} />
            <Route path="/participant/room/:roomId" element={<RoomDetail />} />
            <Route path="/participant/onboarding" element={<Onboarding />} />
            <Route path="/participant/progress" element={<Progress />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;