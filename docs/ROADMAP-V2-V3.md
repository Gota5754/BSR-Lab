# BSR Lab — Specs V2 / V3

> Document de conception rédigé en juillet 2026 (fin de la phase V1, avec
> Mathieu). Objectif : permettre à n'importe quel agent (Claude Opus/Sonnet)
> ou contributeur d'implémenter ces fonctionnalités **sans redécider
> l'architecture**. Lire CLAUDE.md d'abord — les contraintes (coût zéro,
> SSG, tokens DA §3, repository pattern, tests sur lib/) s'appliquent à
> tout ce qui suit. Ne pas dévier des choix ci-dessous sans valider avec
> Mathieu.

## État à la fin de la V1 (contexte)

- 33 personnages, 19 sets, tier list — données réelles dans `data/`,
  éditées via `bsr-lab-donnees.xlsx` (versionné à la racine).
- Rater (score absolu /100, potentiel, comparateur), inventaire local
  (Zustand persist v1 + export/import JSON), tier list filtrable,
  calculateur (données bsr-calculator), page Équipes (3 membres,
  assignation de stamps, synergie, maillon faible).
- i18n FR/EN **côté client** : dictionnaires `lib/i18n/fr.ts` + `en.ts`,
  hook `useT()`, préférence dans `stores/settings-store.ts`, toggle navbar.
  Le HTML SSG est généré en FR ; l'anglais s'applique après hydratation.
- Décision actée : le **core stamp n'est pas modélisé** (chaque personnage
  a le sien, obtenu en jouant, aucun choix à optimiser).
- Le score n'est jamais stocké : toujours recalculé avec les poids actuels.

---

## V2.1 — i18n SEO (routes /en)

**Objectif** : l'anglais actuel est invisible pour Google (HTML statique en
FR). Servir des pages statiques par langue.

**Choix d'architecture** (validé) : routing par segment `app/[locale]/`
SANS lib i18n externe — les dictionnaires existants suffisent.

- Déplacer les pages sous `app/[locale]/(site)/…` avec
  `generateStaticParams()` → `["fr", "en"]`. Racine `/` → redirect 308
  vers `/fr` (middleware statique via `next.config.ts` redirects, pas de
  middleware runtime).
- `useT()` lit la locale depuis l'URL (`useParams`) au lieu du store ; le
  toggle navbar navigue vers l'URL miroir (et mémorise la préférence pour
  la redirection d'accueil côté client).
- `generateMetadata()` par page et par locale (title/description depuis
  les dictionnaires) + `alternates.languages` (hreflang) + sitemap ×2.
- `<html lang>` posé par le layout `[locale]`.

**Critères d'acceptation** : `next build` 100 % statique ; `/en/rater`
servi en anglais sans JS ; hreflang réciproques ; aucun texte d'UI en dur
dans le JSX (tout passe par `useT()` ou les dictionnaires côté serveur).

**Tâches** : (1) déplacer l'arborescence, (2) adapter useT/toggle,
(3) generateMetadata + hreflang, (4) sitemap/robots, (5) vérifier les
stores localStorage (clés inchangées, indépendantes de la locale).

## V2.2 — Pages personnage `/characters/[id]`

**Objectif** : une page SEO par personnage (33 pages ×2 locales), cible
« [nom] build BSR ».

- `generateStaticParams()` depuis `getCharacters()`.
- Contenu (tout existe déjà dans `data/`) : artwork, rareté/rôle/type,
  tier + justification, sets recommandés avec bonus 2p/3p complets,
  basic stats recommandées par pièce, poids des substats (jauges §3.4,
  étiquettes BIS/Fort/Moyen/Faible), passifs 6★ BIS, `buildNotes`
  (rendre en markdown via `react-markdown`… NON : pas de dépendance —
  buildNotes est du texte court, affichage brut suffit en V2).
- Lier depuis TierItem et CharacterPicker (icône « fiche »).
- Metadata : `title: {nom} — Build & Sets`, description générée des données.

**Critères** : 66 pages statiques au build ; aucune donnée en dur ;
navigation clavier.

## V2.3 — Articles / news (MDX + Velite)

**Objectif** : section `/news` pour patch notes, guides, annonces.

- **Velite** (dépendance build uniquement, justifiée par CLAUDE.md §7
  phase 2) ; contenu dans `content/news/*.mdx`.
- Schéma frontmatter : `title`, `slug`, `date`, `locale` ("fr" | "en"),
  `excerpt`, `cover?`, `patch?`, `tags?[]`. Un fichier par langue
  (suffixe `.en.mdx` pour l'anglais ; fallback : si pas de version EN,
  la page EN liste l'article FR avec badge « FR »).
- Pages : `/news` (liste par date, cartes DA §3.4) + `/news/[slug]`.
  Typo article : titres serif italique, corps `--bsr-paper-dim`,
  max-width ~65ch.
- RSS (`app/feed.xml/route.ts`, statique au build).

**Critères** : build statique ; un MDX invalide casse le build (schéma
Velite strict) ; RSS valide.

## V2.4 — Comparateur avant/après upgrade

**Objectif** : « si je monte ce stamp au niv 25, que gagne-t-il ? »

- Dans le rater et sur les StampCards de l'inventaire : bouton
  « Projeter » → panneau montrant le score actuel vs score projeté à
  chaque palier (10/15/20/25/30) en supposant les évolutions simples
  restantes placées au MIEUX (réutiliser la logique de
  `idealEvolutionSpread`-like : simuler les évolutions restantes sur la
  meilleure substat du stamp) et au PIRE (sur la moins bonne). Affiche
  la fourchette min-max par palier.
- Pur calcul : nouvelle fonction TESTÉE dans `lib/scoring/projection.ts`
  (`projectStamp(character, stamp) → Array<{level, best, worst}>`).
- Coût : croiser avec `data/resources.ts` si des coûts de stamps sont
  fournis un jour (pas de données actuellement — afficher seulement les
  scores).

## V2.5 — Radar chart des substats

- Sur la page personnage et dans le ScoreBreakdown : radar SVG **maison**
  (PAS de lib de chart — un polygone SVG à 10 axes suffit, tokens DA :
  piste `--bsr-border`, aire `--bsr-reiatsu` à 25 % d'opacité).
- Composant `components/shared/RadarChart.tsx` : props
  `axes: Array<{label, value 0-1}>`, accessible (table sr-only en
  fallback).

---

## V3.1 — Tier list communautaire (Supabase)

**Décision de fond** (discutée avec Mathieu) : ne lancer qu'avec une
audience réelle — une tier list communautaire à 15 votants dessert la
crédibilité du site. Prérequis suggéré : ≥ 50 votants/persos attendus.

**Architecture** (coût zéro : Supabase free tier, PAS de serverless
Vercel — le client écrit directement dans Supabase avec RLS) :

```sql
create table votes (
  id uuid primary key default gen_random_uuid(),
  character_id text not null,
  tier text not null check (tier in ('S','A','B','C')),
  voter_id uuid not null,          -- id anonyme généré client, stocké localStorage
  patch text not null,
  created_at timestamptz default now(),
  unique (character_id, voter_id, patch)
);
-- RLS : insert autorisé à anon ; update/delete interdits ;
-- select uniquement via la vue agrégée :
create view tier_votes as
  select character_id, patch, tier, count(*) as n
  from votes group by character_id, patch, tier;
```

- **Agrégation** : tier communautaire = médiane pondérée des votes
  (S=4…C=1) ; afficher aussi la distribution (mini barres par tier).
- **Anti-abus v1 honnête** : contrainte unique voter_id/perso/patch,
  rate-limit Supabase (max 40 inserts/min par IP via edge config… si
  indisponible en free tier : accepter le risque, l'id anonyme suffit
  contre l'abus casuel), affichage seulement au-delà de N=30 votes par
  personnage (« pas assez de votes »). Anti-abus sérieux = comptes (V3.2).
- **UI** : la page tier list gagne un switch « Staff / Communauté » —
  même `TierListBoard`, source d'entrées différente. Vote : drag ou
  boutons S/A/B/C sur chaque carte, un vote modifiable par patch.
- Env : `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  (dashboard Vercel). Client Supabase chargé dynamiquement (code-split)
  pour ne rien payer sur les autres pages.

## V3.2 — Comptes & synchronisation

- Supabase Auth (magic link email, pas d'OAuth pour commencer).
- Tables `profiles`, `inventories (user_id, payload jsonb, updated_at)` :
  on synchronise le JSON d'export existant tel quel (le format
  `buildInventoryExport` devient le contrat), fusion par `updatedAt` du
  stamp. RLS : chaque utilisateur ne lit/écrit que sa ligne.
- L'inventaire local reste la source primaire (offline-first) ; la sync
  est un bouton + un auto-push debounced.
- Les votes de tier list migrent vers `voter_id = user_id` (anti-abus réel).

## V3.3 — Commentaires

- **Giscus** (GitHub Discussions du repo BSR-Lab) sur les pages news et
  personnages. Thème custom sombre pointant vers un CSS hébergé dans
  `public/giscus.css` aux couleurs §3.1. Chargement lazy (interaction).

---

## Dettes / rappels pour les successeurs

- `bsr-lab-donnees.xlsx` (racine) = source des données de jeu : le script
  d'import est un one-off Python (voir historique git `data: roster
  complet`), à re-générer au besoin ; s'assurer que toute modif de
  `data/` reste cohérente avec les tests d'intégrité.
- Artworks : déposer dans `_assets-source/` (nom = id du personnage),
  `npm run optimize-images`, ajouter `imageUrl`.
- Constantes de calibration du scoring dans `lib/scoring/weights.ts` —
  toute retouche doit passer par les tests (`npm test`).
- Notes de sets de Kisuke (Ready To Go vs Hidden Wisdom) : une inversion
  possible signalée à Mathieu, à re-vérifier.
- Le serveur de dev peut servir des chunks périmés après une grosse
  régénération de `data/` : arrêter le dev, supprimer `.next`, relancer
  (le build de prod n'est pas affecté).
