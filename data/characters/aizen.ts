import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const aizen: Character = {
  id: "aizen",
  name: "Aizen Sosuke",
  damageType: "Spirit",
  role: "Tactic",
  rarity: "SSR",
  recommendedSets: [
    { setId: "immeasurable-gap", priority: 1, note: "Battlefield Skill +30% et +10% all DMG", sincePatch: "Juil. 2026" },
    { setId: "curtain-falls", priority: 2, note: "Alternative Spirit support", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["spirit-dmg", "atk-pct"],
    II: ["crit-rate", "crit-dmg"],
    III: ["atk-pct", "ult-charge"],
  },
  statWeights: {
    "atk": 0.35,
    "atk-pct": 0.75,
    "def": 0.05,
    "def-pct": 0.05,
    "hp": 0.05,
    "hp-pct": 0.1,
    "crit-rate": 0.9,
    "crit-dmg": 1,
    "ult-charge": 0.5,
    "ailment-dmg": 0.1,
  },
  recommendedPassives: ["enhanced-damage", "enhanced-battlefield-skill"],
  passives: [],
  buildNotes: "Cœur de la team Spirit : contrôle, débuffs (Ravage), ultimate = invincibilité + buffs d'équipe.",
};
