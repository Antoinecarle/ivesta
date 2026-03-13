import { useQuery } from '@tanstack/react-query';
import { api, formatCurrency, formatPercent } from '../lib/api';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';

const STRATEGY_LABELS: Record<string, string> = {
  venture: 'VC', lbo: 'LBO', growth: 'Growth', debt: 'Dette',
  real_estate: 'Immo', infrastructure: 'Infra', secondary: 'Secondaire',
  fund_of_funds: 'FoF', other: 'Autre',
};
const STRATEGY_COLORS: Record<string, string> = {
  venture: 'bg-orange/10 text-orange', lbo: 'bg-navy/10 text-navy', growth: 'bg-mint text-navy',
  debt: 'bg-beige text-charcoal', real_estate: 'bg-rose/30 text-red',
  infrastructure: 'bg-navy/5 text-navy', secondary: 'bg-transition/30 text-charcoal',
};

export default function Funds() {
  const [search, setSearch] = useState('');
  const { data: funds = [], isLoading } = useQuery({
    queryKey: ['funds'],
    queryFn: () => api<any[]>('/funds'),
  });

  const filtered = funds.filter((f: any) =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.manager?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-navy">Fonds</h1>
          <p className="text-charcoal/60 mt-1">{funds.length} fonds en portefeuille</p>
        </div>
        <button className="flex items-center gap-2 bg-navy text-white px-5 py-2.5 text-sm font-medium hover:bg-orange transition-colors cursor-pointer">
          <Plus size={16} /> Nouveau fonds
        </button>
      </div>

      <div className="relative mb-6">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" />
        <input
          type="text"
          placeholder="Rechercher un fonds..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white border border-navy/5 text-sm outline-none focus:border-orange"
        />
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-charcoal/40">Chargement...</div>
      ) : (
        <div className="bg-white border border-navy/5 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy/3 border-b border-navy/5">
                <th className="text-left p-4 font-display font-bold text-navy">Fonds</th>
                <th className="text-left p-4 font-display font-bold text-navy">Strategie</th>
                <th className="text-right p-4 font-display font-bold text-navy">Taille</th>
                <th className="text-right p-4 font-display font-bold text-navy">IRR</th>
                <th className="text-right p-4 font-display font-bold text-navy">TVPI</th>
                <th className="text-right p-4 font-display font-bold text-navy">DPI</th>
                <th className="text-right p-4 font-display font-bold text-navy">Vintage</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((f: any) => (
                <tr key={f.id} className="border-b border-navy/3 hover:bg-beige/20 transition-colors">
                  <td className="p-4">
                    <p className="font-medium text-navy">{f.name}</p>
                    <p className="text-xs text-charcoal/50">{f.manager}</p>
                  </td>
                  <td className="p-4">
                    <span className={`inline-block px-2.5 py-1 text-xs font-medium ${STRATEGY_COLORS[f.strategy] || 'bg-navy/5 text-navy'}`}>
                      {STRATEGY_LABELS[f.strategy] || f.strategy}
                    </span>
                  </td>
                  <td className="p-4 text-right font-mono text-xs">{f.fund_size ? formatCurrency(parseFloat(f.fund_size)) : '-'}</td>
                  <td className="p-4 text-right font-mono text-xs">{f.irr ? formatPercent(parseFloat(f.irr)) : '-'}</td>
                  <td className="p-4 text-right font-mono text-xs">{f.tvpi ? `${parseFloat(f.tvpi).toFixed(2)}x` : '-'}</td>
                  <td className="p-4 text-right font-mono text-xs">{f.dpi ? `${parseFloat(f.dpi).toFixed(2)}x` : '-'}</td>
                  <td className="p-4 text-right text-charcoal/60">{f.vintage_year || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
