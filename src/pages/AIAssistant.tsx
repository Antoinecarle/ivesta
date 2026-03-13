import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Send, Bot, User, Sparkles, FileText, Shield, TrendingUp,
  BarChart3, Globe, Database, CheckCircle2,
  ChevronRight, Download, Filter, Loader2
} from 'lucide-react';

// ══════════════════════════════════════════════
// AI RESPONSE ENGINE (simulated RAG)
// ══════════════════════════════════════════════

interface Message {
  role: 'user' | 'assistant';
  content: string;
  richContent?: React.ReactNode;
  sources?: string[];
  thinking?: string[];
}

/** Simulate AI thinking steps */
function getThinkingSteps(query: string): string[] {
  const q = query.toLowerCase();
  if (q.includes('tri') || q.includes('irr') || q.includes('eurazeo'))
    return ['Recherche dans ivesta.fund_investments...', 'Calcul IRR (Newton-Raphson, 15 iterations)...', 'Agregation des multiples TVPI/DPI...', 'Generation de la reponse...'];
  if (q.includes('rothenberg') || q.includes('synthese') || q.includes('trimestriel'))
    return ['Chargement du dossier Famille Rothenberg...', 'Requete ivesta.listed_investments + fund_investments...', 'Analyse de la performance Q1 2026...', 'Generation du resume IA (GPT-5-mini)...'];
  if (q.includes('kyc') || q.includes('compliance') || q.includes('alerte'))
    return ['Scan ivesta.compliance_checks...', 'Verification ivesta.documents (expiry_date)...', 'Screening PEP/Sanctions...', 'Classification des alertes par severite...'];
  if (q.includes('fonds') || q.includes('compare') || q.includes('ardian'))
    return ['Requete ivesta.funds WHERE strategy...', 'Chargement donnees Preqin API...', 'Calcul des benchmarks sectoriels...', 'Comparaison multi-criteres...'];
  if (q.includes('prospect') || q.includes('pipeline') || q.includes('crm'))
    return ['Requete ivesta.prospects...', 'Analyse du pipeline commercial...', 'Calcul du taux de conversion...', 'Estimation AUM potentiel...'];
  return ['Analyse de la requete...', 'Recherche dans la base documentaire...', 'Synthese des informations...', 'Generation de la reponse...'];
}

/** Get response based on query pattern matching (demo RAG) */
function getResponse(query: string): { text: string; sources: string[] } {
  const q = query.toLowerCase();
  if (q.includes('tri') || q.includes('irr') || q.includes('eurazeo')) {
    return {
      text: `Le TRI net du fonds **Eurazeo Private Equity V** (millesime 2021) est de **18.4%** au 31/12/2025.\n\nDetails :\n- Engagement : 5 000 000 EUR\n- Capital appele : 3 250 000 EUR (65%)\n- Distributions : 487 500 EUR\n- NAV residuelle : 4 112 500 EUR\n- TVPI : 1.42x | DPI : 0.15x | RVPI : 1.27x\n\nLe fonds surperforme le benchmark Preqin Europe LBO (TRI median 14.2%) de +420 bps. La J-curve est en phase d'inflexion positive depuis Q3 2024.`,
      sources: ['ivesta.fund_investments', 'ivesta.funds', 'Preqin API (benchmark)'],
    };
  }
  if (q.includes('rothenberg') || q.includes('synthese') || q.includes('resume')) {
    return {
      text: `**Synthese Trimestrielle Q1 2026 — Famille Rothenberg**\n\nPatrimoine consolide : **42.8M EUR** (+4.2% vs Q4 2025)\n\nPerformance par poche :\n- Cote (Bloomberg) : +3.1% (vs MSCI Europe +2.8%)\n- Non-cote (PE) : +12.0% (Eurazeo, Ardian, Blackstone)\n- Immobilier : +1.8% (SCI Berlin Mitte stable)\n- Assurance-vie : +0.9%\n\nEvenements a venir :\n- Capital call Eurazeo Growth IV : 280k EUR (15 avril)\n- Capital call Blackstone Credit III : 170k EUR (30 avril)\n- Renouvellement KYC M. Hans Rothenberg (CNI expire dans 15j)\n\nStatut compliance : 92/100 (alerte CNI a traiter)`,
      sources: ['ivesta.families', 'ivesta.listed_investments', 'ivesta.fund_investments', 'Bloomberg API', 'ivesta.compliance_checks'],
    };
  }
  if (q.includes('kyc') || q.includes('compliance') || q.includes('alerte')) {
    return {
      text: `**3 alertes de conformite** detectees par le moteur KYC :\n\n1. **CRITIQUE** — CNI expiree : M. Hans Rothenberg (expire il y a 12 jours). Action : demander renouvellement immediat.\n\n2. **ATTENTION** — Justificatif domicile > 3 mois : Famille Chen (dernier document : 15/11/2025). Action : relancer le client.\n\n3. **ATTENTION** — Transaction inhabituelle : SCI Dubois Immo — virement sortant de 350k EUR vers un compte non reference. Action : verification LCB-FT requise.\n\nTaux de conformite global : **87.3%** (112 familles scannees)\nScore moyen : 78/100\nProchaine echeance : CNI Van der Berg dans 8 jours`,
      sources: ['ivesta.compliance_checks', 'ivesta.documents', 'Dow Jones Risk & Compliance', 'ivesta.activity_log'],
    };
  }
  if (q.includes('prospect') || q.includes('pipeline')) {
    return {
      text: `**Pipeline Commercial — Mars 2026**\n\nProspects actifs : **42** | AUM potentiel : **320M EUR** | Taux conversion : **18.5%**\n\nTop prospects :\n- Famille Laurent-Perrier : 45M EUR, RDV confirme 18/03 (source: CFNews)\n- M. Dubois Pierre : 28M EUR, proposition envoyee (source: LinkedIn)\n- Famille Morel : 32M EUR, qualification en cours (source: referral Rothenberg)\n\nDeals CFNews cette semaine : 8 deals > 50M identifies, 3 matches avec notre cible.\n\nRecommandation IA : Prioriser la Famille Laurent-Perrier (secteur viticole, forte affinite avec notre clientele existante).`,
      sources: ['ivesta.prospects', 'CFNews API', 'ivesta.families (referrals)'],
    };
  }
  return {
    text: `J'ai analyse votre demande en interrogeant la base documentaire iVesta (${Math.floor(Math.random() * 50 + 20)} documents pertinents trouves).\n\nPour une reponse plus precise, essayez :\n- "Quel est le TRI du fonds [nom du fonds] ?"\n- "Genere une synthese trimestrielle pour [famille]"\n- "Quelles sont les alertes KYC en cours ?"\n- "Etat du pipeline commercial"\n- "Compare les fonds Ardian VII vs Eurazeo VI"`,
    sources: ['ivesta.documents', 'ivesta.knowledge_base'],
  };
}

// ══════════════════════════════════════════════
// TYPING EFFECT HOOK
// ══════════════════════════════════════════════

function useTypingEffect(text: string, speed: number = 15, enabled: boolean = false) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!enabled) { setDisplayed(text); setDone(true); return; }
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(interval); setDone(true); }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, enabled]);

  return { displayed, done };
}

// ══════════════════════════════════════════════
// INITIAL DEMO MESSAGES
// ══════════════════════════════════════════════

const initialMessages: Message[] = [
  { role: 'user', content: 'Quel est le TRI du fonds Eurazeo PE V ?' },
  {
    role: 'assistant',
    content: `Le TRI net du fonds **Eurazeo Private Equity V** (millesime 2021) est de **18.4%** au 31/12/2025.\n\nDetails :\n- Engagement : 5 000 000 EUR\n- Capital appele : 3 250 000 EUR (65%)\n- Distributions : 487 500 EUR\n- NAV residuelle : 4 112 500 EUR\n- TVPI : 1.42x | DPI : 0.15x | RVPI : 1.27x\n\nLe fonds surperforme le benchmark Preqin Europe LBO (TRI median 14.2%) de +420 bps.`,
    sources: ['ivesta.fund_investments', 'ivesta.funds', 'Preqin API'],
  },
];

// ══════════════════════════════════════════════
// RENDER MARKDOWN-LIKE TEXT
// ══════════════════════════════════════════════

function RenderText({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-2" />;
        // Bold
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i} className="text-[14px] leading-relaxed">
            {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="font-bold text-navy">{part}</strong> : part)}
          </p>
        );
      })}
    </div>
  );
}

// ══════════════════════════════════════════════
// COMPONENT
// ══════════════════════════════════════════════

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingSteps, setThinkingSteps] = useState<string[]>([]);
  const [, setCurrentThinkStep] = useState(0);
  const [typingMessage, setTypingMessage] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { displayed: typedText, done: typingDone } = useTypingEffect(
    typingMessage || '', 12, typingMessage !== null
  );

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking, thinkingSteps, typedText]);

  // When typing is done, commit the message
  useEffect(() => {
    if (typingDone && typingMessage) {
      setTypingMessage(null);
    }
  }, [typingDone, typingMessage]);

  const handleSend = useCallback(async () => {
    const query = inputValue.trim();
    if (!query || isThinking) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setInputValue('');
    setIsThinking(true);

    // Show thinking steps
    const steps = getThinkingSteps(query);
    setThinkingSteps([]);
    setCurrentThinkStep(0);

    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 400 + Math.random() * 300));
      setThinkingSteps(prev => [...prev, steps[i]]);
      setCurrentThinkStep(i + 1);
    }

    await new Promise(r => setTimeout(r, 300));

    // Get response
    const response = getResponse(query);
    setIsThinking(false);
    setThinkingSteps([]);

    // Start typing effect
    setTypingMessage(response.text);
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: response.text,
      sources: response.sources,
      thinking: steps,
    }]);
  }, [inputValue, isThinking]);

  const handleQuickAction = (query: string) => {
    setInputValue(query);
    setTimeout(() => {
      setInputValue(query);
      // Auto-send
      setMessages(prev => [...prev, { role: 'user', content: query }]);
      setInputValue('');
      setIsThinking(true);

      const steps = getThinkingSteps(query);
      setThinkingSteps([]);

      (async () => {
        for (let i = 0; i < steps.length; i++) {
          await new Promise(r => setTimeout(r, 400 + Math.random() * 300));
          setThinkingSteps(prev => [...prev, steps[i]]);
        }
        await new Promise(r => setTimeout(r, 300));
        const response = getResponse(query);
        setIsThinking(false);
        setThinkingSteps([]);
        setTypingMessage(response.text);
        setMessages(prev => [...prev, { role: 'assistant', content: response.text, sources: response.sources, thinking: steps }]);
      })();
    }, 100);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] -m-8 font-body text-navy overflow-hidden">
      {/* LEFT PANEL - CHAT (70%) */}
      <div className="w-[70%] flex flex-col border-r border-[#E5E7EB] bg-white relative">
        {/* Header */}
        <header className="h-20 border-b border-[#E5E7EB] flex items-center justify-between px-8 bg-white z-10 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-orange flex items-center justify-center">
              <Bot size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-[24px] font-normal font-display text-navy leading-none mb-1">Assistant iVesta</h1>
              <div className="flex items-center gap-2 text-[12px] uppercase tracking-wider text-orange font-bold">
                <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                IA Intelligence Patrimoniale Active
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 bg-[#F7F7F9] text-[10px] font-body text-charcoal">RAG + PostgreSQL + API</span>
            <button className="flex items-center gap-2 px-4 py-2 border border-navy text-navy hover:bg-cream transition-colors text-sm font-medium uppercase tracking-tight cursor-pointer">
              <Download size={16} /> Export
            </button>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 pb-48">
          {messages.map((msg, i) => {
            const isLastAssistant = msg.role === 'assistant' && i === messages.length - 1;
            const displayText = isLastAssistant && typingMessage ? typedText : msg.content;

            return msg.role === 'user' ? (
              <div key={i} className="flex justify-end">
                <div className="max-w-[80%] flex items-start gap-4 flex-row-reverse">
                  <div className="w-10 h-10 bg-navy flex items-center justify-center shrink-0">
                    <User size={20} className="text-white" />
                  </div>
                  <div className="bg-navy text-white p-5">
                    <p className="text-[15px] leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div key={i} className="flex justify-start">
                <div className="max-w-[90%] flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange flex items-center justify-center shrink-0">
                    <Bot size={20} className="text-white" />
                  </div>
                  <div className="bg-bg-light border-l-[3px] border-orange p-6 w-full">
                    {/* Thinking steps (show for last message if available) */}
                    {isLastAssistant && msg.thinking && (
                      <div className="mb-3 space-y-1">
                        {msg.thinking.map((step, j) => (
                          <div key={j} className="flex items-center gap-2 text-[10px] font-body text-charcoal/40">
                            <CheckCircle2 size={10} className="text-[#16A34A]" />
                            <span className="font-mono">{step}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <RenderText text={displayText} />
                    {isLastAssistant && typingMessage && !typingDone && (
                      <span className="inline-block w-2 h-4 bg-orange animate-pulse ml-0.5" />
                    )}
                    {/* Sources */}
                    {msg.sources && (!isLastAssistant || typingDone || !typingMessage) && (
                      <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex flex-wrap gap-2">
                        <span className="text-[9px] font-body text-charcoal/40 uppercase tracking-wider">Sources:</span>
                        {msg.sources.map((src, j) => (
                          <span key={j} className="px-2 py-0.5 bg-sage text-[#16A34A] text-[9px] font-body font-bold">{src}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Thinking animation */}
          {isThinking && (
            <div className="flex justify-start">
              <div className="max-w-[90%] flex items-start gap-4">
                <div className="w-10 h-10 bg-orange flex items-center justify-center shrink-0">
                  <Bot size={20} className="text-white" />
                </div>
                <div className="bg-bg-light border-l-[3px] border-orange p-6 w-full">
                  <div className="flex items-center gap-2 mb-3">
                    <Loader2 size={14} className="text-orange animate-spin" />
                    <span className="text-xs font-body text-orange font-bold">Analyse en cours...</span>
                  </div>
                  <div className="space-y-1.5">
                    {thinkingSteps.map((step, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] font-body animate-fade-in">
                        <CheckCircle2 size={12} className="text-[#16A34A]" />
                        <span className="font-mono text-charcoal/60">{step}</span>
                        <span className="text-[9px] text-charcoal/30">{(Math.random() * 200 + 50).toFixed(0)}ms</span>
                      </div>
                    ))}
                    {thinkingSteps.length < 4 && (
                      <div className="flex items-center gap-2 text-[11px] font-body">
                        <div className="w-3 h-3 border border-orange/30 border-t-orange animate-spin" />
                        <span className="font-mono text-charcoal/40 animate-pulse">Processing...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="absolute bottom-0 left-0 w-full p-6 bg-white border-t border-[#E5E7EB]">
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              placeholder="Posez une question a l'assistant..."
              className="w-full h-14 bg-bg-light border-none px-6 pr-16 text-[15px] focus:outline-none focus:ring-1 focus:ring-orange font-body"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isThinking}
            />
            <button
              onClick={handleSend}
              disabled={isThinking || !inputValue.trim()}
              className="absolute right-2 w-10 h-10 bg-navy flex items-center justify-center hover:bg-orange transition-colors cursor-pointer group disabled:opacity-30"
            >
              {isThinking ? (
                <Loader2 size={18} className="text-white animate-spin" />
              ) : (
                <Send size={18} className="text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              )}
            </button>
          </div>
          <div className="mt-3 flex gap-2 flex-wrap">
            {['Alertes KYC en cours', 'Synthese Famille Rothenberg', 'Etat du pipeline commercial'].map(q => (
              <button
                key={q}
                onClick={() => handleQuickAction(q)}
                disabled={isThinking}
                className="px-3 py-1.5 border border-[#E5E7EB] text-[11px] font-body text-charcoal hover:border-orange hover:text-orange transition-colors cursor-pointer disabled:opacity-30"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL (30%) */}
      <div className="w-[30%] bg-cream/30 flex flex-col p-8 overflow-y-auto">
        {/* Quick Actions */}
        <section className="mb-10">
          <h2 className="font-display text-[20px] mb-6 flex items-center gap-2">
            <Sparkles size={20} className="text-orange" />
            Actions Rapides
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Reporting trimestriel', icon: <FileText size={16} />, query: 'Genere un reporting trimestriel pour la Famille Rothenberg' },
              { label: 'Analyse de fonds', icon: <BarChart3 size={16} />, query: 'Quel est le TRI du fonds Eurazeo PE V ?' },
              { label: 'Alertes KYC', icon: <Shield size={16} />, query: 'Quelles sont les alertes KYC en cours ?' },
              { label: 'Performance client', icon: <TrendingUp size={16} />, query: 'Synthese performance Famille Rothenberg' },
              { label: 'Pipeline commercial', icon: <Filter size={16} />, query: 'Etat du pipeline commercial' },
              { label: 'Macro-economie', icon: <Globe size={16} />, query: 'Analyse macro-economique Q1 2026' },
            ].map((action, i) => (
              <button
                key={i}
                onClick={() => handleQuickAction(action.query)}
                disabled={isThinking}
                className="flex flex-col items-start gap-2 p-4 bg-white border border-[#E5E7EB] hover:border-orange transition-all group text-left cursor-pointer disabled:opacity-30"
              >
                <div className="text-navy group-hover:text-orange transition-colors">{action.icon}</div>
                <span className="text-[12px] font-bold uppercase tracking-tight leading-tight">{action.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* AI Reports */}
        <section className="mb-10">
          <h2 className="font-display text-[20px] mb-6">Derniers Rapports IA</h2>
          <div className="space-y-3">
            {[
              { title: 'Rapport de Risque - Q1 2026', date: 'Hier, 14:20', badge: 'Monte Carlo' },
              { title: 'Analyse Opportunite Blackstone IX', date: '12 Mars 2026', badge: 'Due Diligence' },
              { title: 'Synthese Fiscalite SCI Rothenberg', date: '05 Mars 2026', badge: 'Fiscal' },
            ].map((report, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white border border-[#E5E7EB] group cursor-pointer hover:bg-bg-light">
                <div>
                  <div className="text-[14px] font-bold group-hover:text-orange transition-colors">{report.title}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-charcoal/50 uppercase tracking-widest font-bold">{report.date}</span>
                    <span className="px-1.5 py-0.5 bg-[#F7F7F9] text-[9px] font-bold text-navy">{report.badge}</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-navy/30" />
              </div>
            ))}
          </div>
        </section>

        {/* Architecture */}
        <section className="mb-10">
          <h2 className="font-display text-[20px] mb-4">Architecture RAG</h2>
          <div className="bg-navy p-4 text-white text-[10px] font-mono space-y-1">
            <p className="text-orange">// Pipeline de traitement</p>
            <p className="text-white/60">1. Query Analysis (intent detection)</p>
            <p className="text-white/60">2. PostgreSQL + pgvector search</p>
            <p className="text-white/60">3. API enrichment (Bloomberg, Preqin)</p>
            <p className="text-white/60">4. Context assembly (RBAC filtered)</p>
            <p className="text-white/60">5. LLM generation (GPT-5-mini)</p>
            <p className="text-white/60">6. Source citation & audit log</p>
          </div>
        </section>

        {/* Data Sources */}
        <section>
          <h2 className="font-display text-[20px] mb-6">Sources connectees</h2>
          <div className="bg-white border border-[#E5E7EB] divide-y divide-[#E5E7EB]">
            {[
              { name: 'PostgreSQL iVesta', type: 'Core Data', latency: '12ms' },
              { name: 'Bloomberg B-PIPE', type: 'Market Feed', latency: '45ms' },
              { name: 'Preqin API', type: 'PE/VC Data', latency: '180ms' },
              { name: 'CFNews API', type: 'M&A Deals', latency: '95ms' },
              { name: 'pgvector', type: 'Embeddings', latency: '8ms' },
            ].map((source, i) => (
              <div key={i} className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Database size={14} className="text-navy/40" />
                  <div>
                    <div className="text-[13px] font-bold">{source.name}</div>
                    <div className="text-[10px] uppercase text-charcoal/40 font-bold">{source.type}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono text-charcoal/40">{source.latency}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 p-3 bg-sage text-[11px] font-medium text-navy">
            <CheckCircle2 size={14} className="text-[#16A34A]" />
            Toutes les sources synchronisees (derniere verif: il y a 2 min)
          </div>
        </section>
      </div>
    </div>
  );
}
