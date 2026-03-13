import React from 'react';
import {
  Plus,
  MoreHorizontal,
  Search,
  Filter,
  Download,
  BrainCircuit,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

// --- Mock Data ---

const REPORT_DATA = [
  { id: 1, famille: 'Famille Dupont', type: 'Trimestriel', periode: 'Q4 2025', statut: 'Envoye', date: '12/01/2026', validePar: 'M. Lefebvre' },
  { id: 2, famille: 'Famille Laurent', type: 'Annuel', periode: '2025', statut: 'Valide', date: '10/01/2026', validePar: 'S. Martin' },
  { id: 3, famille: 'Famille Moreau', type: 'Trimestriel', periode: 'Q4 2025', statut: 'En revue', date: '08/01/2026', validePar: '-' },
  { id: 4, famille: 'Famille Bernard', type: 'Ad-hoc', periode: 'Dec 2025', statut: 'Brouillon', date: '14/01/2026', validePar: '-' },
  { id: 5, famille: 'Famille Lefebvre', type: 'Trimestriel', periode: 'Q4 2025', statut: 'Valide', date: '09/01/2026', validePar: 'M. Lefebvre' },
  { id: 6, famille: 'Famille Petit', type: 'Trimestriel', periode: 'Q4 2025', statut: 'Envoye', date: '11/01/2026', validePar: 'S. Martin' },
  { id: 7, famille: 'Famille Girard', type: 'Trimestriel', periode: 'Q4 2025', statut: 'En revue', date: '13/01/2026', validePar: '-' },
  { id: 8, famille: 'Famille Roux', type: 'Trimestriel', periode: 'Q4 2025', statut: 'Brouillon', date: '15/01/2026', validePar: '-' },
];

const STATUS_DATA = [
  { name: 'Brouillon', value: 12 },
  { name: 'En revue', value: 12 },
  { name: 'Valide', value: 44 },
  { name: 'Envoye', value: 40 },
];

const CHART_PALETTE = ['#000046', '#FF8217', '#FFB9AD', '#E3F1EC'];

const AI_COMMENTARIES = [
  { family: 'Famille Dupont', date: 'Il y a 2h', text: "L'augmentation de l'exposition au Private Equity (12% vs 10% cible) necessite un reequilibrage au Q1." },
  { family: 'Famille Laurent', date: 'Il y a 5h', text: "La performance nette de +4.2% sur le trimestre surpasse l'indice de reference grace a la selection de fonds Small Cap." },
  { family: 'Famille Moreau', date: 'Hier', text: "Attention portee sur la liquidite globale qui descend sous le seuil prudentiel de 5% suite aux appels de fonds recents." },
  { family: 'Famille Bernard', date: '14 Janv.', text: "Analyse comparative des frais de gestion : economie potentielle de 15k EUR via la consolidation des comptes depositaires." },
];

// --- Badge ---

const typeBadgeStyles: Record<string, string> = {
  'Trimestriel': 'bg-[#F7F7F9] text-navy border border-[#E5E7EB]',
  'Annuel': 'bg-beige text-charcoal border border-[#E5E7EB]',
  'Ad-hoc': 'bg-mint text-navy border border-[#E5E7EB]',
};

const statusBadgeStyles: Record<string, string> = {
  'Brouillon': 'bg-white text-charcoal border border-[#E5E7EB]',
  'En revue': 'bg-[#FFB9AD]/20 text-red border border-rose',
  'Valide': 'bg-mint text-navy border border-navy/10',
  'Envoye': 'bg-navy text-white border border-transparent',
};

function Badge({ children, styles }: { children: React.ReactNode; styles: string }) {
  return (
    <span className={`inline-flex items-center px-[10px] py-[4px] text-[12px] font-medium uppercase tracking-wider ${styles}`}>
      {children}
    </span>
  );
}

export default function Reporting() {
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-display text-[42px] text-navy leading-tight">Reporting Client</h1>
          <p className="text-[15px] text-charcoal/60 mt-1">Generation et suivi des rapports trimestriels pour l'ensemble des familles.</p>
        </div>
        <button className="bg-navy text-white px-6 py-3 text-[14px] font-medium flex items-center gap-2 hover:bg-orange transition-colors cursor-pointer">
          <Plus size={18} /> Generer un rapport
        </button>
      </div>

      {/* KPI Strip */}
      <div className="flex gap-6 mb-8">
        <div className="bg-white border border-[#E5E7EB] p-6 flex-1">
          <p className="text-[11px] uppercase tracking-[0.1em] text-charcoal/60 font-medium">Rapports ce trimestre</p>
          <h3 className="text-[32px] font-display text-navy leading-none mt-1">108</h3>
          <p className="text-[13px] text-charcoal/40 mt-1">Familles actives</p>
        </div>
        <div className="bg-white border border-[#E5E7EB] p-6 flex-1">
          <p className="text-[11px] uppercase tracking-[0.1em] text-charcoal/60 font-medium">Rapports valides</p>
          <h3 className="text-[32px] font-display text-navy leading-none mt-1">84</h3>
          <p className="text-[13px] text-[#16A34A] mt-1">78% complete</p>
        </div>
        <div className="bg-white border border-[#E5E7EB] p-6 flex-1">
          <p className="text-[11px] uppercase tracking-[0.1em] text-charcoal/60 font-medium">En attente de validation</p>
          <h3 className="text-[32px] font-display text-orange leading-none mt-1">24</h3>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E7EB] mb-8 overflow-hidden">
        <div className="p-4 border-b border-[#E5E7EB] flex justify-between items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" size={16} />
            <input type="text" placeholder="Rechercher une famille..." className="pl-10 pr-4 py-2 bg-[#F7F7F9] border-none text-[13px] w-64 focus:ring-1 focus:ring-navy outline-none" />
          </div>
          <div className="flex gap-2">
            <button className="p-2 border border-[#E5E7EB] hover:bg-[#F7F7F9] transition-colors cursor-pointer"><Filter size={16} /></button>
            <button className="p-2 border border-[#E5E7EB] hover:bg-[#F7F7F9] transition-colors cursor-pointer"><Download size={16} /></button>
          </div>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#F7F7F9]">
              {['Famille', 'Type', 'Periode', 'Statut', 'Genere le', 'Valide par', 'Actions'].map(h => (
                <th key={h} className={`${h === 'Actions' ? 'text-right' : 'text-left'} px-6 py-3 text-[11px] font-medium uppercase tracking-wider text-charcoal/60 border-b border-[#E5E7EB]`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {REPORT_DATA.map((row) => (
              <tr key={row.id} className="hover:bg-[#F7F7F9]/50 transition-colors cursor-pointer">
                <td className="px-6 py-4 text-[15px] font-medium text-navy">{row.famille}</td>
                <td className="px-6 py-4"><Badge styles={typeBadgeStyles[row.type] || ''}>{row.type}</Badge></td>
                <td className="px-6 py-4 text-[13px] text-charcoal/80">{row.periode}</td>
                <td className="px-6 py-4"><Badge styles={statusBadgeStyles[row.statut] || ''}>{row.statut}</Badge></td>
                <td className="px-6 py-4 text-[13px] text-charcoal/60 font-mono">{row.date}</td>
                <td className="px-6 py-4 text-[13px] text-charcoal/80 italic">{row.validePar}</td>
                <td className="px-6 py-4 text-right"><button className="text-charcoal/40 hover:text-navy transition-colors cursor-pointer"><MoreHorizontal size={20} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 border-t border-[#E5E7EB] flex justify-center">
          <button className="text-[12px] font-medium uppercase tracking-widest text-navy hover:underline flex items-center gap-1 cursor-pointer">
            Voir tous les rapports <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Donut Chart */}
        <div className="bg-white border border-[#E5E7EB] p-6">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-display text-[18px] text-navy">Rapports par statut</h4>
            <span className="text-[12px] text-charcoal/40 uppercase tracking-widest">Temps reel</span>
          </div>
          <div className="h-[240px] w-full flex items-center">
            <div className="w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={STATUS_DATA} innerRadius={65} outerRadius={90} paddingAngle={0} dataKey="value" stroke="none">
                    {STATUS_DATA.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_PALETTE[index % CHART_PALETTE.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-3">
              {STATUS_DATA.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2" style={{ backgroundColor: CHART_PALETTE[i] }} />
                    <span className="text-[13px] text-charcoal/80">{item.name}</span>
                  </div>
                  <span className="text-[13px] font-medium text-navy">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Commentaries */}
        <div className="bg-white border border-[#E5E7EB] p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <BrainCircuit size={20} className="text-orange" />
              <h4 className="font-display text-[18px] text-navy">Commentaires IA</h4>
            </div>
            <button className="text-[11px] uppercase font-bold text-navy tracking-wider hover:opacity-70 cursor-pointer">Analyser tout</button>
          </div>
          <div className="space-y-4">
            {AI_COMMENTARIES.map((c, i) => (
              <div key={i} className="pl-4 border-l-2 border-[#F7F7F9] hover:border-orange transition-all">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[13px] font-bold text-navy">{c.family}</span>
                  <span className="text-[11px] text-charcoal/40">{c.date}</span>
                </div>
                <p className="text-[13px] leading-relaxed text-charcoal/80 italic line-clamp-2">"{c.text}"</p>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-mint p-3 flex items-center gap-3">
            <AlertCircle size={16} className="text-navy" />
            <p className="text-[12px] text-navy leading-tight font-medium">L'IA a identifie 3 anomalies critiques d'allocation sur les rapports en cours de revue.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
