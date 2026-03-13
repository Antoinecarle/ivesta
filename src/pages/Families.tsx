import { useQuery } from '@tanstack/react-query';
import { api, formatCurrency } from '../lib/api';
import { Users, Plus, Search } from 'lucide-react';
import { useState } from 'react';

export default function Families() {
  const [search, setSearch] = useState('');
  const { data: families = [], isLoading } = useQuery({
    queryKey: ['families'],
    queryFn: () => api<any[]>('/families'),
  });

  const filtered = families.filter((f: any) =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.code?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-navy">Familles</h1>
          <p className="text-charcoal/60 mt-1">{families.length} familles enregistrees</p>
        </div>
        <button className="flex items-center gap-2 bg-navy text-white px-5 py-2.5 text-sm font-medium hover:bg-orange transition-colors cursor-pointer">
          <Plus size={16} /> Nouvelle famille
        </button>
      </div>

      <div className="relative mb-6">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/30" />
        <input
          type="text"
          placeholder="Rechercher une famille..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white border border-navy/5 text-sm outline-none focus:border-orange"
        />
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-charcoal/40">Chargement...</div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((f: any) => (
            <div key={f.id} className="bg-white border border-navy/5 p-5 flex items-center justify-between hover:border-orange/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-beige flex items-center justify-center">
                  <Users size={20} className="text-navy" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-navy">{f.name}</h3>
                  <p className="text-xs text-charcoal/50 mt-0.5">
                    {f.code} &bull; {f.risk_profile || 'Non defini'} &bull;{' '}
                    <span className={`inline-block px-2 py-0.5 text-[10px] font-medium ${
                      f.status === 'active' ? 'bg-mint text-navy' : 'bg-beige text-charcoal'
                    }`}>{f.status}</span>
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-display font-bold text-navy">{formatCurrency(parseFloat(f.total_aum))}</p>
                <p className="text-xs text-charcoal/50 mt-0.5">
                  {f.fund_count || 0} fonds &bull; {f.listed_count || 0} lignes cotees
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
