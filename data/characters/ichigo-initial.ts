import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const ichigoInitial: Character = {
  id: "ichigo-initial",
  name: "Ichigo Kurosaki (Initial)",
  damageType: "Slash",
  role: "Full Assault",
  rarity: "SR",
  imageUrl: "/images/characters/ichigo-initial.webp",
  recommendedSets: [
    { setId: "rising-black-moon", priority: 1, note: "Slash + special attacks", sincePatch: "Juil. 2026" },
    { setId: "beast-tyrant", priority: 2, note: "Générique ATK", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["slash-dmg", "atk-pct"],
    II: ["crit-rate", "crit-dmg"],
    III: ["ult-charge", "atk-pct"],
  },
  statWeights: {
    "atk": 0.35,
    "atk-pct": 0.7,
    "def": 0.05,
    "def-pct": 0.05,
    "hp": 0.05,
    "hp-pct": 0.1,
    "crit-rate": 1,
    "crit-dmg": 0.95,
    "ult-charge": 0.4,
    "ailment-dmg": 0.1,
  },
  recommendedPassives: ["enhanced-damage", "enhanced-ultimate"],
  passives: [],
  buildNotes: "Slash early game, vite dépassé.",
};
