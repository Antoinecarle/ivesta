import { Check, Shield, Server, Brain, Smartphone, Globe } from 'lucide-react';

const phases = [
  {
    id: 0, title: 'Phase 0 — Discovery & Maquette', duration: '3-5 jours', price: 'Offert',
    icon: Globe, color: 'bg-orange',
    items: ['Maquette interactive SaaS', 'Vision produit et modules', 'Document de pricing par phase', 'Presentation cas d\'usage'],
  },
  {
    id: 1, title: 'Phase 1 — Architecture Data & Backend', duration: '4-6 semaines', price: '15 000 - 25 000 EUR',
    icon: Server, color: 'bg-navy',
    items: ['Schema relationnel complet (familles, entites, actifs, fonds)', 'API REST securisee (JWT + RBAC)', 'PostgreSQL chiffre sur serveurs EU', 'CI/CD + environnements dev/staging/prod'],
  },
  {
    id: 2, title: 'Phase 2 — Integrations Sources de Donnees', duration: '3-5 semaines', price: '15 000 - 25 000 EUR',
    icon: Brain, color: 'bg-orange',
    items: ['API Bloomberg (cote live)', 'API Preqin + Pitchbook (non-cote)', 'Import auto reportings PDF par email', 'Migration Excel existant'],
  },
  {
    id: 3, title: 'Phase 3 — Modules Metier Core', duration: '6-8 semaines', price: '25 000 - 40 000 EUR',
    icon: Brain, color: 'bg-navy',
    items: ['Dashboard central multi-role', 'Module Investissement Cote (Nour)', 'Module Investissement Non-Cote (Thibault)', 'Module CRM/Prospection (Ayrton)', 'Module Dossier Client (Family File)', 'Base fiches fonds en ligne'],
  },
  {
    id: 4, title: 'Phase 4 — Compliance & IA documentaire', duration: '3-4 semaines', price: '10 000 - 15 000 EUR',
    icon: Shield, color: 'bg-orange',
    items: ['Classification auto documents par IA', 'Suivi KYC automatise + alertes', 'Workflows compliance ACPR/AMF', 'Audit trail complet'],
  },
  {
    id: 5, title: 'Phase 5 — Reporting Client Automatise', duration: '3-5 semaines', price: '10 000 - 20 000 EUR',
    icon: Brain, color: 'bg-navy',
    items: ['Templates personnalises DA Ivesta', 'Generation batch + commentaires IA', 'Dashboard temps reel (remplacement DB 500k)', 'Export PDF haute qualite'],
  },
  {
    id: 6, title: 'Phase 6 — Portail Client & App Mobile', duration: '4-6 semaines', price: '15 000 - 25 000 EUR',
    icon: Smartphone, color: 'bg-orange',
    items: ['Refonte portail web app.ivesta-fo.com', 'App mobile (Face ID, push, hors-ligne)', 'Messagerie securisee', 'Signature electronique'],
  },
  {
    id: 7, title: 'Phase 7 — Refonte Site Vitrine', duration: '2-3 semaines', price: '8 000 - 15 000 EUR',
    icon: Globe, color: 'bg-navy',
    items: ['Migration WordPress -> moderne', 'DA Ivesta conservee', 'SEO + Core Web Vitals', 'Multilingue FR/EN'],
  },
  {
    id: 8, title: 'Phase 8 — IA Avancee', duration: '4-6 semaines', price: '10 000 - 20 000 EUR',
    icon: Brain, color: 'bg-orange',
    items: ['Assistant IA interne (RAG)', 'Classification auto emails/documents', 'Alertes intelligentes (anomalies, reglementation)', 'Previsions cashflow'],
  },
];

export default function Devis() {
  return (
    <div className="min-h-screen bg-bg-light">
      {/* Header */}
      <header className="bg-navy text-white py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-orange flex items-center justify-center font-display font-bold text-navy text-2xl">iV</div>
            <div>
              <h1 className="font-display text-4xl font-bold">Premiere Approche Technique & Tarifaire</h1>
              <p className="text-white/60 mt-1 text-lg">Plateforme SaaS iVesta Family Office</p>
            </div>
          </div>
          <div className="bg-orange/15 border border-orange/30 px-6 py-4 mt-8">
            <p className="text-white/90 text-[15px] leading-relaxed">
              <strong className="text-orange">Note :</strong> Ce document constitue une <strong>premiere estimation indicative</strong> de notre proposition. Les contenus, phases et tarifs presentes sont une base de discussion et seront affines ensemble si vous souhaitez aller plus loin.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 p-5">
              <p className="text-3xl font-display font-bold text-orange">108 - 185k EUR</p>
              <p className="text-sm text-white/60 mt-1">Budget total estime</p>
            </div>
            <div className="bg-white/10 p-5">
              <p className="text-3xl font-display font-bold">6 - 12 mois</p>
              <p className="text-sm text-white/60 mt-1">Duree estimee</p>
            </div>
            <div className="bg-white/10 p-5">
              <p className="text-3xl font-display font-bold">9 phases</p>
              <p className="text-sm text-white/60 mt-1">Livraison progressive</p>
            </div>
          </div>
        </div>
      </header>

      {/* Architecture */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="font-display text-2xl font-bold text-navy mb-6">Architecture Technique</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white border border-navy/5 p-5">
            <h3 className="font-display font-bold text-navy mb-2">Frontend</h3>
            <ul className="text-sm text-charcoal/70 space-y-1">
              <li>React.js + TypeScript</li>
              <li>Tailwind CSS (DA Ivesta)</li>
              <li>Application mobile React Native</li>
            </ul>
          </div>
          <div className="bg-white border border-navy/5 p-5">
            <h3 className="font-display font-bold text-navy mb-2">Backend</h3>
            <ul className="text-sm text-charcoal/70 space-y-1">
              <li>Node.js / Python FastAPI</li>
              <li>PostgreSQL (chiffre, EU)</li>
              <li>API REST + WebSocket</li>
            </ul>
          </div>
          <div className="bg-white border border-navy/5 p-5">
            <h3 className="font-display font-bold text-navy mb-2">Securite</h3>
            <ul className="text-sm text-charcoal/70 space-y-1">
              <li>Hebergement EU (AWS Frankfurt)</li>
              <li>Chiffrement bout-en-bout</li>
              <li>Conformite RGPD/ACPR/AMF</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Phases */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="font-display text-2xl font-bold text-navy mb-8">Phases & Tarification</h2>
        <div className="space-y-4">
          {phases.map((phase) => (
            <div key={phase.id} className="bg-white border border-navy/5 overflow-hidden">
              <div className="flex items-stretch">
                <div className={`${phase.color} w-1.5 shrink-0`} />
                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display font-bold text-navy text-lg">{phase.title}</h3>
                      <p className="text-sm text-charcoal/50 mt-0.5">Duree : {phase.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-display font-bold text-orange text-lg">{phase.price}</p>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-1">
                    {phase.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-charcoal/70">
                        <Check size={14} className="text-orange mt-0.5 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white py-10 text-center">
        <p className="text-white/50 text-sm">
          Premiere estimation indicative preparee par Alfred Builders pour Ivesta Family Office &mdash; Mars 2026
        </p>
        <p className="text-white/40 text-xs mt-2">
          Ce document est une base de travail. Les phases, delais et tarifs seront affines selon vos priorites.
        </p>
        <p className="text-white/30 text-xs mt-2">
          Contact : adrien@checkeasy.co &bull; hello@latraverse.studio
        </p>
      </footer>
    </div>
  );
}
