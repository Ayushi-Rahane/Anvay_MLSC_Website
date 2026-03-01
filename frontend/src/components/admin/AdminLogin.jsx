import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // TODO: Replace with actual API call
            // const response = await API.post('/admin/login', formData);
            // login(response.data, response.data.token);

            // Temporary mock login for development
            if (formData.username === 'admin' && formData.password === 'admin123') {
                login({ name: 'Admin', email: 'admin@blockcity.com' }, 'mock-jwt-token');
            } else {
                setError('Invalid username or password');
            }
        } catch (err) {
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="text-5xl mb-4">🔐</div>
                    <h1 className="text-3xl font-heading font-bold text-white mb-2">
                        Admin Login
                    </h1>
                    <p className="text-gray-400">
                        Enter your credentials to access the dashboard
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-secondary border border-gray-700 rounded-2xl p-8">
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-gray-400 text-sm font-medium mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                placeholder="Enter username"
                                className="w-full px-4 py-3 rounded-lg bg-primary border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-highlight focus:ring-1 focus:ring-highlight transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-400 text-sm font-medium mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Enter password"
                                className="w-full px-4 py-3 rounded-lg bg-primary border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-highlight focus:ring-1 focus:ring-highlight transition-colors"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-highlight text-white font-semibold rounded-lg hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
