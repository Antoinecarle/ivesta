import { useQuery } from '@tanstack/react-query';
import { api, formatCurrency } from '../lib/api';
import { Plus } from 'lucide-react';

const STAGES = [
  { key: 'lead', label: 'Leads', color: 'bg-navy/5 border-navy/10' },
  { key: 'qualified', label: 'Qualifie', color: 'bg-beige/50 border-orange/20' },
  { key: 'meeting', label: 'RDV', color: 'bg-mint/50 border-navy/10' },
  { key: 'proposal', label: 'Proposition', color: 'bg-orange/10 border-orange/20' },
  { key: 'negotiation', label: 'Negociation', color: 'bg-rose/20 border-red/10' },
  { key: 'won', label: 'Gagne', color: 'bg-mint border-navy/20' },
];

export default function Prospects() {
  const { data: prospects = [] } = useQuery({
    queryKey: ['prospects'],
    queryFn: () => api<any[]>('/prospects'),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-navy">Pipeline commercial</h1>
          <p className="text-charcoal/60 mt-1">Suivi des prospects et opportunites</p>
        </div>
        <button className="flex items-center gap-2 bg-navy text-white px-5 py-2.5 text-sm font-medium hover:bg-orange transition-colors cursor-pointer">
          <Plus size={16} /> Nouveau prospect
        </button>
      </div>

      <div className="grid grid-cols-6 gap-3 overflow-x-auto">
        {STAGES.map((stage) => {
          const items = prospects.filter((p: any) => p.stage === stage.key);
          return (
            <div key={stage.key} className="min-w-[200px]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-display font-bold text-navy">{stage.label}</h3>
                <span className="text-xs bg-navy/5 px-2 py-0.5 text-charcoal/60">{items.length}</span>
              </div>
              <div className="space-y-2">
                {items.map((p: any) => (
                  <div key={p.id} className={`p-3 border ${stage.color} hover:shadow-sm transition-shadow cursor-pointer`}>
                    <p className="font-medium text-sm text-navy truncate">{p.contact_name}</p>
                    {p.company_name && <p className="text-xs text-charcoal/50 mt-0.5">{p.company_name}</p>}
                    {p.estimated_aum && (
                      <p className="text-xs text-orange font-medium mt-1">
                        AUM est. {formatCurrency(parseFloat(p.estimated_aum))}
                      </p>
                    )}
                  </div>
                ))}
                {items.length === 0 && (
                  <div className="p-4 border border-dashed border-navy/10 text-center text-xs text-charcoal/30">
                    Aucun prospect
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
