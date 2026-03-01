import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { LayoutDashboard, Trophy, Building2, User } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
    { icon: Building2, label: 'Rooms', path: '/dashboard/rooms' },
    { icon: User, label: 'Profile', path: '/profile' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1A1C35] border-t border-[#7C3AED]/40 z-40">
      <div className="flex items-center justify-around p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive(item.path)
                  ? 'text-[#7C3AED]'
                  : 'text-white/60'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
