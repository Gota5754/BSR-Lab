import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const komamura: Character = {
  id: "komamura",
  name: "Komamura Sajin",
  damageType: "Strike",
  role: "Tactic",
  rarity: "SSR",
  imageUrl: "/images/characters/komamura.webp",
  recommendedSets: [
    { setId: "inner-fang", priority: 1, note: "Battlefield Skill DMG stacking (estimation, pas de guide publié)", sincePatch: "Juil. 2026" },
    { setId: "stealth-force", priority: 2, note: "Strike DMG +30% après Battlefield Skill", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["strike-dmg", "atk-pct"],
    II: ["crit-rate", "crit-dmg"],
    III: ["ult-charge", "atk-pct"],
  },
  statWeights: {
    "atk": 0.3,
    "atk-pct": 0.7,
    "def": 0.1,
    "def-pct": 0.3,
    "hp": 0.1,
    "hp-pct": 0.3,
    "crit-rate": 0.6,
    "crit-dmg": 0.6,
    "ult-charge": 0.8,
    "ailment-dmg": 0.2,
  },
  recommendedPassives: ["enhanced-battlefield-skill", "enhanced-damage"],
  passives: [],
  buildNotes: "Hybride attaque/défense ; axé Battlefield Skills, réduit la résistance Strike des ennemis.",
};
