import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const grimmjowPantera: Character = {
  id: "grimmjow-pantera",
  name: "Grimmjow Pantera",
  damageType: "Strike",
  role: "Full Assault",
  rarity: "SSR",
  imageUrl: "/images/characters/grimmjow-pantera.webp",
  recommendedSets: [
    { setId: "becoming-the-king", priority: 1, note: "Set signature : Lacerate → ATK +18% / Crit DMG +60%", sincePatch: "Juil. 2026" },
    { setId: "midnight-specter", priority: 2, note: "Alternative Strike", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["atk-pct", "strike-dmg"],
    II: ["crit-rate", "crit-dmg"],
    III: ["atk-pct", "ailment-dmg"],
  },
  statWeights: {
    "atk": 0.4,
    "atk-pct": 0.75,
    "def": 0.05,
    "def-pct": 0.05,
    "hp": 0.05,
    "hp-pct": 0.1,
    "crit-rate": 1,
    "crit-dmg": 0.95,
    "ult-charge": 0.4,
    "ailment-dmg": 0.45,
  },
  recommendedPassives: ["enhanced-damage", "enhanced-ultimate", "enhanced-special-attack"],
  passives: [],
  buildNotes: "DPS Strike : Lacerate → ATK +18% / Crit DMG +60% via son set signature Becoming the King.",
};
