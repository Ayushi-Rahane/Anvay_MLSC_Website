import React, { useEffect, useState } from 'react';

const GlobalParticles = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // Generate random particles
        const particleCount = 75; // Number of "stars"
        const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // percentage string
            y: Math.random() * 100 + 20, // start a bit lower
            size: Math.random() * 3 + 1, // 1 to 4 px size
            duration: Math.random() * 25 + 15, // 15 to 40 seconds duration
            delay: Math.random() * -40, // random negative delay to spread them out on load
            color: Math.random() > 0.5 ? '#F9A24D' : '#00d4ff', // Random mix of amber and cyan
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute rounded-full animate-floatUp"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        backgroundColor: p.color,
                        animationDuration: `${p.duration}s`,
                        animationDelay: `${p.delay}s`,
                        boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
                    }}
                />
            ))}
        </div>
    );
};

export default GlobalParticles;
