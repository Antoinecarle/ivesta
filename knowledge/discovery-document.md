# Phase 0 — Discovery & Conception
## Plateforme SaaS iVesta Family Office

### Vision Produit

iVesta SaaS est une plateforme unifiee qui regroupe l'ensemble des outils operationnels d'iVesta Family Office :
- **Dashboard central** : KPIs en temps reel, AUM, compliance, activite equipe
- **Module Investissement Cote** : données Bloomberg live, performance, allocation
- **Module Investissement Non-Cote** : suivi des fonds PE/VC/LBO/dette/immo, IRR, TVPI, DPI
- **Module CRM/Prospection** : pipeline commercial, contacts, suivi deals
- **Module Dossier Client** : fiches familles, patrimoine, historique decisions
- **Module Compliance** : KYC automatise, alertes, audit trail
- **Module Reporting** : generation automatique, commentaires IA, export PDF

### Architecture Technique

```
Frontend: React.js + TypeScript + Tailwind CSS (DA Ivesta)
Backend: Node.js Express + Python FastAPI (microservices)
Database: PostgreSQL (hebergement EU, chiffre)
IA: LangChain + RAG documentaire + Classification auto
APIs: Bloomberg, Preqin, Pitchbook, CFNews
Securite: JWT RBAC, chiffrement bout-en-bout, RGPD/ACPR
```

### Roles Utilisateurs (RBAC)

| Role | Acces | Exemples |
|------|-------|----------|
| Fondateur | Tout | Ariane, Christine, PM, Remi |
| Family Partner | Ses clients + dashboard global | Ayrton, Samy |
| Family Officer | Ses clients assignes | Equipe FO |
| Analyste | Donnees investissement (lecture/ecriture) | Nour, Thibault |
| Data Keeper | Saisie donnees | Analystes data |
| Client | Son propre patrimoine | Clients UHNW |

### Parcours Utilisateur — Family Partner

1. Connexion → Dashboard personnalise
2. Vue rapide : alertes compliance, deals en cours, reportings a valider
3. Clic sur une famille → Fiche client complete
4. Synthese patrimoniale interactive (cote + non-cote + immo + AV)
5. Pipeline prospection → Nouveau deal → Suivi automatise

### Parcours Utilisateur — Client

1. Connexion portail → Vue patrimoine globale
2. Performance en temps reel (cote Bloomberg live)
3. Suivi non-cote (NAV, distributions, capital calls prevus)
4. Documents (reportings, contrats, KYC)
5. Messagerie securisee avec son Family Officer

### Calendrier Previsionnel

| Phase | Duree | Debut | Fin |
|-------|-------|-------|-----|
| Phase 0 - Discovery | 1 sem | Sem 11 | Sem 11 |
| Phase 1 - Architecture | 5 sem | Sem 12 | Sem 16 |
| Phase 2 - Integrations | 4 sem | Sem 14 | Sem 17 |
| Phase 3 - Modules core | 7 sem | Sem 17 | Sem 23 |
| Phase 4 - Compliance IA | 4 sem | Sem 22 | Sem 25 |
| Phase 5 - Reporting | 4 sem | Sem 24 | Sem 27 |
| Phase 6 - Portail client | 5 sem | Sem 26 | Sem 30 |
| Phase 7 - Site vitrine | 3 sem | Sem 28 | Sem 30 |
| Phase 8 - IA avancee | 5 sem | Sem 29 | Sem 33 |

### Points Cles

- **Facturation par phase** : validation et devis avant chaque etape
- **Phase 0 offerte** : pour demontrer notre comprehension du besoin
- **Hebergement EU** : serveurs AWS Frankfurt, conformite RGPD
- **DA conservee** : palette Navy #000046 + Orange #FF810A
- **Compatible avec les outils existants** : migration progressive
