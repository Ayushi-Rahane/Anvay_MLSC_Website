import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-white">
            <h1 className="text-6xl font-heading font-bold text-highlight mb-4">404</h1>
            <p className="text-xl mb-8">Oops! This block doesn't exist in the city.</p>
            <Link
                to="/"
                className="px-6 py-3 bg-highlight text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
            >
                Return to BlockCity
            </Link>
        </div>
    );
};

export default NotFound;
