# RECAP COMPLET — Projet iVesta SaaS
## Derniere mise a jour : 13 mars 2026

Sources : Reunion matin (13/03), Reunion apres-midi (13/03), PDF synthese Ayrton, Mail prospection (12/03), Screenshots plateforme Nour

---

## 1. QUI EST IVESTA

- **Multi Family Office** haut de gamme
- **Siege :** Place Vendome, Paris + Bruxelles
- **~50 employes**, 100+ clients entrepreneurs, **5 milliards d'actifs conseilles**
- **Fondateurs :** Ariane Darmon ("maman"), Christine Vu Thien, Pierre-Marie de Forville, Remi Douchet
- **Boite creee il y a 8-9 ans**
- **"La boite cartonne"** mais veut devenir une fintech

---

## 2. LES PERSONNES CLES

| Nom | Role | Ce qu'il fait |
|---|---|---|
| **Ariane Darmon** | Fondatrice ("maman") | Decide des budgets, a investi 500k dans Minotore |
| **Ayrton Chaouchi** | Family Partner | Notre champion interne, 11 clients, pousse le projet IA |
| **Nour Bendimered** | Dir. Investissements | A construit ivesta-invest.com avec Manus, dashboard cote |
| **Thibault Barrey** | Analyste non-cote | Dashboard PE dark theme |
| **Samy Bouzid** | Analyste | Dashboard investissements clients |
| **Adrien Gabillet** | Family Officer | Utilisateur de la plateforme Nour |
| **Lucas Mazet** | Product Owner | Interlocuteur technique, gere l'app client |
| **Khadija Chetteoui** | Database Analyst / Data Keeper | Structuration data |

---

## 3. L'ECOSYSTEME TECHNIQUE ACTUEL

### Base de donnees Minotore (500k EUR investis, 40k EUR/an maintenance)
- Centralise donnees patrimoniales + investissements → reporting trimestriel
- Alimente par : Excel equipe investissement + saisie manuelle Family Officers
- Interface HTML en ligne, acces VPN obligatoire, ultra confidentiel
- **Unanimement detestee** : "2 semaines pour modifier un graph", "de la merde"
- Export de donnees faisable (probablement Excel ou API backend)
- **Sera abandonnee** — migration des donnees vers nouvelle archi

### App client Ivesta (Apple Store)
- Copie conforme du reporting trimestriel
- Mise a jour seulement tous les 3 mois
- Documents a signer via l'app
- Avis analystes qui remontent
- **"Ca fait 5 ans qu'on doit chier une appli, et on a chie cette bouille"**

### Site web ivesta-fo.com
- WordPress, "nul a chier" mais DA appreciee
- A refaire

### Plateforme de Nour (ivesta-invest.com)
- **Outil interne** pour l'equipe investissement (pas client-facing)
- Stack : probablement genere via Manus
- Auth avec roles (au moins "Family Officer")
- **Modules fonctionnels :** News & Analyses (Daily News avec RSS BBG/FT/Yahoo, Weekly, Point Macro, Analyses Thematiques, Sanity Checks), Vue Marches (Yahoo Finance, indices mondiaux), Public Markets (fiches produits AMC), Donnees Economiques (embed Investing.com), CR Points de Gestion
- **Module vide :** Private Markets ("page en cours de construction")
- **Sera integre** comme un aspect du SaaS global

### Outils internes
- Claude Enterprise (deja en place)
- Manus (IA Meta)
- Excel + Claude Excel
- Serveur de fichiers Microsoft (bordel)
- Penny Lane (facturation)
- API CFNews connectee a Excel (deals > 50M chaque lundi)
- Bloomberg (API pour cote)
- Preqin + Pitchbook (APIs pour non-cote)

---

## 4. LES ROLES UTILISATEURS (CONFIRMES)

| Role | Qui | Voit | Fait |
|---|---|---|---|
| **Fondateur** | Ariane, Christine, PM, Remi | TOUT + KPIs business | Pilotage, decisions |
| **Family Partner** | Ayrton, etc. | Ses clients + pipeline commercial | Prospection, relation client, gestion |
| **Family Officer** | Adrien G., etc. | Ses clients assignes | Reporting, compliance, flux, suivi jour/jour |
| **Analyste** | Nour, Thibault | Tous les fonds/actifs | MAJ data investissement, due diligences |
| **Data Keeper** | Khadija, Samy, assistants | Clients attribues | Virements, ouvertures contrats, souscriptions, saisie data |
| **Client** | Les familles (100+) | SON patrimoine uniquement | Lecture seule, signature docs, messaging |

**Cloisonnement confirme :** un Partner ne voit que ses propres clients. Un client ne voit que ses propres fonds.

---

## 5. STRUCTURE D'UN CLIENT

```
Famille Dupont (= 1 client, 1 facture)
├── M. Dupont (nom propre) → investissements cotes, fonds PE
├── Mme Dupont (epouse) → assurance-vie
├── Holding Dupont SAS → participations PE, fonds LBO
├── SCI Dupont Immo → immobilier locatif
├── Enfants Dupont → comptes dedies
└── [Parfois: trust, fondation]
```

- Un seul payeur par famille (parfois perso + holding)
- Facturation : grille degressive sur actifs de rendement (0-20M = 0.50%, 20-100M = 0.45%, etc.)
- Reequilibrage annuel debut d'annee
- Gere via Penny Lane (pas dans le SaaS)

---

## 6. LE PAIN POINT #1 : REPORTING CLIENT

> "Le reporting clients ca prend 30% du temps des Family Officers. C'est la priorite des priorites."

### Processus actuel
1. Donnees centralisees dans Minotore (saisie manuelle trimestrielle)
2. Export → PowerPoint/PDF
3. Retouches manuelles (format jamais bon)
4. Reunion trimestrielle avec le client : flux, performances, sujets en cours

### Vision future
- Acces en ligne permanent pour le client
- **Cote** : performance live via Bloomberg API
- **Non-cote** : revalorisation trimestrielle, flux automatises via API banques/assureurs
- Recaps des reunions integres dans l'outil
- Le reporting trimestriel "classique" devient obsolete

---

## 7. CE QU'ILS VEULENT DE NOUS

### Priorite 1 : Architecture data / Backend
> "La ou on va etre nul, c'est la structuration des donnees dans le back"
- Schema relationnel unifie
- Migration des donnees Minotore
- API securisee
- Hebergement EU

### Priorite 2 : SaaS unifie
- Un seul outil qui regroupe tout (Nour + Thibault + Samy + CRM + Compliance)
- Multi-roles avec acces differencies
- Plateforme de Nour = un module parmi d'autres

### Priorite 3 : Automatisation
- Classification auto des reportings de fonds
- Extraction data des PDFs
- Alimentation auto des dossiers
- Workflow compliance (crons KYC, alertes expiration)

### Ce qu'ils veulent faire eux-memes
- Le front-end (avec Claude et Manus)
- Le CRM prospection simple (mini CRM)
- Les dashboards clients (ils ont la vision client)

---

## 8. CONCEPT IMPORTANT : FUND NEWS

Quand un fonds PE achete/vend une boite → notification personnalisee aux clients investis dans ce fonds.
> "Les clients adorent. Parfois ils sont actionnaires de boites de leur secteur."
Actuellement fait manuellement. A automatiser dans le SaaS.

---

## 9. BUDGET & TIMELINE

| Reference | Montant |
|---|---|
| HubSpot CRM (annule) | 40k EUR |
| Base Minotore (investie) | 500k EUR |
| Maintenance Minotore/an | 40k EUR |
| Notre estimation MVP | 40-60k EUR |
| Notre estimation V1 | 80-120k EUR |
| Notre estimation V2 | 150-200k EUR |

**Pricing demande** : par phase, fourchettes larges, pas de facture globale

### Deadlines
- **Lundi 16 mars 9h** : maquette SaaS + pricing + macro-planning
- **Avant l'ete** : premiers outils operationnels internes
- **Septembre** : app client revampee et live
- **Fin d'annee** : reporting client revolutionne

### Contexte politique
- **Mise en concurrence** avec 2-3 entreprises
- Ayrton = champion interne, fondateurs decident
- Lundi prochain = reunion #2 IA, reworking du masterplan
- Il faut "preempter" = montrer des choses concretes pour que les fondateurs valident

---

## 10. DECISIONS POUR LA MAQUETTE

### Style
- **Style CLAIR** (navy/beige/blanc comme la DA iVesta)
- Garder la DA existante d'iVesta
- Design system a sauvegarder dans design-system.md

### Contenu de la maquette
- **Option A + B + C** : vision large + pages poussees + parcours utilisateur complet

### Modules a maquetter (par priorite)
1. **Dashboard fondateurs** — KPIs business (CA, CA/partner, CA/officer, budget, clients, AUM)
2. **Dashboard Family Partner** — mes clients, mes objectifs, mon pipeline
3. **Fiche client / patrimoine consolide** — cote + non-cote + immo + assurance-vie, vue famille
4. **Reporting client live** — version en ligne du reporting trimestriel
5. **Module investissement non-cote** — fonds PE, NAV, TVPI, DPI, RVPI, TRI (KPIs du dashboard Samy)
6. **Module investissement cote** — performance, allocation, benchmarks
7. **Fund News** — notifications par fonds personnalisees
8. **CRM mini** — pipeline commercial, deals CFNews, rappels
9. **Compliance** — alertes KYC, documents, expirations
10. **Espace interne (module Nour)** — news, analyses, veille marches

### Donnees de demo
- Noms de fonds reels (Ardian, Balderton, Eurazeo, Tikehau, etc.)
- Noms de familles fictifs
- KPIs realistes

---

## 11. SOURCES DE DONNEES A INTEGRER (FUTUR)

| Source | Type | API ? | Usage |
|---|---|---|---|
| Bloomberg | Cours cote live | Oui (a confirmer le plan) | Performance cote temps reel |
| Preqin | Donnees PE/VC | Oui | Metadata fonds, benchmarks |
| Pitchbook | Donnees PE/VC | Oui | Complementaire Preqin |
| CFNews | Deals M&A | Oui (deja connectee en Excel) | Prospection, deals > 50M |
| Investing.com | Calendrier eco | Widget/embed | Donnees macro |
| Yahoo Finance | Indices, valeurs | API gratuite | Vue marches |
| Reportings fonds (email/PDF) | KPIs trimestriels | OCR/IA | Non-cote, NAV, capital calls |
| Releves bancaires | Flux clients | API banques ? | Mouvements de comptes |
| Minotore | Donnees historiques | Export | Migration |

---

## 12. FICHIERS DU PROJET KNOWLEDGE

| Fichier | Contenu |
|---|---|
| `reunion-13-mars-2026-transcription.md` | Transcription + resume reunion matin |
| `reunion-13-mars-2026-apres-midi-transcription.md` | Transcription + resume reunion apres-midi |
| `mail-12-mars-2026.md` | Mail de prospection + contexte |
| `phases-projet-ivesta.md` | Phases 0-8 detaillees avec budgets |
| `RECAP-PROJET-IVESTA.md` | **CE FICHIER** — recap complet consolide |

### PDFs (uploads)
| Fichier | Contenu |
|---|---|
| `2900a4ce-...pdf` | Document Ayrton : 4 chantiers digitaux + screenshots BDD Minotore + schema BDD Nour + dashboard PE Samy |
| `305d922d-...pdf` | Screenshots plateforme Nour (9 pages) |
| `5c50e992-...m4a` | Audio reunion matin (non transcrit) |
| `27d7ab0e-...m4a` | Audio reunion apres-midi (transcrit) |
