import { characters } from "@/data/characters";
import { stampSets } from "@/data/stamp-sets";
import { stats, SUBSTAT_POOL, pieceRules } from "@/data/stats";
import { stampPassives } from "@/data/stamp-passives";
import { tierList } from "@/data/tier-list";
import type {
  Character,
  StampPassive,
  StampPieceId,
  StampPieceRules,
  StampSet,
  Stat,
  StatId,
  TierEntry,
} from "@/types";

/* Couche d'accès aux données (repository pattern, CLAUDE.md §4).
   Les composants passent exclusivement par ces fonctions — jamais par
   data/ directement — pour permettre une migration future vers un CMS. */

export function getCharacters(): Character[] {
  return characters;
}

export function getCharacter(id: string): Character | undefined {
  return characters.find((c) => c.id === id);
}

export function getStampSets(): StampSet[] {
  return stampSets;
}

export function getStampSet(id: string): StampSet | undefined {
  return stampSets.find((s) => s.id === id);
}

export function getStats(): Stat[] {
  return stats;
}

export function getStat(id: string): Stat | undefined {
  return stats.find((s) => s.id === id);
}

/* Les 10 stats éligibles en substat. */
export function getSubstatPool(): Stat[] {
  return SUBSTAT_POOL.map((id) => stats.find((s) => s.id === id)!);
}

export function getPieceRules(piece: StampPieceId): StampPieceRules {
  const rules = pieceRules.find((r) => r.piece === piece);
  if (!rules) throw new Error(`Règles introuvables pour la pièce ${piece}`);
  return rules;
}

export function getAllPieceRules(): StampPieceRules[] {
  return pieceRules;
}

export function getStampPassives(): StampPassive[] {
  return stampPassives;
}

export function getStampPassive(id: string): StampPassive | undefined {
  return stampPassives.find((p) => p.id === id);
}

export function getTierList(): TierEntry[] {
  return tierList;
}

export type { StatId };
