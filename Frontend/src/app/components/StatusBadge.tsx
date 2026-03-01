import React from 'react';
import { getRoomStatusColor, getTierBadgeColor } from '../data/mockData';

interface StatusBadgeProps {
  status: string;
  type?: 'room' | 'tier';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  type = 'room',
  className = ''
}) => {
  const colorClass = type === 'room' ? getRoomStatusColor(status) : getTierBadgeColor(status);
  const displayText = status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return (
    <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider border rounded-full ${colorClass} ${className}`}>
      {displayText}
    </span>
  );
};
