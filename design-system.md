# Ivesta — Design System

Source : Charte graphique officielle iVesta (PDF confidentiel 2023) + CSS site ivesta-fo.com
Mise a jour : Mars 2026

---

## 1. Logo

### Variantes du logo

| Variante | Description | Usage |
|----------|-------------|-------|
| **Logo complet empile** | "i ves ta" empile sur 3 lignes, police Moret, avec tagline circulaire "LE CHOIX D'ETRE LIBRE" | Header principal, documents officiels |
| **Logo complet sur fond gris** | Meme logo sur fond #F7F7F9 | Supports imprimes, presentations |
| **Monogramme V** | Lettre "V" stylisee avec tagline circulaire autour | Favicon, icone app, avatar, espaces reduits |

### Tagline
- Texte : **"LE CHOIX D'ETRE LIBRE"**
- Disposition : en cercle autour du logo/monogramme
- Police : Sailec uppercase, letter-spacing large

### Regles d'utilisation
- Toujours respecter une zone de protection autour du logo
- Le logo Navy (#000046) sur fond blanc ou gris clair (#F7F7F9)
- Le logo blanc sur fond Navy (#000046)
- Ne jamais deformer, incliner ou modifier les proportions

---

## 2. Palette de couleurs (OFFICIELLE — Charte graphique iVesta)

### Couleurs principales
| Nom | Hex | RGB | Usage |
|-----|-----|-----|-------|
| **Navy Night** | `#000046` | 0, 0, 70 | Couleur primaire, texte principal, fonds sombres, boutons |
| **Orange Ivesta** | `#FF8217` | 255, 130, 23 | Accent principal, CTA, hover, liens actifs, icones |
| **Rouge Ivesta** | `#CD002D` | 205, 0, 45 | Accent fort, alertes, erreurs, notifications critiques |

### Couleurs secondaires (tintes etendues)
| Nom | Hex | RGB | Usage |
|-----|-----|-----|-------|
| **Sage / Vert Menthe** | `#E3F1EC` | 227, 241, 236 | Fonds cartes succes, indicateurs positifs, variantes |
| **Saumon / Rose** | `#FFB9AD` | 255, 185, 173 | Accent complementaire, cartes, badges doux |
| **Creme / Beige** | `#FAEBDC` | 250, 235, 220 | Fonds cartes, sections alternees, warmth |

### Couleurs d'interface
| Nom | Hex | Usage |
|-----|-----|-------|
| Charcoal | `#231F20` | Texte secondaire, sous-titres |
| Gris Fond | `#F7F7F9` | Fond page, sections, fond logo |
| Blanc | `#FFFFFF` | Fonds, cartes, texte sur fond sombre |
| Orange Doux | `#FFBC7D` | Transition de page, accents legers |

### Palette complete resumee
```
PRIMAIRES :
  Navy Night      #000046    RGB(0, 0, 70)
  Orange Ivesta   #FF8217    RGB(255, 130, 23)
  Rouge Ivesta    #CD002D    RGB(205, 0, 45)

SECONDAIRES :
  Sage            #E3F1EC    RGB(227, 241, 236)
  Saumon          #FFB9AD    RGB(255, 185, 173)
  Creme           #FAEBDC    RGB(250, 235, 220)

NEUTRES :
  Charcoal        #231F20
  Gris Fond       #F7F7F9
  Blanc           #FFFFFF

TRANSITION :
  Orange Doux     #FFBC7D
```

### Systeme de couleurs pour graphiques (Charts)
Pour les donut charts, bar charts et visualisations de donnees, utiliser dans cet ordre :
1. **Navy Night** `#000046` — categorie principale / la plus grande part
2. **Orange Ivesta** `#FF8217` — deuxieme categorie / accent
3. **Saumon** `#FFB9AD` — troisieme categorie
4. **Sage** `#E3F1EC` — quatrieme categorie
5. **Rouge Ivesta** `#CD002D` — cinquieme categorie / alerte
6. **Creme** `#FAEBDC` — sixieme categorie
7. **Orange Doux** `#FFBC7D` — categorie supplementaire
8. **Charcoal** `#231F20` — categorie supplementaire

### Principe
- Dominante **blanc + gris clair (#F7F7F9)** pour les fonds
- **Navy Night (#000046)** pour le texte et les elements structurants
- **Orange (#FF8217)** pour les CTA, hover, liens actifs, accents
- **Creme (#FAEBDC)** pour les cartes et sections alternees
- **Sage (#E3F1EC)** et **Saumon (#FFB9AD)** pour les variantes de cartes
- **Rouge (#CD002D)** utilise avec parcimonie pour les alertes ou accents forts

---

## 3. Typographie (OFFICIELLE — Charte graphique iVesta)

### Familles de police

| Police | Type | Poids disponibles | Usage |
|--------|------|-------------------|-------|
| **Moret** | Serif condensee (Book) | Book (400) | Logo, titres display, headings principaux |
| **Sailec** | Sans-serif geometrique | Regular (400), Medium (500), Bold (700) + Italiques | Navigation, labels, body, UI, boutons |

### Moret (Display / Headings)
- **Fichier** : Moret-Book.otf
- Police serif condensee avec caractere editorial/premium
- Utilisee pour le logo "i ves ta" et tous les titres importants
- Remplace Roboto Slab du site web actuel
- Style : elegant, raffine, avec des empattements fins

### Sailec (UI / Body / Navigation)
- **Variantes** :
  - Sailec-Regular (400)
  - Sailec-RegularItalic (400 italic)
  - Sailec-Medium (500)
  - Sailec-MediumItalic (500 italic)
  - Sailec-Bold (700)
  - Sailec-BoldItalic (700 italic)
- Police sans-serif geometrique, clean et moderne
- Utilisee pour toute l'interface : navigation, body, boutons, labels, inputs

### Echelle typographique
| Niveau | Taille | Poids | Police | Usage |
|--------|--------|-------|--------|-------|
| Nav items | 11px | 500 (Medium) | Sailec | Navigation, uppercase, letter-spacing 2px |
| Caption | 12px | 400 (Regular) | Sailec | Mentions legales, legendes, metadata |
| Small | 13px | 400 (Regular) | Sailec | Labels secondaires, helper text |
| Body | 15px | 400 (Regular) | Sailec | Texte courant |
| Body Large | 17px | 400 (Regular) | Sailec | Texte courant agrandi, introductions |
| H4 / Label | 14px | 700 (Bold) | Sailec | Labels de section, categories |
| H3 / Subtitle | 20px | 500 (Medium) | Sailec | Sous-titres, noms |
| H2 / Section | 32px | 400 (Book) | Moret | Titres de sections |
| H1 / Display | 42px | 400 (Book) | Moret | Titres hero, grands titres |
| Display XL | 56px | 400 (Book) | Moret | Mega titres, chiffres KPI |

### Line-height
- Corps (Sailec) : 1.5 a 1.6
- Titres (Moret) : 1.1 a 1.25

---

## 4. Espacement (Spacing)

### Echelle
| Token | Valeur | Usage |
|-------|--------|-------|
| xs | 4px | Micro-espaces, gaps icones |
| sm | 8px | Padding interne, gaps compacts |
| md | 16px | Gap standard, padding cartes |
| lg | 24px | Gap grille, marges blocs |
| xl | 32px | Separation elements majeurs |
| 2xl | 48px | Separation sections |
| 3xl | 64px | Grandes sections, hero |
| 4xl | 80px | Separation sections majeures |

### Principes
- **16px** (1rem) est l'unite de base
- Cartes : padding 24px
- Sections separees par 48-80px
- Navigation : gap entre items proportionnel

---

## 5. Layout & Grille

### Conteneurs
| Type | Largeur max |
|------|-------------|
| Container max | 1280px |
| Container content | 1140px |
| Tablet | 1024px |
| Mobile | 767px |

### Systeme de grille
- **CSS Grid** + **Flexbox** comme systemes principaux
- Gap par defaut : 24px
- Sidebar : 260px (fixe ou collapsable)
- Main content : flex-1

### Breakpoints
| Nom | Largeur |
|-----|---------|
| Mobile | max-width: 767px |
| Tablet | max-width: 1024px |
| Desktop | min-width: 1025px |
| Wide | min-width: 1440px |

---

## 6. Composants

### Boutons
```
Primaire :
- Background : #000046 (navy)
- Texte : #FFFFFF
- Border-radius : 0px
- Font : Sailec Medium (500), 14px
- Padding : 12px 24px
- Transition : 0.3s ease-in-out
- Hover : background #FF8217 (orange)

Secondaire :
- Background : transparent
- Border : 1px solid #000046
- Texte : #000046
- Hover : background #000046, texte #FFFFFF

Ghost / Tertiaire :
- Background : transparent
- Texte : #000046
- Hover : texte #FF8217
- Underline optionnel
```

### Navigation (Header sticky)
```
- Position : sticky, top: 0, z-index: 50
- Background : #FFFFFF
- Border-bottom : 1px solid #E5E7EB (gris subtil)
- Logo : 85px (desktop), 50px (mobile)
- Police items : Sailec Medium, 11px, uppercase, letter-spacing 2px
- Couleur items : #000046
- Couleur hover : #FF8217
- Couleur active : #FF8217
- Sous-menu : border-top 2px solid #FF8217
```

### Sidebar (SaaS)
```
- Largeur : 260px
- Background : #000046 (navy)
- Texte items : #FFFFFF, Sailec Regular, 14px
- Texte items hover : #FF8217
- Item actif : background rgba(255, 130, 23, 0.1), border-left 3px solid #FF8217
- Logo en haut : version blanc/monogramme
- Padding : 16px
- Separateurs : rgba(255, 255, 255, 0.1)
```

### Cartes
```
Standard :
- Background : #FFFFFF
- Border : 1px solid #E5E7EB
- Border-radius : 0px (angles droits = signature iVesta)
- Padding : 24px
- Shadow : none par defaut
- Hover : shadow 0 2px 8px rgba(0, 0, 70, 0.08)

Accent (couleur) :
- Background : #FAEBDC (creme) ou #E3F1EC (sage) ou #FFB9AD (saumon)
- Pas de border
- Texte : #000046
```

### KPI Cards
```
- Background : #FFFFFF
- Border : 1px solid #E5E7EB
- Padding : 24px
- Valeur : Moret Book, 32-42px, #000046
- Label : Sailec Regular, 13px, #231F20 (charcoal)
- Icone : 20px, couleur #FF8217 ou selon contexte
- Tendance positive : #16A34A (vert)
- Tendance negative : #CD002D (rouge)
```

### Tables
```
- Header : background #F7F7F9, Sailec Medium 13px, uppercase, #000046
- Rows : border-bottom 1px solid #E5E7EB
- Cell : Sailec Regular 14px, padding 12px 16px
- Hover row : background #F7F7F9
- Alternance : optionnelle (blanc / #FAFAFA)
```

### Inputs & Forms
```
- Border : 1px solid #D1D5DB
- Border-radius : 0px
- Padding : 10px 14px
- Font : Sailec Regular, 15px
- Focus : border-color #000046, ring 2px rgba(0, 0, 70, 0.1)
- Error : border-color #CD002D
- Label : Sailec Medium, 13px, #000046, margin-bottom 6px
```

### Badges / Tags
```
- Font : Sailec Medium, 12px
- Padding : 4px 10px
- Border-radius : 0px
- Variantes :
  - Default : bg #F7F7F9, text #000046
  - Success : bg #E3F1EC, text #16A34A
  - Warning : bg #FAEBDC, text #B45309
  - Error : bg #FEE2E2, text #CD002D
  - Info : bg #E0E7FF, text #000046
  - Orange : bg rgba(255, 130, 23, 0.1), text #FF8217
```

### Tooltips
```
- Background : #000046
- Text : #FFFFFF
- Font : Sailec Regular, 13px
- Padding : 8px 12px
- Border-radius : 0px
```

---

## 7. Animations & Transitions

### Transitions globales
| Type | Duree | Easing |
|------|-------|--------|
| Default | 0.2s | ease-in-out |
| Hover cartes | 0.3s | ease-in-out |
| Modals | 0.2s | ease-out |
| Sidebar collapse | 0.3s | ease-in-out |
| Page transition bg | instant | #FFBC7D |

### Effets specifiques
- **Cartes :** Shadow apparait au hover
- **Boutons :** Background change avec transition smooth
- **Sidebar items :** Color transition au hover
- **Smooth scroll** sur toute la page

---

## 8. Ombres (Shadows)

| Nom | Valeur | Usage |
|-----|--------|-------|
| sm | `0 1px 2px rgba(0, 0, 70, 0.05)` | Elements subtils |
| md | `0 2px 8px rgba(0, 0, 70, 0.08)` | Cartes hover, dropdowns |
| lg | `0 4px 16px rgba(0, 0, 70, 0.12)` | Modals, elements flottants |
| xl | `0 8px 32px rgba(0, 0, 70, 0.16)` | Overlays, grands modals |

### Principe
- Design majoritairement **flat** (sans ombre par defaut)
- Ombres utilisees au **hover** et pour les elements **flottants**
- Couleur de base des ombres : navy rgba(0, 0, 70, x) et non noir

---

## 9. Bordures & Border Radius

| Element | Radius | Bordure |
|---------|--------|---------|
| Boutons | 0px | Aucune (primaire) / 1px solid navy (secondaire) |
| Cartes | 0px | 1px solid #E5E7EB |
| Inputs | 0px | 1px solid #D1D5DB |
| Modals | 0px | Aucune |
| Badges | 0px | Aucune |
| Avatars | 50% (cercle) | Aucune |

### Principe
- **Angles droits partout** (0px border-radius) = signature visuelle iVesta
- Seule exception : avatars et icones circulaires
- Style architectural, rigide, premium

---

## 10. Iconographie

- Bibliotheque : **Lucide React** (line icons, 1.5px stroke)
- Taille par defaut : 20px
- Couleur par defaut : #000046 (navy)
- Couleur hover : #FF8217 (orange)
- Icons toujours accompagnees de labels dans la navigation
- Social icons : couleur par defaut #FF8217, hover = couleur de la plateforme

---

## 11. Identite de marque

### Personnalite
- **Sobre** — pas de couleurs flashy (sauf l'orange en accent)
- **Premium** — angles droits, espacement genereux, typo mixte serif/sans
- **Institutionnel** — structure claire, hierarchie lisible
- **Chaleureux** — le creme, l'orange, le saumon apportent de la chaleur
- **Francais** — identite francaise, contenu bilingue FR/EN

### Ce qui rend le design reconnaissable
1. La palette **navy #000046 + orange #FF8217 + creme #FAEBDC**
2. Les **angles droits partout** (0px radius)
3. La police **Moret** (serif condensee) pour les titres
4. La police **Sailec** (sans-serif) pour toute l'interface
5. Le contraste **fond blanc/gris clair** + **texte navy profond**
6. Les accents **orange** sur les elements interactifs
7. Le fond orange doux (#FFBC7D) pour les transitions
8. Le trait orange 2px sur les sous-menus et elements actifs

---

## 12. Tokens CSS (pour implementation)

```css
:root {
  /* ═══════════ COLORS ═══════════ */
  /* Primary */
  --color-primary: #000046;           /* Navy Night — texte, fonds sombres, sidebar */
  --color-accent: #FF8217;            /* Orange Ivesta — CTA, hover, accents */
  --color-danger: #CD002D;            /* Rouge Ivesta — alertes, erreurs */

  /* Extended palette */
  --color-sage: #E3F1EC;              /* Sage — cartes vertes, indicateurs succes */
  --color-salmon: #FFB9AD;            /* Saumon — accents doux, cartes */
  --color-cream: #FAEBDC;             /* Creme — fonds cartes, sections alternees */
  --color-transition: #FFBC7D;        /* Orange Doux — transitions, accents legers */

  /* Success / Warning */
  --color-success: #16A34A;           /* Vert — tendances positives */
  --color-warning: #B45309;           /* Ambre — avertissements */

  /* Neutrals */
  --color-charcoal: #231F20;          /* Texte secondaire */
  --color-bg-light: #F7F7F9;          /* Fond page/sections */
  --color-border: #E5E7EB;            /* Bordures cartes/tables */
  --color-border-input: #D1D5DB;      /* Bordures inputs */
  --color-white: #FFFFFF;
  --color-black: #000000;

  /* ═══════════ TYPOGRAPHY ═══════════ */
  --font-display: "Moret", "Georgia", serif;       /* Titres, display, headings */
  --font-body: "Sailec", "Inter", sans-serif;      /* UI, body, navigation, labels */

  /* Sizes */
  --text-xs: 11px;          /* Nav items */
  --text-sm: 12px;          /* Captions */
  --text-base: 15px;        /* Body */
  --text-lg: 17px;          /* Body large */
  --text-xl: 20px;          /* H3 */
  --text-2xl: 32px;         /* H2 */
  --text-3xl: 42px;         /* H1 */
  --text-4xl: 56px;         /* Display XL */

  /* Weights */
  --font-regular: 400;
  --font-medium: 500;
  --font-bold: 700;

  /* Spacing */
  --letter-spacing-nav: 2px;
  --line-height-body: 1.6;
  --line-height-heading: 1.2;

  /* ═══════════ SPACING ═══════════ */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 80px;

  /* ═══════════ LAYOUT ═══════════ */
  --max-width: 1280px;
  --max-width-content: 1140px;
  --sidebar-width: 260px;

  /* ═══════════ BORDERS ═══════════ */
  --border-radius: 0px;
  --border-color: #E5E7EB;
  --border-submenu: 2px solid #FF8217;

  /* ═══════════ SHADOWS ═══════════ */
  --shadow-sm: 0 1px 2px rgba(0, 0, 70, 0.05);
  --shadow-md: 0 2px 8px rgba(0, 0, 70, 0.08);
  --shadow-lg: 0 4px 16px rgba(0, 0, 70, 0.12);
  --shadow-xl: 0 8px 32px rgba(0, 0, 70, 0.16);

  /* ═══════════ TRANSITIONS ═══════════ */
  --transition-fast: 0.15s ease-in-out;
  --transition-default: 0.2s ease-in-out;
  --transition-slow: 0.3s ease-in-out;

  /* ═══════════ CHART COLORS ═══════════ */
  --chart-1: #000046;
  --chart-2: #FF8217;
  --chart-3: #FFB9AD;
  --chart-4: #E3F1EC;
  --chart-5: #CD002D;
  --chart-6: #FAEBDC;
  --chart-7: #FFBC7D;
  --chart-8: #231F20;
}
```

---

## 13. Adaptation SaaS (Style Clair)

### Principes pour la maquette iVesta SaaS
- **Theme clair** : fond blanc/gris, texte navy, accents orange
- **Sidebar navy** (#000046) avec items blancs + accent orange
- **Header blanc** sticky avec logo + breadcrumb + user menu
- **Cartes blanches** avec bordures subtiles, sans radius
- **Graphiques** avec la palette de couleurs charts officielle
- **Typographie** : Moret pour les titres impactants, Sailec pour tout le reste
- **KPIs** : chiffres en Moret (grand, impactant), labels en Sailec
- **Tables** : clean, lignes fines, header gris clair
- **Pas de dark mode** pour la maquette (style clair uniquement)
