import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const kenpachi: Character = {
  id: "kenpachi",
  name: "Kenpachi Zaraki",
  damageType: "Slash",
  role: "Full Assault",
  rarity: "SSR",
  releaseDate: "2025-11-19",
  imageUrl: "/images/characters/kenpachi-zaraki.webp",
  recommendedSets: [
    { setId: "ready-to-go", priority: 1, note: "Set signature : exploite Cleave/Sever", sincePatch: "Juil. 2026" },
    { setId: "mindscape-encroachment", priority: 2, note: "Alternative Slash", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["slash-dmg", "atk-pct"],
    II: ["crit-rate", "crit-dmg", "atk-pct"],
    III: ["ailment-dmg", "atk-pct"],
  },
  statWeights: {
    "atk": 0.35,
    "atk-pct": 0.7,
    "def": 0.05,
    "def-pct": 0.05,
    "hp": 0.05,
    "hp-pct": 0.15,
    "crit-rate": 1,
    "crit-dmg": 0.95,
    "ult-charge": 0.3,
    "ailment-dmg": 0.8,
  },
  recommendedPassives: ["enhanced-damage", "enhanced-technique", "enhanced-ultimate"],
  passives: [],
  buildNotes: "DPS brut Slash, scaling Ailment (Cleave/Sever) ; vise Crit Rate/DMG + Ailment DMG Bonus.",
};
