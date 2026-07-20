import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const tosen: Character = {
  id: "tosen",
  name: "Kaname Tosen",
  damageType: "Thrust",
  role: "Tactic",
  rarity: "SSR",
  recommendedSets: [
    { setId: "knights-anthem", priority: 1, note: "Thrust + Ailment Bonus équipe après Battlefield Skill", sincePatch: "Juil. 2026" },
    { setId: "mocking-visage", priority: 2, note: "Alternative ailment", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["atk-pct", "thrust-dmg"],
    II: ["crit-dmg", "crit-rate"],
    III: ["ailment-dmg", "atk-pct"],
  },
  statWeights: {
    "atk": 0.35,
    "atk-pct": 0.7,
    "def": 0.05,
    "def-pct": 0.05,
    "hp": 0.05,
    "hp-pct": 0.1,
    "crit-rate": 0.7,
    "crit-dmg": 0.9,
    "ult-charge": 0.6,
    "ailment-dmg": 0.8,
  },
  recommendedPassives: ["invigorate-tactic", "restrain-2", "enhanced-damage"],
  passives: [],
  buildNotes: "Tactic Thrust : débuffs/ailments, bon enabler pour équipes Thrust.",
};
