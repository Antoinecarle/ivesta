import { useState } from 'react';
import {
  Shield, AlertTriangle, CheckCircle, XCircle, Clock, FileText,
  ChevronRight, Search, Filter, Download, Users, Bell
} from 'lucide-react';

// ══════════════════════════════════════════════
// COMPLIANCE & KYC — Vue operationnelle
// ══════════════════════════════════════════════

type DocStatus = 'valid' | 'warning' | 'expired';

interface ComplianceDoc {
  id: string;
  family: string;
  familyInitials: string;
  member: string;
  docType: string;
  expiryDate: string;
  status: DocStatus;
  daysRemaining: number;
  assignedTo: string;
}

interface ComplianceAlert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  family: string;
  message: string;
  date: string;
  actionRequired: string;
  assignedTo: string;
  resolved: boolean;
}

// ── DEMO DATA ──

const DOCS: ComplianceDoc[] = [
  { id: '1', family: 'Rothenberg', familyInitials: 'RO', member: 'Hans Rothenberg', docType: 'CNI', expiryDate: '2026-03-02', status: 'expired', daysRemaining: -12, assignedTo: 'S. Martin' },
  { id: '2', family: 'Rothenberg', familyInitials: 'RO', member: 'Eva Rothenberg', docType: 'Justificatif domicile', expiryDate: '2026-05-20', status: 'valid', daysRemaining: 67, assignedTo: 'S. Martin' },
  { id: '3', family: 'Rothenberg', familyInitials: 'RO', member: 'Holding Rothenberg SA', docType: 'Mandat de gestion', expiryDate: '2026-06-01', status: 'warning', daysRemaining: 79, assignedTo: 'A. Chaouchi' },
  { id: '4', family: 'Al-Rashid', familyInitials: 'AR', member: 'Fatima Al-Rashid', docType: 'Screening PEP', expiryDate: '', status: 'expired', daysRemaining: 0, assignedTo: 'M. Levy' },
  { id: '5', family: 'Al-Rashid', familyInitials: 'AR', member: 'Omar Al-Rashid', docType: 'CNI', expiryDate: '2027-09-15', status: 'valid', daysRemaining: 550, assignedTo: 'M. Levy' },
  { id: '6', family: 'Chen', familyInitials: 'CH', member: 'Li Chen', docType: 'CNI', expiryDate: '2026-01-28', status: 'expired', daysRemaining: -45, assignedTo: 'A. Chaouchi' },
  { id: '7', family: 'Chen', familyInitials: 'CH', member: 'Wei Chen', docType: 'Declaration fiscale 2025', expiryDate: '2026-03-31', status: 'warning', daysRemaining: 17, assignedTo: 'A. Chaouchi' },
  { id: '8', family: 'Chen', familyInitials: 'CH', member: 'Famille Chen', docType: 'Justificatif domicile', expiryDate: '2026-02-27', status: 'expired', daysRemaining: -15, assignedTo: 'A. Chaouchi' },
  { id: '9', family: 'Dubois', familyInitials: 'DU', member: 'SCI Dubois Immo', docType: 'Kbis', expiryDate: '2026-12-01', status: 'valid', daysRemaining: 262, assignedTo: 'S. Bouzid' },
  { id: '10', family: 'Dubois', familyInitials: 'DU', member: 'Pierre Dubois', docType: 'CNI', expiryDate: '2027-03-10', status: 'valid', daysRemaining: 361, assignedTo: 'S. Bouzid' },
  { id: '11', family: 'Van der Berg', familyInitials: 'VB', member: 'Thomas Van der Berg', docType: 'Justificatif domicile', expiryDate: '2026-03-22', status: 'warning', daysRemaining: 8, assignedTo: 'M. Levy' },
  { id: '12', family: 'Petrov', familyInitials: 'PE', member: 'Dmitri Petrov', docType: 'Screening PEP', expiryDate: '', status: 'expired', daysRemaining: 0, assignedTo: 'M. Levy' },
  { id: '13', family: 'Petrov', familyInitials: 'PE', member: 'Dmitri Petrov', docType: 'CNI', expiryDate: '2026-04-05', status: 'warning', daysRemaining: 22, assignedTo: 'M. Levy' },
  { id: '14', family: 'Moretti', familyInitials: 'MO', member: 'Moretti Trust', docType: 'Mandat de gestion', expiryDate: '2026-03-29', status: 'warning', daysRemaining: 15, assignedTo: 'S. Bouzid' },
];

const ALERTS: ComplianceAlert[] = [
  { id: 'a1', severity: 'critical', family: 'Chen', message: 'CNI expiree — Mme Li Chen (expiree depuis 45 jours)', date: '14 mars 2026, 14:32', actionRequired: 'Demander nouvelle CNI au client', assignedTo: 'A. Chaouchi', resolved: false },
  { id: 'a2', severity: 'critical', family: 'Al-Rashid', message: 'Screening PEP positif — Mme Fatima Al-Rashid (lien familial 2nd degre)', date: '14 mars 2026, 14:28', actionRequired: 'Analyse approfondie + validation conformite', assignedTo: 'M. Levy', resolved: false },
  { id: 'a3', severity: 'critical', family: 'Rothenberg', message: 'CNI expiree — M. Hans Rothenberg (expiree depuis 12 jours)', date: '14 mars 2026, 14:15', actionRequired: 'Demander renouvellement CNI', assignedTo: 'S. Martin', resolved: false },
  { id: 'a4', severity: 'critical', family: 'Petrov', message: 'Screening PEP positif — M. Dmitri Petrov (expositions detectees)', date: '14 mars 2026, 13:50', actionRequired: 'Review compliance approfondi', assignedTo: 'M. Levy', resolved: false },
  { id: 'a5', severity: 'warning', family: 'Chen', message: 'Justificatif domicile expire — Famille Chen (dernier : 20/08/2025)', date: '14 mars 2026, 13:47', actionRequired: 'Demander nouveau justificatif', assignedTo: 'A. Chaouchi', resolved: false },
  { id: 'a6', severity: 'warning', family: 'Chen', message: 'Declaration fiscale manquante — M. Wei Chen (echeance 31 mars)', date: '14 mars 2026, 12:58', actionRequired: 'Relancer le client', assignedTo: 'A. Chaouchi', resolved: false },
  { id: 'a7', severity: 'warning', family: 'Van der Berg', message: 'Justificatif domicile expire dans 8 jours — Thomas Van der Berg', date: '14 mars 2026, 12:30', actionRequired: 'Anticiper le renouvellement', assignedTo: 'M. Levy', resolved: false },
  { id: 'a8', severity: 'warning', family: 'Moretti', message: 'Mandat de gestion expire dans 15 jours — Moretti Trust', date: '14 mars 2026, 11:45', actionRequired: 'Preparer renouvellement mandat', assignedTo: 'S. Bouzid', resolved: false },
  { id: 'a9', severity: 'info', family: 'Dubois', message: 'KYC complet valide — Famille Dubois (renouvellement annuel OK)', date: '13 mars 2026, 16:20', actionRequired: '', assignedTo: 'S. Bouzid', resolved: true },
  { id: 'a10', severity: 'info', family: 'Rothenberg', message: 'Mandat de gestion renouvele — Holding Rothenberg SAS', date: '13 mars 2026, 10:30', actionRequired: '', assignedTo: 'A. Chaouchi', resolved: true },
];

// ── HELPERS ──

function StatusBadge({ status, days }: { status: DocStatus; days: number }) {
  if (status === 'expired') return (
    <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#FEE2E2] text-red text-[11px] font-bold font-body">
      <XCircle size={12} /> {days === 0 ? 'ALERTE' : `Expire (${Math.abs(days)}j)`}
    </span>
  );
  if (status === 'warning') return (
    <span className="inline-flex items-center gap-1 px-2 py-1 bg-cream text-[#B45309] text-[11px] font-bold font-body">
      <Clock size={12} /> {days}j restants
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 bg-sage text-[#16A34A] text-[11px] font-bold font-body">
      <CheckCircle size={12} /> Valide
    </span>
  );
}

// ══════════════════════════════════════════════

export default function Compliance() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterFamily, setFilterFamily] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [showResolved, setShowResolved] = useState(false);

  const families = [...new Set(DOCS.map(d => d.family))];

  const filteredDocs = DOCS.filter(d => {
    const matchSearch = d.member.toLowerCase().includes(search.toLowerCase()) || d.docType.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || d.status === filterStatus;
    const matchFamily = filterFamily === 'all' || d.family === filterFamily;
    return matchSearch && matchStatus && matchFamily;
  });

  const filteredAlerts = ALERTS.filter(a => showResolved || !a.resolved);

  // KPIs
  const totalDocs = DOCS.length;
  const validDocs = DOCS.filter(d => d.status === 'valid').length;
  const warningDocs = DOCS.filter(d => d.status === 'warning').length;
  const expiredDocs = DOCS.filter(d => d.status === 'expired').length;
  const complianceRate = Math.round((validDocs / totalDocs) * 100);
  const criticalAlerts = ALERTS.filter(a => a.severity === 'critical' && !a.resolved).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sage flex items-center justify-center">
              <Shield size={20} className="text-[#16A34A]" />
            </div>
            <div>
              <h1 className="text-3xl font-display text-navy">Compliance & KYC</h1>
              <p className="text-sm text-charcoal/60 font-body mt-0.5">Suivi des documents reglementaires, alertes et echeances par famille</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#F7F7F9] text-navy text-xs font-bold font-body uppercase tracking-wider hover:bg-[#E5E7EB] transition-colors cursor-pointer">
            <Download size={14} /> Export
          </button>
          <button className="flex items-center gap-2 px-5 py-2 bg-navy text-white text-xs font-bold font-body uppercase tracking-wider hover:bg-orange transition-colors cursor-pointer">
            <FileText size={14} /> Ajouter document
          </button>
        </div>
      </div>

      {/* KPI Bar */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-[#E5E7EB] p-4">
          <p className="text-[10px] font-body text-charcoal uppercase tracking-wider mb-1">Taux conformite</p>
          <p className="text-2xl font-display text-[#16A34A]">{complianceRate}%</p>
        </div>
        <div className="bg-white border border-[#E5E7EB] p-4">
          <p className="text-[10px] font-body text-charcoal uppercase tracking-wider mb-1">Documents total</p>
          <p className="text-2xl font-display text-navy">{totalDocs}</p>
        </div>
        <div className="bg-white border border-[#E5E7EB] p-4">
          <p className="text-[10px] font-body text-charcoal uppercase tracking-wider mb-1">A jour</p>
          <p className="text-2xl font-display text-[#16A34A]">{validDocs}</p>
        </div>
        <div className="bg-white border border-[#E5E7EB] p-4">
          <p className="text-[10px] font-body text-charcoal uppercase tracking-wider mb-1">Bientot expires</p>
          <p className="text-2xl font-display text-[#B45309]">{warningDocs}</p>
        </div>
        <div className="bg-white border border-[#E5E7EB] p-4">
          <p className="text-[10px] font-body text-charcoal uppercase tracking-wider mb-1">Expires</p>
          <p className="text-2xl font-display text-red">{expiredDocs}</p>
        </div>
        <div className="bg-white border border-[#E5E7EB] p-4">
          <p className="text-[10px] font-body text-charcoal uppercase tracking-wider mb-1">Alertes critiques</p>
          <p className="text-2xl font-display text-red">{criticalAlerts}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* ── LEFT: Document List ── */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white border border-[#E5E7EB] p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-display text-navy flex items-center gap-2">
                <FileText size={18} className="text-orange" /> Documents KYC
              </h2>
              <span className="text-xs font-body text-charcoal/50">{filteredDocs.length} documents</span>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/30" />
                <input
                  type="text"
                  placeholder="Rechercher un membre, un document..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-[#D1D5DB] text-sm font-body focus:border-navy outline-none"
                />
              </div>
              <select
                value={filterFamily}
                onChange={e => setFilterFamily(e.target.value)}
                className="border border-[#D1D5DB] px-3 py-2 text-xs font-body text-navy outline-none cursor-pointer"
              >
                <option value="all">Toutes les familles</option>
                {families.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
              <div className="flex border border-[#D1D5DB]">
                {(['all', 'expired', 'warning', 'valid'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`px-3 py-2 text-[10px] font-bold font-body uppercase tracking-wider transition-colors cursor-pointer ${
                      filterStatus === s ? 'bg-navy text-white' : 'text-charcoal hover:bg-[#F7F7F9]'
                    }`}
                  >
                    {s === 'all' ? 'Tous' : s === 'expired' ? 'Expires' : s === 'warning' ? 'Attention' : 'Valides'}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F7F7F9]">
                    <th className="text-left py-2 px-3 text-[10px] font-bold uppercase tracking-wider text-navy font-body">Famille</th>
                    <th className="text-left py-2 px-3 text-[10px] font-bold uppercase tracking-wider text-navy font-body">Membre / Entite</th>
                    <th className="text-left py-2 px-3 text-[10px] font-bold uppercase tracking-wider text-navy font-body">Document</th>
                    <th className="text-left py-2 px-3 text-[10px] font-bold uppercase tracking-wider text-navy font-body">Echeance</th>
                    <th className="text-left py-2 px-3 text-[10px] font-bold uppercase tracking-wider text-navy font-body">Statut</th>
                    <th className="text-left py-2 px-3 text-[10px] font-bold uppercase tracking-wider text-navy font-body">Assigne</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocs.map(d => (
                    <tr key={d.id} className="border-b border-[#E5E7EB] hover:bg-[#F7F7F9] transition-colors cursor-pointer">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-navy text-white flex items-center justify-center text-[9px] font-bold font-body">{d.familyInitials}</div>
                          <span className="text-xs font-body font-bold text-navy">{d.family}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-xs font-body text-charcoal">{d.member}</td>
                      <td className="py-3 px-3 text-xs font-body text-navy font-medium">{d.docType}</td>
                      <td className="py-3 px-3 text-xs font-body text-charcoal/60">
                        {d.expiryDate ? new Date(d.expiryDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                      </td>
                      <td className="py-3 px-3">
                        <StatusBadge status={d.status} days={d.daysRemaining} />
                      </td>
                      <td className="py-3 px-3 text-[11px] font-body text-charcoal/50">{d.assignedTo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Alerts Feed ── */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-[#E5E7EB] p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-display text-navy flex items-center gap-2">
                <Bell size={18} className="text-red" /> Alertes
              </h2>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-red text-white text-[10px] font-bold font-body">{criticalAlerts} CRITIQUES</span>
                <button
                  onClick={() => setShowResolved(!showResolved)}
                  className="text-[10px] font-body text-charcoal/50 hover:text-navy cursor-pointer flex items-center gap-1"
                >
                  <Filter size={10} /> {showResolved ? 'Masquer resolues' : 'Voir resolues'}
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredAlerts.map(a => (
                <div
                  key={a.id}
                  className={`p-3 border-l-3 transition-all ${
                    a.resolved ? 'opacity-50' :
                    a.severity === 'critical' ? 'border-l-red bg-[#FEE2E2]/30' :
                    a.severity === 'warning' ? 'border-l-orange bg-cream/30' :
                    'border-l-[#16A34A] bg-sage/30'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {a.severity === 'critical' ? <XCircle size={14} className="text-red shrink-0 mt-0.5" /> :
                     a.severity === 'warning' ? <AlertTriangle size={14} className="text-[#B45309] shrink-0 mt-0.5" /> :
                     <CheckCircle size={14} className="text-[#16A34A] shrink-0 mt-0.5" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-body text-navy leading-tight">{a.message}</p>
                      {a.actionRequired && (
                        <p className="text-[10px] font-body text-orange font-bold mt-1 flex items-center gap-1">
                          <ChevronRight size={10} /> {a.actionRequired}
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[10px] font-body text-charcoal/40">{a.date}</span>
                        <span className="text-[10px] font-body font-bold text-navy">{a.family}</span>
                        <span className="text-[10px] font-body text-charcoal/40">{a.assignedTo}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick summary per family */}
          <div className="bg-white border border-[#E5E7EB] p-4">
            <h3 className="text-sm font-display text-navy mb-3 flex items-center gap-2">
              <Users size={16} className="text-orange" /> Conformite par famille
            </h3>
            <div className="space-y-2">
              {families.map(family => {
                const familyDocs = DOCS.filter(d => d.family === family);
                const valid = familyDocs.filter(d => d.status === 'valid').length;
                const total = familyDocs.length;
                const rate = Math.round((valid / total) * 100);
                const hasExpired = familyDocs.some(d => d.status === 'expired');
                return (
                  <div key={family} className="flex items-center justify-between p-2 bg-[#F7F7F9] hover:bg-[#E5E7EB] transition-colors cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 ${hasExpired ? 'bg-red' : rate === 100 ? 'bg-[#16A34A]' : 'bg-orange'}`} />
                      <span className="text-xs font-body font-bold text-navy">{family}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-body text-charcoal/50">{valid}/{total} docs</span>
                      <div className="w-16 h-1.5 bg-[#E5E7EB]">
                        <div
                          className="h-full"
                          style={{
                            width: `${rate}%`,
                            backgroundColor: hasExpired ? '#CD002D' : rate === 100 ? '#16A34A' : '#FF8217'
                          }}
                        />
                      </div>
                      <span className={`text-[10px] font-body font-bold ${hasExpired ? 'text-red' : rate === 100 ? 'text-[#16A34A]' : 'text-orange'}`}>
                        {rate}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
