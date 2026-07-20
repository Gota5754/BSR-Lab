import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const yoruichi: Character = {
  id: "yoruichi",
  name: "Yoruichi Shihōin",
  damageType: "Strike",
  role: "Full Assault",
  rarity: "SSR",
  recommendedSets: [
    { setId: "ready-to-go", priority: 1, note: "Ult +30%, special attacks via basics", sincePatch: "Juil. 2026" },
    { setId: "midnight-specter", priority: 2, note: "Générique ATK", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["strike-dmg", "atk-pct"],
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
    "ult-charge": 0.55,
    "ailment-dmg": 0.1,
  },
  recommendedPassives: ["enhanced-damage", "enhanced-ultimate", "enhanced-special-attack"],
  passives: [],
  buildNotes: "DPS combos rapides (Shunko, Flash Step) ; burst d'ultimate, récompense les Perfect Dodges.",
};
