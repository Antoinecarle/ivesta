import { useState, useEffect, useCallback } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Clock, Users, FileWarning, Scan, Activity, ChevronRight } from 'lucide-react';

// ══════════════════════════════════════════════
// COMPLIANCE SCORING ALGORITHM
// ══════════════════════════════════════════════

interface ComplianceCriteria {
  identity: number;    // 0-100
  address: number;     // 0-100
  tax: number;         // 0-100
  pep: number;         // 0-100
  transactions: number;// 0-100
}

const WEIGHTS = { identity: 0.25, address: 0.15, tax: 0.20, pep: 0.25, transactions: 0.15 };

/** Calculate weighted risk score */
function calculateRiskScore(criteria: ComplianceCriteria): number {
  return Math.round(
    criteria.identity * WEIGHTS.identity +
    criteria.address * WEIGHTS.address +
    criteria.tax * WEIGHTS.tax +
    criteria.pep * WEIGHTS.pep +
    criteria.transactions * WEIGHTS.transactions
  );
}

function getRiskLevel(score: number): { label: string; color: string; bg: string } {
  if (score >= 80) return { label: 'Faible Risque', color: 'text-[#16A34A]', bg: 'bg-sage' };
  if (score >= 60) return { label: 'Risque Modere', color: 'text-[#B45309]', bg: 'bg-cream' };
  return { label: 'Risque Eleve', color: 'text-red', bg: 'bg-[#FEE2E2]' };
}

// ══════════════════════════════════════════════
// DEMO DATA
// ══════════════════════════════════════════════

interface FamilyCompliance {
  name: string;
  criteria: ComplianceCriteria;
  initials: string;
}

const families: FamilyCompliance[] = [
  { name: 'Famille Rothenberg', initials: 'RO', criteria: { identity: 100, address: 85, tax: 95, pep: 80, transactions: 100 } },
  { name: 'Famille Al-Rashid', initials: 'AR', criteria: { identity: 90, address: 70, tax: 80, pep: 30, transactions: 65 } },
  { name: 'Famille Chen', initials: 'CH', criteria: { identity: 40, address: 30, tax: 55, pep: 50, transactions: 60 } },
  { name: 'Famille Dubois', initials: 'DU', criteria: { identity: 100, address: 90, tax: 85, pep: 85, transactions: 80 } },
];

interface ScanStep {
  label: string;
  status: 'pending' | 'running' | 'ok' | 'warning' | 'alert';
  detail: string;
}

const initialScanSteps: ScanStep[] = [
  { label: 'Verification des pieces d\'identite', status: 'pending', detail: '' },
  { label: 'Analyse des justificatifs de domicile', status: 'pending', detail: '' },
  { label: 'Controle des mandats de gestion', status: 'pending', detail: '' },
  { label: 'Screening PEP / Sanctions internationales', status: 'pending', detail: '' },
  { label: 'Verification fiscale (residence + declarations)', status: 'pending', detail: '' },
  { label: 'Analyse des transactions inhabituelles', status: 'pending', detail: '' },
  { label: 'Calcul du score de risque global', status: 'pending', detail: '' },
];

const scanResults: { status: ScanStep['status']; detail: string }[] = [
  { status: 'ok', detail: '112 CNI verifiees — 3 expirees' },
  { status: 'warning', detail: '2 justificatifs expires (> 3 mois)' },
  { status: 'ok', detail: 'Tous les mandats a jour' },
  { status: 'alert', detail: '1 alerte PEP detectee (lien familial)' },
  { status: 'ok', detail: 'Residences fiscales conformes' },
  { status: 'warning', detail: '1 transaction inhabituelle (350k EUR)' },
  { status: 'ok', detail: 'Score moyen: 78/100 — 3 familles sous surveillance' },
];

const alerts = [
  { time: '14:32', severity: 'critical' as const, text: 'CNI expiree — M. Hans Rothenberg (expire il y a 12 jours)', family: 'Rothenberg' },
  { time: '14:28', severity: 'critical' as const, text: 'Screening PEP positif — Mme Fatima Al-Rashid (lien familial 2nd degre)', family: 'Al-Rashid' },
  { time: '14:15', severity: 'warning' as const, text: 'Transaction inhabituelle — SCI Dubois Immo (350k EUR virement sortant)', family: 'Dubois' },
  { time: '13:47', severity: 'warning' as const, text: 'Justificatif domicile > 3 mois — Famille Chen (dernier: 15/11/2025)', family: 'Chen' },
  { time: '13:22', severity: 'info' as const, text: 'Mandat de gestion renouvele — Holding Rothenberg SAS', family: 'Rothenberg' },
  { time: '12:58', severity: 'warning' as const, text: 'Declaration fiscale manquante — M. Wei Chen (annee 2025)', family: 'Chen' },
  { time: '11:45', severity: 'info' as const, text: 'KYC complet valide — Famille Dubois (renouvellement annuel)', family: 'Dubois' },
  { time: '10:30', severity: 'critical' as const, text: 'CNI expiree — Mme Li Chen (expire il y a 45 jours)', family: 'Chen' },
];

const complianceMatrix = [
  { family: 'Rothenberg', cni: { status: 'expired', days: -12 }, domicile: { status: 'valid', days: 67 }, fiscal: { status: 'valid', days: 180 }, mandat: { status: 'valid', days: 245 }, pep: { status: 'valid', days: null }, lcbft: { status: 'valid', days: null } },
  { family: 'Al-Rashid', cni: { status: 'valid', days: 340 }, domicile: { status: 'valid', days: 45 }, fiscal: { status: 'valid', days: 120 }, mandat: { status: 'valid', days: 189 }, pep: { status: 'alert', days: null }, lcbft: { status: 'valid', days: null } },
  { family: 'Chen', cni: { status: 'expired', days: -45 }, domicile: { status: 'expired', days: -15 }, fiscal: { status: 'warning', days: 12 }, mandat: { status: 'valid', days: 156 }, pep: { status: 'valid', days: null }, lcbft: { status: 'warning', days: null } },
  { family: 'Dubois', cni: { status: 'valid', days: 210 }, domicile: { status: 'valid', days: 55 }, fiscal: { status: 'valid', days: 245 }, mandat: { status: 'valid', days: 312 }, pep: { status: 'valid', days: null }, lcbft: { status: 'warning', days: null } },
  { family: 'Van der Berg', cni: { status: 'valid', days: 180 }, domicile: { status: 'warning', days: 8 }, fiscal: { status: 'valid', days: 90 }, mandat: { status: 'valid', days: 278 }, pep: { status: 'valid', days: null }, lcbft: { status: 'valid', days: null } },
  { family: 'Moretti', cni: { status: 'valid', days: 450 }, domicile: { status: 'valid', days: 72 }, fiscal: { status: 'valid', days: 200 }, mandat: { status: 'warning', days: 15 }, pep: { status: 'valid', days: null }, lcbft: { status: 'valid', days: null } },
  { family: 'Nakamura', cni: { status: 'valid', days: 120 }, domicile: { status: 'valid', days: 30 }, fiscal: { status: 'valid', days: 300 }, mandat: { status: 'valid', days: 190 }, pep: { status: 'valid', days: null }, lcbft: { status: 'valid', days: null } },
  { family: 'Petrov', cni: { status: 'warning', days: 22 }, domicile: { status: 'valid', days: 60 }, fiscal: { status: 'warning', days: 18 }, mandat: { status: 'valid', days: 145 }, pep: { status: 'alert', days: null }, lcbft: { status: 'warning', days: null } },
];

function MatrixCell({ status, days }: { status: string; days: number | null }) {
  const bg = status === 'valid' ? 'bg-sage' : status === 'warning' ? 'bg-cream' : status === 'expired' ? 'bg-[#FEE2E2]' : 'bg-[#FEE2E2]';
  const text = status === 'valid' ? 'text-[#16A34A]' : status === 'warning' ? 'text-[#B45309]' : 'text-red';
  const icon = status === 'valid' ? <CheckCircle size={12} /> : status === 'warning' ? <Clock size={12} /> : <XCircle size={12} />;
  return (
    <td className={`py-2 px-3 text-center`}>
      <div className={`inline-flex items-center gap-1 px-2 py-1 text-[10px] font-body font-bold ${bg} ${text}`}>
        {icon}
        {days !== null ? (days > 0 ? `${days}j` : `${Math.abs(days)}j`) : (status === 'alert' ? 'ALERTE' : 'OK')}
      </div>
    </td>
  );
}

// ══════════════════════════════════════════════
// COMPONENT
// ══════════════════════════════════════════════

export default function ComplianceEngine() {
  const [scanSteps, setScanSteps] = useState<ScanStep[]>(initialScanSteps);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);

  const runScan = useCallback(() => {
    setIsScanning(true);
    setScanComplete(false);
    setCurrentStep(0);
    setScanSteps(initialScanSteps.map(s => ({ ...s, status: 'pending', detail: '' })));
  }, []);

  useEffect(() => {
    if (!isScanning || currentStep < 0 || currentStep >= scanSteps.length) return;

    // Mark current as running
    setScanSteps(prev => prev.map((s, i) => i === currentStep ? { ...s, status: 'running' } : s));

    const timer = setTimeout(() => {
      const result = scanResults[currentStep];
      setScanSteps(prev => prev.map((s, i) =>
        i === currentStep ? { ...s, status: result.status, detail: result.detail } : s
      ));

      if (currentStep < scanSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsScanning(false);
        setScanComplete(true);
      }
    }, 800 + Math.random() * 400);

    return () => clearTimeout(timer);
  }, [isScanning, currentStep, scanSteps.length]);

  const kpis = [
    { label: 'Taux Conformite', value: '87.3%', icon: Shield, color: 'text-[#16A34A]' },
    { label: 'Documents Expires', value: '7', icon: FileWarning, color: 'text-red' },
    { label: 'Alertes Actives', value: '3', icon: AlertTriangle, color: 'text-orange' },
    { label: 'Prochaine Echeance', value: '8 jours', icon: Clock, color: 'text-[#B45309]' },
    { label: 'Familles Scannees', value: '112', icon: Users, color: 'text-navy' },
    { label: 'Score Moyen', value: '78/100', icon: Activity, color: 'text-orange' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-sage flex items-center justify-center">
            <Shield size={20} className="text-[#16A34A]" />
          </div>
          <div>
            <h1 className="text-3xl font-display text-navy">Moteur Compliance & KYC</h1>
            <p className="text-sm text-charcoal font-body">Scan automatise, scoring de risque & alertes en temps reel</p>
          </div>
          <span className="ml-3 px-3 py-1 bg-sage text-[#16A34A] text-xs font-bold font-body">ACPR/AMF</span>
          <span className="px-3 py-1 bg-cream text-[#B45309] text-xs font-bold font-body">RGPD</span>
          <span className="px-3 py-1 bg-[#E0E7FF] text-navy text-xs font-bold font-body">LCB-FT</span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map(kpi => (
          <div key={kpi.label} className="bg-white border border-[#E5E7EB] p-4">
            <div className="flex items-center gap-2 mb-2">
              <kpi.icon size={14} className={kpi.color} />
              <p className="text-[10px] font-body text-charcoal uppercase tracking-wider">{kpi.label}</p>
            </div>
            <p className={`text-2xl font-display text-navy`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Scanner */}
      <div className="bg-white border border-[#E5E7EB] p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Scan size={18} className="text-orange" />
            <h3 className="text-lg font-display text-navy">Scanner KYC Automatise</h3>
            {scanComplete && <span className="px-2 py-0.5 bg-sage text-[#16A34A] text-[10px] font-body font-bold">SCAN TERMINE</span>}
          </div>
          <button
            onClick={runScan}
            disabled={isScanning}
            className={`px-6 py-3 font-body font-bold text-sm uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 ${
              isScanning ? 'bg-[#F7F7F9] text-charcoal/50' : 'bg-navy text-white hover:bg-orange'
            }`}
          >
            <Scan size={16} className={isScanning ? 'animate-spin' : ''} />
            {isScanning ? 'Scan en cours...' : 'Lancer le Scan'}
          </button>
        </div>

        <div className="space-y-3">
          {scanSteps.map((step, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 transition-all duration-300 ${
              step.status === 'running' ? 'bg-cream' :
              step.status === 'ok' ? 'bg-[#F7F7F9]' :
              step.status === 'warning' ? 'bg-[#FAEBDC]/50' :
              step.status === 'alert' ? 'bg-[#FEE2E2]/50' : 'bg-white'
            }`}>
              <div className="w-6 h-6 flex items-center justify-center">
                {step.status === 'pending' && <div className="w-3 h-3 border border-[#D1D5DB]" />}
                {step.status === 'running' && <div className="w-4 h-4 border-2 border-orange/30 border-t-orange animate-spin" />}
                {step.status === 'ok' && <CheckCircle size={18} className="text-[#16A34A]" />}
                {step.status === 'warning' && <AlertTriangle size={18} className="text-[#B45309]" />}
                {step.status === 'alert' && <XCircle size={18} className="text-red" />}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-body ${step.status !== 'pending' ? 'font-bold text-navy' : 'text-charcoal/50'}`}>
                  {step.label}
                </p>
                {step.detail && (
                  <p className={`text-xs font-body mt-0.5 ${
                    step.status === 'ok' ? 'text-[#16A34A]' :
                    step.status === 'warning' ? 'text-[#B45309]' : 'text-red'
                  }`}>{step.detail}</p>
                )}
              </div>
              {step.status === 'running' && (
                <span className="text-[10px] font-body text-orange font-bold animate-pulse">ANALYSE...</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Risk Scoring */}
      <div>
        <h3 className="text-lg font-display text-navy mb-4">Score de Risque Client</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {families.map(family => {
            const score = calculateRiskScore(family.criteria);
            const risk = getRiskLevel(score);
            return (
              <div key={family.name} className="bg-white border border-[#E5E7EB] p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-navy text-white flex items-center justify-center text-xs font-bold font-body">
                    {family.initials}
                  </div>
                  <div>
                    <p className="text-sm font-body font-bold text-navy">{family.name}</p>
                    <p className={`text-xs font-body font-bold ${risk.color}`}>{risk.label}</p>
                  </div>
                </div>

                {/* Circular Score */}
                <div className="flex justify-center mb-4">
                  <div className="relative w-24 h-24">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#F7F7F9" strokeWidth="8" />
                      <circle
                        cx="50" cy="50" r="42" fill="none"
                        stroke={score >= 80 ? '#16A34A' : score >= 60 ? '#FF8217' : '#CD002D'}
                        strokeWidth="8" strokeLinecap="butt"
                        strokeDasharray={`${score * 2.64} ${264 - score * 2.64}`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-display text-navy">{score}</span>
                    </div>
                  </div>
                </div>

                {/* Sub-criteria bars */}
                <div className="space-y-2">
                  {[
                    { name: 'Identite', value: family.criteria.identity, weight: '25%' },
                    { name: 'Domicile', value: family.criteria.address, weight: '15%' },
                    { name: 'Fiscal', value: family.criteria.tax, weight: '20%' },
                    { name: 'PEP', value: family.criteria.pep, weight: '25%' },
                    { name: 'Transactions', value: family.criteria.transactions, weight: '15%' },
                  ].map(c => (
                    <div key={c.name}>
                      <div className="flex justify-between text-[10px] font-body mb-0.5">
                        <span className="text-charcoal">{c.name} <span className="text-charcoal/40">({c.weight})</span></span>
                        <span className="font-bold text-navy">{c.value}</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#F7F7F9]">
                        <div
                          className="h-full transition-all duration-500"
                          style={{
                            width: `${c.value}%`,
                            backgroundColor: c.value >= 80 ? '#16A34A' : c.value >= 60 ? '#FF8217' : '#CD002D'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-[#E5E7EB] p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={18} className="text-orange" />
            <h3 className="text-lg font-display text-navy">Alertes Automatiques</h3>
            <span className="ml-auto px-2 py-0.5 bg-red text-white text-[10px] font-body font-bold">{alerts.filter(a => a.severity === 'critical').length} CRITIQUES</span>
          </div>
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {alerts.map((alert, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 border-l-3 ${
                alert.severity === 'critical' ? 'border-l-red bg-[#FEE2E2]/30' :
                alert.severity === 'warning' ? 'border-l-orange bg-cream/30' :
                'border-l-[#16A34A] bg-sage/30'
              }`}>
                <div className="shrink-0 mt-0.5">
                  {alert.severity === 'critical' ? <XCircle size={14} className="text-red" /> :
                   alert.severity === 'warning' ? <AlertTriangle size={14} className="text-[#B45309]" /> :
                   <CheckCircle size={14} className="text-[#16A34A]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-body text-navy">{alert.text}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-body text-charcoal/50">{alert.time}</span>
                    <span className="text-[10px] font-body font-bold text-navy">{alert.family}</span>
                  </div>
                </div>
                <ChevronRight size={14} className="text-charcoal/30 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Matrix */}
        <div className="bg-white border border-[#E5E7EB] p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={18} className="text-[#16A34A]" />
            <h3 className="text-lg font-display text-navy">Matrice de Conformite</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F7F7F9]">
                  <th className="text-left py-2 px-3 text-[10px] font-bold uppercase tracking-wider text-navy font-body">Famille</th>
                  {['CNI', 'Domicile', 'Fiscal', 'Mandat', 'PEP', 'LCB-FT'].map(h => (
                    <th key={h} className="text-center py-2 px-2 text-[10px] font-bold uppercase tracking-wider text-navy font-body">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {complianceMatrix.map(row => (
                  <tr key={row.family} className="border-b border-[#E5E7EB]">
                    <td className="py-2 px-3 text-xs font-body font-bold text-navy">{row.family}</td>
                    <MatrixCell {...row.cni} />
                    <MatrixCell {...row.domicile} />
                    <MatrixCell {...row.fiscal} />
                    <MatrixCell {...row.mandat} />
                    <MatrixCell {...row.pep} />
                    <MatrixCell {...row.lcbft} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex gap-3 text-[10px] font-body">
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-sage" />A jour</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-cream" />Bientot expire</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-[#FEE2E2]" />Expire / Alerte</div>
          </div>
        </div>
      </div>

      {/* Methodology */}
      <div className="bg-navy p-6 text-white">
        <h3 className="text-lg font-display mb-3">Algorithme de Scoring</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-body text-white/70">
          <div>
            <p className="text-orange font-bold mb-1">Ponderation des Criteres</p>
            <p>Identite (25%) + PEP/Sanctions (25%) + Fiscal (20%) + Domicile (15%) + Transactions (15%) = Score /100</p>
            <p className="mt-1">Score &ge; 80 = Faible Risque | 60-79 = Modere | &lt; 60 = Eleve</p>
          </div>
          <div>
            <p className="text-orange font-bold mb-1">Automatisations</p>
            <p>Scan CRON quotidien a 06h00. Alertes email/push temps reel sur expiration CNI, domicile &gt; 3 mois, PEP positif, transactions &gt; seuil. Integration bases Dow Jones Risk & Compliance + World-Check.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
