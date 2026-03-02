import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const location = useLocation();

    const navLinks = [
        { label: 'Map', id: 'city-map' },
        { label: 'Leaderboard', id: 'leaderboard' },
        { label: 'About Us', id: 'badge-lookup' },
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

                if (element && element.offsetTop <= scrollPosition) {
                    setActiveSection(sectionId);
                    return;
                }
            }

            setActiveSection('');
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    const getHref = (id) =>
        location.pathname === '/' ? `#${id}` : `/#${id}`;

    const navItemStyle = (isActive) =>
        `text-sm font-medium transition-all duration-300 ${isActive
            ? 'text-[#F9A24D] drop-shadow-[0_0_8px_rgba(249,162,77,0.8)]'
            : 'text-gray-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'
        }`;

    return (
        <nav className="sticky top-0 z-50 bg-primary/90 backdrop-blur-md border-b border-gray-800">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex flex-col group">
                    <span className="text-xl font-heading font-bold text-white group-hover:text-highlight transition-colors leading-tight">
                        Anvaya
                    </span>
                    <span className="text-[10px] text-gray-400 font-heading tracking-wider uppercase group-hover:text-gray-300 transition-colors">
                        Presented by MLSC
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">

                    {/* Scroll Section Links */}
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={getHref(link.id)}
                            className={navItemStyle(activeSection === link.id)}
                        >
                            {link.label}
                        </a>
                    ))}

                    {/* Participant */}
                    <Link
                        to="/participant"
                        className={navItemStyle(location.pathname.startsWith('/participant'))}
                    >
                        Participant
                    </Link>

                    {/* Admin */}
                    <Link
                        to="/admin"
                        className={navItemStyle(location.pathname.startsWith('/admin'))}
                    >
                        Admin
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-gray-400 hover:text-white transition-colors"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div
                    className="md:hidden border-t px-4 py-4 space-y-3"
                    style={{
                        background: 'rgba(10,10,26,0.98)',
                        borderColor: 'rgba(255,255,255,0.06)',
                    }}
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={getHref(link.id)}
                            className={`block ${navItemStyle(activeSection === link.id)}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}

                    <Link
                        to="/participant"
                        className={`block ${navItemStyle(
                            location.pathname.startsWith('/participant')
                        )}`}
                        onClick={() => setMenuOpen(false)}
                    >
                        Participant
                    </Link>

                    <Link
                        to="/admin"
                        className={`block ${navItemStyle(
                            location.pathname.startsWith('/admin')
                        )}`}
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