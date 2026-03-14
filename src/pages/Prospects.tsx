import { useState } from 'react';
import {
  Plus, Search, Filter, Users, Euro,
  MoreHorizontal, LayoutGrid, List, Target,
  Clock, Mail, Phone, ChevronRight, Bell, ArrowRight, Newspaper
} from 'lucide-react';

// ══════════════════════════════════════════════
// TYPES & DATA
// ══════════════════════════════════════════════

type ProspectSource = 'CFNews' | 'LinkedIn' | 'Referral' | 'Event' | 'Inbound';
type Priority = 'low' | 'medium' | 'high';

interface Interaction {
  date: string;
  type: 'email' | 'call' | 'meeting' | 'note';
  summary: string;
}

interface Prospect {
  id: string;
  name: string;
  company: string;
  aum: string;
  aumValue: number;
  source: ProspectSource;
  partnerInitials: string;
  partnerName: string;
  lastActivity: string;
  priority: Priority;
  nextAction: string;
  nextActionDate: string;
  interactions: Interaction[];
  tags: string[];
}

interface PipelineColumn {
  id: string;
  title: string;
  description: string;
  color: string;
  prospects: Prospect[];
}

// ── CFNews deals (API auto — chaque lundi, deals > 50M) ──
const cfNewsDeals = [
  { date: '11 mars 2026', title: 'Ardian acquiert Groupe Soleil (€180M)', sector: 'Services', relevance: 'high' },
  { date: '11 mars 2026', title: 'Tikehau Capital — Closing Fonds Infra V (€850M)', sector: 'Infrastructure', relevance: 'medium' },
  { date: '04 mars 2026', title: 'Eurazeo cede sa participation dans Questel (€120M)', sector: 'Tech', relevance: 'high' },
  { date: '04 mars 2026', title: 'LBO France leve son Fonds VIII (€500M)', sector: 'LBO', relevance: 'low' },
  { date: '25 fev 2026', title: 'PAI Partners — Acquisition DomusVi (€2.1Md)', sector: 'Sante', relevance: 'high' },
];

// ── Pipeline Data ──
const PIPELINE_DATA: PipelineColumn[] = [
  {
    id: 'lead', title: 'Lead', description: 'Premier contact identifie', color: 'border-charcoal/30',
    prospects: [
      { id: '1', name: 'Jean-Marc Delacroix', company: 'Delacroix Holding', aum: '25M', aumValue: 25, source: 'CFNews', partnerInitials: 'AC', partnerName: 'A. Chaouchi', lastActivity: '2j', priority: 'medium', nextAction: 'Envoyer intro email', nextActionDate: '16 mars', interactions: [
        { date: '12 mars', type: 'note', summary: 'Identifie via deal CFNews — cession Groupe Soleil' }
      ], tags: ['Industriel', 'Paris'] },
      { id: '2', name: 'Liu Wei', company: 'Singapour Family Office', aum: '80M', aumValue: 80, source: 'Referral', partnerInitials: 'ML', partnerName: 'M. Levy', lastActivity: '1j', priority: 'high', nextAction: 'Appel de qualification', nextActionDate: '15 mars', interactions: [
        { date: '13 mars', type: 'email', summary: 'Email d\'introduction envoye par J. Nakamura' },
        { date: '12 mars', type: 'note', summary: 'Recommandation client existant (Nakamura)' }
      ], tags: ['Asie', 'UHNW'] },
      { id: '3', name: 'Famille Dumont', company: 'Dumont Estate', aum: '15M', aumValue: 15, source: 'LinkedIn', partnerInitials: 'SB', partnerName: 'S. Bouzid', lastActivity: '4j', priority: 'low', nextAction: 'Follow-up LinkedIn', nextActionDate: '18 mars', interactions: [
        { date: '10 mars', type: 'note', summary: 'Connexion LinkedIn acceptee' }
      ], tags: ['Province'] },
    ]
  },
  {
    id: 'qualifie', title: 'Qualifie', description: 'Besoin confirme, profil valide', color: 'border-[#B45309]',
    prospects: [
      { id: '4', name: 'Bertrand de Villiers', company: 'Prive', aum: '40M', aumValue: 40, source: 'Event', partnerInitials: 'AC', partnerName: 'A. Chaouchi', lastActivity: '5j', priority: 'medium', nextAction: 'Envoyer plaquette iVesta', nextActionDate: '17 mars', interactions: [
        { date: '09 mars', type: 'meeting', summary: 'Rencontre Salon du Patrimoine — interesse PE & Immo' },
        { date: '05 mars', type: 'call', summary: 'Appel de qualification — patrimoine €40M, cherche MFO' }
      ], tags: ['Entrepreneur', 'Lyon'] },
      { id: '5', name: 'Al-Rashid Family (branche UK)', company: 'Global Assets', aum: '120M', aumValue: 120, source: 'Referral', partnerInitials: 'ML', partnerName: 'M. Levy', lastActivity: '12h', priority: 'high', nextAction: 'Preparer proposition', nextActionDate: '18 mars', interactions: [
        { date: '14 mars', type: 'call', summary: 'Call avec Omar — branche UK cherche MFO europeen' },
        { date: '10 mars', type: 'email', summary: 'Intro par famille Al-Rashid (client existant)' }
      ], tags: ['UK', 'UHNW', 'Cross-border'] },
    ]
  },
  {
    id: 'rdv', title: 'Rendez-vous', description: 'Meeting programme ou effectue', color: 'border-navy',
    prospects: [
      { id: '6', name: 'Famille Moreau', company: 'Moreau Industries', aum: '35M', aumValue: 35, source: 'CFNews', partnerInitials: 'SB', partnerName: 'S. Bouzid', lastActivity: '3j', priority: 'medium', nextAction: 'RDV Place Vendome le 19 mars', nextActionDate: '19 mars', interactions: [
        { date: '11 mars', type: 'email', summary: 'Confirmation RDV 19 mars 14h' },
        { date: '08 mars', type: 'call', summary: 'Call 30min — cession boite familiale prevue 2026' },
        { date: '04 mars', type: 'note', summary: 'Identifie via CFNews — cession Moreau Industries' }
      ], tags: ['Cession', 'Industriel'] },
      { id: '7', name: 'Sophie Germain', company: 'Germain Capital', aum: '55M', aumValue: 55, source: 'LinkedIn', partnerInitials: 'AC', partnerName: 'A. Chaouchi', lastActivity: '1j', priority: 'high', nextAction: 'Envoyer CR reunion + proposition', nextActionDate: '16 mars', interactions: [
        { date: '13 mars', type: 'meeting', summary: 'Dejeuner Place Vendome — tres enthousiaste, veut PE + Infra' },
        { date: '07 mars', type: 'call', summary: 'Premier appel — ancienne Goldman Sachs, patrimoine liquide' }
      ], tags: ['Finance', 'Paris', 'UHNW'] },
    ]
  },
  {
    id: 'proposition', title: 'Proposition', description: 'Offre envoyee au prospect', color: 'border-orange',
    prospects: [
      { id: '9', name: 'Nakamura Trust', company: 'Nakamura FO', aum: '90M', aumValue: 90, source: 'Referral', partnerInitials: 'ML', partnerName: 'M. Levy', lastActivity: '2j', priority: 'high', nextAction: 'Relance telephone', nextActionDate: '17 mars', interactions: [
        { date: '12 mars', type: 'email', summary: 'Proposition envoyee — mandat advisory €90M' },
        { date: '05 mars', type: 'meeting', summary: 'RDV 2h — presentation complete offre iVesta' },
        { date: '28 fev', type: 'call', summary: 'Call qualification — satisfait mais veut comparer' }
      ], tags: ['Japon', 'UHNW'] },
      { id: '10', name: 'Famille Petit', company: 'Prive', aum: '20M', aumValue: 20, source: 'CFNews', partnerInitials: 'AC', partnerName: 'A. Chaouchi', lastActivity: '8h', priority: 'medium', nextAction: 'Attente retour client', nextActionDate: '20 mars', interactions: [
        { date: '14 mars', type: 'email', summary: 'Relance envoyee — pas de retour depuis 5 jours' },
        { date: '09 mars', type: 'email', summary: 'Proposition de mandat envoyee' },
        { date: '03 mars', type: 'meeting', summary: 'RDV decouverte' }
      ], tags: ['Patrimoine moyen'] },
    ]
  },
  {
    id: 'negociation', title: 'Negociation', description: 'Termes en discussion', color: 'border-[#16A34A]',
    prospects: [
      { id: '11', name: 'Goldman Estate', company: 'Goldman LP', aum: '150M', aumValue: 150, source: 'Referral', partnerInitials: 'ML', partnerName: 'M. Levy', lastActivity: '1j', priority: 'high', nextAction: 'Finaliser grille tarifaire', nextActionDate: '18 mars', interactions: [
        { date: '13 mars', type: 'call', summary: 'Negociation tarif — veut 0.40% au lieu de 0.45%' },
        { date: '08 mars', type: 'meeting', summary: 'RDV avec les 2 fondateurs — quasi signe' },
        { date: '01 mars', type: 'email', summary: 'Proposition de mandat envoyee' },
        { date: '20 fev', type: 'meeting', summary: 'Premiere rencontre — recommande par JPMorgan PB' }
      ], tags: ['UHNW', 'US', 'Cross-border'] },
    ]
  },
  {
    id: 'gagne', title: 'Gagne', description: 'Client signe', color: 'border-sage',
    prospects: [
      { id: '12', name: 'Famille Bonnet', company: 'Bonnet SAS', aum: '45M', aumValue: 45, source: 'Referral', partnerInitials: 'SB', partnerName: 'S. Bouzid', lastActivity: '10j', priority: 'low', nextAction: 'Onboarding en cours', nextActionDate: '', interactions: [
        { date: '04 mars', type: 'note', summary: 'Mandat signe — onboarding lance' }
      ], tags: ['Signe'] },
      { id: '13', name: 'Chen Family Trust', company: 'Chen Int.', aum: '60M', aumValue: 60, source: 'LinkedIn', partnerInitials: 'AC', partnerName: 'A. Chaouchi', lastActivity: '15j', priority: 'medium', nextAction: 'KYC en cours', nextActionDate: '', interactions: [
        { date: '27 fev', type: 'note', summary: 'Mandat signe — KYC en cours' }
      ], tags: ['Signe'] },
    ]
  }
];

// ══════════════════════════════════════════════
// COMPONENTS
// ══════════════════════════════════════════════

const SOURCE_STYLES: Record<ProspectSource, string> = {
  CFNews: 'bg-[#E0E7FF] text-navy',
  LinkedIn: 'bg-salmon text-navy',
  Referral: 'bg-sage text-navy',
  Event: 'bg-cream text-navy',
  Inbound: 'bg-[#F7F7F9] text-navy',
};

const INTERACTION_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  email: Mail,
  call: Phone,
  meeting: Users,
  note: ChevronRight,
};

function ProspectCard({ prospect, onClick }: { prospect: Prospect; onClick: () => void }) {
  const priorityColor = prospect.priority === 'high' ? 'bg-red' : prospect.priority === 'medium' ? 'bg-orange' : 'bg-[#CBD5E1]';
  const hasUpcomingAction = prospect.nextActionDate && prospect.nextActionDate !== '';

  return (
    <div onClick={onClick} className="bg-white border border-[#E5E7EB] p-4 mb-3 group hover:border-navy hover:shadow-[0_2px_8px_rgba(0,0,70,0.08)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 ${priorityColor}`} />
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${SOURCE_STYLES[prospect.source]}`}>{prospect.source}</span>
        </div>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={e => e.stopPropagation()}>
          <MoreHorizontal size={16} className="text-charcoal" />
        </button>
      </div>

      <div className="mb-2">
        <h4 className="text-[15px] font-medium leading-tight font-body text-navy">{prospect.name}</h4>
        <p className="text-[12px] text-charcoal/60 font-body">{prospect.company}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {prospect.tags.map(t => (
          <span key={t} className="text-[9px] font-body px-1.5 py-0.5 bg-[#F7F7F9] text-charcoal/60">{t}</span>
        ))}
      </div>

      {/* Next action */}
      {hasUpcomingAction && (
        <div className="p-2 bg-cream/50 border border-orange/10 mb-3">
          <p className="text-[10px] font-body text-orange font-bold flex items-center gap-1">
            <Bell size={10} /> {prospect.nextAction}
          </p>
          <p className="text-[9px] font-body text-charcoal/50 mt-0.5">{prospect.nextActionDate}</p>
        </div>
      )}

      {/* Last interaction */}
      {prospect.interactions.length > 0 && (
        <div className="flex items-start gap-2 mb-3">
          {(() => {
            const last = prospect.interactions[0];
            const Icon = INTERACTION_ICONS[last.type] || ChevronRight;
            return (
              <>
                <Icon size={12} className="text-charcoal/30 mt-0.5 shrink-0" />
                <p className="text-[10px] font-body text-charcoal/50 leading-tight">{last.summary}</p>
              </>
            );
          })()}
        </div>
      )}

      <div className="flex items-center gap-2 pt-3 border-t border-[#F7F7F9]">
        <div className="flex-1">
          <div className="flex items-center gap-1 text-[13px] font-bold text-navy">
            <Euro size={12} />
            <span>{prospect.aum}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-charcoal/50 flex items-center gap-1">
            <Clock size={10} /> {prospect.lastActivity}
          </span>
          <div className="w-6 h-6 flex items-center justify-center text-[10px] font-bold text-white bg-navy">
            {prospect.partnerInitials}
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════

export default function Prospects() {
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [filterPartner, setFilterPartner] = useState<string>('all');

  const allProspects = PIPELINE_DATA.flatMap(c => c.prospects);
  const filteredPipeline = filterPartner === 'all'
    ? PIPELINE_DATA
    : PIPELINE_DATA.map(col => ({ ...col, prospects: col.prospects.filter(p => p.partnerName === filterPartner) }));

  const totalAumPipeline = allProspects.reduce((s, p) => s + p.aumValue, 0);
  const partners = [...new Set(allProspects.map(p => p.partnerName))];
  const highPriority = allProspects.filter(p => p.priority === 'high').length;

  return (
    <div>
      {/* Header */}
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-[36px] leading-none font-display text-navy mb-2">Pipeline Commercial</h1>
          <p className="text-[14px] text-charcoal/60 font-body flex items-center gap-2">
            <Target size={16} className="text-orange" />
            CRM & Prospection iVesta — Suivi des familles en cours d'acquisition
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-[#E5E7EB] p-1">
            <button onClick={() => setView('kanban')} className={`px-4 py-2 flex items-center gap-2 text-[12px] transition-all cursor-pointer ${view === 'kanban' ? 'bg-navy text-white' : 'hover:bg-bg-light'}`}>
              <LayoutGrid size={14} /> Kanban
            </button>
            <button onClick={() => setView('list')} className={`px-4 py-2 flex items-center gap-2 text-[12px] transition-all cursor-pointer ${view === 'list' ? 'bg-navy text-white' : 'hover:bg-bg-light'}`}>
              <List size={14} /> Liste
            </button>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-navy text-white text-[13px] font-bold font-body uppercase tracking-wider hover:bg-orange transition-colors cursor-pointer">
            <Plus size={16} /> Nouveau Prospect
          </button>
        </div>
      </header>

      {/* KPIs */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white border border-[#E5E7EB] p-5">
          <p className="text-[10px] uppercase tracking-widest text-charcoal/60 font-body mb-1">Total Prospects</p>
          <p className="text-[28px] leading-tight font-display text-navy">{allProspects.length}</p>
          <p className="text-[12px] mt-1 text-orange font-body">dont {highPriority} priorite haute</p>
        </div>
        <div className="bg-white border border-[#E5E7EB] p-5">
          <p className="text-[10px] uppercase tracking-widest text-charcoal/60 font-body mb-1">AUM Pipeline</p>
          <p className="text-[28px] leading-tight font-display text-navy">€{totalAumPipeline}M</p>
          <p className="text-[12px] mt-1 text-orange font-body">Pondere: ~€{Math.round(totalAumPipeline * 0.35)}M</p>
        </div>
        <div className="bg-white border border-[#E5E7EB] p-5">
          <p className="text-[10px] uppercase tracking-widest text-charcoal/60 font-body mb-1">Taux Conversion</p>
          <p className="text-[28px] leading-tight font-display text-navy">18.5%</p>
          <p className="text-[12px] mt-1 text-[#16A34A] font-body">+2.1 pts vs T3</p>
        </div>
        <div className="bg-white border border-[#E5E7EB] p-5">
          <p className="text-[10px] uppercase tracking-widest text-charcoal/60 font-body mb-1">Gagnes (T4)</p>
          <p className="text-[28px] leading-tight font-display text-navy">3</p>
          <p className="text-[12px] mt-1 text-[#16A34A] font-body">€130M AUM signe</p>
        </div>
        <div className="bg-white border border-[#E5E7EB] p-5">
          <p className="text-[10px] uppercase tracking-widest text-charcoal/60 font-body mb-1">Actions a faire</p>
          <p className="text-[28px] leading-tight font-display text-red">{allProspects.filter(p => p.nextActionDate).length}</p>
          <p className="text-[12px] mt-1 text-red font-body">relances cette semaine</p>
        </div>
      </section>

      {/* Toolbar */}
      <div className="flex justify-between items-center mb-5 bg-white border border-[#E5E7EB] p-3">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30" size={14} />
            <input type="text" placeholder="Rechercher un prospect..." className="pl-9 pr-4 py-2 text-[12px] border border-[#D1D5DB] w-64 focus:outline-none focus:border-navy" />
          </div>
          <select
            value={filterPartner}
            onChange={e => setFilterPartner(e.target.value)}
            className="border border-[#D1D5DB] px-3 py-2 text-xs font-body text-navy outline-none cursor-pointer"
          >
            <option value="all">Tous les Partners</option>
            {partners.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <button className="flex items-center gap-2 text-[12px] text-charcoal/60 hover:text-navy transition-colors cursor-pointer">
            <Filter size={14} /> Filtrer par Source
          </button>
        </div>
        <div className="text-[11px] text-charcoal/40 italic font-body">
          API CFNews sync : lundi 11 mars 2026, 08:00
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Kanban — 3 cols */}
        <div className="lg:col-span-3">
          <div className="flex gap-3 overflow-x-auto pb-4">
            {filteredPipeline.map((column) => (
              <div key={column.id} className="shrink-0 w-72">
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[12px] font-bold uppercase tracking-widest font-body text-navy">{column.title}</h3>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-cream text-navy">{column.prospects.length}</span>
                  </div>
                  <button className="p-1 hover:bg-bg-light transition-colors cursor-pointer">
                    <Plus size={12} className="text-charcoal" />
                  </button>
                </div>
                <p className="text-[10px] font-body text-charcoal/40 mb-2 px-1">{column.description}</p>
                <div className={`min-h-[300px] border-t-2 ${column.color} pt-3`}>
                  {column.prospects.map((prospect) => (
                    <ProspectCard key={prospect.id} prospect={prospect} onClick={() => setSelectedProspect(prospect)} />
                  ))}
                  {column.prospects.length === 0 && (
                    <div className="border-2 border-dashed border-[#E5E7EB] h-20 flex items-center justify-center text-[11px] text-charcoal/30 italic">Aucun prospect</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Prospect detail or CFNews */}
          {selectedProspect ? (
            <div className="bg-white border border-[#E5E7EB] p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-display text-navy">Detail Prospect</h3>
                <button onClick={() => setSelectedProspect(null)} className="text-[10px] text-charcoal/50 hover:text-navy cursor-pointer">Fermer</button>
              </div>
              <div className="mb-4">
                <h4 className="text-lg font-display text-navy">{selectedProspect.name}</h4>
                <p className="text-xs font-body text-charcoal/60">{selectedProspect.company}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-body font-bold text-navy flex items-center gap-1"><Euro size={12} /> {selectedProspect.aum}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 ${SOURCE_STYLES[selectedProspect.source]}`}>{selectedProspect.source}</span>
                </div>
              </div>
              <div className="mb-4 p-3 bg-cream/50">
                <p className="text-[10px] font-body text-orange font-bold mb-0.5">Prochaine action</p>
                <p className="text-xs font-body text-navy">{selectedProspect.nextAction}</p>
                {selectedProspect.nextActionDate && <p className="text-[10px] font-body text-charcoal/50 mt-0.5">{selectedProspect.nextActionDate}</p>}
              </div>
              <div>
                <p className="text-[10px] font-body text-charcoal uppercase tracking-wider mb-2 font-bold">Historique ({selectedProspect.interactions.length})</p>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {selectedProspect.interactions.map((inter, i) => {
                    const Icon = INTERACTION_ICONS[inter.type] || ChevronRight;
                    return (
                      <div key={i} className="flex items-start gap-2 p-2 bg-[#F7F7F9]">
                        <Icon size={12} className="text-orange mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] font-body text-charcoal/50">{inter.date}</p>
                          <p className="text-xs font-body text-navy">{inter.summary}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-navy text-white text-[10px] font-bold uppercase hover:bg-orange transition-colors cursor-pointer">
                  <Mail size={12} /> Email
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-[#F7F7F9] text-navy text-[10px] font-bold uppercase hover:bg-[#E5E7EB] transition-colors cursor-pointer">
                  <Phone size={12} /> Appeler
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-[#E5E7EB] p-4">
              <p className="text-xs font-body text-charcoal/40 text-center py-8">Cliquez sur un prospect pour voir le detail</p>
            </div>
          )}

          {/* CFNews Feed */}
          <div className="bg-white border border-[#E5E7EB] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Newspaper size={16} className="text-orange" />
              <h3 className="text-sm font-display text-navy">Flux CFNews</h3>
              <span className="text-[9px] font-body text-charcoal/40 ml-auto">Auto — Lundi 08h</span>
            </div>
            <p className="text-[10px] font-body text-charcoal/50 mb-3">Deals {'>'}50M EUR — source de prospection</p>
            <div className="space-y-2">
              {cfNewsDeals.map((deal, i) => (
                <div key={i} className="p-2 bg-[#F7F7F9] hover:bg-cream/30 transition-colors cursor-pointer group">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-body text-navy leading-tight group-hover:text-orange transition-colors">{deal.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] font-body text-charcoal/40">{deal.date}</span>
                        <span className="text-[9px] font-body font-bold text-charcoal/50">{deal.sector}</span>
                      </div>
                    </div>
                    <div className={`w-2 h-2 mt-1 shrink-0 ${deal.relevance === 'high' ? 'bg-red' : deal.relevance === 'medium' ? 'bg-orange' : 'bg-[#CBD5E1]'}`} />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-3 py-2 border border-[#E5E7EB] text-[10px] font-body font-bold text-navy uppercase tracking-wider hover:bg-[#F7F7F9] transition-colors cursor-pointer flex items-center justify-center gap-1">
              Voir tous les deals <ArrowRight size={10} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
