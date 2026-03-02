import React from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animation keyframes */}
            <style>{`
                @keyframes slowZoom {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.15); }
                    100% { transform: scale(1); }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeInScale {
                    from { opacity: 0; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes glowPulse {
                    0%, 100% { text-shadow: 0 0 20px rgba(249,162,77,0.3), 0 0 40px rgba(249,162,77,0.1); }
                    50% { text-shadow: 0 0 30px rgba(249,162,77,0.5), 0 0 60px rgba(249,162,77,0.2), 0 0 80px rgba(249,162,77,0.1); }
                }
                @keyframes shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                .hero-title {
                    background: linear-gradient(135deg, #fff 0%, #F9A24D 40%, #ff6b35 60%, #F9A24D 80%, #fff 100%);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: shimmer 4s linear infinite, glowPulse 3s ease-in-out infinite;
                }
            `}</style>

            {/* Background Image with slow zoom */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/blockcity-bg.png')",
                    animation: 'slowZoom 25s ease-in-out infinite',
                }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary" />

            {/* Floating Particles */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full animate-pulse"
                        style={{
                            width: `${3 + i * 2}px`,
                            height: `${3 + i * 2}px`,
                            backgroundColor: i % 2 === 0 ? '#F9A24D' : '#ff6b35',
                            top: `${10 + i * 11}%`,
                            left: `${8 + i * 12}%`,
                            opacity: 0.15 + (i % 3) * 0.05,
                            animationDelay: `${i * 0.4}s`,
                            animationDuration: `${2 + i * 0.5}s`,
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <p
                    className="text-sm font-bold tracking-[0.4em] uppercase mb-5"
                    style={{
                        color: '#F9A24D',
                        animation: 'slideDown 0.8s ease-out both',
                        animationDelay: '0.2s',
                    }}
                >
                    MLSC PRESENTS
                </p>

                <h1
                    className="hero-title text-7xl md:text-9xl font-bold mb-4 leading-none"
                    style={{
                        fontFamily: "'Orbitron', 'Rajdhani', sans-serif",
                        letterSpacing: '0.1em',
                        animation: 'fadeInScale 1s ease-out both',
                        animationDelay: '0.5s',
                        filter: 'drop-shadow(0 4px 20px rgba(249,162,77,0.3))',
                    }}
                >
                    ANVAYA
                </h1>

                <h2
                    className="text-xl md:text-3xl font-bold mb-8 tracking-[0.15em] uppercase"
                    style={{
                        fontFamily: "'Rajdhani', 'Orbitron', sans-serif",
                        color: '#F9A24D',
                        animation: 'slideUp 0.8s ease-out both',
                        animationDelay: '0.8s',
                        textShadow: '0 0 15px rgba(249,162,77,0.6), 0 0 30px rgba(249,162,77,0.4)',
                    }}
                >
                    THE BLOCKCITY EDITION
                </h2>

                <p
                    className="text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
                    style={{
                        color: '#ffffff',
                        animation: 'slideUp 0.8s ease-out both',
                        animationDelay: '1.1s',
                        textShadow: '0 0 10px rgba(255,255,255,0.4), 0 0 20px rgba(255,255,255,0.2)',
                    }}
                >
                    Navigate through rooms, solve challenges, earn points, and rise through the tiers to become BlockCity's top citizen.
                </p>

                <div
                    className="flex gap-5 justify-center flex-wrap"
                    style={{
                        animation: 'slideUp 0.8s ease-out both',
                        animationDelay: '1.4s',
                    }}
                >
                    <a
                        href="#leaderboard"
                        className="px-9 py-4 font-bold rounded-xl text-sm md:text-base tracking-wider uppercase transition-all duration-300 hover:scale-105"
                        style={{
                            border: '2px solid rgba(249,162,77,0.4)',
                            color: '#F9A24D',
                            boxShadow: '0 0 20px rgba(249,162,77,0.1)',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.borderColor = '#F9A24D';
                            e.target.style.boxShadow = '0 0 35px rgba(249,162,77,0.25)';
                            e.target.style.backgroundColor = 'rgba(249,162,77,0.08)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.borderColor = 'rgba(249,162,77,0.4)';
                            e.target.style.boxShadow = '0 0 20px rgba(249,162,77,0.1)';
                            e.target.style.backgroundColor = 'transparent';
                        }}
                    >
                        VIEW LEADERBOARD
                    </a>
                    <a
                        href="#badge-lookup"
                        className="px-9 py-4 font-bold rounded-xl text-sm md:text-base tracking-wider uppercase transition-all duration-300 hover:scale-105"
                        style={{
                            border: '2px solid rgba(249,162,77,0.4)',
                            color: '#F9A24D',
                            boxShadow: '0 0 20px rgba(249,162,77,0.1)',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.borderColor = '#F9A24D';
                            e.target.style.boxShadow = '0 0 35px rgba(249,162,77,0.25)';
                            e.target.style.backgroundColor = 'rgba(249,162,77,0.08)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.borderColor = 'rgba(249,162,77,0.4)';
                            e.target.style.boxShadow = '0 0 20px rgba(249,162,77,0.1)';
                            e.target.style.backgroundColor = 'transparent';
                        }}
                    >
                        FIND YOUR BADGE
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                <a href="#city-map" className="text-gray-500 hover:text-[#F9A24D] transition-colors">
                    <ChevronDown size={28} />
                </a>
            </div>
        </section >
    );
};

export default HeroSection;
