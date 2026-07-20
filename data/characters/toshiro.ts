import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const toshiro: Character = {
  id: "toshiro",
  name: "Toshiro Hitsugaya",
  damageType: "Spirit",
  role: "Full Assault",
  rarity: "SSR",
  recommendedSets: [
    { setId: "world-conquest", priority: 1, note: "Ult +30%, techniques → basic attacks +36%", sincePatch: "Juil. 2026" },
    { setId: "fill-the-nothingness", priority: 2, note: "Alternative Spirit", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["spirit-dmg", "atk-pct"],
    II: ["crit-dmg", "crit-rate"],
    III: ["atk-pct", "ult-charge"],
  },
  statWeights: {
    "atk": 0.35,
    "atk-pct": 0.75,
    "def": 0.05,
    "def-pct": 0.05,
    "hp": 0.05,
    "hp-pct": 0.1,
    "crit-rate": 0.9,
    "crit-dmg": 1,
    "ult-charge": 0.5,
    "ailment-dmg": 0.1,
  },
  recommendedPassives: ["enhanced-basic-attack", "enhanced-ultimate"],
  passives: [],
  buildNotes: "Burst basé timing/exécution (Tenso Jyurin) : basic attacks boostées, gros ultimate de gel.",
};
