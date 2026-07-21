import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const ichigoDualZangetsu: Character = {
  id: "ichigo-dual-zangetsu",
  name: "Ichigo Kurosaki (Dual Zangetsu)",
  damageType: "Thrust",
  role: "Full Assault",
  rarity: "SSR",
  imageUrl: "/images/characters/ichigo-dual-zangetsu.webp",
  recommendedSets: [
    { setId: "duty-borne", priority: 1, note: "Set signature : Breach → Ultimate DMG", sincePatch: "Juil. 2026" },
    { setId: "knights-anthem", priority: 2, note: "Alternative Thrust", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["atk-pct", "thrust-dmg"],
    II: ["crit-rate", "crit-dmg"],
    III: ["ailment-dmg", "atk-pct"],
  },
  statWeights: {
    "atk": 0.4,
    "atk-pct": 0.75,
    "def": 0.05,
    "def-pct": 0.05,
    "hp": 0.05,
    "hp-pct": 0.1,
    "crit-rate": 1,
    "crit-dmg": 0.95,
    "ult-charge": 0.6,
    "ailment-dmg": 0.9,
  },
  recommendedPassives: ["enhanced-damage", "enhanced-ultimate"],
  passives: [],
  buildNotes: "Nouveau DPS Thrust T0 (juil. 2026) : mécanique Breach + ultimate, set signature Duty Borne.",
};
