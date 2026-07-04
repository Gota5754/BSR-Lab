import { describe, expect, it } from "vitest";
import {
  getAllPieceRules,
  getCharacters,
  getStampSets,
  getStampPassives,
  getSubstatPool,
  getTierList,
} from "./index";

/* Garde-fou : toutes les références croisées entre fichiers de données
   doivent pointer vers des ids existants (typos fréquents en `data:`). */

const substatIds = new Set(getSubstatPool().map((s) => s.id));
const setIds = new Set(getStampSets().map((s) => s.id));
const characterIds = new Set(getCharacters().map((c) => c.id));
const passiveIds = new Set(getStampPassives().map((p) => p.id));
const pieceRulesById = new Map(getAllPieceRules().map((r) => [r.piece, r]));

describe("intégrité des données de jeu", () => {
  it("les ids de personnages, sets et passifs sont uniques", () => {
    expect(characterIds.size).toBe(getCharacters().length);
    expect(setIds.size).toBe(getStampSets().length);
    expect(passiveIds.size).toBe(getStampPassives().length);
  });

  it("le pool de substats contient 10 stats", () => {
    expect(getSubstatPool()).toHaveLength(10);
  });

  it("les recommendedPassives pointent vers des passifs existants", () => {
    for (const character of getCharacters()) {
      for (const id of character.recommendedPassives) {
        expect(passiveIds, `${character.id} → passif "${id}"`).toContain(id);
      }
    }
  });

  it("les recommendedSets pointent vers des sets existants", () => {
    for (const character of getCharacters()) {
      for (const rec of character.recommendedSets) {
        expect(setIds, `${character.id} → set "${rec.setId}"`).toContain(
          rec.setId
        );
      }
    }
  });

  it("les recommendedBasicStats respectent le pool de chaque pièce", () => {
    for (const character of getCharacters()) {
      for (const rules of getAllPieceRules()) {
        const recommended = character.recommendedBasicStats[rules.piece];
        for (const statId of recommended) {
          expect(
            rules.secondBasicPool,
            `${character.id} → pièce ${rules.piece} → "${statId}"`
          ).toContain(statId);
        }
      }
    }
  });

  it("les statWeights portent sur le pool de substats, bornés 0-1", () => {
    for (const character of getCharacters()) {
      for (const [id, weight] of Object.entries(character.statWeights)) {
        expect(substatIds, `${character.id} → weight "${id}"`).toContain(id);
        expect(weight, `${character.id} → ${id}`).toBeGreaterThanOrEqual(0);
        expect(weight, `${character.id} → ${id}`).toBeLessThanOrEqual(1);
      }
    }
  });

  it("les règles des 3 pièces existent avec les basic stats fixes du jeu", () => {
    expect(pieceRulesById.get("I")?.fixedBasicStat).toBe("atk");
    expect(pieceRulesById.get("II")?.fixedBasicStat).toBe("def");
    expect(pieceRulesById.get("III")?.fixedBasicStat).toBe("hp");
  });

  it("la tier list pointe vers des personnages existants", () => {
    for (const entry of getTierList()) {
      expect(characterIds).toContain(entry.characterId);
    }
  });
});
