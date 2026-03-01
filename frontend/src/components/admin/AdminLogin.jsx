import React, { useState } from 'react';
import { Lock, LogIn } from 'lucide-react';
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
                    <div
                        className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300"
                        style={{
                            background: 'rgba(249,162,77,0.1)',
                            border: '1px solid rgba(249,162,77,0.3)',
                            boxShadow: '0 0 20px rgba(249,162,77,0.2)',
                        }}
                    >
                        <Lock size={28} className="text-[#F9A24D]" />
                    </div>
                    <h1
                        className="text-4xl font-bold uppercase tracking-wider mb-2"
                        style={{
                            fontFamily: "'Orbitron', sans-serif",
                            color: '#F9A24D',
                            textShadow: '0 0 25px rgba(249,162,77,0.3)',
                        }}
                    >
                        Admin Login
                    </h1>
                    <p
                        className="text-gray-400 text-lg uppercase tracking-widest"
                        style={{ fontFamily: "'Rajdhani', sans-serif" }}
                    >
                        Enter your credentials to access the dashboard
                    </p>
                </div>

                {/* Login Card */}
                <div
                    className="rounded-2xl p-8 backdrop-blur-xl border relative overflow-hidden"
                    style={{
                        backgroundColor: 'rgba(10, 10, 26, 0.8)',
                        borderColor: 'rgba(249,162,77,0.2)',
                        boxShadow: '0 0 40px rgba(0,0,0,0.5)',
                    }}
                >
                    {/* Scan lines effect inside card */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-5"
                        style={{
                            background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(249,162,77,0.5) 2px, rgba(249,162,77,0.5) 4px)`,
                        }}
                    />

                    <div className="relative z-10">
                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    className="block text-[#F9A24D] text-xs font-bold mb-2 uppercase tracking-widest"
                                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter username"
                                    className="w-full px-4 py-3.5 rounded-xl bg-[#0a0a1a]/50 text-white placeholder-gray-500 font-mono focus:outline-none transition-all duration-300"
                                    style={{
                                        border: '1px solid rgba(249,162,77,0.3)',
                                        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#F9A24D';
                                        e.target.style.boxShadow = '0 0 20px rgba(249,162,77,0.2), inset 0 0 20px rgba(0,0,0,0.5)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(249,162,77,0.3)';
                                        e.target.style.boxShadow = 'inset 0 0 20px rgba(0,0,0,0.5)';
                                    }}
                                />
                            </div>

                            <div>
                                <label
                                    className="block text-[#F9A24D] text-xs font-bold mb-2 uppercase tracking-widest"
                                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter password"
                                    className="w-full px-4 py-3.5 rounded-xl bg-[#0a0a1a]/50 text-white placeholder-gray-500 font-mono focus:outline-none transition-all duration-300"
                                    style={{
                                        border: '1px solid rgba(249,162,77,0.3)',
                                        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#F9A24D';
                                        e.target.style.boxShadow = '0 0 20px rgba(249,162,77,0.2), inset 0 0 20px rgba(0,0,0,0.5)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(249,162,77,0.3)';
                                        e.target.style.boxShadow = 'inset 0 0 20px rgba(0,0,0,0.5)';
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 text-[#0a0a1a] font-bold rounded-xl text-sm tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2"
                                style={{
                                    background: 'linear-gradient(135deg, #F9A24D, #ff6b35)',
                                    boxShadow: '0 0 20px rgba(249,162,77,0.3)',
                                }}
                                onMouseEnter={(e) => {
                                    if (!loading) e.target.style.boxShadow = '0 0 40px rgba(249,162,77,0.5)';
                                }}
                                onMouseLeave={(e) => {
                                    if (!loading) e.target.style.boxShadow = '0 0 20px rgba(249,162,77,0.3)';
                                }}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-[#0a0a1a]" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Signing in...
                                    </span>
                                ) : (
                                    <>
                                        <LogIn size={18} />
                                        Sign In
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
