import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const ulquiorraCiferSr: Character = {
  id: "ulquiorra-cifer-sr",
  name: "Ulquiorra Cifer",
  damageType: "Spirit",
  role: "Full Assault",
  rarity: "SR+",
  imageUrl: "/images/characters/ulquiorra-cifer-sr.webp",
  recommendedSets: [
    { setId: "ready-to-go", priority: 1, note: "ATK +20% et Crit DMG +50% génériques", sincePatch: "Juil. 2026" },
    { setId: "fill-the-nothingness", priority: 2, note: "Alternative Spirit", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["spirit-dmg", "atk-pct"],
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
    "ult-charge": 0.3,
    "ailment-dmg": 0.1,
  },
  recommendedPassives: ["enhanced-damage", "enhanced-ultimate"],
  passives: [],
  buildNotes: "DPS Spirit crit standard ; très bon early/mid game.",
};
