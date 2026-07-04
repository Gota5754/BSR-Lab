import type { Character, StampPassive, StampPieceId, StatId } from "@/types";
import { getGrade, type Grade } from "./grades";
import {
  BASIC_STAT_SHARE,
  MAX_EVOLUTIONS,
  MAX_SINGLE_EVOLUTIONS,
  OFF_META_BASIC_STAT_QUALITY,
  PASSIVE_QUALITY,
  PASSIVE_SHARE,
  SUBSTAT_SHARE,
} from "./weights";

/* Paliers de niveau pertinents pour l'évaluation :
   10/15/20 = évolutions simples, 25 = évolution générale + passif 6★,
   30 = niveau max (seule la 2e basic stat monte encore). */
export const STAMP_LEVELS = [1, 10, 15, 20, 25, 30] as const;
export type StampLevel = (typeof STAMP_LEVELS)[number];

export type StampInput = {
  piece: StampPieceId;
  level: number;
  secondBasicStatId: string;
  /* evolutions : évolutions SIMPLES assignées (niv 10/15/20, 0-3).
     Le +1 général du niv 25 est déduit automatiquement du niveau. */
  substats: Array<{ id: string; evolutions: number }>;
  passiveId?: string;
};

export type PassiveStatus =
  | "not-ascended" // niv < 25 : pas encore de passif
  | "unknown"      // niv ≥ 25 mais passif non renseigné
  | "bis"
  | "role-match"
  | "generic"
  | "role-mismatch";

export type SubstatBreakdown = {
  substatId: string;
  /* Évolutions effectives : simples + le +1 du niv 25 le cas échéant. */
  evolutions: number;
  weight: number;
  /* Qualité : (1 + évolutions) / (1 + MAX_EVOLUTIONS). */
  quality: number;
  /* Part de cette substat dans le score substats (0-1, somme = 1). */
  share: number;
};

export type StampEvaluation = {
  score: number;
  grade: Grade;
  basicStatRecommended: boolean;
  substatScore: number;
  /* Qualité du tirage des 4 substats, indépendante du niveau (0-1) :
     sert à repérer un stamp niv 1 qui mérite l'investissement. */
  potential: number;
  passiveStatus: PassiveStatus;
  breakdown: SubstatBreakdown[];
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function quality(evolutions: number): number {
  return (1 + clamp(evolutions, 0, MAX_EVOLUTIONS)) / (1 + MAX_EVOLUTIONS);
}

/* Budget d'évolutions simples déjà reçues à un niveau donné. */
export function singleEvolutionBudget(level: number): number {
  if (level >= 20) return 3;
  if (level >= 15) return 2;
  if (level >= 10) return 1;
  return 0;
}

export function hasLevel25Evolution(level: number): boolean {
  return level >= 25;
}

function passiveStatusFor(
  character: Character,
  level: number,
  passiveId: string | undefined,
  passives: StampPassive[]
): PassiveStatus {
  if (!hasLevel25Evolution(level)) return "not-ascended";
  if (!passiveId) return "unknown";
  if (character.recommendedPassives.includes(passiveId)) return "bis";
  const passive = passives.find((p) => p.id === passiveId);
  if (!passive) return "unknown";
  if (passive.roleAffinity === undefined) return "generic";
  return passive.roleAffinity === character.role
    ? "role-match"
    : "role-mismatch";
}

const PASSIVE_QUALITY_BY_STATUS: Record<PassiveStatus, number> = {
  "not-ascended": 0,
  unknown: PASSIVE_QUALITY.unknown,
  bis: PASSIVE_QUALITY.bis,
  "role-match": PASSIVE_QUALITY.roleMatch,
  generic: PASSIVE_QUALITY.generic,
  "role-mismatch": PASSIVE_QUALITY.roleMismatch,
};

/* Évalue un stamp pour un personnage donné (fonction pure).
   Score absolu : 100 = stamp parfait niv 30 (4 meilleures substats,
   3 évolutions simples sur la BIS, +1 général, passif BIS). */
export function evaluateStamp(
  character: Character,
  input: StampInput,
  passives: StampPassive[]
): StampEvaluation {
  const bonus = hasLevel25Evolution(input.level) ? 1 : 0;

  /* Clamp du budget : chaque substat ≤ 3 simples, total ≤ budget du niveau. */
  let remaining = singleEvolutionBudget(input.level);
  const breakdown: SubstatBreakdown[] = input.substats
    .filter((s) => s.id !== "")
    .map((s) => {
      const singles = clamp(
        Math.min(s.evolutions, remaining),
        0,
        MAX_SINGLE_EVOLUTIONS
      );
      remaining -= singles;
      const evolutions = singles + bonus;
      return {
        substatId: s.id,
        evolutions,
        weight: character.statWeights[s.id as StatId] ?? 0,
        quality: quality(evolutions),
        share: 0,
      };
    });

  const weightedSum = breakdown.reduce(
    (sum, b) => sum + b.weight * b.quality,
    0
  );

  /* Référence absolue : stamp parfait niv 30 — les 4 meilleurs poids,
     3 simples sur la BIS puis +1 général → répartition [4,1,1,1]. */
  const topWeights = Object.values(character.statWeights)
    .sort((a, b) => b - a)
    .slice(0, 4);
  const perfectSpread = [4, 1, 1, 1];
  const perfectSum = topWeights.reduce(
    (sum, w, i) => sum + w * quality(perfectSpread[i] ?? 0),
    0
  );

  const substatScore =
    perfectSum > 0 ? clamp(weightedSum / perfectSum, 0, 1) : 0;

  /* Potentiel : qualité du tirage des substats, hors progression. */
  const topWeightsSum = topWeights.reduce((sum, w) => sum + w, 0);
  const stampWeightsSum = breakdown.reduce((sum, b) => sum + b.weight, 0);
  const potential =
    topWeightsSum > 0 ? clamp(stampWeightsSum / topWeightsSum, 0, 1) : 0;

  for (const b of breakdown) {
    b.share = weightedSum > 0 ? (b.weight * b.quality) / weightedSum : 0;
  }

  const recommended = character.recommendedBasicStats[input.piece] ?? [];
  const basicStatRecommended = recommended.includes(
    input.secondBasicStatId as StatId
  );
  const basicStatQuality = basicStatRecommended
    ? 1
    : OFF_META_BASIC_STAT_QUALITY;

  const passiveStatus = passiveStatusFor(
    character,
    input.level,
    input.passiveId,
    passives
  );
  const passiveQuality = PASSIVE_QUALITY_BY_STATUS[passiveStatus];

  const score =
    Math.round(
      (SUBSTAT_SHARE * substatScore +
        BASIC_STAT_SHARE * basicStatQuality +
        PASSIVE_SHARE * passiveQuality) *
        100 *
        10
    ) / 10;

  return {
    score,
    grade: getGrade(score),
    basicStatRecommended,
    substatScore,
    potential,
    passiveStatus,
    breakdown,
  };
}
