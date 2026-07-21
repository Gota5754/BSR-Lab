import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const grimmjowJaegerjack: Character = {
  id: "grimmjow-jaegerjack",
  name: "Grimmjow Jaegerjack",
  damageType: "Strike",
  role: "Full Assault",
  rarity: "SR+",
  imageUrl: "/images/characters/grimmjow-jaegerjack.webp",
  recommendedSets: [
    { setId: "ready-to-go", priority: 1, note: "ATK +20% et Crit DMG +50% génériques", sincePatch: "Juil. 2026" },
    { setId: "midnight-specter", priority: 2, note: "Alternative Strike/Ultimate", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["strike-dmg", "atk-pct"],
    II: ["crit-rate", "crit-dmg"],
    III: ["ult-charge"],
  },
  statWeights: {
    "atk": 0.35,
    "atk-pct": 0.7,
    "def": 0.05,
    "def-pct": 0.05,
    "hp": 0.05,
    "hp-pct": 0.1,
    "crit-rate": 0.85,
    "crit-dmg": 0.8,
    "ult-charge": 1,
    "ailment-dmg": 0.1,
  },
  recommendedPassives: ["enhanced-damage", "enhanced-ultimate"],
  passives: [],
  buildNotes: "DPS Strike centré ultimate : l'UCR est prioritaire (convertit l'UCR en ATK via son kit).",
};
