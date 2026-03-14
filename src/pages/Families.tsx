import { useState, useRef, useEffect } from 'react';
import { Plus, Search, ChevronRight, TrendingUp, TrendingDown, Shield, AlertTriangle, Eye } from 'lucide-react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

// ══════════════════════════════════════════════
// DEMO DATA — 8 familles UHNW
// ══════════════════════════════════════════════

interface Family {
  id: string;
  name: string;
  code: string;
  initials: string;
  status: 'active' | 'onboarding' | 'inactive';
  riskProfile: 'Conservateur' | 'Equilibre' | 'Dynamique' | 'Offensif';
  totalAum: number;
  ytdPerf: number;
  partnerInitials: string;
  partnerName: string;
  entityCount: number;
  fundCount: number;
  listedCount: number;
  lastReview: string;
  kycStatus: 'valid' | 'warning' | 'expired';
  nextAction: string;
}

const FAMILIES: Family[] = [
  {
    id: '1', name: 'Famille Rothenberg', code: 'ROTH-001', initials: 'RO',
    status: 'active', riskProfile: 'Dynamique', totalAum: 245_000_000,
    ytdPerf: 8.2, partnerInitials: 'AC', partnerName: 'A. Chaouchi',
    entityCount: 12, fundCount: 18, listedCount: 45,
    lastReview: '2026-02-15', kycStatus: 'warning',
    nextAction: 'Renouvellement KYC Holding — 30 mars'
  },
  {
    id: '2', name: 'Famille Al-Rashid', code: 'ALRA-002', initials: 'AR',
    status: 'active', riskProfile: 'Offensif', totalAum: 420_000_000,
    ytdPerf: 11.4, partnerInitials: 'ML', partnerName: 'M. Levy',
    entityCount: 8, fundCount: 24, listedCount: 32,
    lastReview: '2026-01-20', kycStatus: 'valid',
    nextAction: 'Comite investissement Q2 — 10 avril'
  },
  {
    id: '3', name: 'Famille Chen', code: 'CHEN-003', initials: 'CH',
    status: 'active', riskProfile: 'Equilibre', totalAum: 180_000_000,
    ytdPerf: 5.7, partnerInitials: 'AC', partnerName: 'A. Chaouchi',
    entityCount: 5, fundCount: 12, listedCount: 28,
    lastReview: '2025-12-10', kycStatus: 'expired',
    nextAction: 'CNI expiree Mme Li Chen — URGENT'
  },
  {
    id: '4', name: 'Famille Dubois', code: 'DUBO-004', initials: 'DU',
    status: 'active', riskProfile: 'Conservateur', totalAum: 95_000_000,
    ytdPerf: 3.9, partnerInitials: 'SB', partnerName: 'S. Bouzid',
    entityCount: 4, fundCount: 8, listedCount: 15,
    lastReview: '2026-03-01', kycStatus: 'valid',
    nextAction: 'Distribution SCI Dubois Immo — 22 mars'
  },
  {
    id: '5', name: 'Famille Van der Berg', code: 'VDBE-005', initials: 'VB',
    status: 'active', riskProfile: 'Dynamique', totalAum: 310_000_000,
    ytdPerf: 7.1, partnerInitials: 'ML', partnerName: 'M. Levy',
    entityCount: 9, fundCount: 21, listedCount: 38,
    lastReview: '2026-02-28', kycStatus: 'valid',
    nextAction: 'Souscription Fonds Infra Europe — 25 mars'
  },
  {
    id: '6', name: 'Famille Moretti', code: 'MORE-006', initials: 'MO',
    status: 'active', riskProfile: 'Equilibre', totalAum: 155_000_000,
    ytdPerf: 6.3, partnerInitials: 'SB', partnerName: 'S. Bouzid',
    entityCount: 6, fundCount: 14, listedCount: 22,
    lastReview: '2026-01-15', kycStatus: 'warning',
    nextAction: 'Renouvellement mandat de gestion — 15 avril'
  },
  {
    id: '7', name: 'Famille Nakamura', code: 'NAKA-007', initials: 'NK',
    status: 'onboarding', riskProfile: 'Dynamique', totalAum: 75_000_000,
    ytdPerf: 0, partnerInitials: 'AC', partnerName: 'A. Chaouchi',
    entityCount: 3, fundCount: 0, listedCount: 0,
    lastReview: '2026-03-10', kycStatus: 'valid',
    nextAction: 'Finalisation onboarding — en cours'
  },
  {
    id: '8', name: 'Famille Petrov', code: 'PETR-008', initials: 'PE',
    status: 'active', riskProfile: 'Offensif', totalAum: 520_000_000,
    ytdPerf: 9.8, partnerInitials: 'ML', partnerName: 'M. Levy',
    entityCount: 15, fundCount: 32, listedCount: 55,
    lastReview: '2026-02-20', kycStatus: 'warning',
    nextAction: 'Screening PEP — alerte a traiter'
  },
];

function formatAum(v: number): string {
  if (v >= 1e9) return `€${(v / 1e9).toFixed(1)}Md`;
  if (v >= 1e6) return `€${(v / 1e6).toFixed(0)}M`;
  return `€${(v / 1e3).toFixed(0)}k`;
}

// ══════════════════════════════════════════════

export default function Families() {
  const [search, setSearch] = useState('');
  const [filterPartner, setFilterPartner] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const pageRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.family-header', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
      gsap.fromTo('.family-search', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', delay: 0.15 });
      gsap.fromTo('.family-card', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out', delay: 0.25 });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const partners = [...new Set(FAMILIES.map(f => f.partnerName))];

  const filtered = FAMILIES.filter(f => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.code.toLowerCase().includes(search.toLowerCase());
    const matchPartner = filterPartner === 'all' || f.partnerName === filterPartner;
    const matchStatus = filterStatus === 'all' || f.status === filterStatus;
    return matchSearch && matchPartner && matchStatus;
  });

  const totalAum = FAMILIES.reduce((s, f) => s + f.totalAum, 0);
  const activeCount = FAMILIES.filter(f => f.status === 'active').length;
  const alertCount = FAMILIES.filter(f => f.kycStatus !== 'valid').length;

  return (
    <div ref={pageRef}>
      {/* Header */}
      <div className="family-header flex items-center justify-between mb-6" style={{ opacity: 0 }}>
        <div>
          <h1 className="font-display text-3xl text-navy">Familles</h1>
          <p className="text-charcoal/60 mt-1 font-body text-sm">{FAMILIES.length} familles — AUM total : {formatAum(totalAum)}</p>
        </div>
        <button className="flex items-center gap-2 bg-navy text-white px-5 py-2.5 text-sm font-bold font-body uppercase tracking-wider hover:bg-orange transition-colors cursor-pointer">
          <Plus size={16} /> Nouvelle famille
        </button>
      </div>

      {/* KPI Summary */}
      <div className="family-search grid grid-cols-4 gap-4 mb-6" style={{ opacity: 0 }}>
        <div className="bg-white border border-[#E5E7EB] p-4">
          <p className="text-[10px] font-body text-charcoal uppercase tracking-wider mb-1">AUM Total Consolide</p>
          <p className="text-2xl font-display text-navy">{formatAum(totalAum)}</p>
        </div>
        <div className="bg-white border border-[#E5E7EB] p-4">
          <p className="text-[10px] font-body text-charcoal uppercase tracking-wider mb-1">Familles Actives</p>
          <p className="text-2xl font-display text-navy">{activeCount}</p>
        </div>
        <div className="bg-white border border-[#E5E7EB] p-4">
          <p className="text-[10px] font-body text-charcoal uppercase tracking-wider mb-1">Perf. Moyenne YTD</p>
          <p className="text-2xl font-display text-[#16A34A]">+{(FAMILIES.filter(f => f.ytdPerf > 0).reduce((s, f) => s + f.ytdPerf, 0) / activeCount).toFixed(1)}%</p>
        </div>
        <div className="bg-white border border-[#E5E7EB] p-4">
          <p className="text-[10px] font-body text-charcoal uppercase tracking-wider mb-1">Alertes Compliance</p>
          <p className="text-2xl font-display text-orange">{alertCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="family-search flex items-center gap-4 mb-6 bg-white border border-[#E5E7EB] p-4" style={{ opacity: 0 }}>
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/30" />
          <input
            type="text"
            placeholder="Rechercher une famille..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-transparent border border-[#D1D5DB] text-sm font-body outline-none focus:border-navy"
          />
        </div>
        <select
          value={filterPartner}
          onChange={e => setFilterPartner(e.target.value)}
          className="border border-[#D1D5DB] px-3 py-2 text-sm font-body text-navy focus:border-navy outline-none cursor-pointer"
        >
          <option value="all">Tous les Partners</option>
          {partners.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="border border-[#D1D5DB] px-3 py-2 text-sm font-body text-navy focus:border-navy outline-none cursor-pointer"
        >
          <option value="all">Tous les statuts</option>
          <option value="active">Active</option>
          <option value="onboarding">Onboarding</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Family Cards */}
      <div className="grid gap-3">
        {filtered.map((f) => (
          <div
            key={f.id}
            onClick={() => navigate('/client-detail')}
            className="family-card bg-white border border-[#E5E7EB] p-5 flex items-center justify-between hover:border-navy/20 hover:shadow-[0_2px_8px_rgba(0,0,70,0.08)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
            style={{ opacity: 0 }}
          >
            {/* Left */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-navy text-white flex items-center justify-center font-display font-bold text-sm">
                {f.initials}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-display font-bold text-navy group-hover:text-orange transition-colors">{f.name}</h3>
                  <span className={`text-[9px] font-bold font-body px-2 py-0.5 uppercase tracking-wider ${
                    f.status === 'active' ? 'bg-sage text-[#16A34A]' :
                    f.status === 'onboarding' ? 'bg-cream text-[#B45309]' :
                    'bg-[#F7F7F9] text-charcoal/50'
                  }`}>{f.status === 'active' ? 'ACTIF' : f.status === 'onboarding' ? 'ONBOARDING' : 'INACTIF'}</span>
                  {f.kycStatus !== 'valid' && (
                    <span className={`text-[9px] font-bold font-body px-2 py-0.5 uppercase tracking-wider ${
                      f.kycStatus === 'expired' ? 'bg-[#FEE2E2] text-red' : 'bg-cream text-[#B45309]'
                    }`}>
                      {f.kycStatus === 'expired' ? 'KYC EXPIRE' : 'KYC ATTENTION'}
                    </span>
                  )}
                </div>
                <p className="text-xs text-charcoal/50 font-body flex items-center gap-3">
                  <span>{f.code}</span>
                  <span className="text-charcoal/30">|</span>
                  <span>Profil {f.riskProfile}</span>
                  <span className="text-charcoal/30">|</span>
                  <span>{f.entityCount} entites — {f.fundCount} fonds — {f.listedCount} lignes cotees</span>
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-6">
              {/* Partner */}
              <div className="text-center">
                <div className="w-7 h-7 bg-[#F7F7F9] border border-[#E5E7EB] flex items-center justify-center text-[10px] font-bold font-body text-navy mx-auto mb-1">
                  {f.partnerInitials}
                </div>
                <p className="text-[10px] text-charcoal/50 font-body">{f.partnerName}</p>
              </div>

              {/* AUM */}
              <div className="text-right min-w-[90px]">
                <p className="text-lg font-display text-navy">{formatAum(f.totalAum)}</p>
                <div className="flex items-center justify-end gap-1">
                  {f.ytdPerf > 0 ? (
                    <TrendingUp size={12} className="text-[#16A34A]" />
                  ) : f.ytdPerf < 0 ? (
                    <TrendingDown size={12} className="text-red" />
                  ) : null}
                  <span className={`text-xs font-body font-bold ${f.ytdPerf > 0 ? 'text-[#16A34A]' : f.ytdPerf < 0 ? 'text-red' : 'text-charcoal/50'}`}>
                    {f.ytdPerf > 0 ? '+' : ''}{f.ytdPerf}% YTD
                  </span>
                </div>
              </div>

              {/* Next action */}
              <div className="min-w-[200px] max-w-[250px]">
                <div className="flex items-start gap-2 p-2 bg-[#F7F7F9]">
                  {f.kycStatus === 'expired' ? (
                    <AlertTriangle size={14} className="text-red shrink-0 mt-0.5" />
                  ) : f.kycStatus === 'warning' ? (
                    <Shield size={14} className="text-[#B45309] shrink-0 mt-0.5" />
                  ) : (
                    <Eye size={14} className="text-navy shrink-0 mt-0.5" />
                  )}
                  <p className="text-[11px] font-body text-charcoal leading-tight">{f.nextAction}</p>
                </div>
              </div>

              <ChevronRight size={16} className="text-charcoal/20 group-hover:text-orange transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
