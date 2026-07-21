import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const ikkaku: Character = {
  id: "ikkaku",
  name: "Ikkaku Madarame",
  damageType: "Thrust",
  role: "Full Assault",
  rarity: "SSR",
  imageUrl: "/images/characters/ikkaku.webp",
  recommendedSets: [
    { setId: "unyielding-light", priority: 1, note: "Special attack +30% (estimation, pas de guide publié)", sincePatch: "Juil. 2026" },
    { setId: "knights-anthem", priority: 2, note: "Alternative Thrust", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["thrust-dmg", "atk-pct"],
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
    "crit-dmg": 0.9,
    "ult-charge": 0.4,
    "ailment-dmg": 0.3,
  },
  recommendedPassives: ["enhanced-special-attack", "enhanced-damage", "enhanced-ultimate"],
  passives: [],
  buildNotes: "DPS Thrust axé special attacks ; option budget derrière Gin.",
};
