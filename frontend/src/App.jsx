import React from 'react';
import AppRoutes from './routes';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import { AuthProvider } from './context/AuthContext';
import { LeaderboardProvider } from './context/LeaderboardContext';
import { ParticipantProvider } from './context/ParticipantContext';
import GlobalParticles from './components/common/GlobalParticles';
import { ParticipantProvider } from './context/ParticipantContext';

function App() {
    return (
        <AuthProvider>
            <ParticipantProvider>
                <LeaderboardProvider>
                    <div className="min-h-screen flex flex-col bg-primary relative">
                        <GlobalParticles />
                        <Navbar />
                        <main className="flex-1">
                            <AppRoutes />
                        </main>
                        <Footer />
                    </div>
                </LeaderboardProvider>
            </ParticipantProvider>
        </AuthProvider>
    );
}

export default App;