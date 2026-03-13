import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, TrendingUp, Target, Shield, LogOut, BarChart3, Bell, UserCheck, Globe, Bot, Eye, ChevronDown, Calculator, Activity, ShieldCheck } from 'lucide-react';
import { getUser, clearAuth } from '../lib/auth';

const navGroups = [
  {
    label: null,
    items: [
      { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Clients',
    items: [
      { path: '/families', label: 'Familles', icon: Users },
      { path: '/client-detail', label: 'Fiche Client', icon: UserCheck },
      { path: '/prospects', label: 'Prospection', icon: Target },
    ],
  },
  {
    label: 'Investissements',
    items: [
      { path: '/funds', label: 'Private Markets', icon: TrendingUp },
      { path: '/markets', label: 'Marches & Veille', icon: Globe },
      { path: '/fund-news', label: 'Fund News', icon: Bell },
    ],
  },
  {
    label: 'Operations',
    items: [
      { path: '/reporting', label: 'Reporting', icon: BarChart3 },
      { path: '/compliance', label: 'Compliance', icon: Shield },
    ],
  },
  {
    label: 'Moteurs',
    items: [
      { path: '/financial-engine', label: 'Calcul Financier', icon: Calculator },
      { path: '/risk-simulation', label: 'Monte Carlo', icon: Activity },
      { path: '/compliance-engine', label: 'Moteur KYC', icon: ShieldCheck },
    ],
  },
  {
    label: 'Outils',
    items: [
      { path: '/ai-assistant', label: 'Assistant IA', icon: Bot },
      { path: '/client-portal', label: 'Espace Client', icon: Eye },
    ],
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUser();
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  function logout() {
    clearAuth();
    navigate('/login');
  }

  function toggleGroup(label: string) {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
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

        <nav className="flex-1 py-3 overflow-y-auto">
          {navGroups.map((group) => {
            const isCollapsed = group.label ? collapsedGroups.has(group.label) : false;
            const hasActiveItem = group.items.some((item) => location.pathname === item.path);
            return (
              <div key={group.label || 'main'} className="mb-1">
                {group.label && (
                  <button
                    onClick={() => toggleGroup(group.label!)}
                    className="w-full flex items-center justify-between px-6 py-2 mt-2 cursor-pointer"
                  >
                    <span className={`text-[10px] font-bold uppercase tracking-[2px] ${hasActiveItem ? 'text-orange/80' : 'text-white/30'}`}>
                      {group.label}
                    </span>
                    <ChevronDown
                      size={12}
                      className={`text-white/30 transition-transform duration-200 ${isCollapsed ? '-rotate-90' : ''}`}
                    />
                  </button>
                )}
                {!isCollapsed && group.items.map(({ path, label, icon: Icon }) => {
                  const active = location.pathname === path;
                  return (
                    <Link
                      key={path}
                      to={path}
                      className={`flex items-center gap-3 px-6 py-2.5 text-[13px] font-medium transition-all ${
                        active
                          ? 'bg-orange/15 text-orange border-r-2 border-orange'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon size={16} />
                      {label}
                    </Link>
                  );
                })}
              </div>
            );
          })}
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
