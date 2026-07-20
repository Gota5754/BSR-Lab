import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const soifon: Character = {
  id: "soifon",
  name: "Soi Fon",
  damageType: "Strike",
  role: "Tactic",
  rarity: "SSR",
  recommendedSets: [
    { setId: "stealth-force", priority: 1, note: "Set signature (Onmitsukidō) : Strike + Ailment Mastery", sincePatch: "Juil. 2026" },
    { setId: "midnight-specter", priority: 2, note: "Alternative Strike", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["strike-dmg", "atk-pct"],
    II: ["crit-rate", "crit-dmg"],
    III: ["ult-charge", "atk-pct", "ailment-dmg"],
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
    "ailment-dmg": 0.5,
  },
  recommendedPassives: ["invigorate-tactic", "restrain-2", "enhanced-damage"],
  passives: [],
  buildNotes: "Tactic Strike : Deathmark et gros crits ; joue sur les changements de personnage (Conviction).",
};
