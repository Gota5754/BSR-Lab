import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const renji: Character = {
  id: "renji",
  name: "Renji Abarai",
  damageType: "Thrust",
  role: "Full Assault",
  rarity: "SR",
  recommendedSets: [
    { setId: "unyielding-light", priority: 1, note: "Special attack +30%", sincePatch: "Juil. 2026" },
    { setId: "knights-anthem", priority: 2, note: "Alternative Thrust", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["atk-pct", "thrust-dmg"],
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
    "ult-charge": 0.5,
    "ailment-dmg": 0.4,
  },
  recommendedPassives: ["enhanced-special-attack", "enhanced-damage", "enhanced-ultimate"],
  passives: [],
  buildNotes: "DPS Thrust axé special attacks (set Unyielding Light).",
};
