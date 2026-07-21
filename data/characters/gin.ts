import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const gin: Character = {
  id: "gin",
  name: "Ichimaru Gin",
  damageType: "Thrust",
  role: "Full Assault",
  rarity: "SSR",
  imageUrl: "/images/characters/gin.webp",
  recommendedSets: [
    { setId: "mocking-visage", priority: 1, note: "Ailment +50%, débuffs → Thrust/Technique/Ult DMG", sincePatch: "Juil. 2026" },
    { setId: "knights-anthem", priority: 2, note: "Alternative Thrust crit", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["thrust-dmg", "atk-pct"],
    II: ["crit-rate", "crit-dmg"],
    III: ["ailment-dmg", "atk-pct"],
  },
  statWeights: {
    "atk": 0.35,
    "atk-pct": 0.7,
    "def": 0.05,
    "def-pct": 0.05,
    "hp": 0.05,
    "hp-pct": 0.1,
    "crit-rate": 1,
    "crit-dmg": 0.85,
    "ult-charge": 0.2,
    "ailment-dmg": 0.9,
  },
  recommendedPassives: ["enhanced-damage", "enhanced-technique", "enhanced-ultimate"],
  passives: [],
  buildNotes: "DPS Thrust ailment : Impale Scale (alimenté aussi par l'équipe) + Snake Venom de l'ultimate.",
};
