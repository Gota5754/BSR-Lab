import type { Character } from "@/types";

/* ⚠️ Rôle, type, poids, arme et sets recommandés à confirmer par Mathieu. */
export const byakuya: Character = {
  id: "byakuya",
  name: "Byakuya Kuchiki",
  damageType: "Spirit",
  role: "Tactic",
  rarity: "SSR",
  releaseDate: "2025-09-24",
  imageUrl: "/images/characters/byakuya-kuchiki.webp",
  weapon: {
    name: "Senbonzakura",
    stats: ["ATK", "Spirit DMG Bonus"],
    passive:
      "Senbonzakura Kageyoshi : les lames dispersées infligent des dégâts de zone continus (40 % de l'ATK/s).", // ⚠️ placeholder
  },
  recommendedSets: [
    {
      setId: "blooming-sakura",
      priority: 1,
      note: "Set signature.",
      sincePatch: "1.0",
    },
    {
      setId: "immeasurable-gap",
      priority: 2,
      note: "Option anti-boss.",
      sincePatch: "1.0",
    },
  ],
  recommendedBasicStats: {
    I: ["spirit-dmg", "atk-pct"],
    II: ["crit-rate", "crit-dmg", "atk-pct"],
    III: ["atk-pct", "ult-charge"],
  },
  statWeights: {
    "crit-rate": 0.9,
    "crit-dmg": 0.9,
    "atk-pct": 0.75,
    "ult-charge": 0.4,
    atk: 0.35,
    "ailment-dmg": 0.35,
    "hp-pct": 0.1,
    hp: 0.05,
    "def-pct": 0.05,
    def: 0.05,
  },
  recommendedPassives: [
    "enhanced-battlefield-skill-2",
    "overdrive-tactic",
  ], // ⚠️ à confirmer
  passives: [
    {
      name: "Fierté des Kuchiki",
      description:
        "Les ennemis contrôlés subissent 15 % de dégâts supplémentaires de sa part.", // ⚠️ placeholder
    },
  ],
  buildNotes:
    "Tactic : sa Battlefield Skill porte une grosse part des dégâts — Enhanced Battlefield Skill (II) et Overdrive - Tactic sont ses passifs 6★ à viser.",
};
