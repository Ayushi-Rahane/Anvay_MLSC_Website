import React from 'react';

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-accent z-0" />

            {/* Content */}
            <div className="relative z-10 text-center px-4">
                <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-4">
                    ANVAYA
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-2">
                    The BlockCity Edition
                </p>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                    Navigate through rooms, solve challenges, earn points, and rise through the tiers to become BlockCity's top citizen.
                </p>
                <div className="flex gap-4 justify-center">
                    <a
                        href="#leaderboard"
                        className="px-8 py-3 bg-highlight text-white font-semibold rounded-lg hover:bg-red-600 transition-all"
                    >
                        View Leaderboard
                    </a>
                    <a
                        href="#badge-lookup"
                        className="px-8 py-3 border border-highlight text-highlight font-semibold rounded-lg hover:bg-highlight hover:text-white transition-all"
                    >
                        Find Your Badge
                    </a>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
