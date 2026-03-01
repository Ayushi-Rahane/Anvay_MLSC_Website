import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 bg-primary/90 backdrop-blur-md border-b border-gray-800">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                <Link to="/" className="text-xl font-heading font-bold text-white hover:text-highlight transition-colors">
                    BlockCity
                </Link>
                <div className="flex gap-6">
                    <a href="#city-map" className="text-gray-300 hover:text-white transition-colors">
                        Map
                    </a>
                    <a href="#leaderboard" className="text-gray-300 hover:text-white transition-colors">
                        Leaderboard
                    </a>
                    <a href="#badge-lookup" className="text-gray-300 hover:text-white transition-colors">
                        Badge
                    </a>
                    <Link to="/admin" className="text-gray-300 hover:text-highlight transition-colors">
                        Admin
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
