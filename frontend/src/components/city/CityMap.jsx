import React, { useState } from 'react';
import { Scale, Landmark, Fingerprint, Building2, Shield, X, Cloud } from 'lucide-react';

const ROOMS = [
    {
        id: 'room_1',
        name: '1. Law Foundry',
        Icon: Scale,
        description: 'Legal challenges and constitutional puzzles',
        challenge: 'Decode laws, draft contracts, find loopholes',
        status: 'open',
        color: '#00d4ff',
        // On the blue cloud above left building
        x: 16, y: 57,
    },
    {
        id: 'room_2',
        name: '2. Treasury Mint',
        Icon: Landmark,
        description: 'Financial strategy and resource management',
        challenge: 'Budget allocation, crypto puzzles, trade wars',
        status: 'open',
        color: '#f472b6',
        // On the blue cloud above center-left tower
        x: 33, y: 45,
    },
    {
        id: 'room_3',
        name: '3. Identity Bureau',
        Icon: Fingerprint,
        description: 'Citizen verification and identity challenges',
        challenge: 'Forensics, biometrics, identity fraud detection',
        status: 'open',
        color: '#06b6d4',
        // On the blue cloud above center main building
        x: 51, y: 55,
    },
    {
        id: 'room_4',
        name: '4. Council Chamber',
        Icon: Building2,
        description: 'Governance decisions and policy debates',
        challenge: 'Debates, voting systems, policy drafting',
        status: 'open',
        color: '#c084fc',
        // On the blue cloud above right building
        x: 68, y: 45,
    },
    {
        id: 'room_5',
        name: '5. Control Center',
        Icon: Shield,
        description: 'Cybersecurity and system defense missions',
        challenge: 'Firewalls, encryption, threat neutralization',
        status: 'open',
        color: '#34d399',
        // On the blue cloud above far-right building
        x: 88, y: 59,
    },
];

const CONNECTIONS = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 0, to: 2 },
    { from: 2, to: 4 },
];

const CityNode = ({ room, isSelected, onClick, connections }) => {
    const [hovered, setHovered] = useState(false);
    const { Icon, color, x, y, name } = room;
    const active = isSelected || hovered;
    const showAbove = y > 45; // Show card above if node is in the lower half

    return (
        <div
            className="absolute cursor-pointer transition-all duration-500 z-20"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: `translate(-50%, -50%)`,
            }}
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Outer pulse ring */}
            <div
                className="absolute rounded-full animate-ping"
                style={{
                    width: '90px',
                    height: '90px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: `1px solid ${color}`,
                    opacity: active ? 0.5 : 0.15,
                    animationDuration: '2.5s',
                }}
            />

            {/* Second ring */}
            <div
                className="absolute rounded-full"
                style={{
                    width: '110px',
                    height: '110px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: `1px solid ${active ? `${color}60` : `${color}15`}`,
                    transition: 'all 0.5s',
                }}
            />

            {/* Holographic ring */}
            <div
                className="absolute rounded-full transition-all duration-500"
                style={{
                    width: '76px',
                    height: '76px',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    border: `2px solid ${active ? color : `${color}35`}`,
                    boxShadow: active
                        ? `0 0 30px ${color}60, inset 0 0 30px ${color}15`
                        : `0 0 10px ${color}10`,
                }}
            />

            {/* Main node */}
            <div
                className="relative rounded-full flex items-center justify-center transition-all duration-500"
                style={{
                    width: '60px',
                    height: '60px',
                    background: active
                        ? `radial-gradient(circle, ${color}40, ${color}15, transparent)`
                        : `radial-gradient(circle, ${color}20, ${color}08, transparent)`,
                    border: `2px solid ${active ? color : `${color}50`}`,
                    boxShadow: active
                        ? `0 0 40px ${color}60, 0 0 80px ${color}25`
                        : `0 0 20px ${color}15`,
                    backdropFilter: 'blur(12px)',
                }}
            >
                <Icon
                    size={active ? 24 : 20}
                    style={{ color: active ? '#fff' : `${color}dd` }}
                    className="transition-all duration-300 drop-shadow-lg"
                />
            </div>

            {/* Floating cloud icon above */}
            <div
                className="absolute left-1/2 -translate-x-1/2 transition-all duration-500"
                style={{
                    top: '-30px',
                    opacity: active ? 1 : 0.35,
                }}
            >
                <Cloud
                    size={16}
                    style={{ color }}
                    className={active ? 'animate-pulse' : ''}
                    fill={active ? `${color}40` : 'none'}
                />
            </div>

            {/* Label */}
            {!isSelected && (
                <div
                    className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center transition-all duration-300"
                    style={{ top: '70px' }}
                >
                    <p
                        className="text-xs font-bold tracking-wide"
                        style={{
                            color: active ? '#fff' : '#e2e8f0',
                            textShadow: `0 0 12px ${active ? color : 'rgba(0,0,0,0.9)'}, 0 2px 4px rgba(0,0,0,0.8)`,
                        }}
                    >
                        {name}
                    </p>
                    {active && (
                        <p className="text-[10px] text-gray-300 mt-0.5" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
                            Click to explore
                        </p>
                    )}
                </div>
            )}

            {/* Inline Info Card — appears above or below node */}
            {isSelected && (
                <div
                    className="absolute z-50 animate-fadeIn"
                    style={{
                        width: '280px',
                        left: x > 70 ? 'auto' : x < 30 ? '0' : '50%',
                        right: x > 70 ? '0' : 'auto',
                        transform: x >= 30 && x <= 70 ? 'translateX(-50%)' : 'none',
                        ...(showAbove
                            ? { bottom: '90px' }
                            : { top: '90px' }),
                    }}
                >
                    <div
                        className="rounded-xl p-4 border backdrop-blur-xl relative overflow-hidden"
                        style={{
                            backgroundColor: 'rgba(10, 10, 26, 0.95)',
                            borderColor: `${color}40`,
                            boxShadow: `0 0 40px ${color}20, 0 8px 32px rgba(0,0,0,0.6)`,
                        }}
                    >
                        {/* Scan lines */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-5"
                            style={{
                                background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${color}15 2px, ${color}15 4px)`,
                            }}
                        />

                        <div className="relative z-10">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2.5">
                                    <div
                                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                                        style={{
                                            backgroundColor: `${color}15`,
                                            border: `1.5px solid ${color}40`,
                                        }}
                                    >
                                        <Icon size={16} style={{ color }} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white leading-tight">{name}</h4>
                                        <p className="text-[10px] text-gray-400">{room.description}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onClick(); }}
                                    className="p-1 rounded text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <X size={12} />
                                </button>
                            </div>

                            {/* Stats */}
                            <div className="space-y-2">
                                <div className="bg-black/40 rounded-lg px-3 py-2 border border-white/5">
                                    <p className="text-gray-500 text-[9px] uppercase tracking-widest">Challenge</p>
                                    <p className="text-gray-300 text-xs mt-0.5">{room.challenge}</p>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex-1 bg-black/40 rounded-lg px-3 py-2 border border-white/5">
                                        <p className="text-gray-500 text-[9px] uppercase tracking-widest">Status</p>
                                        <span className={`text-xs font-bold ${room.status === 'open' ? 'text-green-400' : 'text-red-400'
                                            }`}>
                                            {room.status === 'open' ? '● Active' : '● Offline'}
                                        </span>
                                    </div>
                                    <div className="flex-1 bg-black/40 rounded-lg px-3 py-2 border border-white/5">
                                        <p className="text-gray-500 text-[9px] uppercase tracking-widest">Network</p>
                                        <p className="text-xs font-medium" style={{ color }}>
                                            {connections} links
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const CityMap = () => {
    const [selectedRoom, setSelectedRoom] = useState(null);

    const handleNodeClick = (room) => {
        setSelectedRoom(selectedRoom?.id === room.id ? null : room);
    };

    return (
        <section id="city-map" className="py-16 px-4 relative overflow-hidden bg-[#0a0a1a]">
            <div className="max-w-6xl mx-auto relative z-10">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-white mb-3 drop-shadow-lg">
                    BlockCity Map
                </h2>
                <p className="text-gray-400 text-center mb-10 max-w-xl mx-auto">
                    Explore the city network. Click on any building to discover its mission.
                </p>

                {/* Map Container */}
                <div className="relative w-full rounded-2xl border border-white/10 overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.5)]"
                    style={{ aspectRatio: '16/9' }}
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: "url('/neon-city-bg.png')" }}
                    />
                    {/* Subtle dark overlay for node readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a]/40 via-transparent to-[#0a0a1a]/20" />

                    {/* Connection lines */}
                    <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                        <defs>
                            <filter id="lineGlow">
                                <feGaussianBlur stdDeviation="4" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {CONNECTIONS.map((conn, i) => {
                            const fromRoom = ROOMS[conn.from];
                            const toRoom = ROOMS[conn.to];
                            const isActive = selectedRoom?.id === fromRoom.id || selectedRoom?.id === toRoom.id;

                            // Curved path
                            const mx = (fromRoom.x + toRoom.x) / 2;
                            const my = Math.min(fromRoom.y, toRoom.y) - 8;

                            return (
                                <g key={i}>
                                    <path
                                        d={`M ${fromRoom.x}% ${fromRoom.y}% Q ${mx}% ${my}% ${toRoom.x}% ${toRoom.y}%`}
                                        fill="none"
                                        stroke={isActive ? '#f472b6' : 'rgba(244,114,182,0.2)'}
                                        strokeWidth={isActive ? 2.5 : 1}
                                        opacity={isActive ? 0.9 : 0.35}
                                        filter={isActive ? 'url(#lineGlow)' : ''}
                                        className="transition-all duration-500"
                                        style={{
                                            strokeDasharray: isActive ? 'none' : '6 4',
                                        }}
                                    />
                                </g>
                            );
                        })}

                        {/* Traveling dots */}
                        {CONNECTIONS.map((conn, i) => {
                            const fromRoom = ROOMS[conn.from];
                            const toRoom = ROOMS[conn.to];
                            const isActive = selectedRoom?.id === fromRoom.id || selectedRoom?.id === toRoom.id;
                            const mx = (fromRoom.x + toRoom.x) / 2;
                            const my = Math.min(fromRoom.y, toRoom.y) - 8;

                            return (
                                <circle
                                    key={`dot-${i}`}
                                    r={isActive ? 3 : 1.5}
                                    fill={isActive ? '#f472b6' : '#06b6d4'}
                                    opacity={isActive ? 1 : 0.4}
                                    filter={isActive ? 'url(#lineGlow)' : ''}
                                >
                                    <animateMotion
                                        dur={`${2.5 + i * 0.5}s`}
                                        repeatCount="indefinite"
                                        path={`M ${fromRoom.x * 10.8},${fromRoom.y * 5} Q ${mx * 10.8},${my * 5} ${toRoom.x * 10.8},${toRoom.y * 5}`}
                                    />
                                </circle>
                            );
                        })}
                    </svg>

                    {/* Building Nodes */}
                    {ROOMS.map((room) => (
                        <CityNode
                            key={room.id}
                            room={room}
                            isSelected={selectedRoom?.id === room.id}
                            onClick={() => handleNodeClick(room)}
                            connections={CONNECTIONS.filter(c =>
                                ROOMS[c.from].id === room.id || ROOMS[c.to].id === room.id
                            ).length}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CityMap;
