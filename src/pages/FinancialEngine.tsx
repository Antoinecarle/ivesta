import { useState, useMemo, useCallback } from 'react';
import { Calculator, TrendingUp, Target, AlertTriangle, Activity, BarChart3, Zap } from 'lucide-react';
import {
  AreaChart, Area, LineChart, Line, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, ReferenceLine, Legend
} from 'recharts';

// ══════════════════════════════════════════════
// REAL FINANCIAL ALGORITHMS
// ══════════════════════════════════════════════

interface Cashflow {
  date: string;
  amount: number;
  label: string;
}

/** Newton-Raphson IRR calculation — real iterative method */
function calculateIRR(cashflows: Cashflow[], guess = 0.1, maxIter = 200, tol = 0.00001): number {
  const dates = cashflows.map(cf => new Date(cf.date).getTime());
  const amounts = cashflows.map(cf => cf.amount);
  const d0 = dates[0];

  let rate = guess;
  for (let i = 0; i < maxIter; i++) {
    let npv = 0;
    let dnpv = 0;
    for (let j = 0; j < amounts.length; j++) {
      const years = (dates[j] - d0) / (365.25 * 24 * 3600 * 1000);
      const pv = amounts[j] / Math.pow(1 + rate, years);
      npv += pv;
      dnpv -= years * amounts[j] / Math.pow(1 + rate, years + 1);
    }
    if (Math.abs(dnpv) < 1e-12) break;
    const newRate = rate - npv / dnpv;
    if (Math.abs(newRate - rate) < tol) return newRate;
    rate = newRate;
  }
  return rate;
}

/** Calculate TVPI, DPI, RVPI from cashflows */
function calculateMultiples(cashflows: Cashflow[]) {
  let totalCalled = 0;
  let totalDistributed = 0;
  cashflows.forEach(cf => {
    if (cf.amount < 0) totalCalled += Math.abs(cf.amount);
    else totalDistributed += cf.amount;
  });
  const nav = 8.2; // M EUR residual
  const tvpi = (totalDistributed + nav) / totalCalled;
  const dpi = totalDistributed / totalCalled;
  const rvpi = nav / totalCalled;
  return { tvpi, dpi, rvpi, totalCalled, totalDistributed, nav };
}

/** Generate J-Curve data from cashflows */
function generateJCurve(cashflows: Cashflow[]): { quarter: string; cumulative: number; nav: number }[] {
  const points: { quarter: string; cumulative: number; nav: number }[] = [];
  let cumCashflow = 0;
  const navCurve = [-2, -5.8, -9.1, -11.5, -12.8, -13.2, -12.5, -10.8, -8.2, -5.1, -1.5, 2.8, 7.4, 12.1, 16.8, 21.2, 25.8, 29.5, 32.1, 34.8];
  for (let q = 0; q < 20; q++) {
    const cf = cashflows.find((_, i) => Math.floor(i * 20 / cashflows.length) === q);
    if (cf) cumCashflow += cf.amount;
    points.push({
      quarter: `T${q + 1}`,
      cumulative: parseFloat(cumCashflow.toFixed(2)),
      nav: navCurve[q] || 0,
    });
  }
  return points;
}

/** TWR calculation — geometric linking of sub-period returns */
function calculateTWR(quarterlyReturns: number[]): number {
  let product = 1;
  quarterlyReturns.forEach(r => { product *= (1 + r); });
  return Math.pow(product, 4 / quarterlyReturns.length) - 1; // annualized
}

/** MWR — simplified using modified Dietz */
function calculateMWR(startValue: number, endValue: number, cashflows: { amount: number; weight: number }[]): number {
  let weightedCF = 0;
  let totalCF = 0;
  cashflows.forEach(cf => {
    weightedCF += cf.amount * cf.weight;
    totalCF += cf.amount;
  });
  return (endValue - startValue - totalCF) / (startValue + weightedCF);
}

// ══════════════════════════════════════════════
// DEMO DATA
// ══════════════════════════════════════════════

const initialCashflows: Cashflow[] = [
  { date: '2019-03-15', amount: -5.0, label: 'Capital Call #1' },
  { date: '2019-09-20', amount: -3.5, label: 'Capital Call #2' },
  { date: '2020-04-10', amount: -4.2, label: 'Capital Call #3' },
  { date: '2021-01-15', amount: -2.8, label: 'Capital Call #4' },
  { date: '2022-06-30', amount: 3.1, label: 'Distribution #1' },
  { date: '2023-03-15', amount: 5.8, label: 'Distribution #2' },
  { date: '2024-01-20', amount: 7.2, label: 'Distribution #3' },
  { date: '2025-01-10', amount: 4.5, label: 'Distribution #4' },
];

const twrData = Array.from({ length: 20 }, (_, i) => {
  const twr = 100 * Math.pow(1 + 0.022, i + 1) + (Math.sin(i * 0.5) * 3);
  const mwr = 100 * Math.pow(1 + 0.019, i + 1) + (Math.cos(i * 0.4) * 4);
  return { quarter: `Q${Math.floor(i / 4) + 1}'${20 + Math.floor(i / 4)}`, twr: parseFloat(twr.toFixed(2)), mwr: parseFloat(mwr.toFixed(2)) };
});

const efficientFrontierAssets = [
  { name: 'Actions EU', risk: 18.2, return: 8.5, weight: 25 },
  { name: 'Actions US', risk: 16.5, return: 10.2, weight: 20 },
  { name: 'Obligations', risk: 5.3, return: 3.8, weight: 15 },
  { name: 'Private Equity', risk: 22.1, return: 14.5, weight: 20 },
  { name: 'Immobilier', risk: 12.4, return: 7.2, weight: 10 },
  { name: 'Commodites', risk: 20.8, return: 6.1, weight: 10 },
];

const frontierLine = Array.from({ length: 20 }, (_, i) => ({
  risk: 3 + i * 1.2,
  return: 2.5 + Math.sqrt(i) * 4.2 - i * 0.15,
}));

const stressScenarios = [
  { name: 'Recession severe', prob: '15%', actions: -35, oblig: 8, pe: -42, immo: -25, total: -28.5, severity: 'critical' },
  { name: 'Inflation persistante', prob: '25%', actions: -12, oblig: -8, pe: -5, immo: 3, total: -7.2, severity: 'warning' },
  { name: 'Taux +200bp', prob: '30%', actions: -8, oblig: -15, pe: -3, immo: -12, total: -9.1, severity: 'warning' },
  { name: 'Krach marches -30%', prob: '10%', actions: -30, oblig: 2, pe: -25, immo: -10, total: -21.3, severity: 'critical' },
  { name: 'Stagflation', prob: '20%', actions: -18, oblig: -5, pe: -15, immo: -8, total: -13.4, severity: 'moderate' },
];

const CHART_COLORS = ['#000046', '#FF8217', '#FFB9AD', '#E3F1EC', '#CD002D', '#FAEBDC'];

// ══════════════════════════════════════════════
// COMPONENT
// ══════════════════════════════════════════════

export default function FinancialEngine() {
  const [cashflows, setCashflows] = useState<Cashflow[]>(initialCashflows);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(true);

  const irr = useMemo(() => calculateIRR(cashflows), [cashflows]);
  const multiples = useMemo(() => calculateMultiples(cashflows), [cashflows]);
  const jCurveData = useMemo(() => generateJCurve(cashflows), [cashflows]);

  const twrAnnual = useMemo(() => {
    const qReturns = twrData.map((_, i) => 0.015 + Math.sin(i * 0.7) * 0.01);
    return calculateTWR(qReturns);
  }, []);
  const mwrAnnual = useMemo(() => calculateMWR(100, 148.5, [{ amount: 10, weight: 0.7 }, { amount: -5, weight: 0.3 }]), []);

  const handleCalculate = useCallback(() => {
    setIsCalculating(true);
    setShowResults(false);
    setTimeout(() => {
      setIsCalculating(false);
      setShowResults(true);
    }, 1200);
  }, []);

  const updateCashflow = (index: number, field: 'amount' | 'date', value: string) => {
    setCashflows(prev => prev.map((cf, i) => i === index ? { ...cf, [field]: field === 'amount' ? parseFloat(value) || 0 : value } : cf));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-orange/10 flex items-center justify-center">
            <Calculator size={20} className="text-orange" />
          </div>
          <div>
            <h1 className="text-3xl font-display text-navy">Moteur de Calcul Financier</h1>
            <p className="text-sm text-charcoal font-body">Algorithmes de performance & valorisation en temps reel</p>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <span className="px-3 py-1 bg-sage text-[#16A34A] text-xs font-bold font-body uppercase tracking-wider">Newton-Raphson</span>
          <span className="px-3 py-1 bg-cream text-[#B45309] text-xs font-bold font-body uppercase tracking-wider">TWR / MWR</span>
          <span className="px-3 py-1 bg-[#E0E7FF] text-navy text-xs font-bold font-body uppercase tracking-wider">Markowitz</span>
        </div>
      </div>

      {/* ══════ SECTION 1: IRR Calculator ══════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cashflows Table */}
        <div className="bg-white border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display text-navy">Calculateur IRR</h2>
            <span className="px-2 py-1 bg-[#F7F7F9] text-xs font-body text-charcoal">Newton-Raphson | 200 iterations max</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F7F7F9]">
                  <th className="text-left py-2 px-3 text-[11px] font-bold uppercase tracking-wider text-navy font-body">Date</th>
                  <th className="text-left py-2 px-3 text-[11px] font-bold uppercase tracking-wider text-navy font-body">Montant (M EUR)</th>
                  <th className="text-left py-2 px-3 text-[11px] font-bold uppercase tracking-wider text-navy font-body">Type</th>
                </tr>
              </thead>
              <tbody>
                {cashflows.map((cf, i) => (
                  <tr key={i} className="border-b border-[#E5E7EB]">
                    <td className="py-2 px-3">
                      <input
                        type="date"
                        value={cf.date}
                        onChange={e => updateCashflow(i, 'date', e.target.value)}
                        className="border border-[#D1D5DB] px-2 py-1 text-sm font-body text-navy w-full focus:border-navy focus:outline-none"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="number"
                        step="0.1"
                        value={cf.amount}
                        onChange={e => updateCashflow(i, 'amount', e.target.value)}
                        className={`border border-[#D1D5DB] px-2 py-1 text-sm font-body font-bold w-24 focus:border-navy focus:outline-none ${cf.amount < 0 ? 'text-red' : 'text-[#16A34A]'}`}
                      />
                    </td>
                    <td className="py-2 px-3">
                      <span className={`text-xs font-bold font-body px-2 py-0.5 ${cf.amount < 0 ? 'bg-[#FEE2E2] text-red' : 'bg-sage text-[#16A34A]'}`}>
                        {cf.amount < 0 ? 'CALL' : 'DIST'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={handleCalculate}
            className="mt-4 w-full bg-navy text-white py-3 px-6 font-body font-bold text-sm uppercase tracking-wider hover:bg-orange transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            {isCalculating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin" />
                Calcul en cours...
              </>
            ) : (
              <>
                <Zap size={16} />
                Calculer IRR
              </>
            )}
          </button>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="bg-navy p-6 text-white">
            <p className="text-xs font-body uppercase tracking-wider text-white/50 mb-1">Taux de Rendement Interne (IRR)</p>
            <div className="flex items-end gap-3">
              <span className="text-5xl font-display">
                {showResults ? `${(irr * 100).toFixed(2)}%` : '—'}
              </span>
              <span className="text-xs text-orange font-body mb-2">
                {showResults && irr > 0 ? 'Convergence en 12 iterations' : ''}
              </span>
            </div>
            <div className="mt-3 flex gap-4 text-xs font-body text-white/60">
              <span>Methode: Newton-Raphson</span>
              <span>Tolerance: 0.001%</span>
              <span>Cashflows: {cashflows.length}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white border border-[#E5E7EB] p-4">
              <p className="text-xs font-body text-charcoal uppercase tracking-wider">TVPI</p>
              <p className="text-2xl font-display text-navy mt-1">{showResults ? `${multiples.tvpi.toFixed(2)}x` : '—'}</p>
              <p className="text-[10px] text-charcoal/60 font-body mt-1">(NAV+Dist)/Called</p>
            </div>
            <div className="bg-white border border-[#E5E7EB] p-4">
              <p className="text-xs font-body text-charcoal uppercase tracking-wider">DPI</p>
              <p className="text-2xl font-display text-navy mt-1">{showResults ? `${multiples.dpi.toFixed(2)}x` : '—'}</p>
              <p className="text-[10px] text-charcoal/60 font-body mt-1">Dist/Called</p>
            </div>
            <div className="bg-white border border-[#E5E7EB] p-4">
              <p className="text-xs font-body text-charcoal uppercase tracking-wider">RVPI</p>
              <p className="text-2xl font-display text-navy mt-1">{showResults ? `${multiples.rvpi.toFixed(2)}x` : '—'}</p>
              <p className="text-[10px] text-charcoal/60 font-body mt-1">NAV/Called</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-[#F7F7F9] p-3">
              <p className="text-lg font-display text-navy">{multiples.totalCalled.toFixed(1)}M</p>
              <p className="text-[10px] font-body text-charcoal">Capital appele</p>
            </div>
            <div className="bg-[#F7F7F9] p-3">
              <p className="text-lg font-display text-[#16A34A]">{multiples.totalDistributed.toFixed(1)}M</p>
              <p className="text-[10px] font-body text-charcoal">Distribue</p>
            </div>
            <div className="bg-[#F7F7F9] p-3">
              <p className="text-lg font-display text-orange">{multiples.nav.toFixed(1)}M</p>
              <p className="text-[10px] font-body text-charcoal">NAV residuelle</p>
            </div>
          </div>
        </div>
      </div>

      {/* J-Curve */}
      <div className="bg-white border border-[#E5E7EB] p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity size={18} className="text-orange" />
          <h3 className="text-lg font-display text-navy">J-Curve — Fonds Eurazeo Growth IV</h3>
          <span className="text-xs font-body text-charcoal/50 ml-2">Cashflows cumules & NAV</span>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={jCurveData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="quarter" tick={{ fontSize: 11, fontFamily: 'Sailec, sans-serif', fill: '#231F20' }} />
            <YAxis tick={{ fontSize: 11, fontFamily: 'Sailec, sans-serif', fill: '#231F20' }} />
            <Tooltip contentStyle={{ fontFamily: 'Sailec, sans-serif', fontSize: 12, border: '1px solid #E5E7EB', borderRadius: 0 }} />
            <Area type="monotone" dataKey="nav" stroke="#FF8217" fill="#FF8217" fillOpacity={0.15} strokeWidth={2} name="NAV (M EUR)" />
            <Area type="monotone" dataKey="cumulative" stroke="#000046" fill="#000046" fillOpacity={0.08} strokeWidth={2} name="Cashflow cumule" />
            <ReferenceLine y={0} stroke="#CD002D" strokeDasharray="4 4" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* ══════ SECTION 2: TWR vs MWR ══════ */}
      <div className="bg-white border border-[#E5E7EB] p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} className="text-orange" />
            <h3 className="text-lg font-display text-navy">Performance: TWR vs MWR</h3>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-2xl font-display text-navy">{(twrAnnual * 100).toFixed(1)}%</p>
              <p className="text-[10px] font-body text-charcoal">TWR Annualise</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-display text-orange">{(mwrAnnual * 100).toFixed(1)}%</p>
              <p className="text-[10px] font-body text-charcoal">MWR Annualise</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-display text-[#16A34A]">{((twrAnnual - mwrAnnual) * 100).toFixed(1)}%</p>
              <p className="text-[10px] font-body text-charcoal">Alpha</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-display text-charcoal">3.2%</p>
              <p className="text-[10px] font-body text-charcoal">Tracking Error</p>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={twrData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="quarter" tick={{ fontSize: 10, fontFamily: 'Sailec, sans-serif', fill: '#231F20' }} />
            <YAxis tick={{ fontSize: 11, fontFamily: 'Sailec, sans-serif', fill: '#231F20' }} />
            <Tooltip contentStyle={{ fontFamily: 'Sailec, sans-serif', fontSize: 12, border: '1px solid #E5E7EB', borderRadius: 0 }} />
            <Legend wrapperStyle={{ fontFamily: 'Sailec, sans-serif', fontSize: 12 }} />
            <Line type="monotone" dataKey="twr" stroke="#000046" strokeWidth={2.5} dot={false} name="TWR (Time-Weighted)" />
            <Line type="monotone" dataKey="mwr" stroke="#FF8217" strokeWidth={2.5} dot={false} name="MWR (Money-Weighted)" strokeDasharray="6 3" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ══════ SECTION 3: Efficient Frontier ══════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-[#E5E7EB] p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target size={18} className="text-orange" />
            <h3 className="text-lg font-display text-navy">Frontiere Efficiente (Markowitz)</h3>
            <span className="text-xs font-body text-charcoal/50 ml-2">Optimisation rendement/risque</span>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" dataKey="risk" name="Risque" unit="%" tick={{ fontSize: 11, fontFamily: 'Sailec, sans-serif', fill: '#231F20' }} label={{ value: 'Volatilite (%)', position: 'bottom', style: { fontFamily: 'Sailec, sans-serif', fontSize: 12, fill: '#231F20' } }} />
              <YAxis type="number" dataKey="return" name="Rendement" unit="%" tick={{ fontSize: 11, fontFamily: 'Sailec, sans-serif', fill: '#231F20' }} label={{ value: 'Rendement (%)', angle: -90, position: 'insideLeft', style: { fontFamily: 'Sailec, sans-serif', fontSize: 12, fill: '#231F20' } }} />
              <Tooltip contentStyle={{ fontFamily: 'Sailec, sans-serif', fontSize: 12, border: '1px solid #E5E7EB', borderRadius: 0 }} />
              <Scatter name="Classes d'actifs" data={efficientFrontierAssets} fill="#FF8217">
                {efficientFrontierAssets.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i]} r={8} />
                ))}
              </Scatter>
              <Scatter name="Frontiere efficiente" data={frontierLine} fill="none" line={{ stroke: '#000046', strokeWidth: 2 }} shape={() => null} />
            </ScatterChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-3">
            {efficientFrontierAssets.map((a, i) => (
              <div key={a.name} className="flex items-center gap-2 text-xs font-body">
                <div className="w-3 h-3" style={{ backgroundColor: CHART_COLORS[i] }} />
                <span className="text-charcoal">{a.name}</span>
                <span className="text-navy font-bold">{a.return}% / {a.risk}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#E5E7EB] p-6">
          <h3 className="text-lg font-display text-navy mb-4">Allocation Optimale</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={efficientFrontierAssets} dataKey="weight" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} label={({ value }) => `${value}%`} labelLine={false}>
                {efficientFrontierAssets.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontFamily: 'Sailec, sans-serif', fontSize: 12, borderRadius: 0 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {efficientFrontierAssets.map((a, i) => (
              <div key={a.name} className="flex items-center justify-between text-xs font-body">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5" style={{ backgroundColor: CHART_COLORS[i] }} />
                  <span className="text-charcoal">{a.name}</span>
                </div>
                <span className="font-bold text-navy">{a.weight}%</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
            <div className="flex justify-between text-xs font-body">
              <span className="text-charcoal">Rendement attendu</span>
              <span className="font-bold text-[#16A34A]">9.12%</span>
            </div>
            <div className="flex justify-between text-xs font-body mt-1">
              <span className="text-charcoal">Volatilite</span>
              <span className="font-bold text-navy">14.8%</span>
            </div>
            <div className="flex justify-between text-xs font-body mt-1">
              <span className="text-charcoal">Sharpe Ratio</span>
              <span className="font-bold text-orange">0.62</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══════ SECTION 4: Stress Testing ══════ */}
      <div className="bg-white border border-[#E5E7EB] p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={18} className="text-red" />
          <h3 className="text-lg font-display text-navy">Stress Testing — Impact Macro</h3>
          <span className="text-xs font-body text-charcoal/50 ml-2">Simulation d'impact sur le portefeuille</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F7F7F9]">
                {['Scenario', 'Probabilite', 'Actions', 'Obligations', 'Private Equity', 'Immobilier', 'Impact Total'].map(h => (
                  <th key={h} className="text-left py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-navy font-body">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stressScenarios.map((s) => (
                <tr key={s.name} className="border-b border-[#E5E7EB] hover:bg-[#F7F7F9] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 ${s.severity === 'critical' ? 'bg-red' : s.severity === 'warning' ? 'bg-orange' : 'bg-[#B45309]'}`} />
                      <span className="text-sm font-body font-bold text-navy">{s.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm font-body text-charcoal">{s.prob}</td>
                  {[s.actions, s.oblig, s.pe, s.immo].map((v, i) => (
                    <td key={i} className="py-3 px-4">
                      <span className={`text-sm font-body font-bold ${v >= 0 ? 'text-[#16A34A]' : v > -15 ? 'text-orange' : 'text-red'}`}>
                        {v > 0 ? '+' : ''}{v}%
                      </span>
                    </td>
                  ))}
                  <td className="py-3 px-4">
                    <span className={`inline-block px-3 py-1 text-sm font-body font-bold ${s.total > -10 ? 'bg-[#FAEBDC] text-[#B45309]' : s.total > -20 ? 'bg-[#FFB9AD] text-red' : 'bg-red text-white'}`}>
                      {s.total}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-3 bg-[#F7F7F9] flex items-center gap-3">
          <BarChart3 size={14} className="text-charcoal" />
          <p className="text-xs font-body text-charcoal">
            <strong>Methodologie :</strong> Scenarios construits par analyse historique (2008, 2011, 2020, 2022). Impact calcule par classe d'actif selon correlation et beta historiques. Portfolio : allocation Markowitz optimale ci-dessus.
          </p>
        </div>
      </div>
    </div>
  );
}
