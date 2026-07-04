import { describe, expect, it } from "vitest";
import type { Character, StampPassive } from "@/types";
import {
  evaluateStamp,
  hasLevel25Evolution,
  singleEvolutionBudget,
  type StampInput,
} from "./engine";

/* Fixtures synthétiques : le moteur est une fonction pure. */

const passives: StampPassive[] = [
  {
    id: "overdrive-full-assault",
    name: "Overdrive - Full Assault",
    roleAffinity: "Full Assault",
    descriptionLv1: "",
  },
  {
    id: "overdrive-support",
    name: "Overdrive - Support",
    roleAffinity: "Support",
    descriptionLv1: "",
  },
  { id: "enhanced-damage", name: "Enhanced Damage", descriptionLv1: "" },
  {
    id: "enhanced-ultimate-full-assault",
    name: "Enhanced Ultimate - Full Assault",
    roleAffinity: "Full Assault",
    descriptionLv1: "",
  },
];

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
    I: ["slash-dmg", "atk-pct"],
    II: ["crit-rate", "crit-dmg"],
    III: ["atk-pct", "ult-charge"],
  },
  statWeights: {
    "crit-rate": 1,
    "crit-dmg": 1,
    "atk-pct": 0.8,
    atk: 0.4,
    hp: 0.05,
    def: 0.05,
  },
  recommendedPassives: ["overdrive-full-assault"],
  passives: [],
};

const perfectSubstats = [
  { id: "crit-rate", evolutions: 3 },
  { id: "crit-dmg", evolutions: 0 },
  { id: "atk-pct", evolutions: 0 },
  { id: "atk", evolutions: 0 },
];

function input(overrides: Partial<StampInput> = {}): StampInput {
  return {
    piece: "II",
    level: 1,
    secondBasicStatId: "crit-rate",
    substats: [],
    ...overrides,
  };
}

describe("mécanique des niveaux", () => {
  it("budget d'évolutions simples selon le niveau", () => {
    expect(singleEvolutionBudget(1)).toBe(0);
    expect(singleEvolutionBudget(10)).toBe(1);
    expect(singleEvolutionBudget(15)).toBe(2);
    expect(singleEvolutionBudget(20)).toBe(3);
    expect(singleEvolutionBudget(30)).toBe(3);
  });

  it("l'évolution générale s'applique à partir du niv 25", () => {
    expect(hasLevel25Evolution(20)).toBe(false);
    expect(hasLevel25Evolution(25)).toBe(true);
  });
});

describe("evaluateStamp — score absolu", () => {
  it("le stamp parfait niv 30 (substats, évolutions, basic stat, passif BIS) vaut 100", () => {
    const result = evaluateStamp(
      dps,
      input({
        level: 30,
        substats: perfectSubstats,
        passiveId: "overdrive-full-assault",
      }),
      passives
    );
    expect(result.score).toBe(100);
    expect(result.grade).toBe("S");
    /* Le +1 du niv 25 est automatique : 3 simples + 1 = 4 sur la BIS. */
    expect(result.breakdown[0].evolutions).toBe(4);
    expect(result.breakdown[1].evolutions).toBe(1);
  });

  it("un stamp niv 1 parfait est plafonné bas mais affiche un potentiel de 100 %", () => {
    const result = evaluateStamp(
      dps,
      input({
        substats: [
          { id: "crit-rate", evolutions: 0 },
          { id: "crit-dmg", evolutions: 0 },
          { id: "atk-pct", evolutions: 0 },
          { id: "atk", evolutions: 0 },
        ],
      }),
      passives
    );
    expect(result.potential).toBe(1);
    expect(result.score).toBeLessThan(50);
    expect(result.passiveStatus).toBe("not-ascended");
  });

  it("le score croît avec le niveau à stamp égal", () => {
    const substats = perfectSubstats;
    const lv1 = evaluateStamp(dps, input({ level: 1, substats }), passives);
    const lv20 = evaluateStamp(dps, input({ level: 20, substats }), passives);
    const lv30 = evaluateStamp(
      dps,
      input({ level: 30, substats, passiveId: "overdrive-full-assault" }),
      passives
    );
    expect(lv20.score).toBeGreaterThan(lv1.score);
    expect(lv30.score).toBeGreaterThan(lv20.score);
  });

  it("des évolutions simples sur les mauvaises substats pénalisent", () => {
    const good = evaluateStamp(
      dps,
      input({
        level: 20,
        substats: [
          { id: "crit-rate", evolutions: 3 },
          { id: "hp", evolutions: 0 },
        ],
      }),
      passives
    );
    const bad = evaluateStamp(
      dps,
      input({
        level: 20,
        substats: [
          { id: "crit-rate", evolutions: 0 },
          { id: "hp", evolutions: 3 },
        ],
      }),
      passives
    );
    expect(bad.score).toBeLessThan(good.score);
  });

  it("clampe les évolutions simples au budget du niveau", () => {
    /* Niv 10 : budget 1 — demander 3+3 doit être ramené à 1 au total. */
    const cheated = evaluateStamp(
      dps,
      input({
        level: 10,
        substats: [
          { id: "crit-rate", evolutions: 3 },
          { id: "crit-dmg", evolutions: 3 },
        ],
      }),
      passives
    );
    const legit = evaluateStamp(
      dps,
      input({
        level: 10,
        substats: [
          { id: "crit-rate", evolutions: 1 },
          { id: "crit-dmg", evolutions: 0 },
        ],
      }),
      passives
    );
    expect(cheated.score).toBe(legit.score);
  });
});

describe("evaluateStamp — passif 6★", () => {
  const substats = perfectSubstats;

  it("hiérarchise BIS > affinité de rôle > générique > mauvais rôle", () => {
    const at30 = (passiveId?: string) =>
      evaluateStamp(dps, input({ level: 30, substats, passiveId }), passives);
    const bis = at30("overdrive-full-assault");
    const roleMatch = at30("enhanced-ultimate-full-assault");
    const generic = at30("enhanced-damage");
    const mismatch = at30("overdrive-support");
    expect(bis.passiveStatus).toBe("bis");
    expect(roleMatch.passiveStatus).toBe("role-match");
    expect(generic.passiveStatus).toBe("generic");
    expect(mismatch.passiveStatus).toBe("role-mismatch");
    expect(bis.score).toBeGreaterThan(roleMatch.score);
    expect(roleMatch.score).toBeGreaterThan(generic.score);
    expect(generic.score).toBeGreaterThan(mismatch.score);
  });

  it("sous le niv 25, le passif est ignoré même s'il est renseigné", () => {
    const result = evaluateStamp(
      dps,
      input({ level: 20, substats, passiveId: "overdrive-full-assault" }),
      passives
    );
    expect(result.passiveStatus).toBe("not-ascended");
  });

  it("niv 25+ sans passif renseigné : statut unknown, qualité neutre", () => {
    const unknown = evaluateStamp(
      dps,
      input({ level: 25, substats }),
      passives
    );
    const bis = evaluateStamp(
      dps,
      input({ level: 25, substats, passiveId: "overdrive-full-assault" }),
      passives
    );
    expect(unknown.passiveStatus).toBe("unknown");
    expect(unknown.score).toBeLessThan(bis.score);
    expect(unknown.score).toBeGreaterThan(0);
  });
});

describe("evaluateStamp — basic stat et robustesse", () => {
  it("détecte une 2e basic stat recommandée selon la pièce", () => {
    const onPiece2 = evaluateStamp(
      dps,
      input({ piece: "II", secondBasicStatId: "crit-rate" }),
      passives
    );
    const onPiece3 = evaluateStamp(
      dps,
      input({ piece: "III", secondBasicStatId: "crit-rate" }),
      passives
    );
    expect(onPiece2.basicStatRecommended).toBe(true);
    expect(onPiece3.basicStatRecommended).toBe(false);
  });

  it("ignore les substats inconnues sans planter", () => {
    const result = evaluateStamp(
      dps,
      input({ substats: [{ id: "stat-inconnue", evolutions: 2 }] }),
      passives
    );
    expect(result.substatScore).toBe(0);
    expect(result.potential).toBe(0);
  });

  it("les parts du breakdown somment à 1 quand il y a des substats utiles", () => {
    const result = evaluateStamp(
      dps,
      input({
        level: 15,
        substats: [
          { id: "crit-rate", evolutions: 2 },
          { id: "atk-pct", evolutions: 0 },
        ],
      }),
      passives
    );
    const total = result.breakdown.reduce((sum, b) => sum + b.share, 0);
    expect(total).toBeCloseTo(1, 5);
  });
});
