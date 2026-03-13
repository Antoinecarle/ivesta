# DEVIS TECHNIQUE — iVesta SaaS Family Office
## Alfred Builders x iVesta — Mars 2026

---

## 1. Executive Summary

iVesta souhaite unifier ses outils digitaux fragmentes (Minotore, ivesta-invest.com, dashboards PE, Excel CRM) en une **plateforme SaaS unique** couvrant la gestion patrimoniale, le reporting client, la compliance et la prospection commerciale.

**Notre proposition** : une approche par phases, avec livraison incrementale, permettant de valider chaque etape avant de passer a la suivante.

---

## 2. Architecture Technique Proposee

### Stack Technique
| Couche | Technologie | Justification |
|--------|------------|---------------|
| **Frontend** | React 19 + TypeScript + Tailwind CSS v4 | Performance, typage fort, design system coherent |
| **Backend API** | Node.js + Express (ESM) | Ecosysteme riche, performance I/O, equipe familiere |
| **Base de donnees** | PostgreSQL 16 (Railway EU) | ACID, JSONB pour flexibilite, extensions riches |
| **Auth** | JWT + bcrypt + RBAC | 6 roles (founder, partner, officer, analyst, data_keeper, client) |
| **IA / NLP** | OpenAI GPT API + LangChain | Generation rapports, classification docs, assistant conversationnel |
| **Charts** | Recharts (React) | Graphiques patrimoniaux, allocation, performance |
| **Hebergement** | Railway (EU) + CDN | Conformite RGPD, deploiement continu, scalabilite |
| **Email** | Resend API | Notifications, alertes, invitations |
| **Stockage docs** | AWS S3 (Frankfurt) | Documents KYC, reportings, contrats — chiffres au repos |

### Schema de donnees (deja modelise)
- `users` (6 roles RBAC)
- `families` + `family_members` + `legal_entities` (structure multi-entites)
- `funds` + `fund_investments` (non-cote PE/VC/LBO)
- `listed_investments` (cote via Bloomberg)
- `documents` + `compliance_checks` (KYC, conformite)
- `prospects` (CRM pipeline)
- `reports` (generation automatique)
- `activity_log` (audit trail complet)

### Securite
- Chiffrement TLS 1.3 en transit
- Chiffrement AES-256 au repos (documents)
- JWT avec rotation, expiration 24h
- Rate limiting API
- Audit trail sur chaque action
- Hebergement EU exclusif (Railway Frankfurt)
- Conformite RGPD : droit a l'oubli, export, consentement

---

## 3. Chiffrage par Phase

### Phase 0 — Discovery & Maquette (OFFERT)
| Livrable | Detail |
|----------|--------|
| Maquette interactive haute-fidelite | 10 modules, navigation complete, donnees de demo |
| Design System documente | Polices (Moret + Sailec), couleurs, composants |
| Document de pricing | Ce document |
| Architecture technique | Schema DB, API design, stack |
| **Duree** | **3-5 jours** |
| **Prix** | **Offert** (inclus dans la Phase 1) |

### Phase 1 — Architecture Data & Backend Fondation
| Livrable | Detail | Effort |
|----------|--------|--------|
| Schema DB PostgreSQL complet | Toutes les tables, indexes, contraintes | 3j |
| API REST securisee | Auth, CRUD familles/fonds/investissements | 5j |
| Systeme RBAC | 6 roles, permissions granulaires | 2j |
| Migration Minotore | Import donnees existantes, mapping | 3j |
| Infrastructure CI/CD | Railway, GitHub Actions, env dev/staging/prod | 2j |
| Tests unitaires & integration | Couverture >80% routes critiques | 2j |
| **Duree totale** | **4-6 semaines** | **17j** |
| **Prix** | **18 000 — 25 000 EUR HT** | |

### Phase 2 — Integrations Sources de Donnees
| Livrable | Detail | Effort |
|----------|--------|--------|
| Integration Bloomberg API | Cours cotes live, performance TWR/MWR | 5j |
| Integration Preqin API | Metadata fonds PE, benchmarks | 3j |
| Integration Pitchbook API | Donnees complementaires non-cote | 3j |
| Import auto reportings PDF | OCR + IA extraction KPIs, classification | 5j |
| Integration CFNews API | Deals > 50M, prospection automatique | 2j |
| Migration Excel historique | Import fonds non-cotes existants | 2j |
| **Duree totale** | **3-5 semaines** | **20j** |
| **Prix** | **18 000 — 25 000 EUR HT** | |

### Phase 3 — Modules Metier Core (SaaS Interne)
| Livrable | Detail | Effort |
|----------|--------|--------|
| Dashboard Fondateurs | KPIs business, CA, AUM, activite equipe | 3j |
| Dashboard Family Partner | Mes clients, pipeline, objectifs | 3j |
| Module Investissement Cote | Portfolio cote, performance live, allocation | 5j |
| Module Investissement Non-Cote | Portfolio PE, NAV, TVPI, DPI, J-curve, cashflow | 5j |
| Module Dossier Client | Fiche famille, patrimoine consolide, historique | 4j |
| Module CRM / Prospection | Pipeline, deals CFNews, attribution leads | 4j |
| Fund News | Notifications par fonds, alertes personnalisees | 2j |
| **Duree totale** | **6-8 semaines** | **26j** |
| **Prix** | **28 000 — 40 000 EUR HT** | |

### Phase 4 — Compliance & Gestion Documentaire IA
| Livrable | Detail | Effort |
|----------|--------|--------|
| Upload & classification IA docs | Classification auto, extraction data | 4j |
| Workflows compliance KYC | Alertes expiration, renouvellement auto | 3j |
| Dashboard compliance | % a jour, alertes en cours, export ACPR/AMF | 2j |
| Audit trail complet | Tracabilite chaque verification | 1j |
| **Duree totale** | **3-4 semaines** | **10j** |
| **Prix** | **10 000 — 15 000 EUR HT** | |

### Phase 5 — Reporting Client Automatise
| Livrable | Detail | Effort |
|----------|--------|--------|
| Templates reporting | Synthese patrimoniale, detail cote/non-cote | 4j |
| Generation auto + commentaire IA | Batch generation, review workflow | 4j |
| Dashboard temps reel client | Data live cote, non-cote a jour | 3j |
| Export PDF haute qualite | DA iVesta, envoi automatise | 2j |
| **Duree totale** | **3-5 semaines** | **13j** |
| **Prix** | **12 000 — 20 000 EUR HT** | |

### Phase 6 — Portail Client & Application Mobile
| Livrable | Detail | Effort |
|----------|--------|--------|
| Portail web client | Patrimoine live, documents, messagerie | 5j |
| App mobile (React Native) | iOS + Android, push, biometrique | 8j |
| Signature electronique | Integration DocuSign/Yousign | 2j |
| **Duree totale** | **4-6 semaines** | **15j** |
| **Prix** | **18 000 — 28 000 EUR HT** | |

### Phase 7 — Refonte Site Vitrine
| Livrable | Detail | Effort |
|----------|--------|--------|
| Refonte ivesta-fo.com | Next.js, DA existante, SEO, animations | 5j |
| Multilingue FR/EN | i18n, traductions | 2j |
| Integration portail client | Bouton espace client, coherence DA | 1j |
| **Duree totale** | **2-3 semaines** | **8j** |
| **Prix** | **8 000 — 15 000 EUR HT** | |

### Phase 8 — IA Avancee & Automatisations
| Livrable | Detail | Effort |
|----------|--------|--------|
| Assistant IA interne | Chat contextuel RAG, notes RDV | 5j |
| Classification emails/docs | Connecteur email, OCR, auto-rangement | 4j |
| Alertes intelligentes | Detection anomalies, veille reglementaire | 3j |
| Previsions cashflow IA | Modele predictif capital calls | 3j |
| **Duree totale** | **4-6 semaines** | **15j** |
| **Prix** | **12 000 — 20 000 EUR HT** | |

---

## 4. Recapitulatif Budgetaire

| Phase | Description | Budget |
|-------|-------------|--------|
| 0 | Discovery & Maquette | **Offert** |
| 1 | Architecture Data & Backend | 18 000 — 25 000 EUR |
| 2 | Integrations Sources Donnees | 18 000 — 25 000 EUR |
| 3 | Modules Metier Core (SaaS) | 28 000 — 40 000 EUR |
| 4 | Compliance & Gestion Doc IA | 10 000 — 15 000 EUR |
| 5 | Reporting Client Automatise | 12 000 — 20 000 EUR |
| 6 | Portail Client & App Mobile | 18 000 — 28 000 EUR |
| 7 | Refonte Site Vitrine | 8 000 — 15 000 EUR |
| 8 | IA Avancee & Automatisations | 12 000 — 20 000 EUR |
| **TOTAL** | | **124 000 — 188 000 EUR HT** |

### Options de packaging

**MVP** (Phases 0+1+3 core) : **46 000 — 65 000 EUR**
- Architecture data, API, Dashboard, Dossier Client, Module Investissement

**V1** (MVP + Phases 2+4+5) : **86 000 — 125 000 EUR**
- + Integrations data live, Compliance, Reporting auto

**V2 Complete** (Toutes les phases) : **124 000 — 188 000 EUR**
- + App mobile, refonte site, IA avancee

---

## 5. Planning de Livraison

```
Mars 2026      [Phase 0] Discovery & Maquette ████
Avril 2026     [Phase 1] Backend ████████████████████
Mai 2026       [Phase 1] fin + [Phase 2] debut ████████████████
Juin 2026      [Phase 2] fin + [Phase 3] debut ██████████████████████
Juillet 2026   [Phase 3] Modules core ████████████████████████████
Aout 2026      [Phase 3] fin + [Phase 4] Compliance ████████████████
Septembre 2026 [Phase 5] Reporting + [Phase 6] App ████████████████████
Octobre 2026   [Phase 6] fin + [Phase 7] Site ████████████████
Novembre 2026  [Phase 8] IA Avancee ████████████████████
Decembre 2026  Tests finaux, go-live complet ████
```

### Jalons cles
- **Lundi 16 mars** : Maquette SaaS presentee aux fondateurs
- **Fin avril** : Backend MVP operationnel
- **Avant l'ete** : Premiers outils internes operationnels (Phase 3)
- **Septembre** : App client revampee et live
- **Fin d'annee** : Plateforme complete, reporting revolutionne

---

## 6. Conditions & Engagement

- **Facturation par phase** : devis valide avant demarrage de chaque phase
- **Paiement** : 40% au demarrage de phase, 60% a la livraison
- **Propriete du code** : iVesta est proprietaire de 100% du code source
- **Maintenance** : proposition de contrat TMA apres go-live (5-8k EUR/mois)
- **Garantie** : corrections de bugs gratuites pendant 3 mois apres chaque livraison
- **Confidentialite** : NDA signe, aucune donnee client accessible hors equipe
- **Hebergement EU** : serveurs Frankfurt (Railway/AWS), conformite RGPD/ACPR

---

*Document confidentiel — Alfred Builders x iVesta — Mars 2026*
