import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const uryu: Character = {
  id: "uryu",
  name: "Uryu Ishida",
  damageType: "Thrust",
  role: "Tactic",
  rarity: "SR",
  recommendedSets: [
    { setId: "inner-fang", priority: 1, note: "Battlefield Skill DMG (Sprenger)", sincePatch: "Juil. 2026" },
    { setId: "knights-anthem", priority: 2, note: "Alternative Thrust", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["atk-pct", "thrust-dmg"],
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
    "crit-dmg": 0.9,
    "ult-charge": 0.6,
    "ailment-dmg": 0.2,
  },
  recommendedPassives: ["enhanced-battlefield-skill", "enhanced-damage"],
  passives: [],
  buildNotes: "Tactic Thrust : Battlefield Skills (Sprenger), ignore la DEF ennemie.",
};
