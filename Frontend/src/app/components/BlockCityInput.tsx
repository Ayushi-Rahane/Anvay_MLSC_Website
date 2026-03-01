import React from 'react';

interface BlockCityInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  error?: string;
  className?: string;
}

export const BlockCityInput: React.FC<BlockCityInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  error,
  className = ''
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block mb-2 text-sm font-semibold text-white/90 uppercase tracking-wide">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-white/5 border-2 border-[#7C3AED]/40 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#7C3AED] focus:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all duration-300"
      />
      {error && (
        <p className="mt-2 text-sm text-[#EF4444]">{error}</p>
      )}
    </div>
  );
};
