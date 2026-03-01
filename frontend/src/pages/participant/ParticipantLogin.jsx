import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useParticipant } from '../../context/ParticipantContext';

const DEMO_IDS = ['BC2025001', 'BC2025002', 'BC2025003'];

const ParticipantLogin = () => {
    const navigate = useNavigate();
    const { loginByCitizenId, loading, error } = useParticipant();
    const [citizenId, setCitizenId] = useState('');

    // Replace handleSubmit with this:
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!citizenId.trim()) return;
        try {
            await loginByCitizenId(citizenId.trim().toUpperCase());
            navigate('/participant/dashboard');
        } catch {
            // error is set in context
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center px-4"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(249,162,77,0.08) 0%, #1a1a2e 60%)' }}
        >
            {/* Back */}
            <div className="w-full max-w-md mb-6">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase transition-colors"
                    style={{ color: '#F9A24D' }}
                >
                    <ArrowLeft size={16} />
                    Back to Home
                </button>
            </div>

            {/* Card */}
            <div
                className="w-full max-w-md rounded-2xl p-8 relative overflow-hidden"
                style={{
                    background: 'rgba(22,33,62,0.95)',
                    border: '1px solid rgba(249,162,77,0.25)',
                    boxShadow: '0 0 60px rgba(249,162,77,0.08), 0 0 120px rgba(249,162,77,0.04)',
                }}
            >
                {/* Corner glow */}
                <div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(249,162,77,0.15), transparent 70%)' }}
                />

                {/* Header */}
                <div className="text-center mb-8">
                    <p className="text-xs font-bold tracking-[0.4em] uppercase mb-3" style={{ color: '#F9A24D' }}>
                        BLOCKCITY
                    </p>
                    <h1
                        className="text-4xl font-heading font-bold mb-2"
                        style={{
                            background: 'linear-gradient(135deg, #fff 0%, #F9A24D 50%, #ff6b35 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Welcome to<br />BlockCity
                    </h1>
                    <p className="text-gray-400 text-sm mt-2">Enter your Citizen ID to begin your journey</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#F9A24D' }}>
                            Citizen ID
                        </label>
                        <input
                            type="text"
                            value={citizenId}
                            onChange={e => setCitizenId(e.target.value)}
                            placeholder="BC2025001"
                            className="w-full px-4 py-3 rounded-xl font-mono text-white placeholder-gray-600 outline-none transition-all"
                            style={{
                                background: 'rgba(10,10,26,0.8)',
                                border: '1px solid rgba(249,162,77,0.2)',
                            }}
                            onFocus={e => e.target.style.borderColor = 'rgba(249,162,77,0.6)'}
                            onBlur={e => e.target.style.borderColor = 'rgba(249,162,77,0.2)'}
                        />
                    </div>

                    {error && (
                        <p
                            className="text-sm px-4 py-2 rounded-lg"
                            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171' }}
                        >
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading || !citizenId.trim()}
                        className="w-full py-4 rounded-xl font-heading font-bold text-sm uppercase tracking-widest transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                        style={{
                            background: 'linear-gradient(135deg, #F9A24D, #ff6b35)',
                            color: '#0a0a1a',
                            boxShadow: '0 0 30px rgba(249,162,77,0.25)',
                        }}
                        onMouseEnter={e => !e.currentTarget.disabled && (e.currentTarget.style.boxShadow = '0 0 50px rgba(249,162,77,0.45)')}
                        onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 0 30px rgba(249,162,77,0.25)')}
                    >
                        {loading ? (
                            <span className="animate-pulse">Entering city...</span>
                        ) : (
                            <>Enter City <ChevronRight size={16} /></>
                        )}
                    </button>
                </form>

                {/* Demo IDs */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-600 mb-2">Demo IDs:</p>
                    <div className="flex gap-2 justify-center flex-wrap">
                        {DEMO_IDS.map(id => (
                            <button
                                key={id}
                                onClick={() => setCitizenId(id)}
                                className="text-xs font-mono px-3 py-1 rounded-lg transition-all hover:scale-105"
                                style={{
                                    background: 'rgba(249,162,77,0.08)',
                                    border: '1px solid rgba(249,162,77,0.2)',
                                    color: '#F9A24D',
                                }}
                            >
                                {id}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParticipantLogin;