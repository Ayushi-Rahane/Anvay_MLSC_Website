import React from 'react';
import { Github, Instagram, Linkedin, MapPin, Trophy, IdCard, Shield } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-primary border-t border-gray-800">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* About Us */}
                    <div>
                        <h3 className="text-lg font-heading font-bold text-white mb-4">About Us</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            <strong className="text-white">MLSC (Microsoft Learn Student Chapter)</strong> is a
                            community of tech enthusiasts driving innovation through hands-on events, workshops,
                            and collaborative projects.
                        </p>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            <strong className="text-white">Anvaya: The BlockCity Edition</strong> is a gamified
                            event where participants navigate through themed rooms, solve challenges, and compete
                            on the leaderboard.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-heading font-bold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="/#city-map" className="text-gray-400 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all flex items-center gap-2 text-sm">
                                    <MapPin size={14} /> City Map
                                </a>
                            </li>
                            <li>
                                <a href="/#leaderboard" className="text-gray-400 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all flex items-center gap-2 text-sm">
                                    <Trophy size={14} /> Leaderboard
                                </a>
                            </li>
                            <li>
                                <a href="/#badge-lookup" className="text-gray-400 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all flex items-center gap-2 text-sm">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/admin" className="text-gray-400 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all flex items-center gap-2 text-sm">
                                    <Shield size={14} /> Admin Access
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="text-lg font-heading font-bold text-white mb-4">Connect</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Follow us for updates and event highlights.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="https://github.com/pri-2025"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-secondary border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                            >
                                <Github size={18} />
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-secondary border border-gray-700 flex items-center justify-center text-gray-400 hover:text-pink-400 hover:border-pink-400/30 transition-colors"
                            >
                                <Instagram size={18} />
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-secondary border border-gray-700 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-400/30 transition-colors"
                            >
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider + Copyright */}
                <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} MLSC — Anvaya: The BlockCity Edition. All rights reserved.
                    </p>
                    <p className="text-gray-600 text-xs">
                        Built with passion by MLSC
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
