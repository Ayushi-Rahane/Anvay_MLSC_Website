import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for saved token on mount
        if (token) {
            // TODO: Validate token with backend
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [token]);

    const login = (adminData, authToken) => {
        setAdmin(adminData);
        setToken(authToken);
        localStorage.setItem('token', authToken);
    };

    const logout = () => {
        setAdmin(null);
        setToken(null);
        localStorage.removeItem('token');
    };

    const value = {
        admin,
        token,
        loading,
        isAuthenticated: !!token,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
