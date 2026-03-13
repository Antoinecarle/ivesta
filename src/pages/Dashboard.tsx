import { useQuery } from '@tanstack/react-query';
import { api, formatCurrency } from '../lib/api';
import { Users, TrendingUp, Target, Shield } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const COLORS = ['#000046', '#FF810A', '#FFB9AD', '#E3F1EC', '#CD002D', '#FAEBDC'];
const STRATEGY_LABELS: Record<string, string> = {
  venture: 'Venture Capital', lbo: 'LBO', growth: 'Growth', debt: 'Dette Privee',
  real_estate: 'Immobilier', infrastructure: 'Infrastructure', secondary: 'Secondaire',
  fund_of_funds: 'Fonds de Fonds', other: 'Autre',
};

export default function Dashboard() {
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => api<any>('/dashboard/stats'),
  });

  const { data: allocation } = useQuery({
    queryKey: ['dashboard-allocation'],
    queryFn: () => api<any>('/dashboard/allocation'),
  });

  const pieData = allocation?.fundsByStrategy?.map((s: any) => ({
    name: STRATEGY_LABELS[s.strategy] || s.strategy,
    value: parseFloat(s.total_nav),
  })) || [];

  const barData = [
    { name: 'Cote', value: allocation?.listedTotal || 0 },
    { name: 'Non-cote', value: allocation?.nonListedTotal || 0 },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-navy">Tableau de bord</h1>
        <p className="text-charcoal/60 mt-1">Vue d'ensemble de votre activite</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <KPICard icon={Users} label="Familles actives" value={stats?.totalFamilies ?? '...'} color="bg-navy" />
        <KPICard icon={TrendingUp} label="Fonds suivis" value={stats?.totalFunds ?? '...'} color="bg-orange" />
        <KPICard icon={Target} label="Prospects actifs" value={stats?.activeProspects ?? '...'} color="bg-mint" textColor="text-navy" />
        <KPICard icon={Shield} label="AUM total" value={stats ? formatCurrency(stats.totalAum) : '...'} color="bg-beige" textColor="text-navy" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 border border-navy/5">
          <h3 className="font-display font-bold text-lg text-navy mb-4">Allocation par strategie</h3>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                  {pieData.map((_: any, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => formatCurrency(Number(v))} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[280px] flex items-center justify-center text-charcoal/40 text-sm">Aucune donnee</div>
          )}
        </div>

        <div className="bg-white p-6 border border-navy/5">
          <h3 className="font-display font-bold text-lg text-navy mb-4">Cote vs Non-cote</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" tick={{ fill: '#000046', fontSize: 13 }} />
              <YAxis tick={{ fill: '#000046', fontSize: 11 }} tickFormatter={(v) => formatCurrency(v)} />
              <Tooltip formatter={(v) => formatCurrency(Number(v))} />
              <Bar dataKey="value" fill="#000046" radius={[0, 0, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Compliance overview */}
      <div className="bg-white p-6 border border-navy/5">
        <h3 className="font-display font-bold text-lg text-navy mb-4">Etat compliance</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-mint/50 p-4">
            <p className="text-3xl font-display font-bold text-navy">{stats?.compliance?.passed || 0}</p>
            <p className="text-sm text-charcoal/60 mt-1">Conformes</p>
          </div>
          <div className="bg-beige/50 p-4">
            <p className="text-3xl font-display font-bold text-orange">{stats?.compliance?.pending || 0}</p>
            <p className="text-sm text-charcoal/60 mt-1">En attente</p>
          </div>
          <div className="bg-rose/30 p-4">
            <p className="text-3xl font-display font-bold text-red">{stats?.compliance?.expired || 0}</p>
            <p className="text-sm text-charcoal/60 mt-1">Expires</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ icon: Icon, label, value, color, textColor = 'text-white' }: any) {
  return (
    <div className={`${color} ${textColor} p-5 flex items-start justify-between`}>
      <div>
        <p className="text-sm opacity-70 mb-1">{label}</p>
        <p className="text-2xl font-display font-bold">{value}</p>
      </div>
      <div className="opacity-30">
        <Icon size={32} />
      </div>
    </div>
  );
}
