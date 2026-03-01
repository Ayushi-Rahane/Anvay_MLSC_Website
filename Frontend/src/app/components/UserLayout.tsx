import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { LayoutDashboard, TrendingUp, Trophy, Building2, User, LogOut, Menu, X, Map } from 'lucide-react';

interface UserLayoutProps {
  children: React.ReactNode;
}

export const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Map, label: 'BlockCity Map', path: '/blockcity' },
    { icon: TrendingUp, label: 'My Progress', path: '/dashboard/progress' },
    { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
    { icon: Building2, label: 'Rooms', path: '/dashboard/rooms' },
    { icon: User, label: 'Profile', path: '/profile' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 bg-[#1A1C35] border-r border-[#7C3AED]/40 flex-col">
        <div className="p-6 border-b border-[#7C3AED]/40">
          <h1 className="text-2xl font-bold gradient-text">ANVAY</h1>
          <p className="text-sm text-white/60">BlockCity Edition</p>
        </div>

        <nav className="flex-1 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${
                  isActive(item.path)
                    ? 'bg-[#7C3AED] text-white shadow-[0_0_20px_rgba(124,58,237,0.5)]'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-semibold">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#7C3AED]/40">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#EF4444] hover:bg-[#EF4444]/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-3 bg-[#1A1C35] rounded-xl border border-[#7C3AED]/40"
      >
        {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileMenuOpen(false)}>
          <aside className="w-64 bg-[#1A1C35] h-full border-r border-[#7C3AED]/40 flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-[#7C3AED]/40">
              <h1 className="text-2xl font-bold gradient-text">ANVAY</h1>
              <p className="text-sm text-white/60">BlockCity Edition</p>
            </div>

            <nav className="flex-1 p-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${
                      isActive(item.path)
                        ? 'bg-[#7C3AED] text-white shadow-[0_0_20px_rgba(124,58,237,0.5)]'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="p-4 border-t border-[#7C3AED]/40">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#EF4444] hover:bg-[#EF4444]/10 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-semibold">Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#1A1C35]/80 backdrop-blur-lg border-b border-[#7C3AED]/40 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="md:ml-0 ml-16">
              <h2 className="text-xl font-bold text-white">ANVAY — BlockCity Edition</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-white/60">Citizen ID</p>
                <p className="font-mono font-bold text-[#22D3EE]">{currentUser.citizenId}</p>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-[#7C3AED]/20 rounded-xl border border-[#7C3AED]/40">
                <Trophy className="w-5 h-5 text-[#FBBF24]" />
                <span className="font-bold text-white">{currentUser.totalScore}</span>
              </div>
              <div className="px-4 py-2 bg-[#22D3EE]/20 rounded-xl border border-[#22D3EE]/40">
                <span className="text-sm font-bold text-[#22D3EE] uppercase">{currentUser.role}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
        
        {/* Mobile Bottom Navigation - Only show on small screens */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1A1C35] border-t border-[#7C3AED]/40 z-40">
          <div className="flex items-center justify-around p-3">
            <button
              onClick={() => navigate('/dashboard')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                location.pathname === '/dashboard'
                  ? 'text-[#7C3AED]'
                  : 'text-white/60'
              }`}
            >
              <LayoutDashboard className="w-6 h-6" />
              <span className="text-xs font-semibold">Home</span>
            </button>
            <button
              onClick={() => navigate('/blockcity')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                location.pathname === '/blockcity'
                  ? 'text-[#7C3AED]'
                  : 'text-white/60'
              }`}
            >
              <Map className="w-6 h-6" />
              <span className="text-xs font-semibold">Map</span>
            </button>
            <button
              onClick={() => navigate('/leaderboard')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                location.pathname === '/leaderboard'
                  ? 'text-[#7C3AED]'
                  : 'text-white/60'
              }`}
            >
              <Trophy className="w-6 h-6" />
              <span className="text-xs font-semibold">Ranks</span>
            </button>
            <button
              onClick={() => navigate('/dashboard/rooms')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                location.pathname === '/dashboard/rooms'
                  ? 'text-[#7C3AED]'
                  : 'text-white/60'
              }`}
            >
              <Building2 className="w-6 h-6" />
              <span className="text-xs font-semibold">Rooms</span>
            </button>
            <button
              onClick={() => navigate('/profile')}
              className={`flex flex-col items-center gap-1 transition-colors ${
                location.pathname === '/profile'
                  ? 'text-[#7C3AED]'
                  : 'text-white/60'
              }`}
            >
              <User className="w-6 h-6" />
              <span className="text-xs font-semibold">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};