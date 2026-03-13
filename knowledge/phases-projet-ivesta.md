# Phases du projet Ivesta — SaaS Family Office

Document de phases detaillees base sur :
- Mail de prospection du 12 mars 2026
- Reunion avec Ayrton Chaouchi (Family Partner) du 13 mars 2026

---

## Phase 0 — Discovery & Maquette de pre-vente
**Duree estimee : 3-5 jours (URGENT — deadline lundi 9h)**
**Objectif : Convaincre les fondateurs avec une vision tangible**

### Livrables
- Maquette interactive du SaaS Ivesta (sans backend, front uniquement)
- Vision produit : structure des modules, navigation, roles utilisateurs
- Document de pricing par phase
- Presentation des cas d'usage concrets pour Ivesta

### Details
- Montrer l'unification des outils separes (Nour, Thibault, Ayrton/Samy) dans une seule plateforme
- Reprendre la DA existante d'Ivesta (palette navy/beige/blanc, angles droits, typo bold)
- Montrer les differents niveaux d'acces : fondateurs (tout), Family Partners (leurs clients), analystes (data saisie)
- Integrer les screenshots des outils qu'ils ont deja developpes pour montrer la continuite
- Maquette du dashboard client, du module investissement, du module compliance

---

## Phase 1 — Architecture Data & Backend fondation
**Duree estimee : 4-6 semaines**
**Objectif : Structurer toute la donnee Ivesta de maniere propre et scalable**
**C'est LA priorite identifiee par Ayrton : "la ou on va etre nul, c'est la structuration des donnees dans le back"**

### 1.1 — Modelisation de la base de donnees
- Schema relationnel complet : familles, entites juridiques, comptes, actifs, fonds, transactions
- Gestion multi-entites : holdings, SCI, trusts, fondations + liens entre elles
- Hierarchie des actifs : cote (actions, obligations, OPCVM) vs non-cote (PE, VC, LBO, immo, dette)
- Tables des fonds : metadata, NAV, capital calls, distributions, reporting dates
- Tables clients : profils famille, membres, preferences, historique decisions
- Tables compliance : KYC, documents, dates expiration, statuts
- Modele RBAC : roles (fondateur, partner, officer, analyste, data keeper, client)

### 1.2 — API Backend robuste
- API REST securisee (Node.js/Express ou Python/FastAPI selon choix technique)
- Authentification JWT + roles + permissions granulaires
- Endpoints CRUD pour chaque entite (clients, fonds, actifs, documents, reporting)
- Middleware de securite : rate limiting, validation input, audit trail automatique
- Logging complet de toutes les actions (qui a fait quoi, quand)

### 1.3 — Infrastructure securisee
- Hebergement serveurs EU (AWS Francfort ou GCP Belgique)
- Base de donnees PostgreSQL avec chiffrement au repos
- Chiffrement en transit (TLS 1.3)
- Backups automatiques quotidiens
- Environnements separes : dev, staging, production
- CI/CD pipeline

### Budget estime : 15 000 - 25 000 EUR

---

## Phase 2 — Integrations sources de donnees
**Duree estimee : 3-5 semaines (peut demarrer en parallele de la Phase 1)**
**Objectif : Automatiser l'alimentation des donnees au lieu du travail manuel des analystes**

### 2.1 — Integration Bloomberg API (investissement cote)
- Connexion API Bloomberg pour les donnees de marche en temps reel
- Cours des actions, obligations, OPCVM en live
- Calcul automatique des performances (TWR, MWR)
- Historique des cours et des NAV
- Push automatique vers le dashboard client (data live, plus de reporting trimestriel statique)

### 2.2 — Integration Preqin API (private markets)
- Connexion API Preqin (base de donnees PE/VC/dette/immo)
- Import automatique des metadata de fonds
- NAV, capital calls, distributions, IRR, TVPI, DPI
- Benchmarks sectoriels
- Mise a jour automatique periodique

### 2.3 — Integration Pitchbook API (private markets complementaire)
- Connexion API Pitchbook
- Donnees complementaires sur les fonds et les deals
- Comparaisons et benchmarks
- Enrichissement des fiches fonds

### 2.4 — Import automatise des reportings fonds (email/PDF)
- Connecteur email (IMAP) pour capter les reportings recus par mail
- OCR + IA sur les PDF de reporting trimestriels
- Extraction automatique des KPIs : NAV, performance, capital calls, distributions
- Classification automatique dans le bon dossier du bon fonds
- Alerte aux analystes pour validation humaine avant integration
- Historisation des versions de reporting

### 2.5 — Migration des donnees existantes
- Import du "gros Excel" des analystes (base de donnees actuelle des fonds non-cotes)
- Mapping des colonnes vers le nouveau schema
- Validation et nettoyage des donnees
- Import des donnees de l'ancienne base de donnees (celle a 500k EUR) si pertinent

### Budget estime : 15 000 - 25 000 EUR

---

## Phase 3 — Modules metier core (SaaS interne)
**Duree estimee : 6-8 semaines**
**Objectif : La plateforme unifiee que les fondateurs veulent — tous les outils dans un meme espace**

### 3.1 — Module Dashboard Central
- Vue d'ensemble par Family Partner : ses clients, ses AUM, alertes
- Vue fondateurs : KPIs globaux, activite equipe, pipeline
- Widgets personnalisables
- Filtres par famille, par type d'actif, par periode

### 3.2 — Module Investissement Cote (unifier le travail de Nour)
- Dashboard portfolio cote par client
- Performance en temps reel (via Bloomberg API)
- Allocation par classe d'actif, geographie, secteur
- Historique de transactions
- Alertes de marche personnalisees
- Comparaison avec benchmarks

### 3.3 — Module Investissement Non-Cote (unifier le travail de Thibault)
- Dashboard portfolio private equity/VC/LBO/dette/immo par client
- Suivi des capital calls et distributions (passe et previsionnel)
- NAV et performance par fonds (IRR, TVPI, DPI, RVPI)
- Pipeline des nouveaux fonds en cours d'analyse
- Fiches fonds detaillees (alimentees par Preqin/Pitchbook + reporting)
- J-curve et previsions de cashflow

### 3.4 — Module CRM / Prospection (unifier le travail d'Ayrton/Samy)
- Pipeline commercial : prospects, RDV, propositions, signatures
- Fiches contacts enrichies
- Suivi des deals en cours
- Attribution des leads entre Family Partners
- Dashboard activite commerciale
- Historique des interactions

### 3.5 — Module Dossier Client (Family File)
- Fiche famille complete : membres, arbre familial, patrimoine global
- Historique de toutes les decisions et recommandations
- Preferences d'investissement, contraintes, objectifs
- Synthese patrimoniale (cote + non-cote + immo + assurance vie + tresorerie)
- Timeline des interactions (RDV, mails, appels)
- Notes de reunion structurees

### 3.6 — Module Fiches Fonds / Base de connaissances interne
- Interface en ligne pour les analystes (remplacement du serveur de fichiers)
- Fiches fonds structurees et a jour
- Dernieres donnees, derniers reportings, analyse des analystes
- Recherche intelligente (par strategie, geographie, vintage, taille)
- Acces lecture pour les Family Officers, ecriture pour les analystes
- Historique des modifications

### Budget estime : 25 000 - 40 000 EUR

---

## Phase 4 — Compliance & Gestion documentaire IA
**Duree estimee : 3-4 semaines**
**Objectif : Automatiser la conformite reglementaire (ACPR/AMF/RGPD)**

### 4.1 — Gestion documentaire intelligente
- Upload de documents (contrats, KYC, statuts, polices, actes)
- Classification automatique par IA (type de doc, client, entite juridique)
- Extraction des donnees cles (dates, montants, parties, echeances)
- Recherche full-text dans tous les documents
- Versionning des documents

### 4.2 — Workflows compliance automatises
- Suivi KYC par client : statut, documents manquants, dates de renouvellement
- Cron quotidien/hebdomadaire : re-analyse des documents
- Alertes automatiques : carte d'identite expiree, justificatif de domicile > 3 mois, etc.
- Alertes envoyees au bon Family Officer (celui qui gere le client)
- Workflow de validation : demande de renouvellement → client notifie → document recu → valide par compliance
- Audit trail complet de chaque verification

### 4.3 — Reporting compliance
- Dashboard compliance global : % de clients a jour, alertes en cours
- Export pour les controles ACPR/AMF
- Historique complet des verifications

### Budget estime : 10 000 - 15 000 EUR

---

## Phase 5 — Reporting client automatise
**Duree estimee : 3-5 semaines**
**Objectif : Remplacer la base de donnees a 500k EUR et le processus de reporting manuel**

### 5.1 — Templates de reporting personnalises
- Reprendre les modeles existants d'Ivesta (garder la DA)
- Templates modulaires : synthese patrimoniale, detail cote, detail non-cote, performance, allocation
- Generation automatique a partir des donnees en base
- Commentaires generes par IA (analyse de performance, faits marquants du trimestre)
- Validation humaine avant envoi au client

### 5.2 — Reporting trimestriel automatise
- Generation batch de tous les reportings clients
- Chaque Family Officer valide ses reportings
- Export PDF haute qualite (DA Ivesta)
- Envoi automatise ou via le portail client
- Archivage automatique

### 5.3 — Dashboard temps reel (remplacement reporting statique)
- Pour l'investissement cote : data live via Bloomberg
- Pour le non-cote : data mise a jour a chaque nouveau reporting de fonds
- Le client voit son patrimoine en temps reel (plus besoin d'attendre le reporting trimestriel)

### Budget estime : 10 000 - 20 000 EUR

---

## Phase 6 — Portail client / Application mobile
**Duree estimee : 4-6 semaines**
**Objectif : Rendre l'app client "vraiment differente, live, digitale" (objectif septembre)**

### 6.1 — Refonte du portail client web (app.ivesta-fo.com)
- Nouveau design UX/UI (garder la DA Ivesta, rendre plus digital et moins financier)
- Vue patrimoine en temps reel (cote live, non-cote actualise)
- Synthese patrimoniale interactive (graphiques, allocation, performance)
- Acces aux documents (reportings, contrats, KYC)
- Messagerie securisee avec son Family Officer
- Notifications (alertes, nouveaux reportings, demandes de documents)
- Signature electronique integree

### 6.2 — Application mobile (refonte)
- Design mobile-first, UX digitale (moins "financiere", plus "tech")
- Memes fonctionnalites que le portail web
- Push notifications
- Authentification biometrique (Face ID / Touch ID)
- Mode hors-ligne pour consultation

### Budget estime : 15 000 - 25 000 EUR

---

## Phase 7 — Refonte site vitrine ivesta-fo.com
**Duree estimee : 2-3 semaines**
**Objectif : "Le site est nul, la DA est trop cool, il faut le refaire" — Ayrton**

### 7.1 — Refonte complete du site
- Garder la direction artistique actuelle (palette navy/beige/blanc, angles droits, typo bold)
- Migrer de WordPress vers un site moderne (Next.js ou equivalent)
- Pages : Accueil, Manifeste, Valeurs, Offre, Equipe, Contact, Presse
- Animations fluides, transitions elegantes
- SEO optimise
- Performance optimale (Core Web Vitals)
- Multilingue (FR / EN / EN-US)

### 7.2 — Integration avec le portail client
- Bouton "Espace client" → redirection vers le nouveau portail
- Coherence visuelle entre le site et l'app

### Budget estime : 8 000 - 15 000 EUR

---

## Phase 8 — IA avancee & automatisations
**Duree estimee : 4-6 semaines (peut commencer des la Phase 3)**
**Objectif : L'intelligence artificielle qui fait la difference concurrentielle**

### 8.1 — Assistant IA interne (pour les Family Officers)
- Chat IA contextuel : "Quel est le patrimoine total de la famille Dupont ?"
- RAG sur la base documentaire interne (reportings, notes, fiches fonds)
- Generation de notes de synthese avant un RDV client
- Suggestions d'investissement basees sur le profil du client

### 8.2 — Classification automatique des emails/documents entrants
- Connecteur email : detection automatique des reportings de fonds
- Classification : quel fonds, quel trimestre, quel type de document
- Rangement automatique dans le bon dossier
- Extraction des KPIs et alimentation de la base de donnees
- Alerte a l'analyste pour validation

### 8.3 — Alertes intelligentes
- Detection d'anomalies (chute de NAV, retard de reporting, mouvements inhabituels)
- Alertes contextuelles : envoyees uniquement au Family Officer concerne
- Veille reglementaire : changements de loi impactant certains clients
- Previsions de cashflow (capital calls a venir)

### Budget estime : 10 000 - 20 000 EUR

---

## Recapitulatif budgetaire par phase

| Phase | Description | Duree | Budget estime |
|-------|-------------|-------|---------------|
| 0 | Discovery & Maquette | 3-5 jours | Offert / inclus |
| 1 | Architecture Data & Backend | 4-6 sem | 15 000 - 25 000 EUR |
| 2 | Integrations sources de donnees | 3-5 sem | 15 000 - 25 000 EUR |
| 3 | Modules metier core (SaaS) | 6-8 sem | 25 000 - 40 000 EUR |
| 4 | Compliance & Gestion doc IA | 3-4 sem | 10 000 - 15 000 EUR |
| 5 | Reporting client automatise | 3-5 sem | 10 000 - 20 000 EUR |
| 6 | Portail client & App mobile | 4-6 sem | 15 000 - 25 000 EUR |
| 7 | Refonte site vitrine | 2-3 sem | 8 000 - 15 000 EUR |
| 8 | IA avancee & automatisations | 4-6 sem | 10 000 - 20 000 EUR |
| **TOTAL** | | **6-12 mois** | **108 000 - 185 000 EUR** |

### Approche de facturation recommandee
- **Phase par phase** (comme demande par Ayrton)
- Devis par phase, validation avant demarrage de la suivante
- Phases 1 et 2 peuvent se faire en parallele
- Phase 0 offerte pour gagner le deal

### Priorites selon Ayrton
1. **Phase 0** — URGENT (maquette pour lundi matin)
2. **Phase 1** — "C'est le truc prioritaire" (architecture data/backend)
3. **Phase 2** — Integration des sources de donnees (Bloomberg, Preqin, Pitchbook)
4. **Phase 3** — Unification des outils (Nour + Thibault + Ayrton) dans un SaaS commun
5. **Phase 5** — Remplacement de la base de donnees a 500k EUR
6. **Phase 6** — Portail client revampe (deadline : septembre)
7. **Phase 7** — Refonte site (demande explicite d'Ayrton)

---

## Informations cles de la reunion

### Contexte interne Ivesta
- Ils etaient sur le point de signer HubSpot CRM a 40k EUR → annule grace a Claude/IA
- Base de donnees de reporting actuelle : 500k EUR investis, 40k EUR/an de maintenance, "nulle a chier"
- Plusieurs equipes developpent des outils separement avec Claude/Manus :
  - Nour Bendimered : dashboard investissement cote
  - Thibault Barrey : dashboard investissement non-cote
  - Ayrton/Samy : outil CRM/prospection + dashboard client
- Les fondateurs veulent une plateforme unifiee

### Ce qu'ils veulent de nous
- Principalement le **backend / architecture data** (ils pensent pouvoir faire le front avec l'IA)
- Mais aussi : refonte site, refonte app mobile, compliance, reporting
- Ayrton veut une maquette pour convaincre les fondateurs lundi 9h

### Points de vigilance
- **Mise en concurrence** : Ivesta consultera 2-3 entreprises
- **Confidentialite** : donnees sur serveurs EU, Claude Entreprise deja en place
- **DA a garder** : la direction artistique actuelle est validee, ne pas la changer
- **Ils utilisent Claude + Manus** : ils sont tech-savvy, ne pas les sous-estimer
- **Ayrton est notre champion interne** : c'est lui qui pousse le projet aupres des fondateurs
