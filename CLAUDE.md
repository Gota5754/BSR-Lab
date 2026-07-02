# BSR Lab — Spécification projet

> Ce fichier est la source de vérité du projet. Claude Code : lis-le intégralement avant toute tâche. Toute décision de design ou d'architecture non couverte ici doit être validée avec Mathieu avant implémentation.

## 1. Vision

**Nom du site : BSR Lab**
**Tagline : « Le labo francophone de Bleach: Soul Resonance — rater, tier list, calculateurs, guides »**
**Repo : github.com/Gota5754/BSR-Lab** (CI/CD Vercel branché sur `main`)

Reconstruction complète de https://bsr-stamp-rater.vercel.app/ — objectif : devenir **LA référence communautaire francophone de Bleach: Soul Resonance**. L'ancien site ne faisait que noter les stamps ; BSR Lab est un hub complet. Fonctionnalités v1 : évaluateur de Set Stamps (rater), tier list des personnages, calculateur de ressources, inventaire local de stamps. Phase 2 : articles/news (MDX), guides de build. Phase 3 (non planifiée) : comptes utilisateurs, contenu communautaire.

Contraintes : coût zéro (Vercel Hobby + GitHub CI/CD existant), site public gratuit sans pub, langue FR par défaut.

Utiliser « BSR Lab » dans : metadata (title template `%s — BSR Lab`), navbar, OG image, `config/site.ts`. Footer : mention « Site non affilié — Bleach: Soul Resonance est une marque de ses ayants droit ».

## 2. Stack technique

- **Next.js 15+ (App Router)** — SSG partout où c'est possible, aucune fonction serverless en v1
- **TypeScript strict** (`strict: true`, pas de `any` non justifié)
- **Tailwind CSS v4**
- **shadcn/ui** — thème entièrement personnalisé (voir §3), jamais les couleurs par défaut
- **Zustand** avec middleware `persist` pour les données utilisateur (localStorage)
- **Framer Motion (motion)** pour les micro-interactions ciblées
- **Vitest** pour les tests unitaires de `lib/scoring` et `lib/calculator`
- **Velite** (ou Contentlayer) pour le contenu MDX en phase 2
- Images préoptimisées en WebP/AVIF au build (script), **ne pas dépendre de l'optimisation d'images Vercel** (limite 1 000 images sources/mois en Hobby)

## 3. Direction artistique — « Encre & Réiatsu » (FIGÉE)

Identité : sumi-e, papier brûlé, encre noire. Le noir domine à ~90 % ; l'orange est réservé aux moments forts. Sobre, éditorial, contrasté.

### 3.1 Palette (tokens CSS à définir dans globals.css)

| Token | Hex | Usage |
|---|---|---|
| `--bsr-ink` | `#0B0B0E` | Fond de page (noir profond) |
| `--bsr-ink-2` | `#131318` | Cartes, surfaces |
| `--bsr-ink-3` | `#1A1A20` | Surfaces secondaires, hover |
| `--bsr-border` | `#26262C` | Bordures |
| `--bsr-paper` | `#F5F0E8` | Texte principal (blanc cassé « papier ») |
| `--bsr-paper-dim` | `#B8B2A4` | Texte secondaire |
| `--bsr-muted` | `#8A8578` | Légendes, labels |
| `--bsr-faint` | `#5A564C` | Texte désactivé, tertiaire |
| `--bsr-reiatsu` | `#F97316` | Accent principal (orange Ichigo) — grades S, scores, CTA principaux UNIQUEMENT |
| `--bsr-blood` | `#C43A2E` | Accent secondaire (grade A, alertes, danger) |

Règle d'or : **l'orange est rare**. Un seul élément orange dominant par écran. Si tout est orange, rien ne l'est.

Mapper ces tokens sur les variables shadcn (`--background` → ink, `--foreground` → paper, `--primary` → reiatsu, `--card` → ink-2, `--destructive` → blood, etc.).

### 3.2 Typographie

- **Titres / grades / scores** : serif italique tranchant. Police recommandée : *Instrument Serif* (italic) via next/font, fallback Georgia italic. Letter-spacing légèrement négatif sur les grands titres.
- **Corps / UI** : sans-serif sobre — *Inter* ou *Geist*. Chiffres tabulaires (`font-variant-numeric: tabular-nums`) sur toutes les stats.
- **Labels / eyebrows** : sans-serif 11-12px, uppercase, letter-spacing 1.5-2px, couleur `--bsr-muted`.

### 3.3 Grades

| Grade | Fond | Texte | Style |
|---|---|---|---|
| S | `--bsr-reiatsu` | `--bsr-ink` | Serif italique |
| A | `--bsr-blood` | `--bsr-paper` | Serif italique |
| B | `#3A3A40` | `--bsr-paper-dim` | Serif italique |
| C | `--bsr-ink-3` | `--bsr-faint` | Serif italique |
| D | transparent + bordure | `--bsr-faint` | Serif italique |

### 3.4 Composants — règles visuelles

- Cartes : fond `--bsr-ink-2`, bordure 1px `--bsr-border`, radius 10px
- Jauges de substats : piste `--bsr-border` 4px, remplissage orange pour la substat prioritaire, `--bsr-paper-dim` pour les moyennes, `#3A3A40` pour les faibles
- Rareté des stamps : bordure de carte teintée (à définir avec les données du jeu)
- Pas de glassmorphism, pas de dégradés criards. Un glow orange discret est autorisé sur le badge S et le score final uniquement
- Micro-interactions Framer Motion : (1) apparition du score après évaluation (compteur animé + badge qui « claque »), (2) transitions de pages, (3) drag & drop tier list. Rien d'autre en v1

## 4. Structure de dossiers

```
bsr-stamp-rater/
├── app/
│   ├── layout.tsx                  # Navbar, fonts, theme
│   ├── page.tsx                    # Accueil / dashboard
│   ├── globals.css                 # Tokens §3.1
│   ├── rater/page.tsx
│   ├── tier-list/page.tsx
│   ├── calculator/page.tsx
│   ├── teams/page.tsx
│   ├── teams/[teamId]/page.tsx
│   └── inventory/page.tsx
├── components/
│   ├── ui/                         # shadcn (généré)
│   ├── layout/                     # Navbar, Footer, MobileNav
│   ├── stamps/                     # StampForm, SubstatInput, StampCard, GradeBadge, ScoreBreakdown, CharacterPicker
│   ├── tier-list/                  # TierListBoard, TierRow, TierItem, TierListFilters
│   ├── calculator/                 # ResourceCalculatorForm, ResourceSummary, ResourceItem
│   └── shared/                     # EmptyState, PageHeader, StatDisplay, DataDisclaimer
├── lib/
│   ├── scoring/                    # engine.ts, weights.ts, grades.ts — TESTÉ (Vitest)
│   ├── calculator/                 # costs.ts — TESTÉ
│   ├── data/                       # ⭐ Couche d'accès : getCharacters(), getCharacter(id), getStampSets()...
│   │                               #    Les composants n'importent JAMAIS data/ directement
│   └── storage/                    # Abstraction localStorage, migrations de schéma
├── data/                           # Données de jeu statiques (source de vérité, TypeScript typé)
│   ├── characters/                 # 1 fichier par personnage (ichigo-bankai.ts, kenpachi.ts...)
│   ├── stamp-sets.ts
│   ├── substats.ts
│   ├── tier-list.ts
│   └── resources.ts
├── stores/                         # Zustand : inventory-store, teams-store, settings-store
├── types/index.ts
├── hooks/                          # useHydrated (obligatoire avant lecture des stores persistés), useMediaQuery
├── content/news/                   # Phase 2 : articles MDX
├── config/site.ts
├── scripts/optimize-images.mjs
└── public/images/                  # characters/, stamps/, materials/ (WebP préoptimisé)
```

## 5. Schéma de données

### 5.1 Données de jeu (repo, TypeScript)

```ts
type StampSet = {
  id: string; name: string;
  bonus2pc: string; bonus4pc: string;
  imageUrl: string;
};

type Substat = {
  id: string; name: string; isPercent: boolean;
  rollMin: number; rollMax: number; maxRolls: number;
};

type Character = {
  id: string; name: string;
  element: string; role: string; rarity: string;
  releaseDate: string;                       // sortie ~toutes les 3 semaines
  weapon: { name: string; stats: string[]; passive: string };
  recommendedSets: Array<{                   // historique : cas Ichigo Bankai → set Kenpachi
    setId: string; priority: number;
    note?: string; sincePatch: string;
  }>;
  mainStats: { slot4: string[]; slot5: string[]; slot6: string[] };
  statWeights: Record<string, number>;       // pondérations pour le rater (0 à 1)
  passives: Array<{ name: string; description: string }>;
  buildNotes?: string;                        // markdown
};

type TierEntry = {
  characterId: string;
  tier: 'S' | 'A' | 'B' | 'C';
  note?: string; patchVersion: string;
};

type UpgradeCost = {
  fromLevel: number; toLevel: number;
  materials: Array<{ materialId: string; qty: number }>;
};
```

Workflow d'ajout d'un personnage : créer `data/characters/<id>.ts`, remplir l'objet typé (TS refuse le build si un champ manque), ajouter l'image WebP, push → déploiement auto Vercel. Les composants passent exclusivement par `lib/data/` (repository pattern) pour permettre une migration future vers CMS/Supabase sans refonte.

### 5.2 Données utilisateur (localStorage, Zustand persist)

```ts
type UserStamp = {
  id: string; setId: string; slot: number;
  mainStat: string;
  substats: Array<{ id: string; value: number }>;
  targetCharacterId?: string;
  createdAt: string; updatedAt: string;
};

type Team = { id: string; name: string; members: string[]; stampAssignments: Record<string, string[]> };

type Settings = { theme: 'dark'; locale: 'fr'; lastSeenPatch: string };
```

Règles impératives :
- Champ `schemaVersion` + fonction de migration dans `lib/storage` (ne jamais casser les données existantes)
- Export/Import JSON dans les paramètres (substitut gratuit à la synchro cloud)
- Hook `useHydrated` avant tout rendu de données persistées (sinon erreurs d'hydratation SSG)

## 6. Conventions

- Commits : Conventional Commits (`feat:`, `fix:`, `data:` pour les ajouts de persos)
- `data:` commits = ajout/modif de données de jeu uniquement, revue rapide
- Tests obligatoires sur `lib/scoring` et `lib/calculator` avant merge
- Accessibilité : contraste AA minimum (le orange sur noir passe, vérifier les gris), navigation clavier sur le rater
- Mobile-first : le rater doit être parfaitement utilisable sur téléphone (usage en jouant)
- Bandeau `DataDisclaimer` sur chaque page de données : « Données à jour du patch X.Y »
- Site FR ; structure i18n-ready (textes dans des constantes, pas en dur dans le JSX) mais pas de lib i18n en v1

## 7. Roadmap

**V1 (MVP)**
1. Scaffold + thème (tokens §3, fonts, layout, navbar) — valider visuellement avant de continuer. Le repo contient déjà un README.md et ce CLAUDE.md : scaffolder Next.js dans le dossier courant sans les écraser (si `create-next-app` refuse un dossier non vide, scaffolder dans un dossier temporaire puis déplacer les fichiers)
2. Modèle de données + `lib/data` + 3-4 personnages de test
3. Rater complet (form → scoring → ScoreBreakdown animé) — feature signature, la soigner
4. Inventaire (sauvegarde locale des stamps évalués)
5. Tier list
6. Calculateur de ressources
7. Accueil, SEO (metadata, OG image), déploiement

**V2** : articles MDX, guides de build par personnage, comparateur avant/après upgrade, radar chart des substats
**V3 (à valider)** : Supabase (comptes, sync), commentaires Giscus, tier list communautaire

## 8. Ce qu'il ne faut PAS faire

- Pas de base de données ni de fonctions serverless en v1
- Pas de shadcn aux couleurs par défaut (gris-bleu) — tout passe par les tokens §3.1
- Pas d'orange partout (règle d'or §3.1)
- Pas d'import direct de `data/` dans les composants (toujours via `lib/data/`)
- Pas de `next/image` avec optimisation Vercel sur les images du jeu (préoptimisation au build)
- Pas de dépendance ajoutée sans justification (bundle léger = site rapide = référence crédible)
