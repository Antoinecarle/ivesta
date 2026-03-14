import { useState } from 'react';
import {
  TrendingUp, Layers, Calendar, ChevronRight, ArrowUpRight,
  AlertCircle, Clock, Building2, Landmark, ShieldCheck, Download,
  FileText, CheckCircle, XCircle, BarChart3, Euro, Briefcase,
  Globe, Mail, Phone, MapPin, Users, Shield
} from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  BarChart, Bar, Legend
} from 'recharts';

// ══════════════════════════════════════════════
// DEMO DATA
// ══════════════════════════════════════════════

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

// ── INVESTISSEMENTS DATA ──
const investments = [
  { name: 'Blackstone PE VII', type: 'Private Equity', commitment: 15.0, called: 12.3, distributed: 4.2, nav: 18.5, tvpi: 1.85, irr: 22.1, vintage: 2021, status: 'active' },
  { name: 'Eurazeo Growth IV', type: 'Growth', commitment: 8.0, called: 7.5, distributed: 2.8, nav: 9.2, tvpi: 1.60, irr: 16.4, vintage: 2020, status: 'active' },
  { name: 'Ardian Real Estate VI', type: 'Immobilier', commitment: 12.0, called: 11.0, distributed: 5.1, nav: 13.8, tvpi: 1.72, irr: 14.8, vintage: 2019, status: 'active' },
  { name: 'KKR Credit Opps II', type: 'Dette Privee', commitment: 5.0, called: 5.0, distributed: 6.2, nav: 0, tvpi: 1.24, irr: 8.5, vintage: 2018, status: 'realized' },
  { name: 'Tikehau Infra Europe', type: 'Infrastructure', commitment: 10.0, called: 6.5, distributed: 0.8, nav: 7.2, tvpi: 1.23, irr: 12.1, vintage: 2022, status: 'active' },
  { name: 'Sequoia Capital XVI', type: 'Venture', commitment: 5.0, called: 4.8, distributed: 1.5, nav: 8.4, tvpi: 2.06, irr: 28.3, vintage: 2021, status: 'active' },
  { name: 'Apax Digital III', type: 'LBO', commitment: 7.5, called: 7.0, distributed: 3.0, nav: 10.5, tvpi: 1.93, irr: 19.7, vintage: 2020, status: 'active' },
  { name: 'Portefeuille Liste', type: 'Cote', commitment: 30.0, called: 30.0, distributed: 8.5, nav: 35.2, tvpi: 1.46, irr: 9.2, vintage: 2019, status: 'active' },
];

const investPerf = [
  { quarter: 'Q1 24', pe: 5.2, immo: 2.1, dette: 1.8, cote: 4.5 },
  { quarter: 'Q2 24', pe: 3.8, immo: 2.4, dette: 1.5, cote: -1.2 },
  { quarter: 'Q3 24', pe: 6.1, immo: 1.9, dette: 1.7, cote: 3.8 },
  { quarter: 'Q4 24', pe: 4.5, immo: 2.8, dette: 1.6, cote: 5.2 },
  { quarter: 'Q1 25', pe: -2.1, immo: 1.5, dette: 1.4, cote: -3.5 },
  { quarter: 'Q2 25', pe: 7.2, immo: 3.1, dette: 1.9, cote: 6.8 },
  { quarter: 'Q3 25', pe: 5.5, immo: 2.2, dette: 1.6, cote: 2.1 },
  { quarter: 'Q4 25', pe: 4.8, immo: 2.5, dette: 1.8, cote: 4.9 },
];

// ── ENTITES DATA ──
const entities = [
  { name: 'Hans Rothenberg', type: 'Personne Physique', role: 'Client principal', patrimoine: '€85.0M', details: 'Portefeuille liste + Assurance vie' },
  { name: 'Eva Rothenberg', type: 'Personne Physique', role: 'Conjointe', patrimoine: '€22.0M', details: 'Assurance vie Generali' },
  { name: 'Maximilian Rothenberg', type: 'Personne Physique', role: 'Fils', patrimoine: '€5.0M', details: 'Donation 2024' },
  { name: 'Holding Rothenberg SA', type: 'Holding Familiale', role: 'Vehicule principal', patrimoine: '€120.0M', details: 'Luxembourg — RCS B245678' },
  { name: 'SCI Alize', type: 'SCI', role: 'Immobilier', patrimoine: '€45.0M', details: 'Paris 8e, Monaco, Megeve' },
  { name: 'Trust Familial (Jersey)', type: 'Trust', role: 'Fiducie', patrimoine: '€35.0M', details: 'Beneficiaires: enfants' },
  { name: 'Assurance Vie Generali', type: 'Contrat AV', role: 'Enveloppe fiscale', patrimoine: '€15.0M', details: 'Contrat luxembourgeois' },
  { name: 'Compte-titres Pictet', type: 'Banque', role: 'Depots', patrimoine: '€12.0M', details: 'Geneve — Gestion discretionnaire' },
];

// ── DOCUMENTS DATA ──
const documents = [
  { name: 'Reporting Annuel 2025', type: 'Reporting', date: '10 mars 2026', status: 'valide', size: '2.4 MB' },
  { name: 'Reporting T4 2025', type: 'Reporting', date: '15 jan 2026', status: 'valide', size: '1.8 MB' },
  { name: 'Mandat de Gestion — Holding', type: 'Juridique', date: '01 juin 2025', status: 'a renouveler', size: '450 KB' },
  { name: 'CNI — Hans Rothenberg', type: 'KYC', date: '15 jan 2024', status: 'expire', size: '1.2 MB' },
  { name: 'Justificatif domicile', type: 'KYC', date: '20 nov 2025', status: 'valide', size: '380 KB' },
  { name: 'Acte de donation Maximilian', type: 'Juridique', date: '05 sept 2024', status: 'valide', size: '3.1 MB' },
  { name: 'Souscription Tikehau Infra', type: 'Souscription', date: '12 fev 2022', status: 'valide', size: '850 KB' },
  { name: 'Lettre d\'engagement Sequoia XVI', type: 'Souscription', date: '20 mars 2021', status: 'valide', size: '1.1 MB' },
  { name: 'Declaration fiscale 2024', type: 'Fiscal', date: '30 avril 2025', status: 'valide', size: '2.8 MB' },
];

// ── REPORTING DATA ──
const reportingPeriods = [
  { period: 'Annuel 2025', date: '10 mars 2026', status: 'Valide', sent: true },
  { period: 'T4 2025', date: '15 jan 2026', status: 'Valide', sent: true },
  { period: 'T3 2025', date: '15 oct 2025', status: 'Valide', sent: true },
  { period: 'T2 2025', date: '15 juil 2025', status: 'Valide', sent: true },
  { period: 'T1 2025', date: '15 avril 2025', status: 'Valide', sent: true },
  { period: 'Annuel 2024', date: '10 mars 2025', status: 'Valide', sent: true },
];

// ── HISTORIQUE DATA ──
const historique = [
  { date: '14 mars 2026', action: 'Appel de fonds Blackstone PE VII — €2.1M', user: 'A. Chaouchi', type: 'Capital Call' },
  { date: '10 mars 2026', action: 'Validation et envoi Reporting Annuel 2025', user: 'S. Martin', type: 'Reporting' },
  { date: '05 mars 2026', action: 'Lancement renouvellement KYC Holding Rothenberg', user: 'A. Chaouchi', type: 'Compliance' },
  { date: '28 fev 2026', action: 'Distribution SCI Alize — €850k (dividendes)', user: 'S. Martin', type: 'Distribution' },
  { date: '15 fev 2026', action: 'Comite investissement trimestriel — decision souscription Infra Europe', user: 'A. Chaouchi', type: 'Meeting' },
  { date: '20 jan 2026', action: 'Envoi Reporting T4 2025 — valide par le client', user: 'S. Martin', type: 'Reporting' },
  { date: '10 jan 2026', action: 'Virement sortant SCI Alize — acquisition parking Megeve', user: 'Data Keeper', type: 'Transaction' },
  { date: '15 dec 2025', action: 'Reequilibrage portefeuille cote — vente ETF Emerging +12%', user: 'N. Bendimered', type: 'Transaction' },
  { date: '01 dec 2025', action: 'Mise a jour facturation annuelle — base €245M = €1.10M HT', user: 'A. Chaouchi', type: 'Facturation' },
  { date: '20 nov 2025', action: 'Renouvellement justificatif domicile — Eva Rothenberg', user: 'Data Keeper', type: 'Compliance' },
];

// ══════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════

type TabId = 'synthese' | 'investissements' | 'entites' | 'documents' | 'reporting' | 'historique';

const TABS: { id: TabId; label: string }[] = [
  { id: 'synthese', label: 'Synthese' },
  { id: 'investissements', label: 'Investissements' },
  { id: 'entites', label: 'Entites' },
  { id: 'documents', label: 'Documents' },
  { id: 'reporting', label: 'Reporting' },
  { id: 'historique', label: 'Historique' },
];

// ══════════════════════════════════════════════
// SUB-COMPONENTS
// ══════════════════════════════════════════════

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
          {children && <ChevronRight size={16} className={`text-charcoal/40 transition-transform ${isOpen ? 'rotate-90' : ''}`} />}
          <div>
            <span className="text-[10px] uppercase tracking-wider text-orange font-bold block leading-none mb-1">{type}</span>
            <span className="text-[15px] font-medium text-navy font-body">{name}</span>
          </div>
        </div>
        <span className="text-[15px] font-medium text-navy font-body">{value}</span>
      </div>
      {isOpen && children && <div className="ml-8 border-l border-dashed border-[#E5E7EB] pl-4">{children}</div>}
    </div>
  );
}

// ══════════════════════════════════════════════
// TAB CONTENT RENDERERS
// ══════════════════════════════════════════════

function SyntheseTab() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard label="AUM Total Consolide" value="€245M" icon={Landmark} trend="+12.4%" />
        <KPICard label="Performance YTD" value="+8.2%" icon={TrendingUp} />
        <KPICard label="Nombre d'Entites" value="12" icon={Layers} />
        <KPICard label="Derniere Mise a Jour" value="12 Mar. 2026" icon={Calendar} />
      </div>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <section className="bg-white border border-[#E5E7EB] p-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-[24px] font-normal font-display text-navy mb-2">Structure Patrimoniale</h2>
                <p className="text-[13px] text-charcoal/60">Vue hierarchique des entites et actifs detenus</p>
              </div>
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
          <section className="bg-white border border-[#E5E7EB] p-8">
            <h2 className="text-[24px] font-normal font-display text-navy mb-1">Evolution AUM</h2>
            <p className="text-[13px] text-charcoal/60 mb-6">8 derniers trimestres</p>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorAum" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#000046" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#000046" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                  <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#231F20' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#231F20' }} tickFormatter={(v) => `€${v}M`} />
                  <RechartsTooltip contentStyle={{ borderRadius: 0, border: '1px solid #E5E7EB' }} />
                  <Area type="monotone" dataKey="aum" stroke="#000046" strokeWidth={2} fillOpacity={1} fill="url(#colorAum)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <section className="bg-white border border-[#E5E7EB] p-8">
            <h2 className="text-[20px] font-normal font-display text-navy mb-6">Allocation Actifs</h2>
            <div className="h-[220px] w-full mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={allocationData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={4} dataKey="value">
                    {allocationData.map((_e, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {allocationData.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between text-[13px]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
                    <span className="text-charcoal">{item.name}</span>
                  </div>
                  <span className="font-bold text-navy">{item.value}%</span>
                </div>
              ))}
            </div>
          </section>
          <section className="bg-cream border border-[#E5E7EB]/50 p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle size={18} className="text-red" />
              <h3 className="text-[14px] font-bold text-navy uppercase tracking-wider">Actions en attente ({pendingActions.length})</h3>
            </div>
            <div className="space-y-3">
              {pendingActions.map(a => (
                <div key={a.id} className="bg-white p-4 border border-[#E5E7EB]/30 cursor-pointer hover:border-orange transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-[9px] font-bold px-2 py-0.5 uppercase ${a.priority === 'High' ? 'bg-[#FEE2E2] text-red' : 'bg-bg-light text-charcoal'}`}>{a.priority}</span>
                    <span className="text-[11px] text-charcoal/60 flex items-center gap-1"><Clock size={12} /> {a.deadline}</span>
                  </div>
                  <p className="text-[13px] font-medium text-navy leading-tight">{a.label}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="bg-white border border-[#E5E7EB] p-8">
            <h2 className="text-[20px] font-normal font-display text-navy mb-6">Activite Recente</h2>
            <div className="space-y-5 relative before:content-[''] before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[1px] before:bg-[#E5E7EB]">
              {timelineEvents.map((event, idx) => (
                <div key={idx} className="relative pl-8">
                  <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-white z-10 ${event.status === 'Completed' ? 'bg-[#16A34A]' : event.status === 'Pending' ? 'bg-orange' : 'bg-navy'}`} />
                  <span className="text-[11px] font-bold text-orange block mb-1 uppercase tracking-wider">{event.date}</span>
                  <h4 className="text-[14px] font-medium text-navy font-body mb-1">{event.title}</h4>
                  <span className="text-[12px] text-charcoal/60 italic">{event.type}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

function InvestissementsTab() {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white border border-[#E5E7EB] p-4">
          <p className="text-[10px] font-body text-charcoal uppercase tracking-wider mb-1">Engagements</p>
          <p className="text-2xl font-display text-navy">€92.5M</p>
        </div>
        <div className="bg-white border border-[#E5E7EB] p-4">
          <p className="text-[10px] font-body text-charcoal uppercase tracking-wider mb-1">Capital Appele</p>
          <p className="text-2xl font-display text-navy">€84.1M</p>
        </div>
        <div className="bg-white border border-[#E5E7EB] p-4">
          <p className="text-[10px] font-body text-charcoal uppercase tracking-wider mb-1">Distribue</p>
          <p className="text-2xl font-display text-[#16A34A]">€32.1M</p>
        </div>
        <div className="bg-white border border-[#E5E7EB] p-4">
          <p className="text-[10px] font-body text-charcoal uppercase tracking-wider mb-1">NAV Totale</p>
          <p className="text-2xl font-display text-orange">€102.8M</p>
        </div>
        <div className="bg-white border border-[#E5E7EB] p-4">
          <p className="text-[10px] font-body text-charcoal uppercase tracking-wider mb-1">TVPI Moyen</p>
          <p className="text-2xl font-display text-navy">1.64x</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E7EB] p-6">
        <h2 className="text-lg font-display text-navy mb-4 flex items-center gap-2">
          <Briefcase size={18} className="text-orange" /> Portefeuille Non Cote
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F7F7F9]">
                {['Fonds', 'Type', 'Engagement', 'Appele', 'Distribue', 'NAV', 'TVPI', 'TRI', 'Vintage', 'Statut'].map(h => (
                  <th key={h} className="text-left py-2 px-3 text-[10px] font-bold uppercase tracking-wider text-navy font-body">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {investments.map(inv => (
                <tr key={inv.name} className="border-b border-[#E5E7EB] hover:bg-[#F7F7F9] transition-colors cursor-pointer">
                  <td className="py-3 px-3 text-sm font-body font-bold text-navy">{inv.name}</td>
                  <td className="py-3 px-3"><span className="text-[10px] font-body font-bold px-2 py-0.5 bg-cream text-navy uppercase">{inv.type}</span></td>
                  <td className="py-3 px-3 text-sm font-body text-charcoal">€{inv.commitment}M</td>
                  <td className="py-3 px-3 text-sm font-body text-charcoal">€{inv.called}M</td>
                  <td className="py-3 px-3 text-sm font-body text-[#16A34A]">€{inv.distributed}M</td>
                  <td className="py-3 px-3 text-sm font-body font-bold text-navy">€{inv.nav}M</td>
                  <td className="py-3 px-3">
                    <span className={`text-sm font-body font-bold ${inv.tvpi >= 1.5 ? 'text-[#16A34A]' : inv.tvpi >= 1.2 ? 'text-orange' : 'text-red'}`}>{inv.tvpi}x</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`text-sm font-body font-bold ${inv.irr >= 15 ? 'text-[#16A34A]' : inv.irr >= 8 ? 'text-orange' : 'text-charcoal'}`}>{inv.irr}%</span>
                  </td>
                  <td className="py-3 px-3 text-sm font-body text-charcoal">{inv.vintage}</td>
                  <td className="py-3 px-3">
                    <span className={`text-[10px] font-body font-bold px-2 py-0.5 uppercase ${inv.status === 'active' ? 'bg-sage text-[#16A34A]' : 'bg-[#F7F7F9] text-charcoal/50'}`}>
                      {inv.status === 'active' ? 'Actif' : 'Realise'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Perf chart */}
      <div className="bg-white border border-[#E5E7EB] p-6">
        <h2 className="text-lg font-display text-navy mb-4">Performance trimestrielle par classe d'actif</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={investPerf}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="quarter" tick={{ fontSize: 10, fill: '#231F20' }} />
            <YAxis tickFormatter={v => `${v}%`} tick={{ fontSize: 10, fill: '#231F20' }} />
            <RechartsTooltip contentStyle={{ border: '1px solid #E5E7EB', borderRadius: 0 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="pe" name="Private Equity" fill="#000046" />
            <Bar dataKey="immo" name="Immobilier" fill="#FF8217" />
            <Bar dataKey="dette" name="Dette" fill="#E3F1EC" />
            <Bar dataKey="cote" name="Cote" fill="#FFB9AD" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function EntitesTab() {
  return (
    <div className="space-y-6">
      {/* Structure patrimoniale tree */}
      <div className="bg-white border border-[#E5E7EB] p-6">
        <h2 className="text-lg font-display text-navy mb-6 flex items-center gap-2">
          <Building2 size={18} className="text-orange" /> Structure Patrimoniale
        </h2>
        <div className="space-y-4">
          <EntityNode name="SCI Alize" value="€45.0M" type="Immobilier" />
          <EntityNode name="Holding Rothenberg SA" value="€120.0M" type="Holding Familiale">
            <EntityNode name="Trust Familial (Jersey)" value="€35.0M" type="Fiducie" level={1} />
            <EntityNode name="Assurance Vie Generali" value="€15.0M" type="Enveloppe Fiscale" level={1} />
            <EntityNode name="Portefeuille Liste Pictet" value="€30.0M" type="Gestion Discretionnaire" level={1} />
          </EntityNode>
          <EntityNode name="Direct Investments" value="€80.0M" type="Private Equity" />
        </div>
      </div>

      {/* Entity table */}
      <div className="bg-white border border-[#E5E7EB] p-6">
        <h2 className="text-lg font-display text-navy mb-4 flex items-center gap-2">
          <Users size={18} className="text-orange" /> Liste des entites
        </h2>
        <table className="w-full">
          <thead>
            <tr className="bg-[#F7F7F9]">
              {['Nom', 'Type', 'Role', 'Patrimoine', 'Details'].map(h => (
                <th key={h} className="text-left py-2 px-3 text-[10px] font-bold uppercase tracking-wider text-navy font-body">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entities.map(e => (
              <tr key={e.name} className="border-b border-[#E5E7EB] hover:bg-[#F7F7F9] transition-colors cursor-pointer">
                <td className="py-3 px-3 text-sm font-body font-bold text-navy">{e.name}</td>
                <td className="py-3 px-3"><span className="text-[10px] font-body font-bold px-2 py-0.5 bg-cream text-navy uppercase">{e.type}</span></td>
                <td className="py-3 px-3 text-xs font-body text-charcoal">{e.role}</td>
                <td className="py-3 px-3 text-sm font-body font-bold text-navy">{e.patrimoine}</td>
                <td className="py-3 px-3 text-xs font-body text-charcoal/60">{e.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Contact info */}
      <div className="bg-white border border-[#E5E7EB] p-6">
        <h2 className="text-lg font-display text-navy mb-4">Informations de contact</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm font-body">
              <Mail size={16} className="text-orange" />
              <span className="text-navy">h.rothenberg@rothenberg-family.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-body">
              <Phone size={16} className="text-orange" />
              <span className="text-navy">+33 1 42 60 XX XX</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm font-body">
              <MapPin size={16} className="text-orange" />
              <span className="text-navy">12 Place Vendome, 75001 Paris</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-body">
              <Globe size={16} className="text-orange" />
              <span className="text-navy">Residence fiscale : France</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocumentsTab() {
  return (
    <div className="bg-white border border-[#E5E7EB] p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-display text-navy flex items-center gap-2">
          <FileText size={18} className="text-orange" /> Documents
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-navy text-white text-xs font-bold font-body uppercase tracking-wider hover:bg-orange transition-colors cursor-pointer">
          <Download size={14} /> Telecharger tout
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-[#F7F7F9]">
            {['Document', 'Type', 'Date', 'Taille', 'Statut'].map(h => (
              <th key={h} className="text-left py-2 px-3 text-[10px] font-bold uppercase tracking-wider text-navy font-body">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {documents.map(d => (
            <tr key={d.name} className="border-b border-[#E5E7EB] hover:bg-[#F7F7F9] transition-colors cursor-pointer group">
              <td className="py-3 px-3">
                <div className="flex items-center gap-2">
                  <FileText size={14} className="text-charcoal/30" />
                  <span className="text-sm font-body font-medium text-navy group-hover:text-orange transition-colors">{d.name}</span>
                </div>
              </td>
              <td className="py-3 px-3"><span className="text-[10px] font-body font-bold px-2 py-0.5 bg-cream text-navy uppercase">{d.type}</span></td>
              <td className="py-3 px-3 text-xs font-body text-charcoal/60">{d.date}</td>
              <td className="py-3 px-3 text-xs font-body text-charcoal/50">{d.size}</td>
              <td className="py-3 px-3">
                <span className={`inline-flex items-center gap-1 text-[10px] font-body font-bold px-2 py-0.5 ${
                  d.status === 'valide' ? 'bg-sage text-[#16A34A]' :
                  d.status === 'expire' ? 'bg-[#FEE2E2] text-red' :
                  'bg-cream text-[#B45309]'
                }`}>
                  {d.status === 'valide' ? <CheckCircle size={10} /> : d.status === 'expire' ? <XCircle size={10} /> : <Clock size={10} />}
                  {d.status.toUpperCase()}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReportingTab() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-[#E5E7EB] p-6">
        <h2 className="text-lg font-display text-navy mb-4 flex items-center gap-2">
          <BarChart3 size={18} className="text-orange" /> Historique des Reporting
        </h2>
        <p className="text-sm font-body text-charcoal/60 mb-6">Reporting trimestriel consolide — envoye au client</p>
        <div className="space-y-3">
          {reportingPeriods.map(r => (
            <div key={r.period} className="flex items-center justify-between p-4 border border-[#E5E7EB] hover:border-navy/20 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#F7F7F9] flex items-center justify-center">
                  <FileText size={18} className="text-navy" />
                </div>
                <div>
                  <p className="text-sm font-body font-bold text-navy group-hover:text-orange transition-colors">{r.period}</p>
                  <p className="text-xs font-body text-charcoal/50">{r.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-body font-bold px-2 py-0.5 bg-sage text-[#16A34A]">{r.status}</span>
                {r.sent && <span className="text-[10px] font-body text-charcoal/40 flex items-center gap-1"><Mail size={10} /> Envoye</span>}
                <button className="p-2 hover:bg-[#F7F7F9] transition-colors cursor-pointer">
                  <Download size={14} className="text-charcoal/40" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-navy p-6 text-white">
        <p className="text-xs font-body text-white/50 mb-1">Prochain reporting</p>
        <p className="text-lg font-display">T1 2026 — prevu pour le 15 avril 2026</p>
        <p className="text-xs font-body text-white/40 mt-2">Les reportings incluent : performance globale, detail par classe d'actif, flux du trimestre, suivi KYC, prochaines echeances.</p>
      </div>
    </div>
  );
}

function HistoriqueTab() {
  return (
    <div className="bg-white border border-[#E5E7EB] p-6">
      <h2 className="text-lg font-display text-navy mb-6 flex items-center gap-2">
        <Clock size={18} className="text-orange" /> Historique complet
      </h2>
      <div className="space-y-4 relative before:content-[''] before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[1px] before:bg-[#E5E7EB]">
        {historique.map((h, i) => {
          const typeColor = h.type === 'Capital Call' ? 'bg-red' : h.type === 'Distribution' ? 'bg-[#16A34A]' : h.type === 'Reporting' ? 'bg-navy' : h.type === 'Compliance' ? 'bg-orange' : h.type === 'Transaction' ? 'bg-[#B45309]' : h.type === 'Meeting' ? 'bg-navy' : 'bg-charcoal';
          return (
            <div key={i} className="relative pl-8 hover:bg-[#F7F7F9] p-3 transition-colors cursor-pointer -ml-3">
              <div className={`absolute left-0 top-4 w-4 h-4 rounded-full border-2 border-white z-10 ${typeColor}`} />
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold text-orange block mb-1 uppercase tracking-wider">{h.date}</span>
                  <p className="text-sm font-body text-navy">{h.action}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] font-body text-charcoal/50">{h.user}</span>
                    <span className={`text-[9px] font-body font-bold px-2 py-0.5 uppercase tracking-wider ${
                      h.type === 'Capital Call' ? 'bg-[#FEE2E2] text-red' :
                      h.type === 'Distribution' ? 'bg-sage text-[#16A34A]' :
                      h.type === 'Reporting' ? 'bg-[#E0E7FF] text-navy' :
                      h.type === 'Compliance' ? 'bg-cream text-[#B45309]' :
                      'bg-[#F7F7F9] text-charcoal'
                    }`}>{h.type}</span>
                  </div>
                </div>
                <ChevronRight size={14} className="text-charcoal/20 mt-1" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════

export default function ClientDetail() {
  const [activeTab, setActiveTab] = useState<TabId>('synthese');

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
                <span className="flex items-center gap-1"><Euro size={14} /> AUM: €245M</span>
                <span className="flex items-center gap-1"><Shield size={14} /> Partner: A. Chaouchi</span>
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
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 text-[11px] font-medium uppercase tracking-[2px] border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-orange text-navy'
                  : 'border-transparent text-charcoal/60 hover:text-navy hover:border-[#E5E7EB]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* TAB CONTENT */}
      {activeTab === 'synthese' && <SyntheseTab />}
      {activeTab === 'investissements' && <InvestissementsTab />}
      {activeTab === 'entites' && <EntitesTab />}
      {activeTab === 'documents' && <DocumentsTab />}
      {activeTab === 'reporting' && <ReportingTab />}
      {activeTab === 'historique' && <HistoriqueTab />}
    </div>
  );
}
