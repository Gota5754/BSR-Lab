import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const ulquiorra: Character = {
  id: "ulquiorra",
  name: "Ulquiorra Segunda Etapa",
  damageType: "Spirit",
  role: "Full Assault",
  rarity: "SSR",
  recommendedSets: [
    { setId: "fill-the-nothingness", priority: 1, note: "Stacking Technique/Ultimate DMG", sincePatch: "Juil. 2026" },
    { setId: "world-conquest", priority: 2, note: "Alternative Spirit", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["atk-pct", "spirit-dmg"],
    II: ["atk-pct", "crit-rate", "crit-dmg"],
    III: ["atk-pct", "ult-charge"],
  },
  statWeights: {
    "atk": 0.45,
    "atk-pct": 1,
    "def": 0.05,
    "def-pct": 0.05,
    "hp": 0.05,
    "hp-pct": 0.1,
    "crit-rate": 0.9,
    "crit-dmg": 0.85,
    "ult-charge": 0.8,
    "ailment-dmg": 0.1,
  },
  recommendedPassives: ["enhanced-damage", "enhanced-technique"],
  passives: [],
  buildNotes: "DPS Spirit top méta ; vise un UCR très élevé (~168%+), techniques + Lanza del Relampago.",
};
