import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-secondary border-t border-gray-800 py-8 px-4">
            <div className="max-w-6xl mx-auto text-center">
                <p className="text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} MLSC — Anvaya: The BlockCity Edition. All rights reserved.
                </p>
                <p className="text-gray-500 text-xs mt-2">
                    Built with ❤️ by MLSC
                </p>
            </div>
        </footer>
    );
};

export default Footer;
