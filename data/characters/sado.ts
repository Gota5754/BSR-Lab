import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const sado: Character = {
  id: "sado",
  name: "Yasutora Sado",
  damageType: "Strike",
  role: "Full Assault",
  rarity: "SR",
  imageUrl: "/images/characters/sado.webp",
  recommendedSets: [
    { setId: "midnight-specter", priority: 1, note: "Strike + Ultimate DMG", sincePatch: "Juil. 2026" },
    { setId: "beast-tyrant", priority: 2, note: "Générique ATK", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["atk-pct", "strike-dmg"],
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
    "crit-rate": 1,
    "crit-dmg": 0.95,
    "ult-charge": 0.6,
    "ailment-dmg": 0.1,
  },
  recommendedPassives: ["enhanced-damage", "enhanced-ultimate"],
  passives: [],
  buildNotes: "DPS Strike SR ; build crit standard.",
};
