/* Coûts de progression — données réelles du jeu.
   Source : bsr-calculator.vercel.app (crédits @enveelive, @Ganxo012,
   @Joker), reprises de l'ancien site de Mathieu. */

export type LevelBracket =
  | "1-20"
  | "20-30"
  | "30-40"
  | "40-50"
  | "50-60"
  | "60-70"
  | "70-80"
  | "80-90"
  | "90-100";

export const LEVEL_BRACKETS: LevelBracket[] = [
  "1-20",
  "20-30",
  "30-40",
  "40-50",
  "50-60",
  "60-70",
  "70-80",
  "80-90",
  "90-100",
];

/* Paliers de niveaux sélectionnables (personnages et armes, max 100). */
export const LEVEL_STEPS = [1, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export type TriColor = { green: number; blue: number; purple: number };

/* ── Personnage ──────────────────────────────────────────────────────── */

/* EXP cumulée depuis le niveau 1 (l'EXP d'un segment = différence). */
export const characterExpTotals: Record<number, number> = {
  1: 0,
  20: 35792,
  30: 99276,
  40: 216908,
  50: 421035,
  60: 752613,
  70: 1256584,
  80: 1973318,
  90: 2930463,
  100: 4101463,
};

export const characterLevelKans: Record<LevelBracket, number> = {
  "1-20": 7500,
  "20-30": 12900,
  "30-40": 23800,
  "40-50": 41200,
  "50-60": 66700,
  "60-70": 101300,
  "70-80": 145100,
  "80-90": 193300,
  "90-100": 239000,
};

export const characterAscensionKans: Record<LevelBracket, number> = {
  "1-20": 0,
  "20-30": 2500,
  "30-40": 5000,
  "40-50": 10000,
  "50-60": 15000,
  "60-70": 20000,
  "70-80": 30000,
  "80-90": 40000,
  "90-100": 50000,
};

export const characterAscensionEssences: Partial<
  Record<LevelBracket, TriColor>
> = {
  "20-30": { green: 0, blue: 6, purple: 0 },
  "30-40": { green: 0, blue: 12, purple: 0 },
  "40-50": { green: 6, blue: 0, purple: 0 },
  "50-60": { green: 10, blue: 0, purple: 0 },
  "60-70": { green: 14, blue: 0, purple: 0 },
  "70-80": { green: 0, blue: 0, purple: 6 },
  "80-90": { green: 0, blue: 0, purple: 7 },
  "90-100": { green: 0, blue: 0, purple: 8 },
};

/* EXP apportée par chaque livre. */
export const bookExp = {
  green: 500,
  blue: 3000,
  purple: 10000,
  yellow: 20000,
} as const;

/* ── Arme ────────────────────────────────────────────────────────────── */

/* Les armes commencent au niveau 20 (confirmé par Mathieu, 2026-07). */
export const WEAPON_MIN_LEVEL = 20;

export const weaponTamaExpCosts: Partial<Record<LevelBracket, number>> = {
  "20-30": 33876,
  "30-40": 62756,
  "40-50": 108888,
  "50-60": 176864,
  "60-70": 268808,
  "70-80": 382280,
  "80-90": 510496,
  "90-100": 636384,
};

/* EXP apportée par chaque Tamahagane. */
export const tamahaganeExp = {
  green: 100,
  blue: 600,
  purple: 2000,
  yellow: 4000,
} as const;

export const weaponGold: Partial<Record<LevelBracket, number>> = {
  "20-30": 1500,
  "30-40": 3000,
  "40-50": 6000,
  "50-60": 9000,
  "60-70": 12000,
  "70-80": 18000,
  "80-90": 24000,
  "90-100": 30000,
};

export const weaponAscensionKans: Partial<Record<LevelBracket, number>> = {
  "20-30": 8500,
  "30-40": 15875,
  "40-50": 28125,
  "50-60": 45875,
  "60-70": 67875,
  "70-80": 96000,
  "80-90": 129750,
  "90-100": 159625,
};

export const weaponHammers: Partial<Record<LevelBracket, TriColor>> = {
  "20-30": { green: 0, blue: 6, purple: 0 },
  "30-40": { green: 0, blue: 12, purple: 0 },
  "40-50": { green: 6, blue: 0, purple: 0 },
  "50-60": { green: 10, blue: 0, purple: 0 },
  "60-70": { green: 14, blue: 0, purple: 0 },
  "70-80": { green: 0, blue: 0, purple: 6 },
  "80-90": { green: 0, blue: 0, purple: 7 },
  "90-100": { green: 0, blue: 0, purple: 8 },
};

/* ── Compétences (arts) et passifs (omamori) ─────────────────────────── */

/* Coût pour passer une compétence AU niveau indiqué (2 → 9). */
export const skillArtCosts: Record<
  number,
  TriColor & { kans: number }
> = {
  2: { green: 2, blue: 0, purple: 0, kans: 2500 },
  3: { green: 4, blue: 0, purple: 0, kans: 5000 },
  4: { green: 8, blue: 0, purple: 0, kans: 10000 },
  5: { green: 0, blue: 4, purple: 0, kans: 15000 },
  6: { green: 0, blue: 7, purple: 0, kans: 20000 },
  7: { green: 0, blue: 0, purple: 6, kans: 30000 },
  8: { green: 0, blue: 0, purple: 7, kans: 40000 },
  9: { green: 0, blue: 0, purple: 10, kans: 50000 },
};

export const SKILL_MAX_LEVEL = 9;

/* Coût pour passer chaque passif AU niveau indiqué (1 → 3).
   Les 3 passifs d'un personnage ont des coûts différents. */
export const passiveCosts: Array<
  Record<number, { omamori: number; kans: number }>
> = [
  {
    1: { omamori: 2, kans: 6000 },
    2: { omamori: 8, kans: 19000 },
    3: { omamori: 14, kans: 70000 },
  },
  {
    1: { omamori: 4, kans: 10500 },
    2: { omamori: 10, kans: 27000 },
    3: { omamori: 16, kans: 100000 },
  },
  {
    1: { omamori: 6, kans: 16500 },
    2: { omamori: 12, kans: 43500 },
    3: { omamori: 18, kans: 150000 },
  },
];

export const PASSIVE_MAX_LEVEL = 3;

/* ── Invocations ─────────────────────────────────────────────────────── */

export const PULL_COST = 300;
export const HARD_PITY = 90;

export const resourceDataCredits =
  "Données : bsr-calculator.vercel.app — crédits @enveelive, @Ganxo012, @Joker";
