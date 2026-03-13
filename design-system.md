# Ivesta — Design System

Analyse complete du site ivesta-fo.com (mars 2026)
Source : CSS Elementor Kit (post-5.css) + HTML pages + custom CSS

---

## 1. Palette de couleurs (CONFIRMEES depuis le CSS source)

### Couleurs Elementor globales (definies dans .elementor-kit-5)
| Variable Elementor | Nom | Hex | Usage |
|--------------------|-----|-----|-------|
| `--e-global-color-primary` | Navy Night | `#000046` | Couleur primaire, texte principal, fonds sombres |
| `--e-global-color-secondary` | Orange Ivesta | `#FF810A` | Accent principal, CTA, hover liens, icones social |
| `--e-global-color-text` | Navy Night | `#000046` | Texte courant (meme que primary) |
| `--e-global-color-accent` | Orange Ivesta | `#FF810A` | Accent (meme que secondary) |
| `--e-global-color-144d95e` | Rose Saumon | `#FFB9AD` | Accent complementaire, cartes |
| `--e-global-color-d35b4be` | Rouge Ivesta | `#CD002D` | Accent fort, alertes, erreurs |
| `--e-global-color-ff80ee7` | Beige Chaud | `#FAEBDC` | Fonds de cartes, sections alternees |
| `--e-global-color-9c421f6` | Vert Menthe | `#E3F1EC` | Fonds de cartes vertes, succes |

### Couleurs d'interface (depuis le HTML/CSS)
| Nom | Hex | Usage |
|-----|-----|-------|
| Charcoal | `#231F20` | Texte secondaire, sous-titres |
| Gris clair fond | `#F7F7F9` | Fonds de sections, fond page |
| Page Transition | `#FFBC7D` | Animation de transition entre pages |
| Blanc | `#FFFFFF` | Fonds, cartes, texte sur fond sombre |
| Bouton sombre | `#000046` | Boutons primaires (meme que primary) |

### Palette complete resumee
```
PRIMAIRES :
  Navy Night      #000046    ← LE VRAI BLEU (pas #0c1d41)
  Orange Ivesta   #FF810A    ← LE VRAI ORANGE

SECONDAIRES :
  Rose Saumon     #FFB9AD
  Rouge Ivesta    #CD002D
  Beige Chaud     #FAEBDC
  Vert Menthe     #E3F1EC

NEUTRES :
  Charcoal        #231F20
  Gris Fond       #F7F7F9
  Blanc           #FFFFFF

TRANSITION :
  Orange doux     #FFBC7D
```

### Principe
- Dominante **blanc + gris clair (#F7F7F9)** pour les fonds
- **Navy Night (#000046)** pour le texte et les elements structurants
- **Orange (#FF810A)** pour les CTA, hover, liens actifs, accents
- **Beige (#FAEBDC)** pour les cartes et sections alternees
- **Vert menthe (#E3F1EC)** et **Rose saumon (#FFB9AD)** pour les variantes de cartes
- **Rouge (#CD002D)** utilise avec parcimonie pour les alertes ou accents forts

---

## 2. Typographie (CONFIRMEE depuis le CSS source)

### Familles de police
| Role Elementor | Police | Poids | Usage |
|----------------|--------|-------|-------|
| Primary | **SailecRegular** (custom font) | normal | Navigation, labels, boutons, uppercase |
| Secondary | **Roboto Slab** (serif) | 400 | Titres, headings |
| Text | **Roboto** (sans-serif) | 400 | Texte courant, body |
| Accent | **Roboto** (sans-serif) | 500 (medium) | Sous-menus, elements d'accent |

### Police custom SailecRegular
- Font-face hebergee sur ivesta-fo.com
- Sources : `font-2.woff2` et `font-2.woff`
- URL : `https://ivesta-fo.com/wp-content/uploads/2023/03/font-2.woff2`
- Utilisee pour la navigation et les labels en uppercase
- Taille nav : 10-11px, letter-spacing: 2px

### Echelle typographique
| Niveau | Taille | Poids | Police | Usage |
|--------|--------|-------|--------|-------|
| Nav items | 10-11px | normal | SailecRegular | Navigation, uppercase, letter-spacing 2px |
| Small / Caption | 13px | 400 | Roboto | Mentions legales, legendes |
| Body | 16px | 400 | Roboto | Texte courant |
| Body Large | 20px | 400 | Roboto | Texte courant agrandi |
| H3 / Subtitle | 20px | 500 | Roboto | Sous-titres, noms equipe |
| H2 / Section | 36px | 400 | Roboto Slab | Titres de sections |
| H1 / Display | 42px | 400 | Roboto Slab | Titres hero |

### Line-height
- Corps : 1.5 a 1.6
- Titres : 1.2 a 1.3

---

## 3. Espacement (Spacing)

### Echelle
| Token | Valeur | Usage |
|-------|--------|-------|
| xs | 5px | Micro-espaces |
| sm | 15px | Gaps navigation, padding cartes |
| md | 20px | Widget spacing (defaut Elementor), gap menus |
| lg | 24px | Gap grille, marges blocs |
| xl | 61px | Espacement items navigation desktop |
| 2xl | 80px | Separation sections majeures |

### Principes
- **20px** est l'unite de base Elementor (widget spacing)
- Navigation : gap de 61px entre items
- Sections separees par 40-80px
- Padding cartes info equipe : 15px lateraux

---

## 4. Layout & Grille

### Conteneurs
| Type | Largeur max |
|------|-------------|
| Container max | 1140px |
| Tablet | 1024px |
| Mobile | 767px |

### Systeme de grille
- **Flexbox** comme systeme principal
- Widget spacing : 20px (row et column)
- Cartes equipe : flex row-reverse + alternance .iv-team-reverse (row)
- Image equipe : width calc(50% + 15px), info: width 50%

### Breakpoints
| Nom | Largeur |
|-----|---------|
| Mobile | max-width: 767px |
| Tablet | max-width: 1024px |
| Desktop | min-width: 1025px |

---

## 5. Composants

### Boutons
```
Etat par defaut :
- Background : #000046 (navy night)
- Texte : #FFFFFF
- Border-radius : 0px
- Font : Roboto, 500 (accent weight)
- Gap content wrapper : 16px

Etat hover :
- Background : #FF810A (orange ivesta)
- Transition : 0.3s ease-in-out
```

### Navigation (Header sticky)
```
- Position : sticky, top: 0, z-index: 3
- Background : #FFFFFF
- Logo : 85px (desktop), 50px (mobile)
- Police items : SailecRegular, 11px, normal, letter-spacing 2px
- Couleur items : #000046 (primary)
- Couleur hover : #FF810A (accent/secondary)
- Couleur active : #FF810A (secondary)
- Sous-menu : border-top 2px solid #FF810A, display flex, gap 20px
- Dropdown background : transparent
- Mobile : hamburger toggle, background transparent
```

### Cartes Offre (Info Boxes)
```
- Type : .iv-hover-boxe-type-1
- Background content : transparent par defaut
- Hover : background #ffffffc7 (blanc semi-transparent)
- Padding : 1.5rem
- Padding-bottom : 76% (ratio-based)
- Titre : padding-right 70%
- Transition : all ease-in-out 0.3s
- Variantes de fond : #FAEBDC (beige), #FFB9AD (rose), #E3F1EC (vert), #000046 (navy)
- Hauteur min : 350px
```

### Cartes equipe (Person Cards — .iv-team)
```
Layout :
- Flex row-reverse (defaut) / row (.iv-team-reverse)
- Image container : width calc(50% + 15px), z-index 1
- Info container : width 50%, background #FFFFFF, position relative

Decorations image (pseudo-elements ::before / ::after) :
- Bordure blanche 15px solid white (cote gauche ou droit selon direction)
- ::before : top -40%, height 75%, border-bottom 12px transparent
- ::after : top 35%, height 75%, border-top 12px transparent
- Cree un effet de "crochets" blancs decoratifs

Social icons :
- Couleur : #FF810A (secondary/orange)
- Display : inline-flex
- Transition : 0.5s ease-in-out

Nom : margin 0, padding 0
```

### Page Transition
```
- Background color : #FFBC7D (orange doux)
```

### Language Switcher
```
- Police : SailecRegular, 10px, letter-spacing 2px
- Couleur : #000046 (text)
- Hover : #FF810A (accent)
- Espacement : 15px entre langues
```

---

## 6. Animations & Transitions

### Transitions globales
| Type | Duree | Easing |
|------|-------|--------|
| Default | 0.3s | ease-in-out |
| Info box hover | 0.3s | ease-in-out |
| Images hover | 0.5s | ease-in-out |
| Social icons | 0.5s | ease-in-out |
| Page transition | instant | background #FFBC7D |

### Effets specifiques
- **Info boxes :** Background apparait au hover (transparent → #ffffffc7)
- **Images equipe :** Scale au hover
- **Navigation :** Sous-menu apparait avec border-top orange
- **Scroll :** Smooth scroll behavior

---

## 7. Ombres (Shadows)

| Nom | Valeur | Usage |
|-----|--------|-------|
| Natural | `6px 6px 9px rgba(0,0,0,0.2)` | Cartes subtiles |
| Deep | `12px 12px 50px rgba(0,0,0,0.4)` | Elements en avant-plan |
| Overlay | `inset 0 0 120px rgba(0,0,0,0.5)` | Overlay images hover |
| None | Aucune | Defaut (design plat) |

### Principe
- Le site est majoritairement **flat** (sans ombre)
- Ombres utilisees avec parcimonie

---

## 8. Bordures & Border Radius

| Element | Radius | Bordure |
|---------|--------|---------|
| Boutons | 0px | Aucune |
| Cartes | 0px | Aucune |
| Conteneurs | 0px | Aucune |
| Images equipe | 0px | 15px solid white (pseudo-elements) |
| Sous-menus | 0px | 2px solid #FF810A (top) |

### Principe
- **Angles droits partout** — 0px border-radius global
- Style architectural, rigide, premium
- Les bordures blanches 15px sur les images equipe = signature visuelle
- Le trait orange sur les sous-menus = signature navigation

---

## 9. Iconographie & Social

### Social icons
| Reseau | Couleur hover |
|--------|---------------|
| Facebook | #3b5998 |
| Twitter | #55acee |
| LinkedIn | #0077b5 |
| Google | #dc4e41 |
| YouTube | #b31217 |
| Instagram | #e4405f |
| WhatsApp | #25d366 |

- Couleur par defaut des social icons : `#FF810A` (orange Ivesta)
- Icons circulaires (border-radius 100%)

---

## 10. Imagerie & Direction artistique

- **Illustrations** plutot que photographies
- Style **abstrait, soft, conceptuel**
- Palette d'illustrations dans les tons beige/navy/orange
- Pas de stock photos generiques
- Photos equipe : portraits pro sur fond neutre

---

## 11. Identite de marque

### Personnalite
- **Sobre** — pas de couleurs flashy (sauf l'orange en accent)
- **Premium** — angles droits, espacement genereux, typo mixte serif/sans
- **Institutionnel** — structure claire, hierarchie lisible
- **Chaleureux** — le beige, l'orange, la rose saumon apportent de la chaleur
- **Français** — contenu bilingue FR/EN mais identite française

### Ce qui rend le design reconnaissable
1. La palette **navy #000046 + orange #FF810A + beige #FAEBDC**
2. Les angles droits partout (0px radius)
3. La police **SailecRegular** en uppercase pour la navigation
4. Le mix **Roboto Slab** (titres) + **Roboto** (corps)
5. La bordure blanche epaisse laterale sur les portraits equipe
6. L'alternance row/row-reverse sur les cartes equipe
7. Le fond orange doux (#FFBC7D) pour les transitions de page
8. Le trait orange 2px sur les sous-menus

---

## 12. Tokens CSS (pour implementation)

```css
:root {
  /* ═══════════ COLORS ═══════════ */
  /* Primary */
  --color-primary: #000046;           /* Navy Night — texte, fonds sombres */
  --color-secondary: #FF810A;         /* Orange Ivesta — CTA, accents, hover */

  /* Extended palette */
  --color-rose: #FFB9AD;              /* Rose Saumon — cartes, accents doux */
  --color-red: #CD002D;               /* Rouge Ivesta — alertes, accents forts */
  --color-beige: #FAEBDC;             /* Beige Chaud — fonds cartes */
  --color-mint: #E3F1EC;              /* Vert Menthe — cartes vertes, succes */
  --color-transition: #FFBC7D;        /* Orange Doux — transitions de page */

  /* Neutrals */
  --color-charcoal: #231F20;          /* Texte secondaire */
  --color-bg-light: #F7F7F9;          /* Fond page/sections */
  --color-white: #FFFFFF;
  --color-black: #000000;

  /* ═══════════ TYPOGRAPHY ═══════════ */
  --font-nav: "SailecRegular", sans-serif;   /* Navigation, labels, uppercase */
  --font-heading: "Roboto Slab", serif;       /* Titres, headings */
  --font-body: "Roboto", sans-serif;          /* Texte courant */

  --font-size-nav: 11px;
  --font-size-small: 13px;
  --font-size-body: 16px;
  --font-size-body-lg: 20px;
  --font-size-h2: 36px;
  --font-size-h1: 42px;

  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;

  --letter-spacing-nav: 2px;

  --line-height-body: 1.6;
  --line-height-heading: 1.25;

  /* ═══════════ SPACING ═══════════ */
  --space-xs: 5px;
  --space-sm: 15px;
  --space-md: 20px;
  --space-lg: 24px;
  --space-xl: 61px;
  --space-2xl: 80px;

  /* ═══════════ LAYOUT ═══════════ */
  --max-width: 1140px;
  --max-width-tablet: 1024px;
  --max-width-mobile: 767px;

  /* ═══════════ BORDERS ═══════════ */
  --border-radius: 0px;
  --border-team-image: 15px solid #FFFFFF;
  --border-submenu: 2px solid #FF810A;

  /* ═══════════ SHADOWS ═══════════ */
  --shadow-natural: 6px 6px 9px rgba(0, 0, 0, 0.2);
  --shadow-deep: 12px 12px 50px rgba(0, 0, 0, 0.4);
  --shadow-overlay: inset 0 0 120px rgba(0, 0, 0, 0.5);

  /* ═══════════ TRANSITIONS ═══════════ */
  --transition-default: 0.3s ease-in-out;
  --transition-image: 0.5s ease-in-out;
}
```
