import { useState } from 'react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  FileText,
  Shield,
  TrendingUp,
  BarChart3,
  Globe,
  Database,
  CheckCircle2,
  Clock,
  ChevronRight,
  AlertCircle,
  Download,
  Filter
} from 'lucide-react';

export default function AIAssistant() {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="flex h-[calc(100vh-64px)] -m-8 font-body text-navy overflow-hidden">
      {/* LEFT PANEL - CHAT (70%) */}
      <div className="w-[70%] flex flex-col border-r border-[#E5E7EB] bg-white relative">
        {/* Header */}
        <header className="h-20 border-b border-[#E5E7EB] flex items-center justify-between px-8 bg-white z-10 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-orange flex items-center justify-center">
              <Bot size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-[24px] font-normal font-display text-navy leading-none mb-1">Assistant iVesta</h1>
              <div className="flex items-center gap-2 text-[12px] uppercase tracking-wider text-orange font-bold">
                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                IA Intelligence Patrimoniale Active
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-navy text-navy hover:bg-cream transition-colors text-sm font-medium uppercase tracking-tight cursor-pointer">
            <Download size={16} /> Export
          </button>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 pb-40">
          {/* USER 1 */}
          <div className="flex justify-end">
            <div className="max-w-[80%] flex items-start gap-4 flex-row-reverse">
              <div className="w-10 h-10 bg-navy flex items-center justify-center shrink-0">
                <User size={20} className="text-white" />
              </div>
              <div className="bg-navy text-white p-5">
                <p className="text-[15px] leading-relaxed">Quel est le TRI du fonds Eurazeo PE V ?</p>
              </div>
            </div>
          </div>

          {/* AI 1 - Table */}
          <div className="flex justify-start">
            <div className="max-w-[90%] flex items-start gap-4">
              <div className="w-10 h-10 bg-orange flex items-center justify-center shrink-0">
                <Bot size={20} className="text-white" />
              </div>
              <div className="bg-bg-light border-l-[3px] border-orange p-6 w-full">
                <p className="mb-4 text-[15px] font-medium italic">Voici les indicateurs de performance consolides pour Eurazeo Private Equity V :</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-navy/10">
                        <th className="py-3 font-bold uppercase tracking-wider text-[11px]">Fonds</th>
                        <th className="py-3 font-bold uppercase tracking-wider text-[11px]">Millesime</th>
                        <th className="py-3 font-bold uppercase tracking-wider text-[11px]">Engagement</th>
                        <th className="py-3 font-bold uppercase tracking-wider text-[11px]">Appele</th>
                        <th className="py-3 font-bold uppercase tracking-wider text-[11px]">TRI (IRR)</th>
                        <th className="py-3 font-bold uppercase tracking-wider text-[11px]">TVPI</th>
                        <th className="py-3 font-bold uppercase tracking-wider text-[11px]">DPI</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-4 font-bold">Eurazeo PE V</td>
                        <td className="py-4">2021</td>
                        <td className="py-4">5 000 000 EUR</td>
                        <td className="py-4">3 250 000 EUR</td>
                        <td className="py-4 text-orange font-bold">18.4%</td>
                        <td className="py-4">1.42x</td>
                        <td className="py-4">0.15x</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* USER 2 */}
          <div className="flex justify-end">
            <div className="max-w-[80%] flex items-start gap-4 flex-row-reverse">
              <div className="w-10 h-10 bg-navy flex items-center justify-center shrink-0">
                <User size={20} className="text-white" />
              </div>
              <div className="bg-navy text-white p-5">
                <p className="text-[15px] leading-relaxed">Genere un resume trimestriel pour la Famille Rothenberg.</p>
              </div>
            </div>
          </div>

          {/* AI 2 - Quarterly Summary */}
          <div className="flex justify-start">
            <div className="max-w-[90%] flex items-start gap-4">
              <div className="w-10 h-10 bg-orange flex items-center justify-center shrink-0">
                <Bot size={20} className="text-white" />
              </div>
              <div className="bg-bg-light border-l-[3px] border-orange p-6 w-full">
                <h3 className="font-display text-[24px] mb-6">Synthese Trimestrielle - Famille Rothenberg</h3>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-white p-4 border border-[#E5E7EB]">
                    <div className="text-[11px] uppercase tracking-widest text-charcoal/60 mb-1 font-bold">Evolution AUM</div>
                    <div className="text-xl font-bold text-navy">+4.2% (vs T-1)</div>
                    <div className="text-sm text-orange">Net Assets: 42.8M EUR</div>
                  </div>
                  <div className="bg-white p-4 border border-[#E5E7EB]">
                    <div className="text-[11px] uppercase tracking-widest text-charcoal/60 mb-1 font-bold">Statut Compliance</div>
                    <div className="flex items-center gap-2 text-xl font-bold text-navy">
                      <CheckCircle2 size={18} className="text-[#16A34A]" /> 100% Valide
                    </div>
                    <div className="text-sm text-charcoal/60">Prochaine revue : 15/10</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp size={16} className="text-orange mt-1" />
                    <div>
                      <span className="font-bold">Top Performers :</span> La poche Private Equity (+12%) et l'immobilier residentiel a Berlin (+8.5%) soutiennent la performance globale ce trimestre.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock size={16} className="text-orange mt-1" />
                    <div>
                      <span className="font-bold">Evenements a venir :</span> 2 appels de fonds prevus pour Juillet (Eurazeo et Blackstone) totalisant 450k EUR.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* USER 3 */}
          <div className="flex justify-end">
            <div className="max-w-[80%] flex items-start gap-4 flex-row-reverse">
              <div className="w-10 h-10 bg-navy flex items-center justify-center shrink-0">
                <User size={20} className="text-white" />
              </div>
              <div className="bg-navy text-white p-5">
                <p className="text-[15px] leading-relaxed">Quelles sont les alertes KYC en cours ?</p>
              </div>
            </div>
          </div>

          {/* AI 3 - KYC Alerts */}
          <div className="flex justify-start">
            <div className="max-w-[90%] flex items-start gap-4">
              <div className="w-10 h-10 bg-orange flex items-center justify-center shrink-0">
                <Bot size={20} className="text-white" />
              </div>
              <div className="bg-bg-light border-l-[3px] border-orange p-6 w-full">
                <p className="mb-4 text-[15px] font-medium">J'ai identifie 3 alertes de conformite (KYC) necessitant votre attention :</p>
                <div className="space-y-3">
                  {[
                    { entity: 'Holding S. Rothenberg', issue: 'ID Expire dans 15 jours', status: 'Critique', color: '#CD002D' },
                    { entity: 'Indivision Meyer', issue: 'Justificatif de domicile manquant', status: 'En attente', color: '#FF8217' },
                    { entity: 'SCI Blue Horizon', issue: 'Declaration UBO annuelle', status: 'Action requise', color: '#000046' }
                  ].map((alert, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white border border-[#E5E7EB] p-3">
                      <div className="flex items-center gap-3">
                        <AlertCircle size={18} style={{ color: alert.color }} />
                        <div>
                          <div className="font-bold text-sm">{alert.entity}</div>
                          <div className="text-xs text-charcoal/60">{alert.issue}</div>
                        </div>
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-tighter px-2 py-1 border" style={{ color: alert.color, borderColor: alert.color }}>
                        {alert.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="absolute bottom-0 left-0 w-full p-6 bg-white border-t border-[#E5E7EB]">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Posez une question a l'assistant..."
              className="w-full h-14 bg-bg-light border-none px-6 pr-16 text-[15px] focus:outline-none focus:ring-1 focus:ring-orange"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="absolute right-2 w-10 h-10 bg-navy flex items-center justify-center hover:bg-orange transition-colors cursor-pointer group">
              <Send size={18} className="text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
          <div className="mt-3 flex gap-4 text-[11px] text-charcoal/40 font-medium">
            <span>Suggest : "TRI Eurazeo PE V"</span>
            <span>&bull;</span>
            <span>"Alertes KYC"</span>
            <span>&bull;</span>
            <span>"Synthese Famille Rothenberg"</span>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL (30%) */}
      <div className="w-[30%] bg-cream/30 flex flex-col p-8 overflow-y-auto">

        {/* Quick Actions */}
        <section className="mb-10">
          <h2 className="font-display text-[20px] mb-6 flex items-center gap-2">
            <Sparkles size={20} className="text-orange" />
            Actions Rapides
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Reporting trimestriel', icon: <FileText size={16} /> },
              { label: 'Analyse de fonds', icon: <BarChart3 size={16} /> },
              { label: 'Alertes KYC', icon: <Shield size={16} /> },
              { label: 'Performance client', icon: <TrendingUp size={16} /> },
              { label: 'Comparaison fonds', icon: <Filter size={16} /> },
              { label: 'Macro-economie', icon: <Globe size={16} /> }
            ].map((action, i) => (
              <button key={i} className="flex flex-col items-start gap-2 p-4 bg-white border border-[#E5E7EB] hover:border-orange transition-all group text-left cursor-pointer">
                <div className="text-navy group-hover:text-orange transition-colors">{action.icon}</div>
                <span className="text-[12px] font-bold uppercase tracking-tight leading-tight">{action.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* AI Reports */}
        <section className="mb-10">
          <h2 className="font-display text-[20px] mb-6">Derniers Rapports IA</h2>
          <div className="space-y-3">
            {[
              { title: 'Rapport de Risque - Q2 2025', date: 'Hier, 14:20' },
              { title: 'Analyse Opportunite Blackstone IX', date: '12 Mars 2026' },
              { title: 'Synthese Fiscalite SCI', date: '05 Mars 2026' }
            ].map((report, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white border border-[#E5E7EB] group cursor-pointer hover:bg-bg-light">
                <div>
                  <div className="text-[14px] font-bold group-hover:text-orange transition-colors">{report.title}</div>
                  <div className="text-[11px] text-charcoal/50 uppercase tracking-widest mt-1 font-bold">{report.date}</div>
                </div>
                <ChevronRight size={16} className="text-navy/30" />
              </div>
            ))}
          </div>
        </section>

        {/* Data Sources */}
        <section>
          <h2 className="font-display text-[20px] mb-6">Sources de donnees connectees</h2>
          <div className="bg-white border border-[#E5E7EB] divide-y divide-[#E5E7EB]">
            {[
              { name: 'Base iVesta', type: 'Core Data' },
              { name: 'Bloomberg', type: 'Market Feed' },
              { name: 'Preqin', type: 'Alt Data' },
              { name: 'CFNews', type: 'Legal News' },
              { name: 'Base Minotore', type: 'Compliance' }
            ].map((source, i) => (
              <div key={i} className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Database size={14} className="text-navy/40" />
                  <div>
                    <div className="text-[13px] font-bold">{source.name}</div>
                    <div className="text-[10px] uppercase text-charcoal/40 font-bold">{source.type}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                  <span className="text-[9px] uppercase font-bold tracking-widest text-[#16A34A]">Sync</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 p-3 bg-sage text-[11px] font-medium text-navy">
            <CheckCircle2 size={14} className="text-[#16A34A]" />
            Verification de l'integrite des donnees effectuee (Il y a 2 min)
          </div>
        </section>
      </div>
    </div>
  );
}
