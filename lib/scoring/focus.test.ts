import { describe, expect, it } from "vitest";
import type { Character, UserStamp } from "@/types";
import { buildFocusReport } from "./focus";

const dps: Character = {
  id: "test-dps",
  name: "DPS de test",
  damageType: "Slash",
  role: "Full Assault",
  rarity: "SSR",
  releaseDate: "2026-01-01",
  imageUrl: "/images/characters/test.webp",
  weapon: { name: "Arme", stats: [], passive: "" },
  recommendedSets: [],
  recommendedBasicStats: {
    I: ["atk-pct"],
    II: ["crit-rate", "crit-dmg"],
    III: ["atk-pct"],
  },
  statWeights: {
    "crit-rate": 1,
    "crit-dmg": 1,
    "atk-pct": 0.8,
    atk: 0.4,
    hp: 0.05,
    def: 0.05,
  },
  recommendedPassives: [],
  passives: [],
};

const support: Character = {
  ...dps,
  id: "test-support",
  name: "Support de test",
  role: "Support",
};

function stamp(overrides: Partial<UserStamp>): UserStamp {
  return {
    id: crypto.randomUUID(),
    setId: "",
    piece: "I",
    level: 1,
    secondBasicStat: "atk-pct",
    substats: [
      { id: "crit-rate", evolutions: 0 },
      { id: "crit-dmg", evolutions: 0 },
      { id: "atk-pct", evolutions: 0 },
      { id: "atk", evolutions: 0 },
    ],
    targetCharacterId: "test-dps",
    createdAt: "2026-07-01T00:00:00.000Z",
    updatedAt: "2026-07-01T00:00:00.000Z",
    ...overrides,
  };
}

const characters = [dps, support];

describe("buildFocusReport", () => {
  it("ignore les stamps sans personnage cible", () => {
    const report = buildFocusReport(
      [stamp({ targetCharacterId: undefined })],
      characters,
      []
    );
    expect(report).toHaveLength(0);
  });

  it("signale les pièces manquantes comme maillon faible prioritaire", () => {
    const report = buildFocusReport([stamp({ piece: "I" })], characters, []);
    expect(report).toHaveLength(1);
    expect(report[0].missingPieces).toEqual(["II", "III"]);
    expect(report[0].weakest).toEqual({ piece: "II", equipped: null });
  });

  it("désigne la pièce au score le plus bas quand les 3 sont équipées", () => {
    const report = buildFocusReport(
      [
        stamp({ piece: "I", level: 30 }),
        stamp({ piece: "II", level: 30 }),
        /* Pièce III faible : mauvaises substats. */
        stamp({
          piece: "III",
          substats: [
            { id: "hp", evolutions: 0 },
            { id: "def", evolutions: 0 },
          ],
        }),
      ],
      characters,
      []
    );
    expect(report[0].missingPieces).toEqual([]);
    expect(report[0].weakest?.piece).toBe("III");
  });

  it("garde le meilleur stamp quand plusieurs visent la même pièce", () => {
    const good = stamp({ piece: "I", level: 30 });
    const bad = stamp({
      piece: "I",
      substats: [{ id: "hp", evolutions: 0 }],
    });
    const report = buildFocusReport([bad, good], characters, []);
    expect(report[0].equipped.I?.stamp.id).toBe(good.id);
  });

  it("classe les personnages du plus négligé au mieux équipé", () => {
    const report = buildFocusReport(
      [
        /* DPS : 3 pièces complètes et correctes. */
        stamp({ piece: "I", level: 30 }),
        stamp({ piece: "II", level: 30 }),
        stamp({ piece: "III", level: 30 }),
        /* Support : une seule pièce → pièce manquante, prioritaire. */
        stamp({ piece: "I", targetCharacterId: "test-support" }),
      ],
      characters,
      []
    );
    expect(report[0].characterId).toBe("test-support");
    expect(report[1].characterId).toBe("test-dps");
  });
});
