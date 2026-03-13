import { useState } from 'react';
import {
  TrendingUp,
  Layers,
  Calendar,
  ChevronRight,
  ArrowUpRight,
  AlertCircle,
  Clock,
  Building2,
  Landmark,
  ShieldCheck,
  Download
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip
} from 'recharts';

// --- DEMO DATA ---

const CHART_COLORS = ['#000046', '#FF8217', '#FFB9AD', '#E3F1EC', '#CD002D', '#FAEBDC'];

const allocationData = [
  { name: 'Private Equity', value: 35 },
  { name: 'LBO', value: 20 },
  { name: 'Growth', value: 15 },
  { name: 'Immobilier', value: 15 },
  { name: 'Dette Privee', value: 10 },
  { name: 'Infrastructure', value: 5 },
];

const performanceData = [
  { period: 'Q1 24', aum: 210 },
  { period: 'Q2 24', aum: 218 },
  { period: 'Q3 24', aum: 225 },
  { period: 'Q4 24', aum: 232 },
  { period: 'Q1 25', aum: 228 },
  { period: 'Q2 25', aum: 235 },
  { period: 'Q3 25', aum: 240 },
  { period: 'Q4 25', aum: 245 },
];

const timelineEvents = [
  { date: '14 mars 2026', title: 'Appel de fonds : Blackstone PE VII', type: 'Capital Call', status: 'Pending' },
  { date: '10 mars 2026', title: 'Validation Reporting Annuel 2025', type: 'Reporting', status: 'Completed' },
  { date: '05 mars 2026', title: 'Mise a jour KYC : Holding Rothenberg', type: 'Compliance', status: 'In Progress' },
  { date: '28 fev 2026', title: 'Distribution dividendes : SCI Alize', type: 'Flux Cash', status: 'Completed' },
  { date: '15 fev 2026', title: "Comite d'investissement trimestriel", type: 'Meeting', status: 'Completed' },
];

const pendingActions = [
  { id: 1, label: 'Renouvellement dossier KYC (Holding)', priority: 'High', deadline: '30 mars' },
  { id: 2, label: 'Signature rapport trimestriel Q4', priority: 'Medium', deadline: '15 avril' },
  { id: 3, label: 'Souscription Fonds Infra "Europe Transition"', priority: 'High', deadline: '22 mars' },
];

// --- COMPONENTS ---

function TabButton({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button className={`px-6 py-4 text-[11px] font-medium uppercase tracking-[2px] border-b-2 transition-all cursor-pointer ${
      active
        ? 'border-orange text-navy'
        : 'border-transparent text-charcoal/60 hover:text-navy hover:border-[#E5E7EB]'
    }`}>
      {label}
    </button>
  );
}

function KPICard({ label, value, icon: Icon, trend }: { label: string; value: string; icon: React.ComponentType<{ size?: number; className?: string }>; trend?: string }) {
  return (
    <div className="bg-white border border-[#E5E7EB] p-6 flex flex-col justify-between h-full group hover:shadow-[0_2px_8px_rgba(0,0,70,0.08)] transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-bg-light group-hover:bg-cream transition-colors">
          <Icon size={20} className="text-orange" />
        </div>
        {trend && (
          <span className="text-[12px] font-bold text-[#16A34A] flex items-center gap-1">
            {trend} <ArrowUpRight size={14} />
          </span>
        )}
      </div>
      <div>
        <p className="text-[13px] font-normal text-charcoal mb-1 font-body">{label}</p>
        <h3 className="text-[32px] font-normal text-navy font-display leading-none tracking-tight">{value}</h3>
      </div>
    </div>
  );
}

function EntityNode({ name, value, type, children, level = 0 }: { name: string; value: string; type: string; children?: React.ReactNode; level?: number }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full">
      <div
        className={`flex items-center justify-between p-4 border-l-2 ${level === 0 ? 'border-navy' : 'border-[#E5E7EB]'} bg-white mb-2 hover:bg-bg-light cursor-pointer transition-colors`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          {children && (
            <ChevronRight
              size={16}
              className={`text-charcoal/40 transition-transform ${isOpen ? 'rotate-90' : ''}`}
            />
          )}
          <div>
            <span className="text-[10px] uppercase tracking-wider text-orange font-bold block leading-none mb-1">{type}</span>
            <span className="text-[15px] font-medium text-navy font-body">{name}</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[15px] font-medium text-navy font-body">{value}</span>
        </div>
      </div>

      {isOpen && children && (
        <div className="ml-8 border-l border-dashed border-[#E5E7EB] pl-4">
          {children}
        </div>
      )}
    </div>
  );
}

export default function ClientDetail() {
  return (
    <div>
      {/* HEADER */}
      <header className="mb-8">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 flex items-center justify-center border-2 border-navy">
              <span className="font-display text-navy text-xl font-bold">R</span>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-[32px] font-normal font-display text-navy">Famille Rothenberg</h1>
                <span className="px-3 py-1 bg-sage text-[#16A34A] text-[10px] font-bold uppercase tracking-widest">Active</span>
              </div>
              <div className="flex items-center gap-4 text-[13px] text-charcoal/60">
                <span className="flex items-center gap-1"><Building2 size={14} /> Patrimoine Global</span>
                <span className="flex items-center gap-1"><ShieldCheck size={14} /> Tier 1 Portfolio</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-bg-light text-navy text-[12px] font-bold uppercase tracking-wider hover:bg-[#E5E7EB] transition-colors cursor-pointer">
              <Download size={16} /> Export PDF
            </button>
            <button className="flex items-center gap-2 px-6 py-2 bg-navy text-white text-[12px] font-bold uppercase tracking-wider hover:bg-orange transition-colors cursor-pointer">
              Edition Patrimoine
            </button>
          </div>
        </div>

        <nav className="flex items-center mt-6 border-b border-[#E5E7EB]">
          <TabButton label="Synthese" active />
          <TabButton label="Investissements" />
          <TabButton label="Entites" />
          <TabButton label="Documents" />
          <TabButton label="Reporting" />
          <TabButton label="Historique" />
        </nav>
      </header>

      {/* KPI SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard label="AUM Total Consolide" value="€245M" icon={Landmark} trend="+12.4%" />
        <KPICard label="Performance YTD" value="+8.2%" icon={TrendingUp} />
        <KPICard label="Nombre d'Entites" value="12" icon={Layers} />
        <KPICard label="Derniere Mise a Jour" value="12 Mar. 2026" icon={Calendar} />
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* LEFT COLUMN */}
        <div className="col-span-12 lg:col-span-8 space-y-8">

          {/* STRUCTURE PATRIMONIALE */}
          <section className="bg-white border border-[#E5E7EB] p-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-[24px] font-normal font-display text-navy mb-2">Structure Patrimoniale</h2>
                <p className="text-[13px] text-charcoal/60">Vue hierarchique des entites et actifs detenus</p>
              </div>
              <button className="text-[12px] font-bold text-orange uppercase tracking-wider hover:underline flex items-center gap-1 cursor-pointer">
                Voir tout le graphe <ChevronRight size={14} />
              </button>
            </div>

            <div className="space-y-4">
              <EntityNode name="SCI Alize" value="€45.0M" type="Immobilier" />
              <EntityNode name="Holding Rothenberg SA" value="€120.0M" type="Holding Familiale">
                <EntityNode name="Trust Familial (Jersey)" value="€35.0M" type="Fiducie" level={1} />
                <EntityNode name="Assurance Vie Generali" value="€15.0M" type="Enveloppe Fiscale" level={1} />
                <EntityNode name="Portefeuille Liste" value="€30.0M" type="Liquidites / Titres" level={1} />
              </EntityNode>
              <EntityNode name="Direct Investments" value="€80.0M" type="Private Equity" />
            </div>
          </section>

          {/* PERFORMANCE GRAPH */}
          <section className="bg-white border border-[#E5E7EB] p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-[24px] font-normal font-display text-navy mb-1">Evolution AUM</h2>
                <p className="text-[13px] text-charcoal/60">Historique des actifs sous gestion sur les 8 derniers trimestres</p>
              </div>
              <div className="flex gap-2">
                {['1A', '3A', 'ALL'].map((p) => (
                  <button key={p} className={`px-3 py-1 text-[10px] font-bold border cursor-pointer ${p === '1A' ? 'bg-navy text-white border-navy' : 'border-[#E5E7EB] text-charcoal'}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorAum" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#000046" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#000046" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                  <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#231F20' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#231F20' }} tickFormatter={(value) => `€${value}M`} />
                  <RechartsTooltip contentStyle={{ borderRadius: '0px', border: '1px solid #E5E7EB' }} />
                  <Area type="monotone" dataKey="aum" stroke="#000046" strokeWidth={2} fillOpacity={1} fill="url(#colorAum)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-12 lg:col-span-4 space-y-8">

          {/* ALLOCATION CHART */}
          <section className="bg-white border border-[#E5E7EB] p-8">
            <h2 className="text-[20px] font-normal font-display text-navy mb-6">Allocation Actifs</h2>
            <div className="h-[240px] w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={allocationData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                    {allocationData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {allocationData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between text-[13px]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }} />
                    <span className="text-charcoal">{item.name}</span>
                  </div>
                  <span className="font-bold text-navy">{item.value}%</span>
                </div>
              ))}
            </div>
          </section>

          {/* PENDING ACTIONS */}
          <section className="bg-cream border border-transition p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle size={18} className="text-red" />
              <h3 className="text-[14px] font-bold text-navy uppercase tracking-wider">Actions en attente (3)</h3>
            </div>
            <div className="space-y-4">
              {pendingActions.map((action) => (
                <div key={action.id} className="bg-white p-4 border border-transition/30 group cursor-pointer hover:border-orange transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-[9px] font-bold px-2 py-0.5 uppercase tracking-tighter ${action.priority === 'High' ? 'bg-[#FEE2E2] text-red' : 'bg-bg-light text-charcoal'}`}>
                      {action.priority}
                    </span>
                    <span className="text-[11px] text-charcoal/60 flex items-center gap-1">
                      <Clock size={12} /> {action.deadline}
                    </span>
                  </div>
                  <p className="text-[13px] font-medium text-navy leading-tight group-hover:text-orange transition-colors">{action.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ACTIVITY TIMELINE */}
          <section className="bg-white border border-[#E5E7EB] p-8">
            <h2 className="text-[20px] font-normal font-display text-navy mb-6">Activite Recente</h2>
            <div className="space-y-6 relative before:content-[''] before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[1px] before:bg-[#E5E7EB]">
              {timelineEvents.map((event, idx) => (
                <div key={idx} className="relative pl-8">
                  <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-white z-10 ${
                    event.status === 'Completed' ? 'bg-[#16A34A]' : event.status === 'Pending' ? 'bg-orange' : 'bg-navy'
                  }`} />
                  <span className="text-[11px] font-bold text-orange block mb-1 uppercase tracking-wider">{event.date}</span>
                  <h4 className="text-[14px] font-medium text-navy font-body mb-1">{event.title}</h4>
                  <span className="text-[12px] text-charcoal/60 italic">{event.type}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 border border-navy text-navy text-[11px] font-bold uppercase tracking-[2px] hover:bg-navy hover:text-white transition-all cursor-pointer">
              Voir tout l'historique
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
