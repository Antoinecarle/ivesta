import { useState } from 'react';
import {
  Plus,
  Search,
  Filter,
  Users,
  Euro,
  TrendingUp,
  CheckCircle2,
  Calendar,
  MoreHorizontal,
  LayoutGrid,
  List,
  Target
} from 'lucide-react';

// --- Types ---
type ProspectSource = 'CFNews' | 'LinkedIn' | 'Referral' | 'Event';

interface Prospect {
  id: string;
  name: string;
  company: string;
  aum: string;
  source: ProspectSource;
  partnerInitials: string;
  lastActivity: string;
  priority: 'low' | 'medium' | 'high';
}

interface PipelineColumn {
  id: string;
  title: string;
  count: number;
  prospects: Prospect[];
}

// --- Demo Data ---
const PIPELINE_DATA: PipelineColumn[] = [
  {
    id: 'lead', title: 'Lead', count: 12,
    prospects: [
      { id: '1', name: 'Jean-Marc Delacroix', company: 'Delacroix Holding', aum: '25M', source: 'CFNews', partnerInitials: 'JD', lastActivity: '2j', priority: 'medium' },
      { id: '2', name: 'Liu Wei', company: 'Singapour Family Office', aum: '80M', source: 'Referral', partnerInitials: 'ML', lastActivity: '1j', priority: 'high' },
      { id: '3', name: 'Famille Dumont', company: 'Dumont Estate', aum: '15M', source: 'LinkedIn', partnerInitials: 'AB', lastActivity: '4j', priority: 'low' },
    ]
  },
  {
    id: 'qualifie', title: 'Qualifie', count: 8,
    prospects: [
      { id: '4', name: 'Bertrand de Villiers', company: 'Prive', aum: '40M', source: 'Event', partnerInitials: 'JD', lastActivity: '5j', priority: 'medium' },
      { id: '5', name: 'Al-Rashid Family', company: 'Global Assets', aum: '120M', source: 'Referral', partnerInitials: 'ML', lastActivity: '12h', priority: 'high' },
    ]
  },
  {
    id: 'rdv', title: 'RDV', count: 14,
    prospects: [
      { id: '6', name: 'Famille Moreau', company: 'Moreau Ind.', aum: '35M', source: 'CFNews', partnerInitials: 'AB', lastActivity: '3j', priority: 'medium' },
      { id: '7', name: 'Sophie Germain', company: 'Germain Capital', aum: '55M', source: 'LinkedIn', partnerInitials: 'JD', lastActivity: '1j', priority: 'high' },
      { id: '8', name: 'Hans Mueller', company: 'Mueller GmbH', aum: '30M', source: 'Event', partnerInitials: 'ML', lastActivity: '6j', priority: 'low' },
    ]
  },
  {
    id: 'proposition', title: 'Proposition', count: 5,
    prospects: [
      { id: '9', name: 'Nakamura Trust', company: 'Nakamura FO', aum: '90M', source: 'Referral', partnerInitials: 'AB', lastActivity: '2j', priority: 'high' },
      { id: '10', name: 'Famille Petit', company: 'Prive', aum: '20M', source: 'CFNews', partnerInitials: 'JD', lastActivity: '8h', priority: 'medium' },
    ]
  },
  {
    id: 'negociation', title: 'Negociation', count: 3,
    prospects: [
      { id: '11', name: 'Goldman Estate', company: 'Goldman LP', aum: '150M', source: 'Referral', partnerInitials: 'ML', lastActivity: '1j', priority: 'high' },
    ]
  },
  {
    id: 'gagne', title: 'Gagne', count: 3,
    prospects: [
      { id: '12', name: 'Famille Bonnet', company: 'Bonnet SAS', aum: '45M', source: 'Referral', partnerInitials: 'AB', lastActivity: '10j', priority: 'low' },
      { id: '13', name: 'Chen Family Trust', company: 'Chen Int.', aum: '60M', source: 'LinkedIn', partnerInitials: 'JD', lastActivity: '15j', priority: 'medium' },
      { id: '14', name: 'Rochefort Patrimoine', company: 'Prive', aum: '25M', source: 'Event', partnerInitials: 'ML', lastActivity: '12j', priority: 'low' },
    ]
  }
];

// --- Components ---

const SOURCE_STYLES: Record<ProspectSource, string> = {
  CFNews: 'bg-transition text-navy',
  LinkedIn: 'bg-salmon text-navy',
  Referral: 'bg-sage text-navy',
  Event: 'bg-cream text-navy',
};

function SourceBadge({ source }: { source: ProspectSource }) {
  return (
    <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 ${SOURCE_STYLES[source]}`}>
      {source}
    </span>
  );
}

function KpiCard({ label, value, icon: Icon, subValue }: { label: string; value: string; icon: React.ComponentType<{ size?: number; className?: string }>; subValue?: string }) {
  return (
    <div className="bg-white border border-[#E5E7EB] p-6 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <span className="text-[13px] uppercase tracking-widest text-charcoal/60 font-body">{label}</span>
        <Icon size={20} className="text-navy" />
      </div>
      <div>
        <div className="text-[32px] leading-tight font-display text-navy">{value}</div>
        {subValue && <div className="text-[13px] mt-1 text-orange font-body">{subValue}</div>}
      </div>
    </div>
  );
}

function ProspectCard({ prospect }: { prospect: Prospect }) {
  const priorityColor = prospect.priority === 'high' ? 'bg-red' : prospect.priority === 'medium' ? 'bg-orange' : 'bg-[#CBD5E1]';

  return (
    <div className="bg-white border border-[#E5E7EB] p-4 mb-3 group hover:border-navy hover:shadow-[0_2px_8px_rgba(0,0,70,0.08)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 ${priorityColor}`} />
          <SourceBadge source={prospect.source} />
        </div>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <MoreHorizontal size={16} className="text-charcoal" />
        </button>
      </div>

      <div className="mb-1">
        <h4 className="text-[16px] font-medium leading-tight font-body text-navy">{prospect.name}</h4>
        <p className="text-[13px] text-charcoal/60 font-body">{prospect.company}</p>
      </div>

      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#F7F7F9]">
        <div className="flex-1">
          <div className="flex items-center gap-1 text-[13px] font-bold text-navy">
            <Euro size={12} />
            <span>{prospect.aum} AUM</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-charcoal/50 flex items-center gap-1">
            <Calendar size={10} /> {prospect.lastActivity}
          </span>
          <div className="w-6 h-6 flex items-center justify-center text-[10px] font-bold text-white bg-navy">
            {prospect.partnerInitials}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main ---

export default function Prospects() {
  const [view, setView] = useState<'kanban' | 'list'>('kanban');

  return (
    <div>
      {/* Header */}
      <header className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-[42px] leading-none font-display text-navy mb-2">Pipeline Commercial</h1>
          <p className="text-[15px] text-charcoal/60 font-body flex items-center gap-2">
            <Target size={16} className="text-orange" />
            CRM & Prospection iVesta
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-white border border-[#E5E7EB] p-1">
            <button
              onClick={() => setView('kanban')}
              className={`px-4 py-2 flex items-center gap-2 text-[13px] transition-all cursor-pointer ${view === 'kanban' ? 'bg-navy text-white' : 'hover:bg-bg-light'}`}
            >
              <LayoutGrid size={14} /> Vue Kanban
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 flex items-center gap-2 text-[13px] transition-all cursor-pointer ${view === 'list' ? 'bg-navy text-white' : 'hover:bg-bg-light'}`}
            >
              <List size={14} /> Vue Liste
            </button>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-navy text-white text-[14px] font-medium hover:bg-orange transition-colors cursor-pointer">
            <Plus size={18} /> Nouveau Prospect
          </button>
        </div>
      </header>

      {/* KPIs */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <KpiCard label="Total Prospects" value="42" icon={Users} subValue="+4 cette semaine" />
        <KpiCard label="AUM Potentiel" value="€320M" icon={Euro} subValue="Pipeline pondere: €145M" />
        <KpiCard label="Taux de Conversion" value="18.5%" icon={TrendingUp} subValue="+2.1 pts vs T3" />
        <KpiCard label="Gagnes (T4)" value="3" icon={CheckCircle2} subValue="Volume: €45M" />
      </section>

      {/* Toolbar */}
      <div className="flex justify-between items-center mb-6 bg-white border border-[#E5E7EB] p-4">
        <div className="flex items-center gap-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" size={16} />
            <input
              type="text"
              placeholder="Rechercher une famille, un holding..."
              className="pl-10 pr-4 py-2 text-[13px] border border-[#D1D5DB] w-80 focus:outline-none focus:border-navy"
            />
          </div>
          <div className="h-6 w-[1px] bg-[#E5E7EB]" />
          <button className="flex items-center gap-2 text-[13px] text-charcoal/60 hover:text-navy transition-colors cursor-pointer">
            <Filter size={16} /> Filtrer par Source
          </button>
          <button className="flex items-center gap-2 text-[13px] text-charcoal/60 hover:text-navy transition-colors cursor-pointer">
            <Users size={16} /> Tous les Partners
          </button>
        </div>
        <div className="text-[13px] text-charcoal/40 italic">
          Derniere synchronisation : Aujourd'hui a 09:42
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-6 -mx-2 px-2">
        {PIPELINE_DATA.map((column) => (
          <div key={column.id} className="shrink-0 w-80">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-3">
                <h3 className="text-[13px] font-bold uppercase tracking-widest font-body text-navy">{column.title}</h3>
                <span className="px-2 py-0.5 text-[11px] font-bold bg-cream text-navy">{column.count}</span>
              </div>
              <button className="p-1 hover:bg-bg-light transition-colors cursor-pointer">
                <Plus size={14} className="text-charcoal" />
              </button>
            </div>

            {/* Column Body */}
            <div className={`min-h-[500px] border-t-2 ${column.id === 'gagne' ? 'border-sage' : 'border-navy'}`}>
              <div className="pt-4">
                {column.prospects.map((prospect) => (
                  <ProspectCard key={prospect.id} prospect={prospect} />
                ))}
                {column.prospects.length === 0 && (
                  <div className="border-2 border-dashed border-[#E5E7EB] h-24 flex items-center justify-center text-[12px] text-charcoal/30 italic uppercase tracking-tighter">
                    Deposer ici
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
