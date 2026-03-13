import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, TrendingUp, Target, Shield, LogOut, BarChart3, Bell, Settings } from 'lucide-react';
import { getUser, clearAuth } from '../lib/auth';

const nav = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/families', label: 'Familles', icon: Users },
  { path: '/funds', label: 'Private Markets', icon: TrendingUp },
  { path: '/reporting', label: 'Reporting', icon: BarChart3 },
  { path: '/prospects', label: 'Prospection', icon: Target },
  { path: '/compliance', label: 'Compliance', icon: Shield },
  { path: '/fund-news', label: 'Fund News', icon: Bell },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUser();

  function logout() {
    clearAuth();
    navigate('/login');
  }

  return (
    <div className="flex h-screen bg-bg-light">
      {/* Sidebar */}
      <aside className="w-64 bg-navy text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange flex items-center justify-center font-display font-bold text-navy text-lg">
              iV
            </div>
            <div>
              <h1 className="font-display font-bold text-base tracking-wide">iVESTA</h1>
              <p className="text-xs text-white/50 font-body">Family Office SaaS</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-4">
          {nav.map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all ${
                  active
                    ? 'bg-orange/15 text-orange border-r-2 border-orange'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
          <div className="my-2 mx-6 border-t border-white/10" />
          <Link
            to="/settings"
            className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all ${
              location.pathname === '/settings'
                ? 'bg-orange/15 text-orange border-r-2 border-orange'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings size={18} />
            Parametres
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange/20 text-orange flex items-center justify-center text-xs font-bold">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-white/50 capitalize">{user?.role}</p>
            </div>
            <button onClick={logout} className="text-white/50 hover:text-red cursor-pointer">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
