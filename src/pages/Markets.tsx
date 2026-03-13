import {
  TrendingUp,
  Globe,
  Newspaper,
  BarChart3,
  Building2,
  Cpu,
  Landmark,
  ChevronRight,
  Clock,
  ExternalLink,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';

// --- Types ---

interface MarketIndex {
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
  data: { value: number }[];
}

interface NewsItem {
  id: string;
  source: 'Bloomberg' | 'Reuters' | 'CFNews' | 'Les Echos';
  time: string;
  headline: string;
  category: string;
}

// --- Mock Data ---

const MOCK_SPARKLINE_UP = [
  { value: 400 }, { value: 380 }, { value: 420 }, { value: 450 }, { value: 440 }, { value: 480 }, { value: 500 }
];

const MOCK_SPARKLINE_DOWN = [
  { value: 500 }, { value: 490 }, { value: 470 }, { value: 480 }, { value: 460 }, { value: 440 }, { value: 430 }
];

const MARKET_INDICES: MarketIndex[] = [
  { name: 'CAC 40', value: '7 842,31', change: '+0,45%', isPositive: true, data: MOCK_SPARKLINE_UP },
  { name: 'S&P 500', value: '5 234,18', change: '-0,12%', isPositive: false, data: MOCK_SPARKLINE_DOWN },
  { name: 'MSCI World', value: '3 412,67', change: '+0,28%', isPositive: true, data: MOCK_SPARKLINE_UP },
  { name: 'Euro Stoxx 50', value: '4 987,42', change: '+0,33%', isPositive: true, data: MOCK_SPARKLINE_UP },
  { name: 'Nikkei 225', value: '38 421,90', change: '+1,24%', isPositive: true, data: MOCK_SPARKLINE_UP },
  { name: 'FTSE 100', value: '7 654,32', change: '-0,08%', isPositive: false, data: MOCK_SPARKLINE_DOWN },
];

const NEWS_FEED: NewsItem[] = [
  { id: '1', source: 'CFNews', time: 'Il y a 12 min', headline: 'LBO : Arkea Capital accompagne la transmission de [Groupe Industriel]', category: 'Private Equity' },
  { id: '2', source: 'Bloomberg', time: 'Il y a 24 min', headline: 'BCE : Vers une premiere baisse des taux en juin selon les gouverneurs', category: 'Macro' },
  { id: '3', source: 'Les Echos', time: 'Il y a 45 min', headline: 'Tech : Les levees de fonds en IA generative atteignent un nouveau sommet', category: 'Growth' },
  { id: '4', source: 'Reuters', time: 'Il y a 1h', headline: 'Marche obligataire : Tension sur les rendements des OAT a 10 ans', category: 'Fixed Income' },
  { id: '5', source: 'CFNews', time: 'Il y a 2h', headline: 'Venture Capital : [Startup Fintech] boucle une serie B de [Montant]', category: 'VC' },
  { id: '6', source: 'Bloomberg', time: 'Il y a 3h', headline: 'Immobilier : Le residentiel de luxe resiste a la correction globale', category: 'Real Estate' },
  { id: '7', source: 'Les Echos', time: 'Il y a 4h', headline: "CAC 40 : Les valeurs du luxe tirent l'indice vers de nouveaux records", category: 'Equity' },
  { id: '8', source: 'Reuters', time: 'Il y a 5h', headline: "M&A : Consolidation majeure attendue dans le secteur de l'energie", category: 'Deals' },
];

const ANALYSIS_CARDS = [
  {
    title: 'Private Equity Europeen',
    icon: <BarChart3 className="w-5 h-5" />,
    bgColor: 'bg-sage',
    summary: "Ralentissement modere des sorties (exits), mais maintien d'un 'dry powder' record pret a etre deploye.",
    metrics: [{ label: 'Multiple moyen', value: '11.4x' }, { label: 'Taux de deal flow', value: '+4%' }]
  },
  {
    title: 'Macro-Economie Zone Euro',
    icon: <Globe className="w-5 h-5" />,
    bgColor: 'bg-cream',
    summary: 'Desinflation confirmee permettant une marge de manoeuvre a la BCE. Croissance atone mais resiliente.',
    metrics: [{ label: 'Prevision PIB', value: '+0.8%' }, { label: 'Confiance PME', value: 'Stable' }]
  },
  {
    title: 'Immobilier Commercial',
    icon: <Building2 className="w-5 h-5" />,
    bgColor: 'bg-salmon',
    summary: 'Reprise selective sur le bureau Prime. Ajustement des valeurs venales en cours sur le logistique.',
    metrics: [{ label: 'Rendement Prime', value: '4.25%' }, { label: 'Vacance', value: '6.1%' }]
  },
  {
    title: 'Tech & Growth',
    icon: <Cpu className="w-5 h-5" />,
    bgColor: 'bg-transition',
    summary: "Forte concentration des investissements sur l'IA et la Transition Energetique (Climate Tech).",
    metrics: [{ label: 'Valo Mediane', value: '22x ARR' }, { label: 'Volume Deals', value: '-12%' }]
  }
];

const MACRO_INDICATORS = [
  { label: 'PIB France', value: '+1,2%' },
  { label: 'Inflation Zone Euro', value: '2,1%' },
  { label: 'Taux BCE (Refi)', value: '3,75%' },
  { label: 'EUR / USD', value: '1,0842' },
  { label: 'Or (Spot)', value: '2 156 $/oz' },
  { label: 'Petrole Brent', value: '82,4 $/bbl' },
];

// --- Sub-Components ---

function Sparkline({ data, color }: { data: { value: number }[]; color: string }) {
  return (
    <div className="h-10 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <Area type="monotone" dataKey="value" stroke={color} fill={color} fillOpacity={0.1} strokeWidth={1.5} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function SourceBadge({ source }: { source: string }) {
  const styles: Record<string, string> = {
    Bloomberg: 'bg-navy text-white',
    Reuters: 'bg-orange text-white',
    CFNews: 'bg-red text-white',
    'Les Echos': 'bg-charcoal text-white',
  };
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 uppercase tracking-wider ${styles[source] || 'bg-bg-light text-charcoal'}`}>
      {source}
    </span>
  );
}

// --- Main Page ---

export default function Markets() {
  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-[42px] font-normal font-display text-navy mb-2">Marches & Veille</h1>
        <p className="text-charcoal text-[17px] font-body italic">Intelligence de marche en temps reel</p>
      </div>

      {/* Market Indices Grid */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {MARKET_INDICES.map((index) => (
            <div key={index.name} className="bg-white border border-[#E5E7EB] p-5 hover:shadow-[0_2px_8px_rgba(0,0,70,0.08)] transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-charcoal">{index.name}</span>
                <Sparkline data={index.data} color={index.isPositive ? '#FF8217' : '#CD002D'} />
              </div>
              <div className="flex flex-col">
                <span className="text-[22px] font-display text-navy mb-1">{index.value}</span>
                <div className={`flex items-center text-xs font-bold ${index.isPositive ? 'text-orange' : 'text-red'}`}>
                  {index.isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                  {index.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content: News + Macro */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

        {/* News Feed */}
        <section className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b border-navy pb-4">
            <h2 className="text-[24px] font-display flex items-center gap-3">
              <Newspaper className="w-6 h-6 text-orange" />
              Flux d'actualites Daily
            </h2>
            <button className="text-[11px] font-bold uppercase tracking-widest flex items-center hover:text-orange transition-colors cursor-pointer">
              Voir tout le flux <ChevronRight className="ml-1 w-4 h-4" />
            </button>
          </div>

          <div className="bg-white border border-[#E5E7EB] divide-y divide-[#F7F7F9]">
            {NEWS_FEED.map((item) => (
              <div key={item.id} className="p-5 hover:bg-bg-light transition-colors group">
                <div className="flex items-center gap-3 mb-2">
                  <SourceBadge source={item.source} />
                  <span className="text-[11px] text-charcoal flex items-center">
                    <Clock className="w-3 h-3 mr-1" /> {item.time}
                  </span>
                  <span className="text-[11px] font-bold text-orange uppercase tracking-tighter ml-auto">{item.category}</span>
                </div>
                <h3 className="text-[15px] font-medium leading-snug group-hover:text-orange transition-colors cursor-pointer flex justify-between items-start">
                  {item.headline}
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-4" />
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column */}
        <aside className="lg:col-span-4 space-y-10">

          {/* Macro Indicators */}
          <section className="space-y-4">
            <h2 className="text-[20px] font-display border-b border-navy pb-3 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-orange" />
              Indicateurs Macro
            </h2>
            <div className="bg-white border border-[#E5E7EB] overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-bg-light">
                    <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-navy">Variable</th>
                    <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-navy text-right">Valeur</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F7F7F9]">
                  {MACRO_INDICATORS.map((indicator) => (
                    <tr key={indicator.label} className="hover:bg-bg-light transition-colors">
                      <td className="py-3 px-4 text-sm text-charcoal">{indicator.label}</td>
                      <td className="py-3 px-4 text-sm font-bold text-right text-navy">{indicator.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Market Sentiment */}
          <div className="p-6 bg-navy text-white space-y-4">
            <div className="flex items-center gap-2 text-orange">
              <TrendingUp className="w-5 h-5" />
              <span className="text-[11px] font-bold uppercase tracking-widest">Sentiment de Marche</span>
            </div>
            <p className="text-[24px] font-display">Moderement Constructif</p>
            <p className="text-xs text-white/70 leading-relaxed">
              L'anticipation d'un atterrissage en douceur de l'economie americaine soutient les actifs risques, malgre la vigilance accrue sur les valorisations tech.
            </p>
          </div>
        </aside>
      </div>

      {/* Thematic Analysis */}
      <section className="mb-12">
        <div className="flex items-center gap-3 border-b border-navy pb-4 mb-6">
          <h2 className="text-[24px] font-display">Focus Thematiques & Recherche</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {ANALYSIS_CARDS.map((card) => (
            <div key={card.title} className={`p-8 ${card.bgColor} border border-transparent hover:border-navy transition-all group flex flex-col h-full`}>
              <div className="mb-6 text-navy">{card.icon}</div>
              <h3 className="text-[20px] font-display mb-4 text-navy">{card.title}</h3>
              <p className="text-sm text-charcoal leading-relaxed mb-8 flex-grow">{card.summary}</p>
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-navy/10">
                {card.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="text-[10px] uppercase font-bold tracking-tighter text-charcoal/60 mb-1">{m.label}</p>
                    <p className="text-[18px] font-display text-navy">{m.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Note */}
      <footer className="pt-8 border-t border-[#E5E7EB] text-center">
        <p className="text-[11px] text-charcoal/50 uppercase tracking-[3px] font-medium">
          Donnees de marche rafraichies toutes les 60 secondes — Source : iVesta Intelligence Terminal
        </p>
      </footer>
    </div>
  );
}
