import type { Character } from "@/types";

/* Généré depuis bsr-lab-donnees.xlsx (données validées par Mathieu, juillet 2026). */

export const nelliel: Character = {
  id: "nelliel",
  name: "Nelliel Tu Odelschwanck",
  damageType: "Thrust",
  role: "Tactic",
  rarity: "SSR",
  imageUrl: "/images/characters/nelliel.webp",
  recommendedSets: [
    { setId: "knights-anthem", priority: 1, note: "Thrust + Ailment équipe ; UCR élevé recommandé", sincePatch: "Juil. 2026" },
    { setId: "mocking-visage", priority: 2, note: "Alternative ailment", sincePatch: "Juil. 2026" },
  ],
  recommendedBasicStats: {
    I: ["thrust-dmg", "atk-pct"],
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
    "crit-dmg": 0.9,
    "ult-charge": 0.8,
    "ailment-dmg": 0.5,
  },
  recommendedPassives: ["invigorate-tactic", "restrain-2", "invigorate"],
  passives: [],
  buildNotes: "Tactic Thrust T0 : enabler clé de la team Thrust (avec Ichigo Dual Zangetsu et Gin).",
};
