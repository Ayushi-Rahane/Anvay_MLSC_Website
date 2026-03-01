import React from 'react';

const Button = ({ children, variant = 'primary', onClick, disabled = false, className = '', ...props }) => {
    const variants = {
        primary: 'bg-highlight text-white hover:bg-red-600',
        secondary: 'bg-accent text-white hover:bg-blue-800',
        outline: 'border border-highlight text-highlight hover:bg-highlight hover:text-white',
        ghost: 'text-gray-300 hover:text-white hover:bg-gray-700',
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-6 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
