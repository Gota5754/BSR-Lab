import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const white: Character = {
  id: "white",
  name: "White Ichigo",
  damageType: "Slash",
  role: "Tactic",
  rarity: "SSR",
  recommendedSets: [
    { setId: "mindscape-encroachment", priority: 1, note: "Set signature : Slash Mastery équipe + counters", sincePatch: "Juil. 2026" },
    { setId: "rising-black-moon", priority: 2, note: "Alternative Slash", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["slash-dmg", "atk-pct"],
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
    "crit-rate": 1,
    "crit-dmg": 0.95,
    "ult-charge": 0.5,
    "ailment-dmg": 0.1,
  },
  recommendedPassives: ["invigorate-tactic", "restrain-2", "invigorate"],
  passives: [],
  buildNotes: "Enabler Slash T0 ; joue autour des Getsuga et des counters, se marie avec Ichigo Bankai.",
};
