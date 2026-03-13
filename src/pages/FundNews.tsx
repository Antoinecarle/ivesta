import { Bell, ArrowUpRight, TrendingUp, Building2, Calendar, ChevronRight } from 'lucide-react';

const NEWS_DATA = [
  { id: 1, fund: 'Ardian LBO Fund VII', event: 'Cession de Veepee finalisee pour 1.2Mds EUR', date: '12 mars 2026', type: 'exit', families: ['Dupont', 'Laurent', 'Moreau'] },
  { id: 2, fund: 'Eurazeo Growth III', event: 'Nouvel investissement : Qonto (Serie D, 120M EUR)', date: '11 mars 2026', type: 'investment', families: ['Laurent', 'Bernard'] },
  { id: 3, fund: 'EQT IX', event: 'Distribution partielle — 15% du commitment', date: '10 mars 2026', type: 'distribution', families: ['Dupont', 'Lefebvre', 'Petit', 'Girard'] },
  { id: 4, fund: 'Tikehau Direct Lending IV', event: 'Appel de fonds Q1 2026 — 8% du commitment', date: '8 mars 2026', type: 'call', families: ['Moreau', 'Roux'] },
  { id: 5, fund: 'Balderton Capital IX', event: 'Participation Revolut valorisee a 45Mds USD (up round)', date: '7 mars 2026', type: 'valuation', families: ['Dupont'] },
  { id: 6, fund: 'PAI Europe VII', event: 'Acquisition de Tropicana (2.3Mds EUR)', date: '5 mars 2026', type: 'investment', families: ['Laurent', 'Petit', 'Girard'] },
  { id: 7, fund: 'Antin Infrastructure IV', event: 'Closing final atteint — 3.2Mds EUR leves', date: '3 mars 2026', type: 'fundraising', families: ['Bernard', 'Roux'] },
  { id: 8, fund: 'Partech Venture V', event: 'IPO Mistral AI — impact portfolio positif +120%', date: '1 mars 2026', type: 'exit', families: ['Dupont', 'Moreau', 'Lefebvre'] },
];

const typeConfig: Record<string, { label: string; color: string; bg: string }> = {
  exit: { label: 'Sortie', color: '#16A34A', bg: '#E3F1EC' },
  investment: { label: 'Investissement', color: '#000046', bg: 'rgba(0,0,70,0.1)' },
  distribution: { label: 'Distribution', color: '#FF8217', bg: 'rgba(255,130,23,0.1)' },
  call: { label: 'Appel de fonds', color: '#CD002D', bg: '#FEE2E2' },
  valuation: { label: 'Revalorisation', color: '#B45309', bg: '#FAEBDC' },
  fundraising: { label: 'Fundraising', color: '#000046', bg: '#F7F7F9' },
};

export default function FundNews() {
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-display text-[42px] text-navy leading-tight">Fund News</h1>
          <p className="text-[15px] text-charcoal/60 mt-1">Notifications personnalisees par fonds — Alertes clients en temps reel</p>
        </div>
        <button className="bg-navy text-white px-6 py-3 text-[14px] font-medium flex items-center gap-2 hover:bg-orange transition-colors cursor-pointer">
          <Bell size={18} /> Configurer les alertes
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-[#E5E7EB] p-5">
          <p className="text-[11px] uppercase tracking-wider text-charcoal/60 font-medium">Evenements ce mois</p>
          <p className="text-[32px] font-display text-navy leading-none mt-2">24</p>
        </div>
        <div className="bg-white border border-[#E5E7EB] p-5">
          <p className="text-[11px] uppercase tracking-wider text-charcoal/60 font-medium">Familles impactees</p>
          <p className="text-[32px] font-display text-navy leading-none mt-2">67</p>
        </div>
        <div className="bg-white border border-[#E5E7EB] p-5">
          <p className="text-[11px] uppercase tracking-wider text-charcoal/60 font-medium">Sorties realisees</p>
          <p className="text-[32px] font-display text-[#16A34A] leading-none mt-2">5</p>
        </div>
        <div className="bg-white border border-[#E5E7EB] p-5">
          <p className="text-[11px] uppercase tracking-wider text-charcoal/60 font-medium">Appels en attente</p>
          <p className="text-[32px] font-display text-orange leading-none mt-2">3</p>
        </div>
      </div>

      {/* News Feed */}
      <div className="space-y-3">
        {NEWS_DATA.map((news) => {
          const config = typeConfig[news.type] || typeConfig.investment;
          return (
            <div key={news.id} className="bg-white border border-[#E5E7EB] p-5 hover:shadow-[0_2px_8px_rgba(0,0,70,0.08)] transition-all cursor-pointer group">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-2 mt-0.5" style={{ backgroundColor: config.bg }}>
                    {news.type === 'exit' ? <ArrowUpRight size={18} style={{ color: config.color }} /> :
                     news.type === 'investment' ? <Building2 size={18} style={{ color: config.color }} /> :
                     news.type === 'distribution' ? <TrendingUp size={18} style={{ color: config.color }} /> :
                     <Calendar size={18} style={{ color: config.color }} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[14px] font-bold text-navy">{news.fund}</span>
                      <span className="text-[11px] font-medium uppercase tracking-wider px-2 py-0.5" style={{ backgroundColor: config.bg, color: config.color }}>{config.label}</span>
                    </div>
                    <p className="text-[15px] text-charcoal mb-2">{news.event}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] text-charcoal/40">{news.date}</span>
                      <span className="text-[12px] text-charcoal/30">&bull;</span>
                      <span className="text-[12px] text-charcoal/60">
                        {news.families.length} famille{news.families.length > 1 ? 's' : ''} concernee{news.families.length > 1 ? 's' : ''} : {news.families.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-charcoal/20 group-hover:text-orange transition-colors mt-1" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
