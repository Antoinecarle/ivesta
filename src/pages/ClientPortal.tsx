import {
  Download,
  Calendar,
  Phone,
  Mail,
  Briefcase,
  Clock,
  User,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// --- Data ---

const ALLOCATION_DATA = [
  { name: 'Private Equity', value: 35, color: '#000046' },
  { name: 'Immobilier', value: 25, color: '#FF8217' },
  { name: 'Actions Cotees', value: 20, color: '#FFB9AD' },
  { name: 'Obligations', value: 10, color: '#E3F1EC' },
  { name: 'Tresorerie', value: 10, color: '#CD002D' },
];

const DOCUMENTS = [
  { date: '15/01/2026', name: 'Reporting T4 2025', type: 'Rapport Trimestriel' },
  { date: '10/01/2026', name: 'Releve de compte - Janvier', type: 'Releve' },
  { date: '05/01/2026', name: 'Attestation fiscale 2025', type: 'Fiscalite' },
  { date: '28/12/2025', name: 'Appel de fonds - PAI Partners X', type: 'Capital Call' },
  { date: '20/12/2025', name: "Note d'investissement - Project Sky", type: 'Opportunite' },
];

const EVENTS = [
  { date: '20 Mars', title: "Comite d'investissement", time: '14:30', icon: Briefcase },
  { date: '05 Avril', title: 'Revue annuelle patrimoine', time: '10:00', icon: User },
  { date: '15 Avril', title: 'Capital Call Eurazeo', time: 'Termine a 18:00', icon: Clock },
];

// --- Components ---

function KPICard({ label, value, trend }: { label: string; value: string; trend?: string }) {
  return (
    <div className="bg-white border border-[#E5E7EB] p-6 hover:border-navy transition-all">
      <p className="text-charcoal uppercase tracking-wider mb-2 text-[13px] font-body">{label}</p>
      <div className="flex items-baseline gap-3">
        <h2 className="text-navy font-display text-[36px]">{value}</h2>
        {trend && (
          <span className="text-sage bg-navy px-2 py-0.5 text-[12px] font-bold">{trend}</span>
        )}
      </div>
    </div>
  );
}

export default function ClientPortal() {
  return (
    <div>
      {/* Header */}
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-navy flex items-center justify-center text-white border-2 border-orange">
            <span className="font-display text-[32px]">FR</span>
          </div>
          <div>
            <h1 className="text-navy font-display text-[42px] mb-1">Bienvenue, Famille Rothenberg</h1>
            <p className="text-charcoal text-sm opacity-70">
              Derniere connexion : 12 mars 2026 a 09:42 — Votre conseiller est en ligne
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border border-navy text-navy hover:bg-navy hover:text-white transition-colors text-[14px] cursor-pointer">
            <Download size={18} /> Consolide PDF
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-navy text-white hover:bg-orange transition-colors text-[14px] cursor-pointer">
            <Calendar size={18} /> Nouvelle Operation
          </button>
        </div>
      </header>

      {/* KPI Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KPICard label="Patrimoine Total" value="€245M" trend="+8.2% YTD" />
        <KPICard label="Performance Globale" value="+12.4%" trend="Sur 3 ans" />
        <KPICard label="Prochaine Echeance" value="15 Avr. 2026" trend="Capital Call" />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <section className="lg:col-span-2 space-y-8">
          {/* Portfolio Allocation */}
          <div className="bg-white border border-[#E5E7EB] p-6">
            <div className="flex justify-between items-center mb-8 border-b border-[#E5E7EB] pb-4">
              <h3 className="text-navy font-display text-[24px]">Allocation du Patrimoine</h3>
            </div>
            <div className="h-[400px] w-full flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={ALLOCATION_DATA} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={0} dataKey="value" stroke="none">
                      {ALLOCATION_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '0px', border: '1px solid #000046' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2 space-y-4 px-4">
                {ALLOCATION_DATA.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-bg-light pb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3" style={{ backgroundColor: item.color }} />
                      <span className="text-charcoal font-medium">{item.name}</span>
                    </div>
                    <span className="text-navy font-bold font-display text-[20px]">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white border border-[#E5E7EB] p-6 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-navy font-display text-[24px]">Documents Recents</h3>
              <button className="text-orange text-sm font-bold flex items-center gap-1 hover:underline cursor-pointer">
                Voir tout le coffre-fort <ChevronRight size={16} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-bg-light">
                    <th className="px-4 py-3 text-[11px] font-bold text-charcoal uppercase tracking-widest">Date</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-charcoal uppercase tracking-widest">Document</th>
                    <th className="px-4 py-3 text-[11px] font-bold text-charcoal uppercase tracking-widest">Type</th>
                    <th className="px-4 py-3 text-right" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB]">
                  {DOCUMENTS.map((doc, i) => (
                    <tr key={i} className="hover:bg-cream/30 transition-colors">
                      <td className="px-4 py-4 text-sm text-charcoal">{doc.date}</td>
                      <td className="px-4 py-4 font-medium text-navy">{doc.name}</td>
                      <td className="px-4 py-4">
                        <span className="bg-sage text-navy px-2 py-1 text-[10px] font-bold uppercase">{doc.type}</span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button className="text-navy hover:text-orange transition-colors cursor-pointer">
                          <Download size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Events */}
          <div className="bg-white border border-[#E5E7EB] p-6">
            <h3 className="text-navy font-display text-[24px] mb-6">Calendrier Famille</h3>
            <div className="space-y-6">
              {EVENTS.map((event, i) => (
                <div key={i} className="flex gap-4 group cursor-pointer">
                  <div className="shrink-0 w-12 h-12 bg-bg-light flex flex-col items-center justify-center border border-[#E5E7EB] group-hover:border-orange transition-colors">
                    <span className="text-navy font-bold text-xs">{event.date.split(' ')[0]}</span>
                    <span className="text-orange font-bold text-[10px] uppercase">{event.date.split(' ')[1]}</span>
                  </div>
                  <div>
                    <h4 className="text-navy font-bold text-sm mb-1">{event.title}</h4>
                    <div className="flex items-center gap-1 text-xs text-charcoal opacity-60">
                      <event.icon size={12} /> {event.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 border border-navy text-navy text-[13px] font-medium hover:bg-navy hover:text-white transition-colors cursor-pointer">
              Ajouter au calendrier
            </button>
          </div>

          {/* Family Officer Contact */}
          <div className="bg-navy text-white p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange/10 -mr-16 -mt-16 rotate-45" />
            <h3 className="text-white font-display text-[24px] mb-6 relative z-10">Votre Family Officer</h3>
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="w-16 h-16 bg-cream flex items-center justify-center">
                <span className="text-navy font-display text-[24px] font-bold">SL</span>
              </div>
              <div>
                <h4 className="font-bold text-lg">Sophie Laurent</h4>
                <p className="text-salmon text-sm uppercase tracking-widest font-medium">Family Partner</p>
              </div>
            </div>
            <div className="space-y-4 mb-8 relative z-10">
              <a href="mailto:s.laurent@ivesta.fr" className="flex items-center gap-3 text-sm hover:text-orange transition-colors">
                <div className="w-8 h-8 border border-white/20 flex items-center justify-center">
                  <Mail size={14} />
                </div>
                s.laurent@ivesta.fr
              </a>
              <a href="tel:+33145678900" className="flex items-center gap-3 text-sm hover:text-orange transition-colors">
                <div className="w-8 h-8 border border-white/20 flex items-center justify-center">
                  <Phone size={14} />
                </div>
                +33 1 45 67 89 00
              </a>
            </div>
            <button className="w-full bg-orange text-white py-4 font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-navy transition-all cursor-pointer relative z-10">
              Prendre rendez-vous
            </button>
          </div>

          {/* Quick Links */}
          <div className="p-4 border-l-2 border-orange bg-white">
            <p className="text-[11px] font-bold text-charcoal uppercase mb-3">Acces Rapides</p>
            <div className="space-y-2">
              <a href="#" className="flex items-center justify-between text-sm text-navy hover:translate-x-1 transition-transform">
                Plateforme Private Equity <ExternalLink size={14} className="text-orange" />
              </a>
              <a href="#" className="flex items-center justify-between text-sm text-navy hover:translate-x-1 transition-transform">
                Gouvernance Familiale <ExternalLink size={14} className="text-orange" />
              </a>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-[#E5E7EB] text-center">
        <p className="text-charcoal text-[11px] uppercase tracking-widest opacity-50">
          iVesta Multi Family Office — Informations confidentielles soumises au secret professionnel
        </p>
      </footer>
    </div>
  );
}
