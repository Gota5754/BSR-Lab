import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const rukia: Character = {
  id: "rukia",
  name: "Rukia Kuchiki",
  damageType: "Spirit",
  role: "Tactic",
  rarity: "SR",
  recommendedSets: [
    { setId: "blooming-sakura", priority: 1, note: "UCR + Battlefield Skill", sincePatch: "Juil. 2026" },
    { setId: "hidden-wisdom", priority: 2, note: "Alternative support", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["spirit-dmg", "atk-pct"],
    II: ["crit-rate"],
    III: ["ult-charge"],
  },
  statWeights: {
    "atk": 0.25,
    "atk-pct": 0.5,
    "def": 0.05,
    "def-pct": 0.1,
    "hp": 0.1,
    "hp-pct": 0.2,
    "crit-rate": 0.5,
    "crit-dmg": 0.5,
    "ult-charge": 1,
    "ailment-dmg": 0.1,
  },
  recommendedPassives: ["enhanced-damage", "enhanced-battlefield-skill", "invigorate"],
  passives: [],
  buildNotes: "Contrôle (Freeze) + utilité d'équipe ; UCR prioritaire.",
};
