import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const location = useLocation();
    const isParticipantPage = location.pathname.startsWith('/participant');

    const navLinks = [
        { label: 'Map', id: 'city-map' },
        { label: 'Leaderboard', id: 'leaderboard' },
        { label: 'About Us', id: 'about-us' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (location.pathname !== '/') {
                setActiveSection('');
                return;
            }

            const scrollPosition = window.scrollY + 150;

            for (let i = navLinks.length - 1; i >= 0; i--) {
                const sectionId = navLinks[i].id;
                const element = document.getElementById(sectionId);
                // Footer or specific elements might define about-us
                if (element && element.offsetTop <= scrollPosition) {
                    setActiveSection(sectionId);
                    return;
                }
            }

            setActiveSection('');
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    // Handle cross page navigation
    const getHref = (id) => location.pathname === '/' ? `#${id}` : `/#${id}`;

    return (
        <nav className="sticky top-0 z-50 bg-primary/90 backdrop-blur-md border-b border-gray-800">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <Link
                    to="/"
                    className="flex flex-col group"
                >
                    <span className="text-xl font-heading font-bold text-white group-hover:text-highlight transition-colors leading-tight">
                        Anvaya
                    </span>
                    <span className="text-[10px] text-gray-400 font-heading tracking-wider uppercase group-hover:text-gray-300 transition-colors">
                        Presented by MLSC
                    </span>
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map(link => {
                        const isActive = activeSection === link.id;
                        return (
                            <a
                                key={link.label}
                                href={getHref(link.id)}
                                className={`text-sm font-medium transition-all duration-300 ${isActive
                                        ? 'text-[#F9A24D] drop-shadow-[0_0_8px_rgba(249,162,77,0.8)]'
                                        : 'text-gray-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                                    }`}
                            >
                                {link.label}
                            </a>
                        );
                    })}
                    <Link
                        to="/participant"
                        className="px-4 py-2 rounded-lg text-sm font-bold transition-all"
                        style={
                            isParticipantPage
                                ? {
                                    background: 'linear-gradient(135deg, #F9A24D, #ff6b35)',
                                    color: '#0a0a1a',
                                    boxShadow: '0 0 20px rgba(249,162,77,0.3)',
                                }
                                :
                                {
                                    border: '1px solid rgba(249,162,77,0.3)',
                                    color: '#F9A24D',
                                    background: 'rgba(249,162,77,0.06)',
                                }
                        }
                    >
                        Participant
                    </Link>
                    <Link to="/admin" className="text-gray-500 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300 text-sm">
                        Admin
                    </Link>
                </div>

                {/* Mobile toggle */}
                <button
                    className="md:hidden text-gray-400 hover:text-white transition-colors"
                    onClick={() => setMenuOpen(o => !o)}
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div
                    className="md:hidden border-t px-4 py-4 space-y-3"
                    style={{ background: 'rgba(10,10,26,0.98)', borderColor: 'rgba(255,255,255,0.06)' }}
                >
                    {navLinks.map(link => {
                        const isActive = activeSection === link.id;
                        return (
                            <a
                                key={link.label}
                                href={getHref(link.id)}
                                className={`block text-sm py-1 font-medium transition-all ${isActive
                                        ? 'text-[#F9A24D] drop-shadow-[0_0_8px_rgba(249,162,77,0.8)]'
                                        : 'text-gray-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                                    }`}
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        );
                    })}
                    <Link
                        to="/participant"
                        className="block px-4 py-2 rounded-lg text-sm font-bold text-center mt-2"
                        style={{ background: 'linear-gradient(135deg, #F9A24D, #ff6b35)', color: '#0a0a1a' }}
                        onClick={() => setMenuOpen(false)}
                    >
                        Participant
                    </Link>
                    <Link
                        to="/admin"
                        className="block text-gray-500 hover:text-white transition-colors text-sm py-1 mt-2"
                        onClick={() => setMenuOpen(false)}
                    >
                        Admin
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;