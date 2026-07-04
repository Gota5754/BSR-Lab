import type {
  Character,
  StampPassive,
  StampPieceId,
  UserStamp,
} from "@/types";
import { evaluateStamp, type StampEvaluation } from "./engine";

/* « Priorités d'amélioration » : un personnage équipe 3 stamps (I/II/III)
   d'un même set. On repère, parmi les stamps assignés à chaque personnage,
   la pièce manquante ou la plus faible — c'est elle qui mérite le focus. */

const PIECES: StampPieceId[] = ["I", "II", "III"];

export type EquippedPiece = {
  stamp: UserStamp;
  evaluation: StampEvaluation;
};

export type CharacterFocus = {
  characterId: string;
  /* Meilleur stamp assigné pour chaque pièce (le « équipé » supposé). */
  equipped: Partial<Record<StampPieceId, EquippedPiece>>;
  missingPieces: StampPieceId[];
  /* Le maillon faible : une pièce manquante en priorité, sinon la pièce
     équipée au score le plus bas. Null si aucun stamp assigné. */
  weakest:
    | { piece: StampPieceId; equipped: EquippedPiece | null }
    | null;
};

/* Score de tri d'un rapport : les pièces manquantes valent -1
   (toujours plus urgentes qu'un mauvais stamp). */
export function focusPriorityScore(focus: CharacterFocus): number {
  if (!focus.weakest) return Number.POSITIVE_INFINITY;
  return focus.weakest.equipped?.evaluation.score ?? -1;
}

export function buildFocusReport(
  stamps: UserStamp[],
  characters: Character[],
  passives: StampPassive[]
): CharacterFocus[] {
  const byCharacter = new Map<string, UserStamp[]>();
  for (const stamp of stamps) {
    if (!stamp.targetCharacterId) continue;
    const list = byCharacter.get(stamp.targetCharacterId) ?? [];
    list.push(stamp);
    byCharacter.set(stamp.targetCharacterId, list);
  }

  const reports: CharacterFocus[] = [];
  for (const [characterId, list] of byCharacter) {
    const character = characters.find((c) => c.id === characterId);
    if (!character) continue;

    const equipped: CharacterFocus["equipped"] = {};
    for (const piece of PIECES) {
      const candidates = list
        .filter((s) => s.piece === piece)
        .map((stamp) => ({
          stamp,
          evaluation: evaluateStamp(
            character,
            {
              piece: stamp.piece,
              level: stamp.level,
              secondBasicStatId: stamp.secondBasicStat,
              substats: stamp.substats,
              passiveId: stamp.passiveId,
            },
            passives
          ),
        }));
      if (candidates.length === 0) continue;
      /* Plusieurs stamps sur la même pièce : le meilleur est « équipé ». */
      equipped[piece] = candidates.reduce((best, c) =>
        c.evaluation.score > best.evaluation.score ? c : best
      );
    }

    const missingPieces = PIECES.filter((p) => !equipped[p]);
    let weakest: CharacterFocus["weakest"] = null;
    if (missingPieces.length > 0) {
      weakest = { piece: missingPieces[0], equipped: null };
    } else {
      const worst = PIECES.map((p) => equipped[p]!).reduce((min, c) =>
        c.evaluation.score < min.evaluation.score ? c : min
      );
      weakest = { piece: worst.stamp.piece, equipped: worst };
    }

    reports.push({ characterId, equipped, missingPieces, weakest });
  }

  /* Les plus négligés d'abord. */
  return reports.sort(
    (a, b) => focusPriorityScore(a) - focusPriorityScore(b)
  );
}
