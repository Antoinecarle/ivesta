import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import {
  Users,
  TrendingUp,
  TrendingDown,
  Euro,
  UserPlus,
  ShieldCheck,
  AlertCircle,
  Clock,
  FileText,
  MoreHorizontal,
  Circle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// --- DEMO DATA ---

const kpiData = [
  { label: 'Familles actives', value: '108', trend: '+3 vs T-1', trendType: 'pos', icon: Users },
  { label: 'AUM Total', value: '5.2 Mds \u20ac', trend: '+12.4%', trendType: 'pos', icon: TrendingUp },
  { label: 'CA Annuel', value: '12.4M \u20ac', trend: '+8.2%', trendType: 'pos', icon: Euro },
  { label: 'CA / Partner', value: '2.1M \u20ac', trend: 'Moyenne', trendType: 'neutral', icon: Users },
  { label: 'Prospects Actifs', value: '42', trend: '+5 ce mois', trendType: 'pos', icon: UserPlus },
  { label: 'Compliance Rate', value: '94%', trend: 'Objectif 100%', trendType: 'neutral', icon: ShieldCheck, progress: 94 },
];

const allocationData = [
  { name: 'Private Equity', value: 35, color: '#000046' },
  { name: 'LBO', value: 20, color: '#FF8217' },
  { name: 'Growth', value: 15, color: '#FFB9AD' },
  { name: 'Real Estate', value: 15, color: '#E3F1EC' },
  { name: 'Debt', value: 10, color: '#CD002D' },
  { name: 'Infrastructure', value: 5, color: '#FAEBDC' },
];

const evolutionData = [
  { name: 'Q1 24', aum: 4.2 },
  { name: 'Q2 24', aum: 4.4 },
  { name: 'Q3 24', aum: 4.5 },
  { name: 'Q4 24', aum: 4.7 },
  { name: 'Q1 25', aum: 4.8 },
  { name: 'Q2 25', aum: 4.9 },
  { name: 'Q3 25', aum: 5.1 },
  { name: 'Q4 25', aum: 5.2 },
];

const pipelineData = [
  { stage: 'Lead', count: 12, color: '#E5E7EB' },
  { stage: 'Qualifie', count: 8, color: '#FFB9AD' },
  { stage: 'RDV', count: 14, color: '#FFBC7D' },
  { stage: 'Proposition', count: 5, color: '#FF8217' },
  { stage: 'Gagne', count: 3, color: '#000046' },
];

const alertsData = [
  { id: 1, title: 'KYC Expire — Famille Durand', status: 'Expire', type: 'error' as const },
  { id: 2, title: 'MIFID II — Update requis', status: 'En attente', type: 'warning' as const },
  { id: 3, title: 'Renouvellement mandat — SCI Alize', status: 'A venir', type: 'default' as const },
  { id: 4, title: 'Compliance Check — Nouveau Prospect', status: 'En cours', type: 'orange' as const },
];

const activityData = [
  { id: 1, action: 'Nouveau client onboarde', user: 'Jean M.', time: 'Il y a 2h', icon: UserPlus },
  { id: 2, action: 'Reporting trimestriel genere', user: 'Systeme', time: 'Il y a 4h', icon: FileText },
  { id: 3, action: 'Capital Call — Eurazeo PE', user: 'Sophie L.', time: 'Hier', icon: Euro },
  { id: 4, action: 'RDV Prospect qualifie', user: 'Marc A.', time: 'Hier', icon: Clock },
  { id: 5, action: 'Validation compliance effectuee', user: 'Admin', time: '2 jours', icon: ShieldCheck },
];

// --- COMPONENTS ---

const badgeStyles: Record<string, string> = {
  default: 'bg-[#F7F7F9] text-[#000046]',
  success: 'bg-[#E3F1EC] text-[#16A34A]',
  warning: 'bg-[#FAEBDC] text-[#B45309]',
  error: 'bg-[#FEE2E2] text-[#CD002D]',
  orange: 'bg-[rgba(255,130,23,0.1)] text-[#FF8217]',
};

function Badge({ children, variant = 'default' }: { children: React.ReactNode; variant?: string }) {
  return (
    <span className={`px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider whitespace-nowrap ${badgeStyles[variant] || badgeStyles.default}`}>
      {children}
    </span>
  );
}

function KPICard({ label, value, trend, trendType, icon: Icon, progress }: any) {
  return (
    <div className="kpi-card bg-white border border-[#E5E7EB] p-5 flex flex-col justify-between hover:shadow-[0_4px_16px_rgba(0,0,70,0.10)] hover:-translate-y-0.5 transition-all duration-200 h-full" style={{ opacity: 0 }}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-[#F7F7F9]">
          <Icon size={18} className="text-orange" />
        </div>
        {trendType !== 'neutral' && (
          <div className={`flex items-center text-[11px] font-medium ${trendType === 'pos' ? 'text-[#16A34A]' : 'text-red'}`}>
            {trendType === 'pos' ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
            {trend}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-charcoal text-[13px] font-normal font-body uppercase tracking-wider">{label}</h3>
        <p className="text-navy text-[32px] font-normal font-display leading-tight">{value}</p>
        {progress !== undefined && (
          <div className="mt-3 w-full bg-[#F7F7F9] h-1.5 overflow-hidden">
            <div className="bg-orange h-full" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
    </div>
  );
}

function CardTitle({ title }: { title: string }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-navy text-[14px] font-bold font-body uppercase tracking-[2px]">{title}</h2>
      <MoreHorizontal size={16} className="text-charcoal cursor-pointer opacity-50 hover:opacity-100" />
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      // Stagger KPI cards
      gsap.fromTo('.kpi-card', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out', delay: 0.1 });
      // Fade in chart sections
      gsap.fromTo('.chart-section', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.35 });
      // Fade in bottom cards
      gsap.fromTo('.bottom-card', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.55 });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-navy text-[42px] font-normal font-display leading-tight">Tableau de bord</h1>
        <p className="text-charcoal text-[15px] font-normal font-body mt-1">Vue d'ensemble — Fondateurs</p>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {kpiData.map((kpi, idx) => (
          <KPICard key={idx} {...kpi} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="chart-section bg-white border border-[#E5E7EB] p-6 hover:shadow-[0_2px_8px_rgba(0,0,70,0.08)] transition-all duration-200" style={{ opacity: 0 }}>
          <CardTitle title="Allocation par strategie" />
          <div className="h-[300px] w-full flex">
            <ResponsiveContainer width="60%" height="100%">
              <PieChart>
                <Pie data={allocationData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ border: 'none', boxShadow: '0 4px 12px rgba(0,0,70,0.1)', borderRadius: '0px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-[40%] flex flex-col justify-center gap-3">
              {allocationData.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5" style={{ backgroundColor: item.color }} />
                  <span className="text-[12px] text-charcoal truncate">{item.name}</span>
                  <span className="text-[12px] font-bold text-navy ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-section bg-white border border-[#E5E7EB] p-6 hover:shadow-[0_2px_8px_rgba(0,0,70,0.08)] transition-all duration-200" style={{ opacity: 0 }}>
          <CardTitle title="Evolution AUM (Mds EUR)" />
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={evolutionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#231F20' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#231F20' }} />
                <Tooltip cursor={{ fill: '#F7F7F9' }} contentStyle={{ border: 'none', boxShadow: '0 4px 12px rgba(0,0,70,0.1)', borderRadius: '0px' }} />
                <Bar dataKey="aum" fill="#000046" radius={0} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Lower Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Commercial */}
        <div className="bottom-card bg-white border border-[#E5E7EB] p-6 flex flex-col hover:shadow-[0_2px_8px_rgba(0,0,70,0.08)] transition-all duration-200" style={{ opacity: 0 }}>
          <CardTitle title="Pipeline Commercial" />
          <div className="space-y-4 flex-1">
            {pipelineData.map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="flex justify-between items-center mb-1.5">
                  <div className="flex items-center gap-2">
                    <Circle size={8} fill={item.color} stroke="none" />
                    <span className="text-[13px] text-charcoal">{item.stage}</span>
                  </div>
                  <span className="text-[13px] font-bold text-navy">{item.count} deals</span>
                </div>
                <div className="w-full bg-[#F7F7F9] h-1.5 overflow-hidden">
                  <div className="h-full transition-all group-hover:opacity-80" style={{ width: `${(item.count / 15) * 100}%`, backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/prospects')}
            className="mt-8 w-full border border-navy text-navy py-3 text-[13px] font-medium tracking-wider hover:bg-navy hover:text-white transition-colors cursor-pointer"
          >
            VOIR LE PIPELINE COMPLET
          </button>
        </div>

        {/* Alertes Compliance */}
        <div className="bottom-card bg-white border border-[#E5E7EB] p-6 hover:shadow-[0_2px_8px_rgba(0,0,70,0.08)] transition-all duration-200" style={{ opacity: 0 }}>
          <CardTitle title="Alertes Compliance" />
          <div className="space-y-1">
            {alertsData.map((alert) => (
              <div key={alert.id} className="py-3 border-b border-[#F7F7F9] flex items-center justify-between group hover:bg-[#F7F7F9] px-2 -mx-2 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <AlertCircle size={16} className={alert.type === 'error' ? 'text-red' : alert.type === 'warning' ? 'text-orange' : 'text-charcoal'} />
                  <span className="text-[13px] text-navy line-clamp-1">{alert.title}</span>
                </div>
                <Badge variant={alert.type}>{alert.status}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Activite Recente */}
        <div className="bottom-card bg-white border border-[#E5E7EB] p-6 hover:shadow-[0_2px_8px_rgba(0,0,70,0.08)] transition-all duration-200" style={{ opacity: 0 }}>
          <CardTitle title="Activite Recente" />
          <div className="relative space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-[#E5E7EB]">
            {activityData.map((activity) => (
              <div key={activity.id} className="relative pl-8 flex flex-col">
                <div className="absolute left-0 top-1 p-1 bg-white border border-[#E5E7EB] z-10">
                  <activity.icon size={14} className="text-orange" />
                </div>
                <span className="text-[13px] font-medium text-navy">{activity.action}</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] text-charcoal opacity-60 uppercase">{activity.user}</span>
                  <span className="text-[11px] text-charcoal opacity-40">&bull;</span>
                  <span className="text-[11px] text-charcoal opacity-60">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
