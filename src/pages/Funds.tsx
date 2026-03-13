import React from 'react';
import {
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  PieChart as PieChartIcon,
  Layers,
  Calendar,
  MoreHorizontal,
  Download,
  Filter
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend
} from 'recharts';

// --- Mock Data ---

const FUNDS_DATA = [
  { id: '1', name: 'Ardian LBO Fund VII', manager: 'Ardian', strategy: 'LBO', vintage: '2018', nav: 245.5, irr: 22.4, tvpi: 2.1, dpi: 0.8, status: 'Active' },
  { id: '2', name: 'Eurazeo Growth III', manager: 'Eurazeo', strategy: 'Growth', vintage: '2020', nav: 182.0, irr: 18.2, tvpi: 1.6, dpi: 0.2, status: 'Active' },
  { id: '3', name: 'Balderton Capital IX', manager: 'Balderton', strategy: 'Venture', vintage: '2022', nav: 95.4, irr: -4.2, tvpi: 0.9, dpi: 0.0, status: 'Fundraising' },
  { id: '4', name: 'Tikehau Direct Lending IV', manager: 'Tikehau Capital', strategy: 'Debt', vintage: '2019', nav: 312.8, irr: 8.9, tvpi: 1.3, dpi: 0.5, status: 'Active' },
  { id: '5', name: 'EQT IX', manager: 'EQT Partners', strategy: 'LBO', vintage: '2017', nav: 420.2, irr: 28.7, tvpi: 2.8, dpi: 1.4, status: 'Harvesting' },
  { id: '6', name: 'Partech Venture V', manager: 'Partech', strategy: 'Venture', vintage: '2019', nav: 68.3, irr: 14.1, tvpi: 1.5, dpi: 0.3, status: 'Active' },
  { id: '7', name: 'Blackstone RE Partners IX', manager: 'Blackstone', strategy: 'Real Estate', vintage: '2018', nav: 154.6, irr: 12.5, tvpi: 1.4, dpi: 0.6, status: 'Harvesting' },
  { id: '8', name: 'Antin Infrastructure IV', manager: 'Antin', strategy: 'Infra', vintage: '2021', nav: 110.1, irr: 9.2, tvpi: 1.1, dpi: 0.1, status: 'Active' },
  { id: '9', name: 'Cathay Innovation II', manager: 'Cathay Capital', strategy: 'Growth', vintage: '2019', nav: 88.5, irr: 20.1, tvpi: 1.9, dpi: 0.4, status: 'Active' },
  { id: '10', name: 'PAI Europe VII', manager: 'PAI Partners', strategy: 'LBO', vintage: '2018', nav: 224.9, irr: 19.5, tvpi: 1.8, dpi: 0.7, status: 'Active' },
];

const ALLOCATION_DATA = [
  { name: 'LBO', value: 42, color: '#000046' },
  { name: 'Growth', value: 24, color: '#FF8217' },
  { name: 'Venture', value: 12, color: '#FFB9AD' },
  { name: 'Debt', value: 10, color: '#E3F1EC' },
  { name: 'Real Estate', value: 8, color: '#CD002D' },
  { name: 'Infra', value: 4, color: '#FAEBDC' },
];

const CASHFLOW_DATA = [
  { quarter: 'Q1 24', calls: 45, distributions: 12 },
  { quarter: 'Q2 24', calls: 32, distributions: 58 },
  { quarter: 'Q3 24', calls: 68, distributions: 25 },
  { quarter: 'Q4 24', calls: 24, distributions: 84 },
  { quarter: 'Q1 25', calls: 55, distributions: 42 },
  { quarter: 'Q2 25', calls: 41, distributions: 65 },
];

// --- Sub-components ---

const badgeStyles: Record<string, string> = {
  default: 'bg-[#F7F7F9] text-[#000046]',
  success: 'bg-[#E3F1EC] text-[#16A34A]',
  warning: 'bg-[#FAEBDC] text-[#B45309]',
  error: 'bg-[#FEE2E2] text-[#CD002D]',
  orange: 'bg-[rgba(255,130,23,0.1)] text-[#FF8217]',
  navy: 'bg-[rgba(0,0,70,0.1)] text-[#000046]',
};

function Badge({ children, variant = 'default' }: { children: React.ReactNode; variant?: string }) {
  return (
    <span className={`font-body font-medium text-[12px] px-[10px] py-[4px] uppercase tracking-tight inline-flex items-center justify-center ${badgeStyles[variant] || badgeStyles.default}`}>
      {children}
    </span>
  );
}

function KPICard({ label, value, icon: Icon, subtext }: { label: string; value: string; icon: any; subtext?: string }) {
  return (
    <div className="bg-white border border-[#E5E7EB] p-5 flex flex-col justify-between hover:shadow-[0_2px_8px_rgba(0,0,70,0.08)] transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <span className="font-body text-charcoal text-[13px] uppercase tracking-wider">{label}</span>
        <Icon size={16} className="text-navy/40" />
      </div>
      <div>
        <div className="font-display text-[32px] text-navy leading-none mb-1">{value}</div>
        {subtext && <div className="font-body text-[12px] text-charcoal/50">{subtext}</div>}
      </div>
    </div>
  );
}

export default function Funds() {
  return (
    <div>
      {/* Header */}
      <header className="flex justify-between items-end mb-10">
        <div>
          <h1 className="font-display text-[42px] text-navy leading-tight mb-1">Private Markets</h1>
          <p className="font-body text-[15px] text-charcoal/70">Suivi des fonds non-cotes &bull; Private Equity, Real Estate & Infrastructure</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 border border-navy px-5 py-2.5 text-[13px] font-medium uppercase tracking-wide hover:bg-[#F7F7F9] transition-colors cursor-pointer">
            <Download size={14} /> Exporter
          </button>
          <button className="flex items-center gap-2 bg-navy text-white px-5 py-2.5 text-[13px] font-medium uppercase tracking-wide hover:bg-orange transition-colors cursor-pointer">
            <Plus size={16} /> Nouveau fonds
          </button>
        </div>
      </header>

      {/* Summary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard label="Fonds actifs" value="47" icon={Layers} subtext="12 gestionnaires differents" />
        <KPICard label="NAV totale" value="1.8 Mds \u20ac" icon={PieChartIcon} subtext="Valeur liquidative consolidee" />
        <KPICard label="IRR moyen" value="18.4%" icon={TrendingUp} subtext="+2.1% vs annee precedente" />
        <KPICard label="Appels en cours" value="12" icon={Calendar} subtext="2.4M EUR a liberer sous 15j" />
      </div>

      {/* Funds Table */}
      <div className="bg-white border border-[#E5E7EB] mb-8 overflow-hidden">
        <div className="p-5 border-b border-[#E5E7EB] flex justify-between items-center">
          <h2 className="font-display text-[24px] text-navy">Detail du portefeuille</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[13px] text-charcoal/50 cursor-pointer hover:text-navy transition-colors">
              <Filter size={14} /> Filtrer par strategie
            </div>
            <div className="w-[1px] h-4 bg-[#E5E7EB]" />
            <MoreHorizontal size={18} className="text-charcoal/40 cursor-pointer" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F7F9]">
                <th className="p-4 font-body font-medium text-[11px] uppercase tracking-wider text-navy border-b border-[#E5E7EB]">Fonds</th>
                <th className="p-4 font-body font-medium text-[11px] uppercase tracking-wider text-navy border-b border-[#E5E7EB]">Strategie</th>
                <th className="p-4 font-body font-medium text-[11px] uppercase tracking-wider text-navy border-b border-[#E5E7EB]">Vintage</th>
                <th className="p-4 font-body font-medium text-[11px] uppercase tracking-wider text-navy border-b border-[#E5E7EB] text-right">NAV</th>
                <th className="p-4 font-body font-medium text-[11px] uppercase tracking-wider text-navy border-b border-[#E5E7EB] text-right">IRR</th>
                <th className="p-4 font-body font-medium text-[11px] uppercase tracking-wider text-navy border-b border-[#E5E7EB] text-right">TVPI</th>
                <th className="p-4 font-body font-medium text-[11px] uppercase tracking-wider text-navy border-b border-[#E5E7EB] text-right">DPI</th>
                <th className="p-4 font-body font-medium text-[11px] uppercase tracking-wider text-navy border-b border-[#E5E7EB]">Statut</th>
              </tr>
            </thead>
            <tbody>
              {FUNDS_DATA.map((fund) => (
                <tr key={fund.id} className="border-b border-[#E5E7EB] hover:bg-[#F7F7F9]/50 transition-colors cursor-pointer">
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-navy text-[14px]">{fund.name}</span>
                      <span className="text-[12px] text-charcoal/50">{fund.manager}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant={fund.strategy === 'LBO' ? 'navy' : fund.strategy === 'Venture' ? 'orange' : 'default'}>{fund.strategy}</Badge>
                  </td>
                  <td className="p-4 text-[14px] text-charcoal">{fund.vintage}</td>
                  <td className="p-4 text-[14px] font-medium text-right text-navy">{fund.nav.toFixed(1)} M\u20ac</td>
                  <td className={`p-4 text-[14px] font-medium text-right ${fund.irr >= 0 ? 'text-[#16A34A]' : 'text-red'}`}>
                    <div className="flex items-center justify-end gap-1">
                      {fund.irr >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      {Math.abs(fund.irr).toFixed(1)}%
                    </div>
                  </td>
                  <td className="p-4 text-[14px] text-right">{fund.tvpi.toFixed(2)}x</td>
                  <td className="p-4 text-[14px] text-right">{fund.dpi.toFixed(2)}x</td>
                  <td className="p-4">
                    <Badge variant={fund.status === 'Active' ? 'success' : fund.status === 'Fundraising' ? 'warning' : 'navy'}>{fund.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Allocation */}
        <div className="bg-white border border-[#E5E7EB] p-6">
          <h3 className="font-display text-[24px] text-navy mb-6">Allocation par strategie</h3>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={ALLOCATION_DATA} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} barSize={32}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#231F20' }} width={90} />
                <Tooltip cursor={{ fill: '#F7F7F9' }} contentStyle={{ borderRadius: '0px', border: '1px solid #E5E7EB', fontSize: '12px' }} />
                <Bar dataKey="value" radius={0}>
                  {ALLOCATION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {ALLOCATION_DATA.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-2 h-2" style={{ backgroundColor: item.color }} />
                <span className="text-[12px] uppercase font-medium text-charcoal/50 tracking-wider">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Capital Calls & Distributions */}
        <div className="bg-white border border-[#E5E7EB] p-6">
          <h3 className="font-display text-[24px] text-navy mb-6">Appels & Distributions</h3>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CASHFLOW_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                <XAxis dataKey="quarter" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip contentStyle={{ borderRadius: '0px', border: '1px solid #E5E7EB' }} />
                <Legend verticalAlign="top" align="right" iconType="rect" wrapperStyle={{ paddingBottom: '20px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }} />
                <Bar dataKey="calls" name="Appels de fonds" fill="#000046" radius={0} />
                <Bar dataKey="distributions" name="Distributions" fill="#FF8217" radius={0} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-[12px] text-charcoal/40 italic text-center">Montants exprimes en Millions d'Euros (M EUR) sur les 6 derniers trimestres.</p>
        </div>
      </div>
    </div>
  );
}
