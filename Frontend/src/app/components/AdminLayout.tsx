import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { LayoutDashboard, Users, Building2, Trophy, Edit, Settings, LogOut, Menu, X, Shield } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Participants', path: '/admin/participants' },
    { icon: Building2, label: 'Rooms', path: '/admin/rooms' },
    { icon: Trophy, label: 'Leaderboard Control', path: '/admin/leaderboard' },
    { icon: Edit, label: 'Manual Score Update', path: '/admin/scores' },
    { icon: Settings, label: 'Event Settings', path: '/admin/settings' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 bg-[#1A1C35] border-r border-[#EF4444]/40 flex-col">
        <div className="p-6 border-b border-[#EF4444]/40">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-[#EF4444]" />
            <h1 className="text-2xl font-bold text-white">Control</h1>
          </div>
          <p className="text-sm text-[#EF4444] font-semibold">Admin Panel</p>
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
                    ? 'bg-[#EF4444] text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-semibold text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#EF4444]/40">
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
        className="md:hidden fixed top-4 left-4 z-50 p-3 bg-[#1A1C35] rounded-xl border border-[#EF4444]/40"
      >
        {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileMenuOpen(false)}>
          <aside className="w-64 bg-[#1A1C35] h-full border-r border-[#EF4444]/40 flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-[#EF4444]/40">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-8 h-8 text-[#EF4444]" />
                <h1 className="text-2xl font-bold text-white">Control</h1>
              </div>
              <p className="text-sm text-[#EF4444] font-semibold">Admin Panel</p>
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
                        ? 'bg-[#EF4444] text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold text-sm">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <div className="p-4 border-t border-[#EF4444]/40">
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
        <header className="bg-[#1A1C35]/80 backdrop-blur-lg border-b border-[#EF4444]/40 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="md:ml-0 ml-16">
              <h2 className="text-xl font-bold text-white">BlockCity Control Center</h2>
              <p className="text-sm text-white/60">Administrator Access</p>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-[#EF4444]/20 rounded-xl border border-[#EF4444]/40">
              <Shield className="w-5 h-5 text-[#EF4444]" />
              <span className="text-sm font-bold text-white uppercase">Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-[#0F1020]">
          {children}
        </main>
      </div>
    </div>
  );
};
