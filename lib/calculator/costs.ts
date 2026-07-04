import {
  bookExp,
  characterAscensionEssences,
  characterAscensionKans,
  characterExpTotals,
  characterLevelKans,
  HARD_PITY,
  LEVEL_BRACKETS,
  PASSIVE_MAX_LEVEL,
  passiveCosts,
  PULL_COST,
  SKILL_MAX_LEVEL,
  skillArtCosts,
  tamahaganeExp,
  weaponAscensionKans,
  weaponGold,
  weaponHammers,
  weaponTamaExpCosts,
  type LevelBracket,
  type TriColor,
} from "@/data/resources";

/* Fonctions pures du calculateur de ressources — testées (CLAUDE.md §6).
   Les composants passent par ce module, jamais par data/ directement. */

export {
  bookExp,
  tamahaganeExp,
  HARD_PITY,
  LEVEL_STEPS,
  PASSIVE_MAX_LEVEL,
  PULL_COST,
  resourceDataCredits,
  SKILL_MAX_LEVEL,
  WEAPON_MIN_LEVEL,
} from "@/data/resources";

const EMPTY_TRI: TriColor = { green: 0, blue: 0, purple: 0 };

function addTri(a: TriColor, b: TriColor | undefined): TriColor {
  if (!b) return a;
  return {
    green: a.green + b.green,
    blue: a.blue + b.blue,
    purple: a.purple + b.purple,
  };
}

/* Tranches de niveaux entièrement comprises entre from et to. */
function bracketsInRange(from: number, to: number): LevelBracket[] {
  return LEVEL_BRACKETS.filter((bracket) => {
    const [start, end] = bracket.split("-").map(Number);
    return start >= from && end <= to;
  });
}

/* ── Personnage ──────────────────────────────────────────────────────── */

export type CharacterCost = {
  exp: number;
  kans: number;
  essences: TriColor;
};

export function calcCharacterCost(from: number, to: number): CharacterCost {
  let kans = 0;
  let essences = EMPTY_TRI;
  for (const bracket of bracketsInRange(from, to)) {
    kans +=
      (characterLevelKans[bracket] ?? 0) +
      (characterAscensionKans[bracket] ?? 0);
    essences = addTri(essences, characterAscensionEssences[bracket]);
  }
  const exp =
    (characterExpTotals[to] ?? 0) - (characterExpTotals[from] ?? 0);
  return { exp, kans, essences };
}

export type BookCounts = {
  green: number;
  blue: number;
  purple: number;
  yellow: number;
};

export function expFromBooks(counts: BookCounts): number {
  return (
    counts.green * bookExp.green +
    counts.blue * bookExp.blue +
    counts.purple * bookExp.purple +
    counts.yellow * bookExp.yellow
  );
}

/* ── Arme ────────────────────────────────────────────────────────────── */

export type WeaponCost = {
  tamaExp: number;
  kans: number;
  gold: number;
  hammers: TriColor;
};

export function calcWeaponCost(from: number, to: number): WeaponCost {
  let tamaExp = 0;
  let kans = 0;
  let gold = 0;
  let hammers = EMPTY_TRI;
  /* Les armes commencent au niv 20 : aucune tranche avant. */
  for (const bracket of bracketsInRange(Math.max(from, 20), to)) {
    tamaExp += weaponTamaExpCosts[bracket] ?? 0;
    kans += weaponAscensionKans[bracket] ?? 0;
    gold += weaponGold[bracket] ?? 0;
    hammers = addTri(hammers, weaponHammers[bracket]);
  }
  return { tamaExp, kans, gold, hammers };
}

export function expFromTamahagane(counts: BookCounts): number {
  return (
    counts.green * tamahaganeExp.green +
    counts.blue * tamahaganeExp.blue +
    counts.purple * tamahaganeExp.purple +
    counts.yellow * tamahaganeExp.yellow
  );
}

/* ── Compétences et passifs ──────────────────────────────────────────── */

export type SkillsCost = { arts: TriColor; kans: number };

export function calcSkillsCost(
  from: number,
  to: number,
  numSkills: number
): SkillsCost {
  let arts = EMPTY_TRI;
  let kans = 0;
  for (let level = from + 1; level <= Math.min(to, SKILL_MAX_LEVEL); level++) {
    const cost = skillArtCosts[level];
    if (!cost) continue;
    arts = addTri(arts, cost);
    kans += cost.kans;
  }
  return {
    arts: {
      green: arts.green * numSkills,
      blue: arts.blue * numSkills,
      purple: arts.purple * numSkills,
    },
    kans: kans * numSkills,
  };
}

export type PassivesCost = { omamori: number; kans: number };

/* targetLevels : niveau cible de chacun des 3 passifs (0 à 3),
   coût cumulé du niveau 1 au niveau cible. */
export function calcPassivesCost(
  targetLevels: [number, number, number]
): PassivesCost {
  let omamori = 0;
  let kans = 0;
  passiveCosts.forEach((costs, index) => {
    const target = Math.min(targetLevels[index] ?? 0, PASSIVE_MAX_LEVEL);
    for (let level = 1; level <= target; level++) {
      omamori += costs[level].omamori;
      kans += costs[level].kans;
    }
  });
  return { omamori, kans };
}

/* ── Invocations ─────────────────────────────────────────────────────── */

export type PullInput = {
  crystals: number;
  pity: number;
  daysUntilBanner: number;
  crystalsPerDay: number;
};

export type PullResult = {
  totalCrystals: number;
  pulls: number;
  neededForGuarantee: number;
  enough: boolean;
  missingPulls: number;
  missingCrystals: number;
};

export function calcPulls(input: PullInput): PullResult {
  const totalCrystals =
    Math.max(0, input.crystals) +
    Math.max(0, input.daysUntilBanner) * Math.max(0, input.crystalsPerDay);
  const pulls = Math.floor(totalCrystals / PULL_COST);
  const pity = Math.min(Math.max(0, input.pity), HARD_PITY - 1);
  const neededForGuarantee = Math.max(1, HARD_PITY - pity);
  const missingPulls = Math.max(0, neededForGuarantee - pulls);
  return {
    totalCrystals,
    pulls,
    neededForGuarantee,
    enough: missingPulls === 0,
    missingPulls,
    missingCrystals: missingPulls * PULL_COST,
  };
}
