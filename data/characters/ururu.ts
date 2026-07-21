import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const ururu: Character = {
  id: "ururu",
  name: "Ururu Tsumugiya",
  damageType: "Spirit",
  role: "Full Assault",
  rarity: "SR",
  imageUrl: "/images/characters/ururu.webp",
  recommendedSets: [
    { setId: "world-conquest", priority: 1, note: "Techniques → basic attacks", sincePatch: "Juil. 2026" },
    { setId: "fill-the-nothingness", priority: 2, note: "Alternative Spirit", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["atk-pct", "spirit-dmg"],
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
    "ult-charge": 0.4,
    "ailment-dmg": 0.1,
  },
  recommendedPassives: ["enhanced-basic-attack", "enhanced-ultimate"],
  passives: [],
  buildNotes: "DPS Spirit SR ; techniques → basic attacks boostées (set World Conquest).",
};
