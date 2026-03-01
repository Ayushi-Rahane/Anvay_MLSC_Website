import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';

const Admin = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <div className="text-gray-400">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-primary">
            {isAuthenticated ? <AdminDashboard /> : <AdminLogin />}
        </div>
    );
};

export default Admin;
