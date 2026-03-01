import React, { createContext, useContext, useState } from 'react';

const LeaderboardContext = createContext(null);

export const useLeaderboardContext = () => {
    const context = useContext(LeaderboardContext);
    if (!context) {
        throw new Error('useLeaderboardContext must be used within a LeaderboardProvider');
    }
    return context;
};

export const LeaderboardProvider = ({ children }) => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [lastUpdated, setLastUpdated] = useState(null);

    const updateLeaderboard = (data) => {
        setLeaderboard(data);
        setLastUpdated(new Date());
    };

    const value = {
        leaderboard,
        lastUpdated,
        updateLeaderboard,
    };

    return (
        <LeaderboardContext.Provider value={value}>
            {children}
        </LeaderboardContext.Provider>
    );
};

export default LeaderboardContext;
