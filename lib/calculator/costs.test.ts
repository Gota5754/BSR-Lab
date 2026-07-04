import { describe, expect, it } from "vitest";
import {
  calcCharacterCost,
  calcPassivesCost,
  calcPulls,
  calcSkillsCost,
  calcWeaponCost,
  expFromBooks,
  expFromTamahagane,
} from "./costs";

/* Valeurs attendues issues des tables réelles (bsr-calculator). */

describe("calcCharacterCost", () => {
  it("1 → 20 : première tranche, pas d'ascension", () => {
    const cost = calcCharacterCost(1, 20);
    expect(cost.exp).toBe(35792);
    expect(cost.kans).toBe(7500);
    expect(cost.essences).toEqual({ green: 0, blue: 0, purple: 0 });
  });

  it("20 → 40 : l'EXP par différence des totaux correspond à la table", () => {
    const cost = calcCharacterCost(20, 40);
    /* 216908 - 35792 = 181116, valeur listée pour 20→40. */
    expect(cost.exp).toBe(181116);
    expect(cost.kans).toBe(12900 + 23800 + 2500 + 5000);
    expect(cost.essences).toEqual({ green: 0, blue: 18, purple: 0 });
  });

  it("1 → 100 : totaux complets", () => {
    const cost = calcCharacterCost(1, 100);
    expect(cost.exp).toBe(4101463);
    expect(cost.kans).toBe(
      7500 + 12900 + 23800 + 41200 + 66700 + 101300 + 145100 + 193300 + 239000 +
        2500 + 5000 + 10000 + 15000 + 20000 + 30000 + 40000 + 50000
    );
    expect(cost.essences).toEqual({ green: 30, blue: 18, purple: 21 });
  });

  it("plage vide : coût nul", () => {
    const cost = calcCharacterCost(50, 50);
    expect(cost.exp).toBe(0);
    expect(cost.kans).toBe(0);
  });
});

describe("expFromBooks / expFromTamahagane", () => {
  it("convertit les livres en EXP", () => {
    expect(expFromBooks({ green: 2, blue: 1, purple: 1, yellow: 1 })).toBe(
      2 * 500 + 3000 + 10000 + 20000
    );
  });

  it("convertit les tamahagane en EXP", () => {
    expect(
      expFromTamahagane({ green: 2, blue: 1, purple: 1, yellow: 1 })
    ).toBe(2 * 100 + 600 + 2000 + 4000);
  });
});

describe("calcWeaponCost", () => {
  it("20 → 40 : tamahagane, or, kans et marteaux", () => {
    const cost = calcWeaponCost(20, 40);
    expect(cost.tamaExp).toBe(33876 + 62756);
    expect(cost.gold).toBe(1500 + 3000);
    expect(cost.kans).toBe(8500 + 15875);
    expect(cost.hammers).toEqual({ green: 0, blue: 18, purple: 0 });
  });

  it("les armes commencent au niv 20 : 1 → 30 équivaut à 20 → 30", () => {
    const cost = calcWeaponCost(1, 30);
    expect(cost).toEqual(calcWeaponCost(20, 30));
    expect(cost.tamaExp).toBe(33876);
    expect(cost.gold).toBe(1500);
    expect(cost.kans).toBe(8500);
  });
});

describe("calcSkillsCost", () => {
  it("1 → 9 pour une compétence : totaux de la table", () => {
    const cost = calcSkillsCost(1, 9, 1);
    expect(cost.arts).toEqual({ green: 14, blue: 11, purple: 23 });
    expect(cost.kans).toBe(172500);
  });

  it("multiplie par le nombre de compétences", () => {
    const cost = calcSkillsCost(1, 9, 4);
    expect(cost.arts).toEqual({ green: 56, blue: 44, purple: 92 });
    expect(cost.kans).toBe(690000);
  });

  it("segment partiel 4 → 6", () => {
    const cost = calcSkillsCost(4, 6, 1);
    expect(cost.arts).toEqual({ green: 0, blue: 11, purple: 0 });
    expect(cost.kans).toBe(35000);
  });
});

describe("calcPassivesCost", () => {
  it("les 3 passifs au max : 90 omamori, 442 500 kans", () => {
    const cost = calcPassivesCost([3, 3, 3]);
    expect(cost.omamori).toBe(90);
    expect(cost.kans).toBe(442500);
  });

  it("cibles partielles", () => {
    const cost = calcPassivesCost([1, 0, 2]);
    expect(cost.omamori).toBe(2 + 6 + 12);
    expect(cost.kans).toBe(6000 + 16500 + 43500);
  });
});

describe("calcPulls", () => {
  it("3 000 cristaux = 10 pulls", () => {
    const result = calcPulls({
      crystals: 3000,
      pity: 0,
      daysUntilBanner: 0,
      crystalsPerDay: 0,
    });
    expect(result.pulls).toBe(10);
    expect(result.neededForGuarantee).toBe(90);
    expect(result.enough).toBe(false);
    expect(result.missingCrystals).toBe(80 * 300);
  });

  it("la pity réduit le besoin ; les jours ajoutent des cristaux", () => {
    const result = calcPulls({
      crystals: 300,
      pity: 85,
      daysUntilBanner: 30,
      crystalsPerDay: 30,
    });
    /* 300 + 900 = 1200 cristaux → 4 pulls ; besoin 90-85 = 5. */
    expect(result.pulls).toBe(4);
    expect(result.neededForGuarantee).toBe(5);
    expect(result.enough).toBe(false);
    expect(result.missingPulls).toBe(1);
  });

  it("pity clampée à 89 : il faut toujours au moins 1 pull", () => {
    const result = calcPulls({
      crystals: 300,
      pity: 999,
      daysUntilBanner: 0,
      crystalsPerDay: 0,
    });
    expect(result.neededForGuarantee).toBe(1);
    expect(result.enough).toBe(true);
  });
});
