import { useQuery } from '@tanstack/react-query';
import { api, formatDate } from '../lib/api';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export default function Compliance() {
  const { data: alerts = [] } = useQuery({
    queryKey: ['compliance-alerts'],
    queryFn: () => api<any[]>('/compliance/alerts'),
  });

  const { data: docs = [] } = useQuery({
    queryKey: ['compliance-docs'],
    queryFn: () => api<any[]>('/compliance'),
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-navy">Compliance & KYC</h1>
        <p className="text-charcoal/60 mt-1">Suivi de la conformite reglementaire</p>
      </div>

      {/* Alerts */}
      <div className="bg-white border border-navy/5 p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle size={20} className="text-orange" />
          <h3 className="font-display font-bold text-navy">Alertes a 90 jours</h3>
        </div>
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-charcoal/40 text-sm">
            <CheckCircle size={32} className="mx-auto mb-2 text-mint" />
            Aucune alerte — Tout est conforme
          </div>
        ) : (
          <div className="space-y-2">
            {alerts.map((a: any) => (
              <div key={a.id} className="flex items-center justify-between p-3 bg-rose/10 border border-rose/20">
                <div className="flex items-center gap-3">
                  <Clock size={16} className="text-red" />
                  <div>
                    <p className="text-sm font-medium text-navy">{a.name}</p>
                    <p className="text-xs text-charcoal/50">{a.family_name}</p>
                  </div>
                </div>
                <span className="text-xs text-red font-medium">
                  Expire le {formatDate(a.expiry_date)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Doc list */}
      <div className="bg-white border border-navy/5 p-6">
        <h3 className="font-display font-bold text-navy mb-4">Documents KYC</h3>
        {docs.length === 0 ? (
          <p className="text-center py-8 text-charcoal/40 text-sm">Aucun document KYC enregistre</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy/5">
                <th className="text-left p-3 font-display font-bold text-navy">Document</th>
                <th className="text-left p-3 font-display font-bold text-navy">Famille</th>
                <th className="text-left p-3 font-display font-bold text-navy">Type</th>
                <th className="text-right p-3 font-display font-bold text-navy">Expiration</th>
                <th className="text-right p-3 font-display font-bold text-navy">Statut</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((d: any) => (
                <tr key={d.id} className="border-b border-navy/3">
                  <td className="p-3 text-navy">{d.name}</td>
                  <td className="p-3 text-charcoal/60">{d.family_name}</td>
                  <td className="p-3 text-charcoal/60">{d.doc_type}</td>
                  <td className="p-3 text-right text-charcoal/60">{d.expiry_date ? formatDate(d.expiry_date) : '-'}</td>
                  <td className="p-3 text-right">
                    <span className={`inline-block px-2 py-0.5 text-xs font-medium ${
                      d.status === 'valid' ? 'bg-mint text-navy' :
                      d.status === 'expired' ? 'bg-rose/30 text-red' :
                      'bg-beige text-charcoal'
                    }`}>{d.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
