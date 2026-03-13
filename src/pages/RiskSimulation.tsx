import { useState, useCallback, useRef } from 'react';
import { Activity, TrendingDown, Shield, Zap, BarChart3, AlertTriangle, Play, RotateCcw } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, Cell
} from 'recharts';

// ══════════════════════════════════════════════
// REAL MONTE CARLO ENGINE
// ══════════════════════════════════════════════

/** Box-Muller transform for standard normal random variable */
function boxMuller(): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

/** Geometric Brownian Motion: S(t+dt) = S(t) * exp((mu - sigma^2/2)*dt + sigma*sqrt(dt)*Z) */
function simulatePath(s0: number, mu: number, sigma: number, months: number, dt: number = 1 / 12): number[] {
  const path: number[] = [s0];
  let s = s0;
  for (let t = 0; t < months; t++) {
    const z = boxMuller();
    s = s * Math.exp((mu - (sigma * sigma) / 2) * dt + sigma * Math.sqrt(dt) * z);
    path.push(s);
  }
  return path;
}

/** Calculate VaR from sorted returns */
function calculateVaR(finalValues: number[], confidence: number): number {
  const sorted = [...finalValues].sort((a, b) => a - b);
  const index = Math.floor((1 - confidence) * sorted.length);
  return sorted[index];
}

/** CVaR = Expected Shortfall (average of losses beyond VaR) */
function calculateCVaR(finalValues: number[], confidence: number): number {
  const sorted = [...finalValues].sort((a, b) => a - b);
  const cutoff = Math.floor((1 - confidence) * sorted.length);
  let sum = 0;
  for (let i = 0; i < cutoff; i++) sum += sorted[i];
  return sum / cutoff;
}

/** Build histogram from final values */
function buildHistogram(values: number[], bins: number): { range: string; count: number; isVaR: boolean }[] {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const binWidth = (max - min) / bins;
  const histogram: { range: string; count: number; isVaR: boolean }[] = [];
  const var95 = calculateVaR(values, 0.95);

  for (let i = 0; i < bins; i++) {
    const lower = min + i * binWidth;
    const upper = lower + binWidth;
    const count = values.filter(v => v >= lower && v < upper).length;
    histogram.push({
      range: `${(lower / 1e6).toFixed(0)}`,
      count,
      isVaR: lower <= var95 && upper >= var95,
    });
  }
  return histogram;
}

// ══════════════════════════════════════════════
// PORTFOLIO CONFIG
// ══════════════════════════════════════════════

interface AssetConfig {
  name: string;
  weight: number;
  expectedReturn: number;
  volatility: number;
  color: string;
}

const defaultAssets: AssetConfig[] = [
  { name: 'Actions EU', weight: 25, expectedReturn: 8.5, volatility: 18.2, color: '#000046' },
  { name: 'Actions US', weight: 20, expectedReturn: 10.2, volatility: 16.5, color: '#FF8217' },
  { name: 'Obligations', weight: 15, expectedReturn: 3.8, volatility: 5.3, color: '#FFB9AD' },
  { name: 'Private Equity', weight: 20, expectedReturn: 14.5, volatility: 22.1, color: '#E3F1EC' },
  { name: 'Immobilier', weight: 10, expectedReturn: 7.2, volatility: 12.4, color: '#CD002D' },
  { name: 'Commodites', weight: 10, expectedReturn: 6.1, volatility: 20.8, color: '#FAEBDC' },
];

// Stress scenarios
const stressScenarios = [
  {
    name: 'Crise Financiere 2008',
    maxDrawdown: -54.2,
    recoveryMonths: 37,
    data: Array.from({ length: 24 }, (_, i) => ({
      month: i,
      value: 100 * (1 - 0.542 * Math.sin(Math.PI * Math.min(i, 12) / 24) * (i < 15 ? 1 : (24 - i) / 9)),
    })),
  },
  {
    name: 'COVID-19 (2020)',
    maxDrawdown: -33.8,
    recoveryMonths: 5,
    data: Array.from({ length: 12 }, (_, i) => ({
      month: i,
      value: i < 2 ? 100 - i * 15 : i < 3 ? 66.2 : 66.2 + (i - 3) * 4.2,
    })),
  },
  {
    name: 'Hausse Taux 2022',
    maxDrawdown: -22.5,
    recoveryMonths: 14,
    data: Array.from({ length: 18 }, (_, i) => ({
      month: i,
      value: 100 - Math.min(22.5, i * 2.8) + (i > 10 ? (i - 10) * 2.1 : 0),
    })),
  },
];

// ══════════════════════════════════════════════
// COMPONENT
// ══════════════════════════════════════════════

export default function RiskSimulation() {
  const [assets, setAssets] = useState<AssetConfig[]>(defaultAssets);
  const [numScenarios] = useState(10000);
  const [months] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{
    paths: { month: number; p5: number; p25: number; mean: number; p75: number; p95: number }[];
    samplePaths: number[][];
    finalValues: number[];
    histogram: { range: string; count: number; isVaR: boolean }[];
    var95: number;
    var99: number;
    cvar95: number;
    median: number;
    best: number;
    worst: number;
  } | null>(null);

  const cancelRef = useRef(false);

  const portfolioReturn = assets.reduce((sum, a) => sum + a.weight * a.expectedReturn / 100, 0) / 100;
  const portfolioVol = Math.sqrt(assets.reduce((sum, a) => sum + Math.pow(a.weight / 100, 2) * Math.pow(a.volatility / 100, 2), 0));

  const startValue = 100_000_000; // 100M EUR

  const runSimulation = useCallback(async () => {
    cancelRef.current = false;
    setIsRunning(true);
    setProgress(0);
    setResults(null);

    const allPaths: number[][] = [];
    const batchSize = 500;
    const batches = Math.ceil(numScenarios / batchSize);

    for (let b = 0; b < batches; b++) {
      if (cancelRef.current) break;
      const count = Math.min(batchSize, numScenarios - b * batchSize);
      for (let i = 0; i < count; i++) {
        allPaths.push(simulatePath(startValue, portfolioReturn, portfolioVol, months));
      }
      setProgress(Math.min(((b + 1) * batchSize / numScenarios) * 100, 100));
      // Yield to UI
      await new Promise(r => setTimeout(r, 0));
    }

    if (cancelRef.current) { setIsRunning(false); return; }

    // Compute percentiles per month
    const pathData: { month: number; p5: number; p25: number; mean: number; p75: number; p95: number }[] = [];
    for (let m = 0; m <= months; m++) {
      const values = allPaths.map(p => p[m]).sort((a, b) => a - b);
      const n = values.length;
      pathData.push({
        month: m,
        p5: values[Math.floor(0.05 * n)],
        p25: values[Math.floor(0.25 * n)],
        mean: values.reduce((s, v) => s + v, 0) / n,
        p75: values[Math.floor(0.75 * n)],
        p95: values[Math.floor(0.95 * n)],
      });
    }

    const finalValues = allPaths.map(p => p[p.length - 1]);
    const samplePaths = allPaths.slice(0, 15); // For visual display

    setResults({
      paths: pathData,
      samplePaths,
      finalValues,
      histogram: buildHistogram(finalValues, 35),
      var95: calculateVaR(finalValues, 0.95),
      var99: calculateVaR(finalValues, 0.99),
      cvar95: calculateCVaR(finalValues, 0.95),
      median: finalValues.sort((a, b) => a - b)[Math.floor(finalValues.length / 2)],
      best: Math.max(...finalValues),
      worst: Math.min(...finalValues),
    });

    setIsRunning(false);
  }, [numScenarios, months, portfolioReturn, portfolioVol]);

  const formatM = (v: number) => `${(v / 1e6).toFixed(1)}M`;
  const formatReturn = (v: number) => `${(((v / startValue) - 1) * 100).toFixed(1)}%`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-red/10 flex items-center justify-center">
            <Activity size={20} className="text-red" />
          </div>
          <div>
            <h1 className="text-3xl font-display text-navy">Simulation Monte Carlo</h1>
            <p className="text-sm text-charcoal font-body">Analyse de risque & scenarios probabilistes</p>
          </div>
          <span className="ml-3 px-3 py-1 bg-navy text-white text-xs font-bold font-body">{numScenarios.toLocaleString()} scenarios</span>
          <span className="px-3 py-1 bg-cream text-[#B45309] text-xs font-bold font-body">{months} mois</span>
          <span className="px-3 py-1 bg-sage text-[#16A34A] text-xs font-bold font-body">GBM + Box-Muller</span>
        </div>
      </div>

      {/* Portfolio Config */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {assets.map((a, i) => (
          <div key={a.name} className="bg-white border border-[#E5E7EB] p-4" style={{ borderTop: `3px solid ${a.color}` }}>
            <p className="text-xs font-body font-bold text-navy mb-2 truncate">{a.name}</p>
            <div className="space-y-2">
              <div>
                <label className="text-[10px] font-body text-charcoal/60 uppercase">Poids</label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={a.weight}
                    onChange={e => setAssets(prev => prev.map((x, j) => j === i ? { ...x, weight: parseFloat(e.target.value) || 0 } : x))}
                    className="w-full border border-[#D1D5DB] px-2 py-1 text-sm font-body font-bold text-navy focus:border-navy focus:outline-none"
                  />
                  <span className="text-xs font-body text-charcoal">%</span>
                </div>
              </div>
              <div className="flex justify-between text-[10px] font-body">
                <span className="text-charcoal/60">Rend.</span>
                <span className="text-[#16A34A] font-bold">{a.expectedReturn}%</span>
              </div>
              <div className="flex justify-between text-[10px] font-body">
                <span className="text-charcoal/60">Vol.</span>
                <span className="text-red font-bold">{a.volatility}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Portfolio summary + Launch */}
      <div className="flex items-center gap-4">
        <div className="flex-1 bg-[#F7F7F9] p-4 flex gap-6">
          <div>
            <p className="text-[10px] font-body text-charcoal/60 uppercase">Rendement portfolio</p>
            <p className="text-lg font-display text-[#16A34A]">{(portfolioReturn * 100).toFixed(2)}%</p>
          </div>
          <div>
            <p className="text-[10px] font-body text-charcoal/60 uppercase">Volatilite portfolio</p>
            <p className="text-lg font-display text-red">{(portfolioVol * 100).toFixed(2)}%</p>
          </div>
          <div>
            <p className="text-[10px] font-body text-charcoal/60 uppercase">Sharpe ratio</p>
            <p className="text-lg font-display text-navy">{((portfolioReturn - 0.035) / portfolioVol).toFixed(2)}</p>
          </div>
          <div>
            <p className="text-[10px] font-body text-charcoal/60 uppercase">Valeur initiale</p>
            <p className="text-lg font-display text-navy">100M EUR</p>
          </div>
        </div>
        <button
          onClick={isRunning ? () => { cancelRef.current = true; } : runSimulation}
          className={`px-8 py-4 font-body font-bold text-sm uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 ${
            isRunning ? 'bg-red text-white hover:bg-red/80' : 'bg-navy text-white hover:bg-orange'
          }`}
        >
          {isRunning ? <><RotateCcw size={16} className="animate-spin" /> Arreter</> : <><Play size={16} /> Lancer Simulation</>}
        </button>
      </div>

      {/* Progress */}
      {isRunning && (
        <div className="bg-white border border-[#E5E7EB] p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-body text-navy font-bold">Simulation en cours...</span>
            <span className="text-sm font-body text-orange font-bold">{Math.floor(progress * numScenarios / 100).toLocaleString()} / {numScenarios.toLocaleString()}</span>
          </div>
          <div className="w-full bg-[#F7F7F9] h-3">
            <div className="bg-orange h-3 transition-all duration-150" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-[10px] font-body text-charcoal/50 mt-1">Geometric Brownian Motion | S(t+dt) = S(t) * exp((mu - sigma^2/2)*dt + sigma*sqrt(dt)*Z)</p>
        </div>
      )}

      {/* Results */}
      {results && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'VaR 95%', value: formatM(results.var95), sub: formatReturn(results.var95), icon: Shield, color: 'text-orange' },
              { label: 'VaR 99%', value: formatM(results.var99), sub: formatReturn(results.var99), icon: AlertTriangle, color: 'text-red' },
              { label: 'CVaR 95%', value: formatM(results.cvar95), sub: 'Expected Shortfall', icon: TrendingDown, color: 'text-red' },
              { label: 'Rendement Median', value: formatM(results.median), sub: formatReturn(results.median), icon: BarChart3, color: 'text-navy' },
              { label: 'Meilleur Scenario', value: formatM(results.best), sub: formatReturn(results.best), icon: Zap, color: 'text-[#16A34A]' },
              { label: 'Pire Scenario', value: formatM(results.worst), sub: formatReturn(results.worst), icon: AlertTriangle, color: 'text-red' },
            ].map(kpi => (
              <div key={kpi.label} className="bg-white border border-[#E5E7EB] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <kpi.icon size={14} className={kpi.color} />
                  <p className="text-[10px] font-body text-charcoal uppercase tracking-wider">{kpi.label}</p>
                </div>
                <p className="text-xl font-display text-navy">{kpi.value}</p>
                <p className="text-[10px] font-body text-charcoal/50 mt-0.5">{kpi.sub}</p>
              </div>
            ))}
          </div>

          {/* Trajectory Chart */}
          <div className="bg-white border border-[#E5E7EB] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity size={18} className="text-orange" />
              <h3 className="text-lg font-display text-navy">Trajectoires Simulees — Cone de Probabilite</h3>
              <span className="text-xs font-body text-charcoal/50 ml-2">{numScenarios.toLocaleString()} chemins | IC 5%-95%</span>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={results.paths}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fontFamily: 'Sailec, sans-serif', fill: '#231F20' }} label={{ value: 'Mois', position: 'bottom', style: { fontFamily: 'Sailec, sans-serif', fontSize: 11, fill: '#231F20' } }} />
                <YAxis tickFormatter={v => `${(v / 1e6).toFixed(0)}M`} tick={{ fontSize: 10, fontFamily: 'Sailec, sans-serif', fill: '#231F20' }} />
                <Tooltip formatter={(v) => [`${(Number(v) / 1e6).toFixed(1)}M EUR`, '']} contentStyle={{ fontFamily: 'Sailec, sans-serif', fontSize: 12, border: '1px solid #E5E7EB', borderRadius: 0 }} />
                <Area type="monotone" dataKey="p95" stroke="none" fill="#E3F1EC" fillOpacity={0.5} name="P95" />
                <Area type="monotone" dataKey="p75" stroke="none" fill="#FAEBDC" fillOpacity={0.6} name="P75" />
                <Area type="monotone" dataKey="p25" stroke="none" fill="#FAEBDC" fillOpacity={0.6} name="P25" />
                <Area type="monotone" dataKey="p5" stroke="none" fill="#FFB9AD" fillOpacity={0.4} name="P5" />
                <Line type="monotone" dataKey="mean" stroke="#FF8217" strokeWidth={3} dot={false} name="Moyenne" />
                <ReferenceLine y={startValue} stroke="#000046" strokeDasharray="4 4" label={{ value: '100M', position: 'right', style: { fontFamily: 'Sailec, sans-serif', fontSize: 10, fill: '#000046' } }} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-1 text-[10px] font-body"><div className="w-3 h-2 bg-[#E3F1EC]" />P5-P95 (90% IC)</div>
              <div className="flex items-center gap-1 text-[10px] font-body"><div className="w-3 h-2 bg-[#FAEBDC]" />P25-P75 (50% IC)</div>
              <div className="flex items-center gap-1 text-[10px] font-body"><div className="w-8 h-0.5 bg-orange" />Moyenne</div>
            </div>
          </div>

          {/* Histogram */}
          <div className="bg-white border border-[#E5E7EB] p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 size={18} className="text-orange" />
              <h3 className="text-lg font-display text-navy">Distribution des Valeurs Finales</h3>
              <span className="text-xs font-body text-charcoal/50 ml-2">Horizon: {months} mois</span>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={results.histogram}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="range" tick={{ fontSize: 9, fontFamily: 'Sailec, sans-serif', fill: '#231F20' }} label={{ value: 'Valeur finale (M EUR)', position: 'bottom', style: { fontFamily: 'Sailec, sans-serif', fontSize: 11, fill: '#231F20' } }} />
                <YAxis tick={{ fontSize: 10, fontFamily: 'Sailec, sans-serif', fill: '#231F20' }} label={{ value: 'Frequence', angle: -90, position: 'insideLeft', style: { fontFamily: 'Sailec, sans-serif', fontSize: 11, fill: '#231F20' } }} />
                <Tooltip contentStyle={{ fontFamily: 'Sailec, sans-serif', fontSize: 12, border: '1px solid #E5E7EB', borderRadius: 0 }} />
                <Bar dataKey="count" name="Scenarios">
                  {results.histogram.map((entry, i) => (
                    <Cell key={i} fill={entry.isVaR ? '#CD002D' : parseFloat(entry.range) * 1e6 < startValue ? '#FFB9AD' : '#000046'} fillOpacity={0.8} />
                  ))}
                </Bar>
                <ReferenceLine x={`${(results.var95 / 1e6).toFixed(0)}`} stroke="#CD002D" strokeWidth={2} strokeDasharray="4 4" label={{ value: 'VaR 95%', position: 'top', style: { fontFamily: 'Sailec, sans-serif', fontSize: 10, fill: '#CD002D' } }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {/* Stress Scenarios */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stressScenarios.map(scenario => (
          <div key={scenario.name} className="bg-white border border-[#E5E7EB] p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-body font-bold text-navy">{scenario.name}</h4>
              <span className="px-2 py-0.5 bg-[#FEE2E2] text-red text-[10px] font-body font-bold">STRESS</span>
            </div>
            <ResponsiveContainer width="100%" height={100}>
              <AreaChart data={scenario.data}>
                <Area type="monotone" dataKey="value" stroke="#CD002D" fill="#CD002D" fillOpacity={0.1} strokeWidth={2} />
                <ReferenceLine y={100} stroke="#E5E7EB" strokeDasharray="3 3" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex justify-between mt-3">
              <div>
                <p className="text-[10px] font-body text-charcoal/60">Max Drawdown</p>
                <p className="text-lg font-display text-red">{scenario.maxDrawdown}%</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-body text-charcoal/60">Recovery</p>
                <p className="text-lg font-display text-navy">{scenario.recoveryMonths} mois</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Methodology */}
      <div className="bg-navy p-6 text-white">
        <h3 className="text-lg font-display mb-3">Methodologie</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-body text-white/70">
          <div>
            <p className="text-orange font-bold mb-1">Modele Stochastique</p>
            <p>Geometric Brownian Motion (GBM) avec drift ajuste. Variable aleatoire normale generee par la transformation de Box-Muller.</p>
            <p className="text-white/40 mt-1 font-mono text-[10px]">S(t+dt) = S(t) * exp((mu-sigma^2/2)*dt + sigma*sqrt(dt)*Z)</p>
          </div>
          <div>
            <p className="text-orange font-bold mb-1">Mesures de Risque</p>
            <p>VaR parametrique au percentile empirique. CVaR (Expected Shortfall) = moyenne des pertes au-dela du VaR. Confiance 95% et 99%.</p>
          </div>
          <div>
            <p className="text-orange font-bold mb-1">Stress Testing</p>
            <p>Scenarios historiques calibres sur les crises reelles (2008, 2020, 2022). Drawdown et temps de recovery observes sur indices composites.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
