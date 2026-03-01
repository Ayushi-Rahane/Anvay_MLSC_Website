import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Circle, ExternalLink, ChevronRight, Wallet } from 'lucide-react';
import { useParticipant } from '../../context/ParticipantContext';
import RoleCard from '../../components/participant/RoleCard';

const STEPS = [
    {
        id: 'metamask',
        title: 'Install MetaMask',
        description: 'The browser extension that is your wallet and identity on-chain.',
        action: 'Open MetaMask',
        link: 'https://metamask.io',
        icon: '🦊',
        manualCheck: true,
    },
    {
        id: 'wallet',
        title: 'Connect Your Wallet',
        description: 'Authorize BlockCity to read your wallet address. Your seed phrase is never shared.',
        action: 'Connect MetaMask',
        icon: '🔗',
        manualCheck: false,
    },
    {
        id: 'testnet',
        title: 'Switch to Testnet',
        description: 'Switch MetaMask to Polygon Amoy or Ethereum Sepolia. Real-money ETH is never used.',
        action: 'Switch Network',
        icon: '🌐',
        manualCheck: true,
    },
    {
        id: 'faucet',
        title: 'Claim Testnet Funds',
        description: 'Get free testnet MATIC/ETH from the faucet — needed to pay for gas on transactions.',
        action: 'Open Faucet',
        link: 'https://faucet.polygon.technology',
        icon: '💧',
        manualCheck: true,
    },
    {
        id: 'name',
        title: 'Register Your Name',
        description: 'Enter your name and team so you appear on the leaderboard.',
        icon: '📝',
        manualCheck: false,
    },
    {
        id: 'role',
        title: 'Draw Your Role Card',
        description: 'Every participant has a unique role that changes their strategy. Draw yours now.',
        icon: '🎴',
        manualCheck: false,
    },
];

const Onboarding = () => {
    const navigate = useNavigate();
    const {
        walletAddress, participantName, teamName, role,
        setParticipantName, setTeamName, setOnboardingComplete,
        connectWallet, assignRandomRole,
    } = useParticipant();

    const [checked, setChecked] = useState({ metamask: false, testnet: false, faucet: false });
    const [loading, setLoading] = useState(false);
    const [nameInput, setNameInput] = useState(participantName || '');
    const [teamInput, setTeamInput] = useState(teamName || '');

    const isStepComplete = (stepId) => {
        switch (stepId) {
            case 'metamask': return checked.metamask;
            case 'wallet': return !!walletAddress;
            case 'testnet': return checked.testnet;
            case 'faucet': return checked.faucet;
            case 'name': return !!participantName && !!teamName;
            case 'role': return !!role;
            default: return false;
        }
    };

    const allComplete = STEPS.every(s => isStepComplete(s.id));

    const handleStepAction = async (step) => {
        if (step.manualCheck) {
            if (step.link) window.open(step.link, '_blank');
            setChecked(prev => ({ ...prev, [step.id]: true }));
            return;
        }
        if (step.id === 'wallet') {
            setLoading(true);
            await connectWallet();
            setLoading(false);
        }
        if (step.id === 'name') {
            if (!nameInput.trim() || !teamInput.trim()) return;
            setParticipantName(nameInput.trim());
            setTeamName(teamInput.trim());
        }
        if (step.id === 'role') {
            assignRandomRole();
        }
    };

    const handleEnterCity = () => {
        setOnboardingComplete(true);
        navigate('/participant/dashboard');
    };

    return (
        <div className="min-h-screen bg-primary pt-8 pb-16 px-4">
            <div className="max-w-xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <p
                        className="text-xs font-bold tracking-[0.4em] uppercase mb-3"
                        style={{ color: '#F9A24D' }}
                    >
                        BLOCKCITY
                    </p>
                    <h1
                        className="text-4xl md:text-5xl font-heading font-bold mb-3 uppercase tracking-wider"
                        style={{
                            background: 'linear-gradient(135deg, #fff 0%, #F9A24D 50%, #ff6b35 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        City Entry Pass
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Complete all checkpoints to enter BlockCity
                    </p>
                </div>

                {/* Progress bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">Progress</span>
                        <span className="text-xs font-bold" style={{ color: '#F9A24D' }}>
                            {STEPS.filter(s => isStepComplete(s.id)).length} / {STEPS.length}
                        </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                                width: `${(STEPS.filter(s => isStepComplete(s.id)).length / STEPS.length) * 100}%`,
                                background: 'linear-gradient(90deg, #F9A24D, #ff6b35)',
                                boxShadow: '0 0 10px rgba(249,162,77,0.4)',
                            }}
                        />
                    </div>
                </div>

                {/* Steps */}
                <div className="space-y-3 mb-8">
                    {STEPS.map((step, i) => {
                        const done = isStepComplete(step.id);
                        const isName = step.id === 'name';
                        const isRole = step.id === 'role';

                        return (
                            <div
                                key={step.id}
                                className="rounded-xl border p-4 transition-all duration-300"
                                style={{
                                    background: done ? 'rgba(52,211,153,0.04)' : 'rgba(255,255,255,0.02)',
                                    borderColor: done ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.08)',
                                    boxShadow: done ? '0 0 15px rgba(52,211,153,0.06)' : 'none',
                                }}
                            >
                                <div className="flex items-start gap-3">
                                    {/* Step icon */}
                                    <div className="flex-shrink-0 mt-0.5">
                                        {done ? (
                                            <CheckCircle size={20} className="text-green-400" />
                                        ) : (
                                            <Circle size={20} className="text-gray-700" />
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-base">{step.icon}</span>
                                            <h3 className="text-sm font-heading font-bold text-white">{step.title}</h3>
                                        </div>
                                        <p className="text-gray-500 text-xs leading-relaxed mb-3">{step.description}</p>

                                        {/* Name step */}
                                        {isName && !done && (
                                            <div className="space-y-2 mb-3">
                                                <input
                                                    type="text"
                                                    placeholder="Your name"
                                                    value={nameInput}
                                                    onChange={e => setNameInput(e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg text-sm text-white placeholder-gray-600 outline-none focus:ring-1 transition-all"
                                                    style={{
                                                        background: 'rgba(255,255,255,0.04)',
                                                        border: '1px solid rgba(255,255,255,0.1)',
                                                        focusRingColor: '#F9A24D',
                                                    }}
                                                    onFocus={e => e.target.style.borderColor = '#F9A24D50'}
                                                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Team name"
                                                    value={teamInput}
                                                    onChange={e => setTeamInput(e.target.value)}
                                                    className="w-full px-3 py-2 rounded-lg text-sm text-white placeholder-gray-600 outline-none transition-all"
                                                    style={{
                                                        background: 'rgba(255,255,255,0.04)',
                                                        border: '1px solid rgba(255,255,255,0.1)',
                                                    }}
                                                    onFocus={e => e.target.style.borderColor = '#F9A24D50'}
                                                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                                />
                                            </div>
                                        )}

                                        {/* Role card */}
                                        {isRole && (
                                            <div className="mb-3">
                                                <RoleCard role={role} onAssignRandom={assignRandomRole} />
                                            </div>
                                        )}

                                        {/* Wallet address display */}
                                        {step.id === 'wallet' && walletAddress && (
                                            <div
                                                className="flex items-center gap-2 px-3 py-2 rounded-lg mb-3"
                                                style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)' }}
                                            >
                                                <Wallet size={12} className="text-green-400" />
                                                <span className="text-green-400 text-xs font-mono">
                                                    {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
                                                </span>
                                            </div>
                                        )}

                                        {/* Action button */}
                                        {!done && (
                                            <button
                                                onClick={() => handleStepAction(step)}
                                                disabled={loading && step.id === 'wallet'}
                                                className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg transition-all hover:scale-105 disabled:opacity-50"
                                                style={{
                                                    background: 'rgba(249,162,77,0.1)',
                                                    border: '1px solid rgba(249,162,77,0.3)',
                                                    color: '#F9A24D',
                                                }}
                                            >
                                                {loading && step.id === 'wallet' ? (
                                                    <span className="animate-pulse">Connecting...</span>
                                                ) : (
                                                    <>
                                                        {step.action || 'Complete'}
                                                        {step.link ? <ExternalLink size={10} /> : <ChevronRight size={10} />}
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Enter City CTA */}
                <button
                    onClick={handleEnterCity}
                    disabled={!allComplete}
                    className="w-full py-4 rounded-xl font-heading font-bold text-base uppercase tracking-wider transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{
                        background: allComplete ? 'linear-gradient(135deg, #F9A24D, #ff6b35)' : 'rgba(255,255,255,0.05)',
                        color: allComplete ? '#0a0a1a' : '#4b5563',
                        boxShadow: allComplete ? '0 0 30px rgba(249,162,77,0.3)' : 'none',
                        transform: allComplete ? undefined : undefined,
                    }}
                    onMouseEnter={e => allComplete && (e.target.style.boxShadow = '0 0 50px rgba(249,162,77,0.5)')}
                    onMouseLeave={e => allComplete && (e.target.style.boxShadow = '0 0 30px rgba(249,162,77,0.3)')}
                >
                    🏙️ Enter BlockCity
                </button>

                {!allComplete && (
                    <p className="text-center text-gray-600 text-xs mt-3">
                        Complete all steps above to unlock the city
                    </p>
                )}
            </div>
        </div>
    );
};

export default Onboarding;