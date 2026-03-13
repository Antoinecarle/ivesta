import { useQuery } from '@tanstack/react-query';
import { api, formatCurrency } from '../lib/api';
import { Users, Plus, Search } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Families() {
  const [search, setSearch] = useState('');
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.family-header', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
      gsap.fromTo('.family-search', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', delay: 0.15 });
      gsap.fromTo('.family-card', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out', delay: 0.25 });
    }, pageRef);
    return () => ctx.revert();
  }, []);
  const { data: families = [], isLoading } = useQuery({
    queryKey: ['families'],
    queryFn: () => api<any[]>('/families'),
  });

  const filtered = families.filter((f: any) =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.code?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={pageRef}>
      <div className="family-header flex items-center justify-between mb-8" style={{ opacity: 0 }}>
        <div>
          <h1 className="font-display text-3xl font-bold text-navy">Familles</h1>
          <p className="text-charcoal/60 mt-1">{families.length} familles enregistrees</p>
        </div>
        <button className="flex items-center gap-2 bg-navy text-white px-5 py-2.5 text-sm font-medium hover:bg-orange transition-colors cursor-pointer">
          <Plus size={16} /> Nouvelle famille
        </button>
      </div>

      <div className="family-search relative mb-6" style={{ opacity: 0 }}>
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
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-10 h-10 bg-navy flex items-center justify-center animate-pulse">
            <span className="text-white font-display font-bold text-sm">iV</span>
          </div>
          <span className="text-charcoal/40 text-sm">Chargement des familles...</span>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((f: any) => (
            <div key={f.id} className="family-card bg-white border border-navy/5 p-5 flex items-center justify-between hover:border-orange/30 hover:shadow-[0_2px_8px_rgba(0,0,70,0.08)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer" style={{ opacity: 0 }}>
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
